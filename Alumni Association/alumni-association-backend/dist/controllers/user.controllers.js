"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, role } = req.body; // Include role in request body
    if (!email && !role) {
        return res.status(400).json({ message: "Email and role is required" });
    }
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (user) {
            return res.status(403).json({ message: "User Already Exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield prisma_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role, // Include role while creating the user
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }, // Include role in the JWT payload
        process.env.JWT_SECRET || "", { expiresIn: "1d" });
        res
            .status(200)
            .cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({ message: "Successfully Account Created", id: newUser.id });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Error" });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(403).json({ message: "Invalid credentials" });
        }
        const passwordMatching = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatching) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username, email: user.email, role: user.role }, // Include role in the JWT payload
        process.env.JWT_SECRET || "", { expiresIn: "1d" });
        const modifiedUser = { name: user.username, email: user.email, id: user.id, role: user.role };
        res
            .status(200)
            .cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) // Set cookie for 7 days
            .json({ message: "Successfully logged in", user: modifiedUser });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Error" });
    }
});
exports.login = login;

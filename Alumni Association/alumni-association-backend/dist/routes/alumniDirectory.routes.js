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
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const router = express_1.default.Router();
router.route('/getAlumniDirectory').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all users with the role of 'alumni'
        const alumni = yield prisma_1.default.user.findMany({
            where: {
                role: 'alumni', // Filter users by role 'alumni'
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                profile_picture: true,
                graduation_year: true,
                course: true,
                created_at: true,
            },
        });
        res.status(200).json(alumni);
    }
    catch (error) {
        console.error('Error fetching alumni directory:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
exports.authorizeAdmin = authorizeAdmin;
exports.checkRole = checkRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateJWT(req, res, next) {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token; // Use optional chaining to handle undefined cookies
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    //@ts-ignore
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }
        req.user = user; // Attach user to request object
        next();
    });
}
function authorizeAdmin(req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        return res.status(403).json({ message: 'Access Forbidden' });
    }
    next();
}
function checkRole(roles) {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    };
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const successStories_controllers_1 = require("../controllers/successStories.controllers");
const router = express_1.default.Router();
router.route('/create').post(authMiddleware_1.authenticateJWT, (0, authMiddleware_1.checkRole)(['admin', 'alumni']), successStories_controllers_1.createSuccessStory);
router.route('/getAllSuccessStories').get(successStories_controllers_1.getAllSuccessStories);
router.route('/getSuccessStory/:id').get(successStories_controllers_1.getSuccessStoryById);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const events_controllers_1 = require("../controllers/events.controllers");
const router = express_1.default.Router();
router.route('/create').post(authMiddleware_1.authenticateJWT, authMiddleware_1.authorizeAdmin, events_controllers_1.createEvents);
router.route('/getAllEvents').get(events_controllers_1.getAllEvents);
router.route('/getEvent/:id').get(events_controllers_1.getEventById);
exports.default = router;

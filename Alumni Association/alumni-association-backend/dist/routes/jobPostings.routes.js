"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const jobPostings_controllers_1 = require("../controllers/jobPostings.controllers");
const router = express_1.default.Router();
router.route('/create').post(authMiddleware_1.authenticateJWT, (0, authMiddleware_1.checkRole)(['admin', 'alumni']), jobPostings_controllers_1.createJobPosting);
router.route('/getAlljobPostings').get(jobPostings_controllers_1.getAllJobPostings);
router.route('/getjobPosting/:id').get(jobPostings_controllers_1.getJobPostingById);
exports.default = router;

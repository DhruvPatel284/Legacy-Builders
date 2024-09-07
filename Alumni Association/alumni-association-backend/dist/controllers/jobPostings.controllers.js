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
exports.getJobPostingById = exports.getAllJobPostings = exports.createJobPosting = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createJobPosting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, company, location, salary_range, job_type } = req.body;
    const created_by = req.user.userId;
    try {
        // Prepare the data object
        const postData = {
            title,
            content,
            company,
            location,
            salary_range,
            job_type,
            created_by,
            post_type: 'JOB',
        };
        // Create the job posting
        const jobPosting = yield prisma_1.default.post.create({
            data: postData,
        });
        res.status(201).json(jobPosting);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createJobPosting = createJobPosting;
const getAllJobPostings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobPostings = yield prisma_1.default.post.findMany({
            where: { post_type: 'JOB' },
        });
        res.status(200).json(jobPostings);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllJobPostings = getAllJobPostings;
const getJobPostingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const jobPosting = yield prisma_1.default.post.findUnique({
            where: { id },
        });
        if (jobPosting && jobPosting.post_type === 'JOB') {
            res.status(200).json(jobPosting);
        }
        else {
            res.status(404).json({ message: 'Job posting not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getJobPostingById = getJobPostingById;

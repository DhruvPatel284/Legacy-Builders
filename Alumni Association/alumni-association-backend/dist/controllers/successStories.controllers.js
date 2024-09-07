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
exports.getSuccessStoryById = exports.getAllSuccessStories = exports.createSuccessStory = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createSuccessStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, achievement, date } = req.body;
    const created_by = req.user.userId;
    try {
        const successStory = yield prisma_1.default.post.create({
            data: {
                title,
                content,
                achievement,
                date,
                created_by,
                post_type: 'SUCCESS_STORY',
            },
        });
        res.status(201).json(successStory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createSuccessStory = createSuccessStory;
const getAllSuccessStories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const successStories = yield prisma_1.default.post.findMany({
            where: { post_type: 'SUCCESS_STORY' },
            include: { creator: true }, // Include creator details if needed
        });
        res.status(200).json(successStories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllSuccessStories = getAllSuccessStories;
const getSuccessStoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const successStory = yield prisma_1.default.post.findUnique({
            where: { id: id },
            include: { creator: true }, // Include creator details if needed
        });
        if (successStory) {
            res.status(200).json(successStory);
        }
        else {
            res.status(404).json({ message: 'Success Story not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getSuccessStoryById = getSuccessStoryById;

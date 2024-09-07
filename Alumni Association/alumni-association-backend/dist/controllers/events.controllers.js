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
exports.getEventById = exports.getAllEvents = exports.createEvents = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date, location } = req.body;
    const userId = req.user.userId; // Get the userId from the authenticated user
    if (!title || !description || !date || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newEvent = yield prisma_1.default.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                location,
                creatorId: userId, // Set the creatorId to the authenticated user's ID
            },
        });
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
});
exports.createEvents = createEvents;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield prisma_1.default.event.findMany(); // Fetch all events
        res.status(200).json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllEvents = getAllEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield prisma_1.default.event.findUnique({
            where: { id: id }, // Ensure ID is converted to number if needed
        });
        if (event) {
            res.status(200).json(event);
        }
        else {
            res.status(404).json({ message: 'Event not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getEventById = getEventById;

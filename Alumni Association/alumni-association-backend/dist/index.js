"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/*', (0, cors_1.default)());
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const events_routes_1 = __importDefault(require("./routes/events.routes"));
const jobPostings_routes_1 = __importDefault(require("./routes/jobPostings.routes"));
const successStories_routes_1 = __importDefault(require("./routes/successStories.routes"));
const alumniDirectory_routes_1 = __importDefault(require("./routes/alumniDirectory.routes"));
app.use("/api/v1/users", user_routes_1.default);
app.use('/api/v1/events', events_routes_1.default);
app.use("/api/v1/job-postings", jobPostings_routes_1.default);
app.use("/api/v1/success-stories", successStories_routes_1.default);
app.use("/api/v1/alumni-directory", alumniDirectory_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

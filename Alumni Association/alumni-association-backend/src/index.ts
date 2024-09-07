import express, { Application, Request, Response } from 'express';
import  cors  from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/*',cors());


import userRouter  from './routes/user.routes';
import eventRouter from './routes/events.routes';
import jobPostingRouter from './routes/jobPostings.routes';
import success_storiesRouter from './routes/successStories.routes'

app.use("/api/v1/users",userRouter);
app.use('/api/v1/events', eventRouter);
app.use("/api/v1/job-postings",jobPostingRouter);
app.use("/api/v1/success-stories",success_storiesRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

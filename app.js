import express from 'express';
import dotenv from 'dotenv';
import reviewsRouter from "./routes/review.js"; // Adjust the path as necessary
import bookRouter from './routes/book.js';

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the reviews routes
app.use('/reviews', reviewsRouter);

app.use('/books', bookRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

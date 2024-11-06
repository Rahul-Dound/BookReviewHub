import express from 'express';
import Review from "../models/review.js";
import Book from '../models/book.js'; // Import the Review model

const router = express.Router();

// POST route to add a review
router.post('/add', async (req, res) => {
    try {
        const { ISBN, userId, reviewText, rating } = req.body; // Make sure to get ISBN, not bookId
        
        // Create a new review using Sequelize
        const review = await Review.create({
            ISBN,        // Use ISBN to match the column name in the database
            userId,
            reviewText,
            rating
        });
        
        // Respond with the created review
        res.status(201).json({
            message: 'Review added successfully!',
            review
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET route to fetch all reviews
// router.get('/', async (req, res) => {
//     try {
//         const reviews = await Review.findAll(); // Fetch all reviews
//         res.status(200).json(reviews);
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

router.get('/books', async (req, res) => {
    try {
        // Fetch all books from the database
        const books = await Book.findAll(); // Using Sequelize to fetch all books
        
        // Send the books data as a response
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route to remove a review by ISBN and userId
// DELETE route with logging for debugging
router.delete('/delete/:ISBN/:userId', async (req, res) => {
    const { ISBN, userId } = req.params;

    try {
        // Find the review to delete
        const review = await Review.findOne({
            where: {
                ISBN: ISBN,
                userId: userId
            }
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        // Delete the review
        await review.destroy();

        // Respond with success
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;

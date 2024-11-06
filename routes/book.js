import express from 'express';
const router = express.Router();

// Sample book data
const books = [
    {
        isbn: 1,
        author: "Chinua Achebe",
        title: "Things Fall Apart",
        reviews: []
    },
    {
        isbn: 2,
        author: "Hans Christian Andersen",
        title: "Fairy tales",
        reviews: []
    },
    {
        isbn: 3,
        author: "Dante Alighieri",
        title: "The Divine Comedy",
        reviews: [
            { reviewId: 1, content: "Nice" }
        ]
    },
    {
        isbn: 4,
        author: "Unknown",
        title: "The Epic Of Gilgamesh",
        reviews: []
    },
    {
        isbn: 5,
        author: "Unknown",
        title: "The Book Of Job",
        reviews: []
    }
];

// Route to get all books
router.get('/', (req, res) => {  // Change /books to / for root route access
    res.json(books);
});

// Route to get a specific book by ISBN
router.get('/:isbn', (req, res) => {
    const { isbn } = req.params;

    findBookByISBN(isbn)
        .then(book => {
            res.json(book);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});

// Route to get books by author
router.get('/author/:authorName', (req, res) => {
    const { authorName } = req.params;

    findBooksByAuthor(authorName)
        .then(booksByAuthor => {
            res.json(booksByAuthor);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});

// Route to get books by title
router.get('/title/:title', (req, res) => {
    const { title } = req.params;

    findBooksByTitle(title)
        .then(booksByTitle => {
            res.json(booksByTitle);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});

// Route to get a specific review of a book by ISBN and review ID
router.get('/:isbn/reviews/:reviewId', (req, res) => {
    const { isbn, reviewId } = req.params;
    const book = books.find(book => book.isbn == isbn);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const review = book.reviews.find(r => r.reviewId == reviewId);
    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
});

function findBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        const book = books.find(b => b.isbn === parseInt(isbn));
        if (book) {
            resolve(book);
        } else {
            reject({ message: "Book not found" });
        }
    });
}

function findBooksByAuthor(authorName) {
    return new Promise((resolve, reject) => {
        const booksByAuthor = books.filter(book => book.author.toLowerCase() === authorName.toLowerCase());
        if (booksByAuthor.length > 0) {
            resolve(booksByAuthor);
        } else {
            reject({ message: "No books found for this author" });
        }
    });
}

function findBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        const booksByTitle = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
        if (booksByTitle.length > 0) {
            resolve(booksByTitle);
        } else {
            reject({ message: "No books found with this title" });
        }
    });
}

export default router;

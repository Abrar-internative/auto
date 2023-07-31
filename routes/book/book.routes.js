const express = require("express");

const validateRequestBody = require("../../middleware/validateRequestBody.middleware");

const bookCreateSchema = require("../../validations/books/create.validation");
const bookUpdateSchema = require("../../validations/books/update.validation");

const {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
} = require("../../controllers/book/book.controller");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:bookId", getSingleBook);
router.post("/", validateRequestBody(bookCreateSchema), createBook);
router.patch("/:bookId", validateRequestBody(bookUpdateSchema), updateBook);
router.delete("/:bookId", deleteBook);

module.exports = router;

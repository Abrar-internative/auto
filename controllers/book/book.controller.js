const bookService = require("../../services/book/book.service");

const {
    BOOK_RESPONSES,
    genericResponse,
} = require("../../constants/responses");

const getAllBooks = async (req, res) => {
  try {
    const result = await bookService.getAllBooks();

    if (!result.length) {
      const response = genericResponse(
        404,
        false,
        null,
        BOOK_RESPONSES.NOT_FOUND
      );
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(200, true, result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const getSingleBook = async (req, res) => {
  const id = req.params.bookId;

  try {
    const book = await bookService.getAllBooks(id);

    if (!book) {
      const response = genericResponse(
        404,
        false,
        null,
        BOOK_RESPONSES.NOT_FOUND
      );
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(200, true, result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const createBook = async (req, res) => {
  try {
    await bookService.createBook(req.body);

    const response = genericResponse(
      201,
      true,
      null,
      null,
      BOOK_RESPONSES.CREATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateBook = async (req, res) => {
  const id = req.params.bookId;

  try {
    const hasUpdated = await bookService.updateBook(id, req.body);

    if (!hasUpdated) {
        const response = genericResponse(
            404,
            false,
            null,
            null,
            BOOK_RESPONSES.FAIL
        );
        return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      BOOK_RESPONSES.UPDATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.bookId;

  try {
    const hasDeleted = await bookService.deleteBook(id);

    if (!hasDeleted) {
      const response = genericResponse(404, false, null, BOOK_RESPONSES.FAIL);
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      BOOK_RESPONSES.DELETE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(statusCode, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};



# Book Management Backend

The system utilizes JSON Web Tokens (JWT) for user authentication and authorization, offering APIs for managing book entries, with password encryption ensured through bcrypt for heightened security. You can see my [Book Management Backend](https://book-management-backend-vny5.onrender.com/)


## Features

- User authentication with JWT
- CRUD operations for managing book entries (Create, Read, Update, Delete)
- Filtering books by author or publication year
- Searching books by search querries
- Pagination  by page and limit

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible via a MongoDB URI

### Installation

1. Clone this repository:

   ```bash
   https://github.com/AkshayKumarGaurav/Book_Management_Backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=3001
   Mongo_Url=mongodb://localhost/book_management
   JWT_SECRET=your_secret_key
   ```

### Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Use a tool like Postman or cURL to make HTTP requests to the API endpoints.

### API Endpoints

#### Authentication

- `POST /user/register`: Register a new user. Requires a JSON body with `name`, `email` and `password` fields.
- `POST /user/login`: Log in with existing user credentials. Requires a JSON body with `email` and `password` fields.

#### Book Management

- `POST /books`: Create a new book entry. Requires a JSON body with `title`, `author`, and `publicationYear` fields.
- `GET /books`: Get all book entries.
- `GET /books/:id`: Get a single book entry by ID.
- `PUT /books/:id`: Update a book entry by ID. Requires a JSON body with `title`, `author`, and `publicationYear` fields.
- `DELETE /books/:id`: Delete a book entry by ID.

- `Filter url/books?author=Dilnawaz` : Get a list of books with filtering by author
- `Filter By publicationYear url/books?publicationYear=2020` : Get a list of books with Filtering books by publication year.
- `Search url/books?q=query` : Get a list of books by search query
- `Pagination url/books?page=1&limit=10` : Get a list of books by pagination using {page} & {limit} both values are dynamic.



#### Authorization

Protected routes require a valid JWT token obtained through the `/auth/login` endpoint in the `Authorization` header.


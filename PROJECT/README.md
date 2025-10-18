# VideoTube Backend

Simple, well-documented backend for a video-sharing application (VideoTube). This project is built with Node.js, Express, and MongoDB and includes user authentication, file uploads (Cloudinary), and basic video listing endpoints.

## Key features

- User registration and login with JWT-based authentication
- Refresh tokens and cookie-based access token storage
- Profile avatar and cover image uploads (multer + Cloudinary)
- Watch history and channel profile endpoints
- Basic video listing endpoint

## Tech / Skills used

- Node.js (ES modules)
- Express 5
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- multer for handling multipart/form-data (uploads)
- Cloudinary SDK for media hosting
- dotenv for environment config
- cors, cookie-parser for HTTP middleware
- nodemon for development

## Repository layout (important files)

- `src/index.js` - app bootstrap, DB connection
- `src/app.js` - express app and middleware registration
- `src/db/index.js` - mongoose connection helper
- `src/routes/` - route definitions (users, videos, etc.)
- `src/controllers/` - request handlers
- `src/models/` - mongoose models
- `src/middlewares/` - auth and file upload middleware
- `src/utils/cloudnary.js` - Cloudinary upload helper

## Environment Variables

Create a `.env` (or `env` as used in this repo) file at the project root with the following keys:

- `PORT` - port the server will listen on (default: 3000)
- `MONGODB_URI` - MongoDB connection string (without database name) or full URI
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ACCESS_TOCKEN_SECRET` - Secret used to sign JWT access tokens
- `REFRESH_TOKEN_SECRET` - (if used) secret for refresh tokens
- `CORS_ORIGIN` - allowed origin for CORS

Notes:
- The project uses `dotenv.config({path: './env'})` by default — adjust to `.env` if you prefer.
- Keep secrets out of source control. Add `env` or `.env` to `.gitignore`.

## Install dependencies

Install Node.js (v16+ recommended) and run:

```powershell
npm install
```

## Run the app

- Development (auto-restart):

```powershell
npm run dev
```

- Production / simple run:

```powershell
npm start
```

The server starts from `src/index.js` and listens on `process.env.PORT` or `3000`.

## API Endpoints (overview)

Base URL: /api/v1

- Users
  - POST /api/v1/users/register — register a new user (multipart: avatar, coverImage)
  - POST /api/v1/users/login — login (returns tokens/cookies)
  - POST /api/v1/users/logout — logout (protected)
  - POST /api/v1/users/refresh-token — refresh access token
  - POST /api/v1/users/change-password — change password (protected)
  - GET /api/v1/users/current-user — get logged-in user (protected)
  - PATCH /api/v1/users/update-account — update user details (protected)
  - PATCH /api/v1/users/avatar — update avatar (protected, multipart)
  - PATCH /api/v1/users/cover-Imge — update cover image (protected, multipart)
  - GET /api/v1/users/c/:username — get channel profile (protected)
  - GET /api/v1/users/watch-History — get watch history (protected)

- Videos
  - GET /api/v1/videos — list videos

Note: Some endpoints require a valid JWT access token. The server accepts the token via cookie `accessToken` or `Authorizations: Bearer <token>` header.

## Development notes

- The auth middleware (`src/middlewares/auth.middleware.js`) expects the access token secret in `process.env.ACCESS_TOCKEN_SECRET`.
- File uploads are saved temporarily and then uploaded to Cloudinary via `src/utils/cloudnary.js`.
- The app sets CORS origin using `CORS_ORIGIN` environment variable.
- Mongoose connection is established in `src/db/index.js` — check it for DB naming conventions.

## What you'll learn by reading/working on this project

- How to structure a small Express app using controllers, routers, and middleware
- Implement JWT authentication with access and refresh tokens
- Work with multipart uploads using `multer` and remote storage (Cloudinary)
- Secure endpoints with middleware and cookie-based auth flows
- Use Mongoose for schema design and simple pagination utilities

## Next steps / improvements

- Add API validation (e.g., using Joi or express-validator)
- Add unit/integration tests (Jest or Mocha + Supertest)
- Improve error handling and consistent API responses
- Add Swagger/OpenAPI documentation
- Add rate limiting and security headers

## License

This project currently uses the ISC license as declared in `package.json`.

---

If you'd like, I can also:

- Add example `.env` template file in the repo
- Generate Postman collection or Swagger docs for the endpoints
- Add a simple tests folder with a couple of smoke tests

Tell me which of the above you'd like next and I'll add it.

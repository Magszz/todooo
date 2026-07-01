# NestJS Registration API (Sample)

A minimal, runnable NestJS REST API demonstrating a typical **user registration**
flow: DTO validation, duplicate-email checking, password hashing, and a clean
modular structure (`AuthModule` + `UsersModule`).

## Project structure

```
src/
├── auth/
│   ├── dto/
│   │   └── register.dto.ts      # Validation rules for the request body
│   ├── auth.controller.ts       # POST /api/v1/auth/register
│   ├── auth.service.ts          # Business logic: dup check, hashing
│   └── auth.module.ts
├── users/
│   ├── schemas/
│   │   └── user.schema.ts       # Mongoose schema for the users collection
│   ├── users.service.ts         # Data access via Mongoose Model
│   └── users.module.ts
├── common/
│   └── decorators/
│       └── match.decorator.ts   # Custom @Match() — confirmPassword check
├── app.module.ts
└── main.ts
```

## Setup

1. Get a MongoDB connection string, either:
   - **Local**: install MongoDB and run it locally (`mongodb://localhost:27017/registration-api`), or
   - **MongoDB Atlas** (cloud, free tier available): create a cluster, then go to **Connect → Drivers** to get your connection string.
2. Copy `.env.example` to `.env` and paste your connection string into `MONGODB_URI`:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and start the app:
   ```bash
   npm install
   npm run start:dev
   ```

No manual schema/table setup needed — Mongoose creates the `users` collection automatically the first time a document is saved, based on the `UserSchema` defined in `user.schema.ts`.

The app starts on `http://localhost:3000`, with all routes prefixed `/api/v1`.

## Endpoint

### `POST /api/v1/auth/register`

**Request body**
```json
{
  "fullName": "Juan Dela Cruz",
  "email": "juan@example.com",
  "password": "StrongPass1",
  "confirmPassword": "StrongPass1"
}
```

**Success response — 201 Created**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "a3f1c2...-uuid",
    "fullName": "Juan Dela Cruz",
    "email": "juan@example.com",
    "createdAt": "2026-06-19T08:00:00.000Z"
  }
}
```

**Validation error — 400 Bad Request** (e.g. invalid email, weak password, mismatched confirmPassword)
```json
{
  "statusCode": 400,
  "message": [
    "Please provide a valid email address",
    "Passwords do not match"
  ],
  "error": "Bad Request"
}
```

**Duplicate email — 409 Conflict**
```json
{
  "statusCode": 409,
  "message": "An account with this email already exists",
  "error": "Conflict"
}
```

## What this sample demonstrates

- **DTO validation** with `class-validator` (`IsEmail`, `MinLength`, `Matches`, plus a custom `@Match` decorator to confirm passwords match)
- **Global `ValidationPipe`** in `main.ts` — rejects unknown fields and auto-validates every request
- **Password hashing** with `bcrypt` — the plaintext password is never stored or returned
- **Separation of concerns** — Controller (HTTP layer) → Service (business logic) → `UsersService`/Mongoose model (data access) → MongoDB
- **Proper HTTP status codes** — `201` on success, `409` on duplicate email, `400` on validation failure
- **Real MongoDB persistence** — `MongooseModule.forRootAsync` connects using a `MONGODB_URI` loaded through `@nestjs/config`, never hardcoded

## Next steps for a real project

- Add a `POST /auth/login` endpoint issuing JWTs (`@nestjs/jwt` + `@nestjs/passport`)
- Add email verification (send a confirmation link/OTP on registration)
- Add rate limiting on the register endpoint to prevent abuse (`@nestjs/throttler`)
- Add a global exception filter for consistent error response shapes
- Add indexes for any fields you'll query often beyond `email` (Mongoose's `@Prop({ index: true })`)
- For production, enable [Mongoose connection pooling options](https://mongoosejs.com/docs/connections.html) and set `maxPoolSize` appropriately for your deployment

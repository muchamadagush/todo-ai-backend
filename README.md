# Todo AI Backend

A Node.js + TypeScript backend for an AI-powered Todo Management System, using Express, MySQL, Prisma ORM, and OpenAI API.

## Features
- Task CRUD (Create, Read, Update, Delete)
- Task dependencies
- AI-powered features (breakdown, priority, summary) via OpenAI
- RESTful API
- Input validation with Zod
- Logging with Pino

## Requirements
- Node.js >= 20
- MySQL 8+
- OpenAI API key

## Getting Started

### 1. Clone the repository
```
git clone https://github.com/muchamadagush/todo-ai-backend.git
cd todo-ai-backend
```

### 2. Install dependencies
```
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` and fill in your database and OpenAI credentials:
```
cp .env.example .env
```

### 4. Setup the database
```
npx prisma migrate dev --name init --schema=src/database/prisma/schema.prisma
```

### 5. Generate Prisma client
```
npx prisma generate --schema=src/database/prisma/schema.prisma
```

### 6. Run the development server
```
npm run dev
```
Or with nodemon:
```
npm run dev:nodemon
```

## API Endpoints

### Health Check
- `GET /api/health`

### Tasks
- `POST /api/tasks` — Create task
- `GET /api/tasks` — List tasks
- `GET /api/tasks/:id` — Get task by ID
- `PATCH /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task

### AI Features
- `POST /api/ai/breakdown` — AI breakdown suggestion
- `POST /api/ai/priority` — AI priority suggestion
- `POST /api/ai/summary` — AI summary suggestion

See `postman_collection.json` for ready-to-import API tests.

## Project Structure
```
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── config
│   ├── database
│   ├── modules
│   │   ├── task
│   │   └── ai
│   └── shared
├── .env.example
├── .gitignore
├── package.json
├── postman_collection.json
└── README.md
```

## License
MIT

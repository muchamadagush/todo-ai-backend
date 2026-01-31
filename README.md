# Todo AI Backend

A Node.js + TypeScript backend for an AI-powered Todo Management System, using Express, MySQL, Prisma ORM, and OpenAI API.

## Features

- **Task Management**
	- Create, read, update, and delete tasks
	- Each task has: UUID, title, description, priority, deadline, status (todo/doing/done), ai_generated flag, timestamps
	- **Task dependencies:** tasks can depend on other tasks (managed via TaskDependency, see below)
## Task Dependencies

You can create or update a task with dependencies using the `dependencies` field in the request body.

### Create Task with Dependencies

POST `/api/tasks`

```json
{
	"title": "Task A",
	"description": "Contoh task dengan dependency",
	"priority": 1,
	"status": "todo",
	"dependencies": {
		"create": [
			{ "depends_on_task_id": "<uuid-task-lain>" }
		]
	}
}
```

### Update Task Dependencies

PATCH `/api/tasks/:id`

```json
{
	"dependencies": {
		"create": [ { "depends_on_task_id": "<uuid-task-lain>" } ],
		"delete": [ { "id": "<uuid-taskdependency>" } ]
	}
}
```

### Response Structure

Response for GET/POST/PATCH task will include `dependencies` array, each with:

- `id`: TaskDependency UUID
- `depends_on_task_id`: UUID of the dependency
- `dependsOn`: the full Task object being depended on

Example:
```json
{
	...,
	"dependencies": [
		{
			"id": "...",
			"depends_on_task_id": "...",
			"dependsOn": { "id": "...", "title": "...", ... }
		}
	]
}
```

- **AI-Powered Features (Gemini/Google Generative AI)**
	- **Breakdown**: Automatically break down a large task into subtasks with detailed descriptions
		- Endpoint: `POST /api/ai/breakdown`
		- Request: `{ "title": "Big Project", "description": "Break this down" }`
		- Response: `{ "subtasks": [{ "id": 1, "task_name": "...", "description": "..." }, ...] }`
		- Subtasks may include fields: id, task_name/task, description, status
	- **Priority**: Suggest priority (1-100) for a given task or list of tasks
		- Endpoint: `POST /api/ai/priority`
		- Request: `{ "tasks": [{ "title": "Task 1", "priority": 1 }, ...] }`
		- Response: `{ "priority": 42 }`
	- **Summary**: Summarize a list of tasks into a concise overview
		- Endpoint: `POST /api/ai/summary`
		- Request: `{ "tasks": [{ "title": "Task 1" }, ...] }`
		- Response: `{ "summary": "..." }`

- **Validation & Error Handling**
	- All input validated with Zod schemas
	- Consistent error responses with details

- **Logging**
	- All requests, errors, and AI interactions logged with Pino

- **Database**
	- MySQL 8+ with Prisma ORM
	- UUID for all IDs (Task, TaskDependency, AiLog)

- **Environment Config**
	- All sensitive config via .env (see .env.example)

- **Postman Collection**
	- Ready-to-import API tests in `postman_collection.json`

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

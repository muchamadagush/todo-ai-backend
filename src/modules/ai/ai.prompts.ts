export const PROMPT_BREAKDOWN = `You are a project manager assistant.
Break down the following task into subtasks.
Return ONLY a JSON object with this exact structure:
{
  "subtasks": [
    {
      "id": 1,
      "task_name": "Task name",
      "description": "Task description",
      "status": "todo"
    }
  ]
}`;

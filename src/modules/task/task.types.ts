export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
	id: string;
	title: string;
	description?: string | null;
	priority: number;
	deadline?: Date | null;
	status: TaskStatus;
	ai_generated: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface TaskDependency {
	id: string;
	task_id: string;
	depends_on_task_id: string;
}

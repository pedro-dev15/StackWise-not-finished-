export interface TaskForCreating {
  title: string;
  description?: string;
  dueDate?: Date;
  completedAt?: Date;
}

export interface TaskForUpdating {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
}

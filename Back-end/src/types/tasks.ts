export interface TaskForCreating {
  title: string;
  description?: string;
  dueDate?: Date;
  completedAt?: Date;
}

export interface TaskForUpdating {
  title: string;
  description?: string;
  dueDate?: Date;
}

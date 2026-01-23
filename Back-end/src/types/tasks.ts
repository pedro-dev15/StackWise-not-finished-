export interface TaskForCreating {
  title: string;
  description?: string;
  dueDate?: Date;
  completedAt?: Date;
  userId: string;
}

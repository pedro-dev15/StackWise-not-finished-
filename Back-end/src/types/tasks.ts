import { FrequencyType } from "../../generated/prisma/enums";

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

export interface HabitForCreating {
  title: string;
  description?: string;
  frequency: FrequencyType;
  daysOfWeek: Array<number>;
  timezone: string;
  target: number;
}

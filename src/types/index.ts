export type UserRole = 'admin' | 'manager' | 'employee';

export type TaskCategory = 'Documents' | 'Orientation' | 'Equipment' | 'Training';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  dueDate: string;
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Video' | 'Link' | 'Document';
  url: string;
  category: string;
  uploadedAt: string;
  uploadedBy?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar: string;
  startDate: string;
  progress: number;
  tasks: Task[];
  notifications: Notification[];
  timeline: TimelineEvent[];
}

export interface DepartmentStats {
  department: string;
  totalEmployees: number;
  avgProgress: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

export interface WeeklyReport {
  week: string;
  bottlenecks: {
    category: TaskCategory;
    count: number;
    avgCompletionTime: number;
  }[];
  departmentReadiness: DepartmentStats[];
}

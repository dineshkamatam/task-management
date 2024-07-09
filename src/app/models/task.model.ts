export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'inProgress' | 'completed';
    priority: 'low' | 'medium' | 'high';
  }
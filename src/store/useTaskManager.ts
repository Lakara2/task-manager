import { Task } from '@/components/useTaskStore';
import create from 'zustand';

interface TaskState {
  searchTask: string;
  tasks: Task[];
  setSearchTask: (text: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
}

const useTaskManager = create<TaskState>((set) => ({
  searchTask: '',
  tasks: [],
  setSearchTask: (text) => set((state) => ({ searchTask: text })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

export default useTaskManager;

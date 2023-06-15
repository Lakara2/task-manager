import create, { GetState, SetState } from 'zustand';

export type Task = {
  id: number;
  title: string;
};

type TaskState = {
  tasks: Task[];
  searchTask: (title: string) => Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
};

const useTaskStore = create<TaskState>((set: SetState<TaskState>, get: GetState<TaskState>) => ({
  tasks: [],

  searchTask: (title) => {
    const { tasks } = get();
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(title.toLowerCase())
    );
    return filteredTasks;
  },

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

export default useTaskStore;

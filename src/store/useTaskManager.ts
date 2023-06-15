import useTaskStore, { Task } from '@/components/useTaskStore';
import { useState } from 'react';

const useTaskManager = () => {
  const [searchText, setSearchText] = useState('');
  const tasks = useTaskStore((state) => state.searchTask(searchText));
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleAddTask = (task: Task) => {
    addTask(task);
  };

  const handleUpdateTask = (taskId: number, updatedTask: Partial<Task>) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  return {
    searchText,
    tasks,
    handleSearch,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  };
};

export default useTaskManager;

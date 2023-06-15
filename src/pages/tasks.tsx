import { Task } from '@/components/useTaskStore';
import useTaskManager from '@/store/useTaskManager';
import React, { ChangeEvent, useRef } from 'react';

const TaskManager = () => {
  const createTaskRef = useRef<HTMLInputElement>(null);
  const {
    tasks,
    searchTask,
    addTask,
    updateTask,
    deleteTask,
    setSearchTask,
  } = useTaskManager();

  const handleAddTask = () => {
    const title = createTaskRef.current?.value;
    if (title) {
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
      };
      addTask(newTask);
      createTaskRef.current!.value = '';
    }
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase())
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} />

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, {
                  title: e.target.value,
                  id: 0,
                  completed: false
                })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;

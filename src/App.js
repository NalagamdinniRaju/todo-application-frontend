import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  const addTask = async (task) => {
    try {
      const { data } = await createTask(task);
      setTasks([...tasks, data]);
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const updateTaskItem = async (id, updatedTask) => {
    try {
      const { data } = await updateTask(id, updatedTask);
      // Update the tasks state with the updated task
      setTasks(tasks.map((task) => (task._id === id ? data : task)));
      // Find the original task from the current state before it was updated
      const originalTask = tasks.find((task) => task._id === id);
      // Check if the title remains unchanged and task is completed or not
      if (originalTask.title === updatedTask.title) {
        if (data.completed) {
          toast.success(`Task "${data.title}" completed successfully!`);
        } else {
          toast.warning(`Task "${data.title}" is not completed yet.`);
        }
      } else {
        toast.info(`Task "${data.title}" updated successfully!`);
      } 
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const deleteTaskItem = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onUpdate={updateTaskItem} onDelete={deleteTaskItem} />
      <ToastContainer />
    </div>
  );
}

export default App;

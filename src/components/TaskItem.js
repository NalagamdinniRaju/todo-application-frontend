import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);

  // Toggles task completion status
  const handleToggleComplete = () => {
    onUpdate(task._id, { title: task.title, completed: !task.completed });
  };

  // Handles editing
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handles saving the updated task title and completion status
  const handleSave = () => {
    onUpdate(task._id, { title: updatedTitle, completed: task.completed });
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      <div className="task-info">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
        />
        {isEditing ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="edit-input"
          />
        ) : (
          <span
            className={task.completed ? 'completed' : ''}
          >
            {task.title}
          </span>
        )}
      </div>
      <div className="task-actions">
        {isEditing ? (
          <button onClick={handleSave}>
            <FaSave />
          </button>
        ) : (
          <button onClick={handleEdit}>
            <FaEdit />
          </button>
        )}
        <button onClick={() => onDelete(task._id)}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/tasksSlice';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const searchTerm = useSelector((state) => state.tasks.searchTerm);
  const dispatch = useDispatch();

  const today = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((task) => {
   
    let statusFilter = false;
    switch (filter) {
      case 'Completed':
        statusFilter = task.status === 'Completed';
        break;
      case 'Pending':
        statusFilter = task.status === 'Pending';
        break;
      case 'Overdue':
        statusFilter = task.dueDate < today && task.status !== 'Completed';
        break;
      default:
        statusFilter = true;
    }

    const titleFilter = task.title.toLowerCase().includes(searchTerm.toLowerCase());

    return statusFilter && titleFilter;
  });

  const handleComplete = (id) => {
    dispatch(updateTask({ id, updatedTask: { status: 'Completed' } }));
  };

  const handleEdit = (id) => {
    const task = tasks.find((task) => task.id === id);
    const newTitle = prompt('Enter new title:', task.title);
    const newDescription = prompt('Enter new description:', task.description);
    const newDueDate = prompt('Enter new due date (YYYY-MM-DD):', task.dueDate);

    if (newTitle && newDescription && newDueDate) {
      const updatedTask = {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
        status: task.status,
      };

      dispatch(updateTask({ id, updatedTask }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <Box>
      {filteredTasks.length === 0 ? (
        <Typography>No tasks available. Please add a task!</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredTasks.map((task) => (
            <Grid item xs={12} md={6} key={task.id}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{task.title}</Typography>
                <Typography>Description: {task.description}</Typography>
                <Typography>Due Date: {task.dueDate}</Typography>
                <Typography>Status: {task.status}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button variant="contained" color="success" onClick={() => handleComplete(task.id)}>
                    Complete
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(task.id)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(task.id)}>
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TaskList;

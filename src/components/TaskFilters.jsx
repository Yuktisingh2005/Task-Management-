import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, setSearchTerm } from '../redux/tasksSlice';
import { Box, Button, TextField } from '@mui/material';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTermState] = useState('');

  const handleSearchChange = (e) => {
    setSearchTermState(e.target.value);
    dispatch(setSearchTerm(e.target.value)); // Dispatch search term to the Redux store
  };

  return (
    <Box sx={{ marginBottom: 4, display: 'flex', gap: 2 }}>
      <Button variant="outlined" onClick={() => dispatch(setFilter('All'))}>
        All Tasks
      </Button>
      <Button variant="outlined" color="success" onClick={() => dispatch(setFilter('Completed'))}>
        Completed Tasks
      </Button>
      <Button variant="outlined" color="warning" onClick={() => dispatch(setFilter('Pending'))}>
        Pending Tasks
      </Button>
      <Button variant="outlined" color="error" onClick={() => dispatch(setFilter('Overdue'))}>
        Overdue Tasks
      </Button>
      <TextField
        label="Search Tasks"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginLeft: 2 }}
      />
    </Box>
  );
};

export default TaskFilters;

import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import { Container, CssBaseline, Typography } from '@mui/material';

function App() {
  return (
    <div
      style={{
        backgroundImage: `url('https://i.postimg.cc/Ls6nyZWR/image.png')`,  
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh', 
      }}
    >
      <Container maxWidth="lg" sx={{ padding: 4 }}>
        <CssBaseline />
        <Typography variant="h3" gutterBottom>
          Task Management Dashboard
        </Typography>
        <TaskForm />
        <TaskFilters />
        <TaskList />
      </Container>
    </div>
  );
}

export default App;

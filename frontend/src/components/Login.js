import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'password') {
      onLogin(credentials.username);
    } else {
      setError('Invalid credentials. Use admin/password');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h4" gutterBottom align="center">
          Market Predictor Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            sx={{ mb: 3 }}
            required
          />
          <Button type="submit" variant="contained" fullWidth size="large">
            Login
          </Button>
        </form>
        <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'center' }}>
          Demo: admin / password
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
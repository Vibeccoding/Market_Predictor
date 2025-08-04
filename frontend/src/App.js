import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Tab, Tabs, AppBar, Toolbar, Button } from '@mui/material';
import Dashboard from './components/Dashboard';
import NewsSection from './components/NewsSection';
import PredictionPanel from './components/PredictionPanel';
import InsuranceClaimsDetail from './components/InsuranceClaimsDetail';
import Login from './components/Login';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [dashboardData, setDashboardData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUser(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser('');
    setActiveTab(0);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Market Predictor Dashboard
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          
          <Paper sx={{ mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Dashboard Overview" />
              <Tab label="Insurance Claims Detail" />
              <Tab label="Insurance Market" />
              <Tab label="Loan Claims" />
              <Tab label="Preclosure Market" />
            </Tabs>
          </Paper>

          {activeTab === 0 && (
            <Dashboard data={dashboardData} />
          )}
          
          {activeTab === 1 && (
            <InsuranceClaimsDetail />
          )}
          
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <NewsSection category="insurance" />
              </Grid>
              <Grid item xs={12} md={4}>
                <PredictionPanel category="insurance" />
              </Grid>
            </Grid>
          )}
          
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <NewsSection category="loan_claims" />
              </Grid>
              <Grid item xs={12} md={4}>
                <PredictionPanel category="loan_claims" />
              </Grid>
            </Grid>
          )}
          
          {activeTab === 4 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <NewsSection category="preclosure" />
              </Grid>
              <Grid item xs={12} md={4}>
                <PredictionPanel category="preclosure" />
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Dashboard = ({ data }) => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Insurance Market',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Loan Claims',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Preclosure',
        data: [45, 25, 16, 36, 67, 18],
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
      },
    ],
  };

  const claimsDistributionData = {
    labels: ['Auto Insurance', 'Health Insurance', 'Property Insurance', 'Life Insurance'],
    datasets: [
      {
        data: [35, 28, 22, 15],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const marketPerformanceData = {
    labels: ['Insurance', 'Loan Claims', 'Preclosure'],
    datasets: [
      {
        label: 'Market Performance (%)',
        data: [78, 65, 72],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 205, 86, 0.6)'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Market Trends Overview',
      },
    },
  };

  return (
    <Grid container spacing={3}>
      {/* Market Trends Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Line data={chartData} options={options} />
        </Paper>
      </Grid>
      
      {/* Claims Distribution */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Claims Distribution</Typography>
          <Doughnut data={claimsDistributionData} />
        </Paper>
      </Grid>
      
      {/* Market Performance */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Market Performance Overview</Typography>
          <Bar data={marketPerformanceData} />
        </Paper>
      </Grid>
      

      
      {/* Market Categories with AI Insights */}
      {Object.entries(data).filter(([key]) => key !== 'insurance_claims_details').map(([category, info]) => (
        <Grid item xs={12} md={4} key={category}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {category.replace('_', ' ').toUpperCase()}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip label={info.market_status} color="primary" size="small" sx={{ mr: 1 }} />
                <Chip label={info.trend} color={info.trend === 'Positive' ? 'success' : 'default'} size="small" />
              </Box>
              
              <Accordion>
                <AccordionSummary>
                  <Typography variant="subtitle2">Latest News ▼</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {info.news?.map((item, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography variant="body2" fontWeight="bold">{item.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.summary}</Typography>
                      <Typography variant="caption" display="block">{item.date}</Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
              
              {info.ai_insights && (
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="subtitle2">AI Market Insights ▼</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {info.ai_insights}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
      

    </Grid>
  );
};

export default Dashboard;
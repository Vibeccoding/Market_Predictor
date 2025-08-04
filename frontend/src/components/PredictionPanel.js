import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';

const PredictionPanel = ({ category }) => {
  const [inputData, setInputData] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!inputData.trim()) return;

    try {
      setLoading(true);
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: category,
          data: { input: inputData }
        }),
      });
      
      const data = await response.json();
      setPrediction(data.prediction || 'No prediction available');
    } catch (error) {
      console.error('Error getting prediction:', error);
      setPrediction('Error generating prediction');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = (cat) => {
    const titles = {
      insurance: 'Insurance Market',
      loan_claims: 'Loan Claims',
      preclosure: 'Preclosure Market'
    };
    return titles[cat] || 'Market';
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        AI Prediction - {getCategoryTitle(category)}
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Enter market data or query"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder={`Enter ${category} market data for analysis...`}
        />
      </Box>
      
      <Button
        variant="contained"
        onClick={handlePredict}
        disabled={loading || !inputData.trim()}
        fullWidth
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Get AI Prediction'}
      </Button>
      
      {prediction && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            AI Analysis:
          </Typography>
          <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
            {prediction}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default PredictionPanel;
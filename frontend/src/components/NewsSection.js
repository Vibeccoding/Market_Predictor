import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box, Chip, Button } from '@mui/material';

const NewsSection = ({ category }) => {
  const [news, setNews] = useState([]);
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingRec, setLoadingRec] = useState(false);

  useEffect(() => {
    fetchNews();
    if (category === 'insurance') {
      fetchRecommendations();
    }
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news/${category}`);
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setLoadingRec(true);
      const response = await fetch('/api/insurance-recommendations');
      const data = await response.json();
      setRecommendations(data.recommendations || '');
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoadingRec(false);
    }
  };

  const getCategoryTitle = (cat) => {
    const titles = {
      insurance: 'Insurance Market News',
      loan_claims: 'Loan Claims News',
      preclosure: 'Preclosure Market News'
    };
    return titles[cat] || 'Market News';
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Paper sx={{ p: 3, height: 'fit-content' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          {getCategoryTitle(category)}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            onClick={fetchNews}
            disabled={loading}
            size="small"
            variant="outlined"
          >
            Refresh News
          </Button>
          {category === 'insurance' && (
            <Button 
              onClick={fetchRecommendations}
              disabled={loadingRec}
              size="small"
              variant="contained"
            >
              Get AI Recommendations
            </Button>
          )}
        </Box>
      </Box>
      
      {loading ? (
        <Typography>Loading AI-powered news...</Typography>
      ) : (
        <>
          <List>
            {news.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                          {item.title}
                        </Typography>
                        {item.impact && (
                          <Chip 
                            label={`${item.impact} Impact`} 
                            color={getImpactColor(item.impact)}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {item.summary}
                        </Typography>
                        {item.recommendation && (
                          <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1, mb: 1 }}>
                            <Typography variant="caption" fontWeight="bold">AI Recommendation: </Typography>
                            <Typography variant="caption">{item.recommendation}</Typography>
                          </Box>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          {item.date}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < news.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          
          {category === 'insurance' && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                AI-Generated Strategic Recommendations
              </Typography>
              {loadingRec ? (
                <Typography>Generating recommendations...</Typography>
              ) : (
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {recommendations}
                </Typography>
              )}
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default NewsSection;
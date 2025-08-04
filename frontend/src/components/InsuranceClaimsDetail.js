import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Card, CardContent, Box, CircularProgress, Chip } from '@mui/material';

const InsuranceClaimsDetail = () => {
  const [claimsData, setClaimsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaimsData();
  }, []);

  const fetchClaimsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/insurance-claims');
      const data = await response.json();
      setClaimsData(data.claims_details);
    } catch (error) {
      console.error('Error fetching claims data:', error);
    } finally {
      setLoading(false);
    }
  };

  const recommendations = [
    {
      title: 'Implement AI-Powered Claims Processing',
      description: 'Deploy machine learning algorithms for automated claim validation and processing',
      benefits: ['Reduce processing time by 60%', 'Cut operational costs by $2.5M annually', 'Improve accuracy to 98.5%'],
      priority: 'High',
      roi: '340%'
    },
    {
      title: 'Digital-First Customer Experience',
      description: 'Launch mobile app with photo claim submission and real-time tracking',
      benefits: ['Increase customer satisfaction by 35%', 'Reduce call center volume by 45%', 'Speed up claim submission by 70%'],
      priority: 'High',
      roi: '280%'
    },
    {
      title: 'Predictive Fraud Detection System',
      description: 'Integrate advanced analytics to identify fraudulent claims before processing',
      benefits: ['Prevent $4.2M in fraudulent payouts', 'Reduce investigation time by 50%', 'Improve detection rate to 92%'],
      priority: 'Medium',
      roi: '450%'
    },
    {
      title: 'Blockchain-Based Claim Verification',
      description: 'Implement distributed ledger for transparent and secure claim processing',
      benefits: ['Eliminate duplicate claims', 'Reduce disputes by 80%', 'Ensure 100% audit trail'],
      priority: 'Medium',
      roi: '220%'
    },
    {
      title: 'IoT Integration for Real-Time Risk Assessment',
      description: 'Connect with smart devices for proactive risk monitoring and prevention',
      benefits: ['Reduce claim frequency by 25%', 'Enable preventive interventions', 'Lower premium costs by 15%'],
      priority: 'Low',
      roi: '190%'
    },
    {
      title: 'Automated Settlement Platform',
      description: 'Deploy smart contracts for instant settlements of verified claims',
      benefits: ['Process 80% of claims instantly', 'Reduce settlement time to 2 hours', 'Cut administrative costs by 40%'],
      priority: 'High',
      roi: '320%'
    }
  ];

  const marketBenefits = [
    { category: 'Cost Reduction', impact: '$8.5M annually', description: 'Through automation and fraud prevention' },
    { category: 'Customer Experience', impact: '4.8/5 satisfaction', description: 'Digital-first approach with instant updates' },
    { category: 'Processing Speed', impact: '85% faster', description: 'AI-powered validation and automated workflows' },
    { category: 'Fraud Prevention', impact: '$4.2M saved', description: 'Advanced analytics and pattern recognition' },
    { category: 'Market Share', impact: '+12% growth', description: 'Superior service quality and competitive pricing' },
    { category: 'Operational Efficiency', impact: '60% improvement', description: 'Streamlined processes and reduced manual work' }
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Insurance Claims Detailed Analysis
        </Typography>
      </Grid>

      {/* Strategic Recommendations */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Strategic Recommendations for Claims Management
          </Typography>
          <Grid container spacing={3}>
            {recommendations.map((rec, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%', border: rec.priority === 'High' ? '2px solid #4caf50' : '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{rec.title}</Typography>
                      <Chip 
                        label={`${rec.priority} Priority`} 
                        color={rec.priority === 'High' ? 'error' : rec.priority === 'Medium' ? 'warning' : 'default'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {rec.description}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>Key Benefits:</Typography>
                    {rec.benefits.map((benefit, idx) => (
                      <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                        • {benefit}
                      </Typography>
                    ))}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Expected ROI:</Typography>
                      <Chip label={rec.roi} color="success" size="small" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      {/* Market Benefits Overview */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Expected Market Benefits & Impact
          </Typography>
          <Grid container spacing={2}>
            {marketBenefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
                  <Typography variant="h4" color="primary.main" gutterBottom>
                    {benefit.impact}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {benefit.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      {/* Implementation Roadmap */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Implementation Roadmap
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="subtitle2">Phase 1 (0-6 months)</Typography>
              <Typography variant="body2">• AI Claims Processing</Typography>
              <Typography variant="body2">• Digital Customer Platform</Typography>
              <Typography variant="caption">Expected savings: $3.2M</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
              <Typography variant="subtitle2">Phase 2 (6-12 months)</Typography>
              <Typography variant="body2">• Fraud Detection System</Typography>
              <Typography variant="body2">• Blockchain Integration</Typography>
              <Typography variant="caption">Expected savings: $4.8M</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
              <Typography variant="subtitle2">Phase 3 (12-18 months)</Typography>
              <Typography variant="body2">• IoT Risk Assessment</Typography>
              <Typography variant="body2">• Automated Settlements</Typography>
              <Typography variant="caption">Expected savings: $2.5M</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Success Metrics */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Success Metrics & KPIs
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'grey.50' }}>
                <Typography variant="body2">Customer Satisfaction Target</Typography>
                <Chip label="4.8/5" color="success" size="small" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'grey.50' }}>
                <Typography variant="body2">Processing Time Reduction</Typography>
                <Chip label="85%" color="primary" size="small" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'grey.50' }}>
                <Typography variant="body2">Cost Savings Target</Typography>
                <Chip label="$10.5M" color="success" size="small" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'grey.50' }}>
                <Typography variant="body2">Fraud Prevention Rate</Typography>
                <Chip label="92%" color="warning" size="small" />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Competitive Advantages */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Competitive Advantages & Market Positioning
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                <Typography variant="h6" gutterBottom>Technology Leadership</Typography>
                <Typography variant="body2">First-to-market AI claims processing gives 18-month competitive advantage</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                <Typography variant="h6" gutterBottom>Cost Efficiency</Typography>
                <Typography variant="body2">40% lower operational costs enable competitive pricing and higher margins</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
                <Typography variant="h6" gutterBottom>Customer Experience</Typography>
                <Typography variant="body2">Superior digital experience drives 25% higher customer retention</Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default InsuranceClaimsDetail;
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Divider,
  Chip,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  // Mock data - would come from your backend
  const subscriptionData = {
    plan: 'Standard Plan',
    status: 'Active',
    renewalDate: '2024-12-31',
    usersUsed: 3,
    usersLimit: 5,
    storageUsed: 12,
    storageLimit: 20,
    features: [
      'Advanced Analytics',
      'Priority Support',
      'API Access',
      'Custom Integrations',
    ],
  };

  const recentActivities = [
    { type: 'User Added', description: 'New team member: John Doe', date: '2 days ago' },
    { type: 'Storage Update', description: 'Storage usage increased by 2GB', date: '5 days ago' },
    { type: 'Payment', description: 'Monthly payment processed', date: '1 week ago' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #2C3333 0%, #1A1F1F 100%)',
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
            }}
          >
            Welcome back! Here's an overview of your subscription.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {/* Usage Statistics */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid rgba(114, 47, 55, 0.2)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Resource Usage
              </Typography>
              <Grid container spacing={3}>
                {/* Users Usage */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Team Members
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(subscriptionData.usersUsed / subscriptionData.usersLimit) * 100}
                      sx={{ mb: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {subscriptionData.usersUsed} of {subscriptionData.usersLimit} users
                    </Typography>
                  </Box>
                </Grid>

                {/* Storage Usage */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Storage
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(subscriptionData.storageUsed / subscriptionData.storageLimit) * 100}
                      sx={{ mb: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {subscriptionData.storageUsed}GB of {subscriptionData.storageLimit}GB used
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Recent Activity */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid rgba(114, 47, 55, 0.2)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Recent Activity
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/user/activity')}
                  sx={{ textTransform: 'none' }}
                >
                  View All
                </Button>
              </Box>
              {recentActivities.map((activity, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {activity.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {activity.date}
                    </Typography>
                  </Box>
                  {index < recentActivities.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Subscription Info */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid rgba(114, 47, 55, 0.2)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Subscription
                </Typography>
                <Chip
                  label={subscriptionData.status}
                  color="success"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Current Plan
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {subscriptionData.plan}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Renewal Date
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {new Date(subscriptionData.renewalDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/plans')}
                sx={{
                  textTransform: 'none',
                  py: 1,
                  fontWeight: 600,
                }}
              >
                Upgrade Plan
              </Button>
            </Paper>

            {/* Quick Actions */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid rgba(114, 47, 55, 0.2)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {[
                  { icon: <ReceiptIcon />, label: 'Billing', path: '/user/orders' },
                  { icon: <SettingsIcon />, label: 'Settings', path: '/user/settings' },
                  { icon: <HelpIcon />, label: 'Support', path: '/support' },
                ].map((action, index) => (
                  <Grid item xs={12} key={index}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={action.icon}
                      onClick={() => navigate(action.path)}
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        py: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UserDashboard; 
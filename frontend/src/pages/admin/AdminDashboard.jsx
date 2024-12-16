import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const organizationData = {
    name: 'Acme Corporation',
    plan: 'Standard Plan',
    status: 'Active',
    renewalDate: '2024-12-31',
    totalUsers: 15,
    activeUsers: 12,
    storageUsed: 12,
    storageLimit: 20,
    lastBillingAmount: 74985,
  };


  const quickStats = [
    {
      title: 'Total Users',
      value: organizationData.totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: '+3 this month',
    },
    {
      title: 'Storage Used',
      value: `${organizationData.storageUsed}GB`,
      icon: <StorageIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: '60% utilized',
    },
    {
      title: 'Active Users',
      value: organizationData.activeUsers,
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: '80% active rate',
    },
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
            Admin Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
            }}
          >
            This Dashboard contains sample Data for the Admin Panel
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid rgba(114, 47, 55, 0.2)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'text.secondary',
                    fontStyle: 'italic',
                  }}
                >
                  {stat.change}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
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
                  Organization Overview
                </Typography>
                <Chip
                  label={organizationData.status}
                  color="success"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Current Plan
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {organizationData.plan}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Renewal Date
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {new Date(organizationData.renewalDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Last Billing Amount
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      ₹{organizationData.lastBillingAmount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Active Users
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {organizationData.activeUsers} / {organizationData.totalUsers}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/admin/manage-users')}
                  startIcon={<GroupAddIcon />}
                  sx={{
                    mr: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Manage Users
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin/dashboard')}
                  startIcon={<SettingsIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Organization Settings
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
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
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Resource Usage
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    User Licenses
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(organizationData.activeUsers / organizationData.totalUsers) * 100}
                  sx={{ mb: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {organizationData.activeUsers} of {organizationData.totalUsers} licenses used
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Storage
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(organizationData.storageUsed / organizationData.storageLimit) * 100}
                  sx={{ mb: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {organizationData.storageUsed}GB of {organizationData.storageLimit}GB used
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AdminDashboard; 
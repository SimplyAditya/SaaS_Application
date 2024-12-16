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
  Card,
  CardContent,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

function SuperAdminDashboard() {
  const navigate = useNavigate();

  // Mock data - would come from your backend
  const platformData = {
    totalOrganizations: 25,
    activeOrganizations: 22,
    totalUsers: 450,
    activeUsers: 380,
    totalRevenue: 1249975,
    storageUsed: 250,
    storageLimit: 500,
  };

  const recentActivities = [
    { type: 'Organization Added', description: 'New organization: Tech Solutions Ltd', date: '1 hour ago' },
    { type: 'Plan Update', description: 'Global Systems upgraded to Plus Plan', date: '3 hours ago' },
    { type: 'System Alert', description: 'Storage usage reached 50%', date: '1 day ago' },
  ];

  const quickStats = [
    {
      title: 'Total Organizations',
      value: platformData.totalOrganizations,
      icon: <BusinessIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: '+3 this month',
    },
    {
      title: 'Total Users',
      value: platformData.totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: '+45 this month',
    },
    {
      title: 'Monthly Revenue',
      value: `₹${platformData.totalRevenue.toLocaleString()}`,
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: '+12% vs last month',
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
            Super Admin Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
            }}
          >
            All this is sample data for viewing purpose only
          </Typography>
        </Box>

        {/* Quick Stats */}
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
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {/* Platform Overview */}
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
                Platform Overview
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Active Organizations
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {platformData.activeOrganizations} / {platformData.totalOrganizations}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(platformData.activeOrganizations / platformData.totalOrganizations) * 100}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Active Users
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {platformData.activeUsers} / {platformData.totalUsers}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(platformData.activeUsers / platformData.totalUsers) * 100}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Platform Storage
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {platformData.storageUsed}GB / {platformData.storageLimit}GB
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(platformData.storageUsed / platformData.storageLimit) * 100}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Monthly Revenue Target
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      ₹{platformData.totalRevenue.toLocaleString()} / ₹1,500,000
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(platformData.totalRevenue / 1500000) * 100}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/superadmin/manage-organizations')}
                  startIcon={<AddBusinessIcon />}
                  sx={{
                    mr: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Manage Organizations
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/superadmin/dashboard')}
                  startIcon={<SettingsIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Platform Settings
                </Button>
              </Box>
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
                  onClick={() => navigate('/superadmin/dashboard')}
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
            {/* Plan Distribution */}
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
                Plan Distribution
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Basic Plan</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    8 organizations
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={32}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Standard Plan</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    12 organizations
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={48}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Plus Plan</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    5 organizations
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={20}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/superadmin/manage-plans')}
                sx={{ mt: 3, textTransform: 'none', fontWeight: 600 }}
              >
                Manage Plans
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
                  { icon: <AddBusinessIcon />, label: 'Add Organization', path: '/superadmin/manage-organizations/new' },
                  // { icon: <BarChartIcon />, label: 'Analytics', path: '/superadmin/analytics' },
                  { icon: <SettingsIcon />, label: 'Settings', path: '/superadmin/dashboard' },
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

export default SuperAdminDashboard; 
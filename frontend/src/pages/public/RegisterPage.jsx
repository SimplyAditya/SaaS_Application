import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Chip,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth(); // Destructure register from context
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    planId: '675f52e8738b50a70c555f11',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      // organizationName: formData.organizationName,
      role: 'User', // Set default role
      planId: formData.planId,
    };

    const result = await register(userData);
    // console.log(result)
    if (result.success) {
      navigate(result.defaultPath);
    } else {
      setError(result.error);
    }
  };

  return (
    <Box
    sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      background: `linear-gradient(135deg, rgba(114, 47, 55, 0.6) 0%, rgba(44, 51, 51, 0.6) 100%), url(https://plus.unsplash.com/premium_photo-1661414415246-3e502e2fb241?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1920)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      pt: { xs: 2, md: 4 },
      pb: { xs: 2, md: 4 },
    }}
  >
  
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          {/* Left side - Registration Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    p: 1,
                    mb: 1,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <LockOutlinedIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Create Account
                </Typography>
                <Typography color="text.secondary" variant="subtitle1" sx={{ mb: 2 }}>
                  Start your 14-day free trial
                </Typography>
                <Divider sx={{ width: '100%', mb: 2 }}>
                  <Chip label="Register Now" color="primary" size="small" />
                </Divider>
              </Box>

              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      required
                      fullWidth
                      size="small"
                      value={formData.firstName}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" sx={{ fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      required
                      fullWidth
                      size="small"
                      value={formData.lastName}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" sx={{ fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <TextField
                      name="organizationName"
                      label="Organization Name"
                      required
                      fullWidth
                      size="small"
                      value={formData.organizationName}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon color="primary" sx={{ fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email Address"
                      required
                      fullWidth
                      size="small"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" sx={{ fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="Password"
                      required
                      fullWidth
                      size="small"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm Password"
                      required
                      fullWidth
                      size="small"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                    },
                  }}
                >
                  Create Account
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right side - Info Panel */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                p: 3,
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Why Choose Our Platform?
              </Typography>
              <Box sx={{ mb: 2 }}>
                {[
                  '14-day free trial with full access',
                  'No credit card required',
                  'Enterprise-grade security',
                  '24/7 customer support',
                  'Cancel anytime',
                ].map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1.5,
                      p: 1.5,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateX(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        fontSize: '0.9rem',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Link, Paper, Box, Typography, Alert } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      console.log(result);
      if (result.success) {
        // Always go to the default path for the user's role
        navigate(result.defaultPath, { replace: true });
      } else {
        setError(result.error || 'Failed to log in');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      

      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          width: { xs: '90%', sm: '450px', md: '400px' },
          maxWidth: '500px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <BusinessIcon
            sx={{
              fontSize: 40,
              mb: 1,
              color: 'primary.main',
              p: 1,
              borderRadius: '50%',
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
            }}
          />
          <Typography component="h2" variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Sign In to Your Account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, '& .MuiTextField-root': { mb: 2 } }}>
          <TextField
            label="Email Address"
            fullWidth
            required
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
                padding: '14px 16px',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
                padding: '14px 16px',
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2, mb: 3, py: 1.5, fontSize: '1rem', fontWeight: 600, textTransform: 'none', boxShadow: 2 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Don't have an account? Create one!
            </Link>
          </Box>

          {/* Demo Accounts */}
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Demo Accounts:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Super Admin: superadmin@example.com / password
              </Typography>
              {/* <Typography variant="caption" color="text.secondary">
                Admin: admin@example.com / password
              </Typography>
              <Typography variant="caption" color="text.secondary">
                User: user@example.com / password
              </Typography> */}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;

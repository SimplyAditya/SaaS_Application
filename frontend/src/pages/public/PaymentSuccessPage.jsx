import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('planId');
  const userId = searchParams.get('userId');
  // Assume planId is passed via location state
  // const planId = location.state?.planId;

  useEffect(() => {
    const updateUserPlan = async () => {
      if (!planId || !userId) {
        setError('Invalid plan or user.');
        setLoading(false);
        return;
      }

      try {
        await axios.put('http://localhost:5100/api/users/update-plan', {
          userId: userId,
          newPlanId: planId,
        });

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update plan.');
        setLoading(false);
      }
    };

    updateUserPlan();
  }, [planId, user]);

  const handleCloseError = () => {
    setError(null);
  };

  const handleGoHome = () => {
    navigate('/dashboard'); // Adjust the path as needed
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        {loading ? (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Processing your payment and updating your plan...
            </Typography>
          </>
        ) : error ? (
          <>
            <Typography variant="h6" color="error" gutterBottom>
              {error}
            </Typography>
            <Button variant="contained" onClick={handleGoHome}>
              Go to Dashboard
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Payment Successful!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your subscription plan has been updated successfully.
            </Typography>
            <Button variant="contained" onClick={handleGoHome}>
              Go to Dashboard
            </Button>
          </>
        )}

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseError} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default PaymentSuccessPage;
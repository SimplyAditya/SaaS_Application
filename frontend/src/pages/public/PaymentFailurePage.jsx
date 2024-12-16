import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import SupportIcon from '@mui/icons-material/Support';

function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #2C3333 0%, #1A1F1F 100%)',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            border: '1px solid rgba(114, 47, 55, 0.2)',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#d32f2f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 3,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 48, color: 'white' }} />
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Payment Failed
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            We couldn't process your payment. Don't worry, no charges were made.
          </Typography>

          <Alert severity="error" sx={{ mb: 4, mx: 'auto', maxWidth: 500 }}>
            The transaction was declined by your bank. Please try again with a different
            payment method or contact your bank for more information.
          </Alert>

          <Grid container spacing={3} sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<RefreshIcon />}
                onClick={() => navigate('/checkout')}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                Try Again
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<SupportIcon />}
                onClick={() => window.location.href = 'mailto:support@example.com'}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                Contact Support
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, p: 3, backgroundColor: 'rgba(114, 47, 55, 0.1)', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Common Reasons for Payment Failure
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              • Insufficient funds in the account<br />
              • Incorrect card details entered<br />
              • Transaction limit exceeded<br />
              • Bank security protocols
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If you continue to experience issues, please contact your bank or reach out to our
              support team for assistance.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default PaymentFailurePage; 
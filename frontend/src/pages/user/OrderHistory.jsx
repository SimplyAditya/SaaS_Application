import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';

function OrderHistory() {
  const navigate = useNavigate();

  // Mock data - would come from your backend
  const orders = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      plan: 'Standard Plan',
      amount: 24995,
      status: 'Paid',
      users: 5,
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      plan: 'Standard Plan',
      amount: 24995,
      status: 'Paid',
      users: 5,
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      plan: 'Basic Plan',
      amount: 14995,
      status: 'Paid',
      users: 3,
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-15',
      plan: 'Basic Plan',
      amount: 14995,
      status: 'Paid',
      users: 3,
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
            Order History
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
            }}
          >
            View and download your past invoices
          </Typography>
        </Box>

        {/* Main Content */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            border: '1px solid rgba(114, 47, 55, 0.2)',
          }}
        >
          {/* Search and Filter Bar */}
          <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <TextField
              placeholder="Search orders..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: 300 }}
            />
          </Box>

          {/* Orders Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Invoice ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Users</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ReceiptIcon sx={{ mr: 1, color: 'primary.main' }} />
                        {order.id}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.plan}</TableCell>
                    <TableCell>{order.users} users</TableCell>
                    <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={order.status === 'Paid' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          // Handle invoice download
                          console.log('Downloading invoice:', order.id);
                        }}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Summary Section */}
          <Box sx={{ p: 3, backgroundColor: 'rgba(114, 47, 55, 0.1)' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Need help with billing?
                </Typography>
                <Typography variant="body2">
                  Contact our support team for assistance
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/support')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Contact Support
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default OrderHistory; 
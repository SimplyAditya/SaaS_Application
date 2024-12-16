import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function CartPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Replace mockCart with cartItems state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation(); // Get location state
  const planId = location.state?.planId; // Retrieve planId from navigation state

  useEffect(() => {
    const fetchCart = async () => {
      if (!planId) return;
      try {
        const response = await axios.get(`http://localhost:5100/api/plans/${planId}`); // Fetch plan details
        // console.log(response.data);
        const plan = response.data;
        setCartItems([
          {
            id: plan._id,
            name: plan.name,
            price: plan.price, // Store price as a number
            period: `${plan.daysValidity} days, Per User`,
            quantity: plan.userLimit,
            planId: plan._id,
            features: plan.description, // Ensure features are part of the plan data
          },
        ]);
      } catch (err) {
        setError('Failed to fetch plan details');
      }
    };

    fetchCart();
  }, [planId]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5100/api/payments', {
        planId: cartItems[0].planId, // Assuming single item for simplicity
        // userCount: cartItems[0].quantity,
        email: user.email,
        userId: user._id,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during checkout');
      setIsLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const dashboardPath = user?.role === 'admin' ? '/admin/dashboard' 
                     : user?.role === 'superadmin' ? '/superadmin/dashboard'
                     : '/user/dashboard';

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100vw',
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar position="fixed" sx={{ bgcolor: 'background.paper', color: 'text.primary' }} elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: 'primary.main', flexGrow: 0, mr: 4 }}>
            Shopping Cart
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1}>
            <Button
              color="inherit"
              onClick={() => navigate(dashboardPath)}
              sx={{
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(114, 47, 55, 0.08)',
                },
              }}
            >
              Back to Dashboard
            </Button>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 12, pb: 8 }}>
        <Container maxWidth="lg">
          {cartItems.length > 0 ? (
            <Grid container spacing={4}>
              {/* Cart Items */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
                  <Typography variant="h6" sx={{ mb: 3 }}>Cart Items</Typography>
                  <List>
                    {cartItems.map((item) => (
                      <React.Fragment key={item.id}>
                        <ListItem alignItems="flex-start" sx={{ py: 3 }}>
                          <ListItemText
                            primary={
                              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                  {item.period}
                                </Typography>
                                {/* Display features if available */}
                                {item.features && (
                                  <List dense>
                                    {item.features.split(',').map((feature, index) => (
                                      <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemText 
                                          primary={feature.trim()}
                                          primaryTypographyProps={{
                                            variant: 'body2',
                                            color: 'text.secondary'
                                          }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                )}
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                              <Typography variant="h6" color="primary">
                                {`INR ${item.price * item.quantity}`}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2">
                                  Quantity: {item.quantity}
                                </Typography>
                                <IconButton 
                                  edge="end" 
                                  onClick={() => handleRemoveItem(item.id)}
                                  sx={{ color: 'error.main' }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Order Summary */}
              <Grid item xs={12} md={4}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Summary
                    </Typography>
                    <List>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText primary="Subtotal" />
                        <Typography variant="body1">
                          {`INR ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText primary="Tax (18%)" />
                        <Typography variant="body1">
                          {`INR ${Math.round(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.18)}`}
                        </Typography>
                      </ListItem>
                      <Divider sx={{ my: 2 }} />
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText 
                          primary={
                            <Typography variant="h6">
                              Total
                            </Typography>
                          }
                        />
                        <Typography variant="h6" color="primary">
                          {`INR ${Math.round(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.18)}`}
                        </Typography>
                      </ListItem>
                    </List>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleCheckout}
                      disabled={isLoading}
                      sx={{ mt: 2 }}
                    >
                      {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Add some plans to your cart to proceed with the purchase.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/plans')}
              >
                Browse Plans
              </Button>
            </Paper>
          )}
        </Container>
      </Box>

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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default CartPage;
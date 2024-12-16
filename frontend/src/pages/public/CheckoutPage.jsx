import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Stack,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as UPIIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Mock order data - In a real app, this would come from your cart/order context
const mockOrder = {
  items: [
    {
      name: 'Standard Plan',
      price: 'INR 4999',
      period: 'Per Year, Per User',
      quantity: 5,
    }
  ],
  summary: {
    subtotal: 'INR 24,995',
    tax: 'INR 4,499',
    total: 'INR 29,494',
  }
};

const steps = ['Cart', 'Payment Details', 'Confirmation'];

function CheckoutPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingName: '',
    billingEmail: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
  });

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
    navigate('/cart');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you would typically process the payment
    // After successful payment, navigate to PaymentSuccessPage with planId
    navigate('/payment/success', { state: { planId: cartItems[0].planId } });
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
            Checkout
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
          <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={4}>
            {/* Payment Form */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>
                <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CreditCardIcon sx={{ mr: 1 }} />
                          Credit/Debit Card
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="netbanking"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BankIcon sx={{ mr: 1 }} />
                          Net Banking
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="upi"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <UPIIcon sx={{ mr: 1 }} />
                          UPI
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {paymentMethod === 'card' && (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Name on Card"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Card Number"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Expiry Date"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="CVV"
                          name="cvv"
                          type="password"
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>

                    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                      Billing Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Full Name"
                          name="billingName"
                          value={formData.billingName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          name="billingEmail"
                          type="email"
                          value={formData.billingEmail}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Address"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="City"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="State"
                          name="billingState"
                          value={formData.billingState}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="ZIP Code"
                          name="billingZip"
                          value={formData.billingZip}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
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
                    {mockOrder.items.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText
                            primary={item.name}
                            secondary={`${item.quantity} × ${item.period}`}
                          />
                          <Typography variant="body1">
                            {item.price}
                          </Typography>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary="Subtotal" />
                      <Typography variant="body1">
                        {mockOrder.summary.subtotal}
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary="Tax (18%)" />
                      <Typography variant="body1">
                        {mockOrder.summary.tax}
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
                        {mockOrder.summary.total}
                      </Typography>
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                  >
                    Complete Payment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

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

export default CheckoutPage;
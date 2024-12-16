import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function ManageOrganizations() {
  const navigate = useNavigate();
  const { token, register } = useAuth(); // Destructure register from context
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [organizations, setOrganizations] = useState([]); // Dynamic data
  const [plans, setPlans] = useState([]); // New state for plans
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organizations
        const orgResponse = await axios.get('http://localhost:5100/api/users/organizations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrganizations(orgResponse.data);

        // Fetch plans
        const plansResponse = await axios.get('http://localhost:5100/api/plans', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(plansResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleAddOrg = () => {
    setSelectedOrg(null);
    setOpenDialog(true);
  };

  const handleEditOrg = (org) => {
    setSelectedOrg(org);
    setOpenDialog(true);
  };

  const handleDeleteOrg = async (orgId) => {
    try {
      await axios.delete(`http://localhost:5100/api/users/${orgId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrganizations(organizations.filter((org) => org.id !== orgId));
    } catch (err) {
      console.error('Error deleting organization:', err);
      setError('Failed to delete organization');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrg(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Collect data from form
    const formData = new FormData(event.target);
    const orgData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      planId: formData.get('planId'),
      role: 'User', // Set role to 'User' for organizations
      // Add other necessary fields if required
    };

    try {
      const response = await register(orgData);
      if (response.success) {
        // Optionally, fetch the updated list of organizations
        const fetchedOrganizations = await axios.get('http://localhost:5100/api/users/organizations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrganizations(fetchedOrganizations.data);
        handleCloseDialog();
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.error('Error submitting organization:', err);
      setError('Failed to submit organization');
    }
  };

  const OrganizationDialog = ({ open, onClose, org }) => (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{org ? 'Edit Organization' : 'Add New Organization'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                defaultValue={org?.firstName || ''}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                defaultValue={org?.lastName || ''}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                defaultValue={org?.email || ''}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                required
                disabled={!!org} // Disable password field when editing
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                required
                disabled={!!org} // Disable confirm password field when editing
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Plan</InputLabel>
                <Select
                  name="planId"
                  defaultValue={org?.planId || ''}
                  label="Plan"
                >
                  {/* Populate plans dynamically */}
                  {plans.map((plan) => (
                    <MenuItem key={plan._id} value={plan._id}>
                      {plan.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Add other necessary fields from RegisterPage if needed */}
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {org ? 'Save Changes' : 'Add Organization'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

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
            Manage Organizations
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
            }}
          >
            View and manage all organizations on the platform
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
          {/* Toolbar */}
          <Box
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <TextField
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddBusinessIcon />}
              onClick={handleAddOrg}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Add Organization
            </Button>
          </Box>

          {/* Tabs */}
          {/* 
          Uncomment and define `tabValue` if you decide to use tabs in the future.
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              px: 3,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tab label="All Organizations" />
            <Tab label="Active" />
            <Tab label="Trial" />
            <Tab label="Inactive" />
          </Tabs>
          */}

          {/* Organizations Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Organization</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Users</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Storage Used</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Last Billing</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Billing</TableCell>
                  {/* <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8}>Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ color: 'error.main' }}>
                      {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  organizations
                    .filter((org) => {
                      const matchesSearch = org.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                      // Removed tabValue references
                      return matchesSearch;
                    })
                    .map((org) => (
                      <TableRow key={org.id} hover>
                        <TableCell>{org.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={org.plan}
                            color="secondary"
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{org.users}</TableCell>
                        <TableCell>{org.storage}</TableCell>
                        <TableCell>{org.lastBilling}</TableCell>
                        <TableCell>
                          <Chip
                            label={org.status}
                            color={org.status === 'Active' ? 'success' : org.status === 'Trial' ? 'info' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={org.billingStatus}
                            color={
                              org.billingStatus === 'Paid'
                                ? 'success'
                                : org.billingStatus === 'Trial'
                                ? 'info'
                                : 'error'
                            }
                            size="small"
                          />
                        </TableCell>
                        {/* <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/superadmin/organizations/${org.id}`)}
                            sx={{ color: 'primary.main' }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEditOrg(org)}
                            sx={{ color: 'primary.main' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteOrg(org.id)}
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Dialog */}
        <OrganizationDialog
          open={openDialog}
          onClose={handleCloseDialog}
          org={selectedOrg}
        />
      </Container>
    </Box>
  );
}

export default ManageOrganizations;
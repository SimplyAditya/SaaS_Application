import React, { useState, useEffect, useContext } from 'react';
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
  InputAdornment,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import { useAuth } from '../../contexts/AuthContext'; // Use useAuth instead of AuthContext

function ManageUsers() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth(); // Use useAuth to get currentUser
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]); // Add state for users
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5100/api/users/otherUsers?userId=${currentUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users.');
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleAddUser = () => {
    setOpenAddDialog(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleDeleteUser = (userId) => {
    // Handle user deletion
    console.log('Delete user:', userId);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleSubmitUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: 'User', // Always set to User
      subscriptionAdmin: false, // Always false for created users
      referenceUserId: currentUser._id, // Include reference user ID
      plan: currentUser.plan,
      valid: currentUser.valid,
    };

    try {
      const token = localStorage.getItem('token');
       const responseForCreate = await axios.post('http://localhost:5100/api/users/', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleCloseDialog();
      // Refresh users list
      const response = await axios.get(`http://localhost:5100/api/users/otherUsers?userId=${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user.');
    }
  };

  const UserDialog = ({ open, onClose, user }) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmitUser}>
        <DialogTitle>
          {user ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Full Name"
                defaultValue={user?.name}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                defaultValue={user?.email}
                fullWidth
                required
              />
            </Grid>
            {!user && (
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {user ? 'Save Changes' : 'Add User'}
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
            Manage Users
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
            }}
          >
            Add, edit, or remove users from your organization
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
              placeholder="Search users..."
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
              startIcon={<GroupAddIcon />}
              onClick={handleAddUser}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Add User
            </Button>
          </Box>

          {/* Users Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  {/* <TableCell sx={{ fontWeight: 600 }}>Last Active</TableCell> */}
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : users.length > 0 ? (
                  users
                    .filter(
                      (user) =>
                        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((user) => (
                      <TableRow key={user._id} hover>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip
                            label= {user.subscriptionAdmin ? 'Admin' : 'User'}
                            color={user.subscriptionAdmin ? 'primary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="Active"
                            color='sucess'
                            size="small"
                          />
                        </TableCell>
                        
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleEditUser(user)}
                            sx={{ color: 'primary.main' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteUser(user._id)}
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Dialogs */}
        <UserDialog
          open={openAddDialog}
          onClose={handleCloseDialog}
          user={null}
        />
        <UserDialog
          open={openEditDialog}
          onClose={handleCloseDialog}
          user={selectedUser}
        />
      </Container>
    </Box>
  );
}

export default ManageUsers;
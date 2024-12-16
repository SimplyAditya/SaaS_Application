import React, { useState, useEffect } from "react";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import axios from "axios"; // Import axios

function ManagePlans() {
  const { token } = useAuth(); // Get token from AuthContext
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]); // Replace mock data
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(""); // Add error state

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5100/api/plans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data);
        setPlans(response.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [token]); // Dependency array includes token

  const handleAddPlan = () => {
    setSelectedPlan(null);
    setOpenDialog(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setOpenDialog(true);
  };

  const handleDeletePlan = async (planId) => {
    try {
      await axios.delete(`http://localhost:5100/api/plans/${planId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(plans.filter((plan) => plan._id !== planId));
    } catch (err) {
      console.error("Error deleting plan:", err);
      setError("Failed to delete plan");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlan(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Collect data from form
    const formData = new FormData(event.target);
    const planData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      userLimit: parseInt(formData.get("userLimit"), 10),
      description: formData.get("description"),
      daysValidity: parseInt(formData.get("daysValidity"), 10) || 0,
    };

    try {
      if (selectedPlan) {
        // Update existing plan
        const response = await axios.put(
          `http://localhost:5100/api/plans/${selectedPlan._id}`, // Use plan ID from URL
          planData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlans(
          plans.map((plan) =>
            plan._id === selectedPlan._id ? response.data.plan : plan
          )
        );
      } else {
        // Create new plan
        const response = await axios.post(
          "http://localhost:5100/api/plans",
          planData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlans([...plans, response.data.plan]);
      }
      handleCloseDialog();
    } catch (err) {
      console.error("Error submitting plan:", err);
      setError("Failed to submit plan");
    }
  };

  const PlanDialog = ({ open, onClose, plan }) => (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{plan ? "Edit Plan" : "Add New Plan"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Plan Name"
                defaultValue={plan?.name}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price"
                type="number"
                defaultValue={plan?.price}
                fullWidth
               
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Billing Cycle</InputLabel>
                <Select
                  name="billingCycle"
                  defaultValue={plan?.billingCycle || "Yearly"}
                  label="Billing Cycle"
                >
                  {/* <MenuItem value="Trial">Trial</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem> */}
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="daysValidity"
                label="Validity (days)"
                type="number"
                defaultValue={plan?.daysValidity || 0}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="userLimit"
                label="Max Users"
                type="number"
                defaultValue={plan?.userLimit}
                fullWidth
                required
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                name="storage"
                label="Storage (GB)"
                type="number"
                defaultValue={plan?.storage}
                fullWidth
                required
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                defaultValue={plan?.description}
                fullWidth
                required
                helperText="Enter description for the plan"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  defaultValue={plan?.status || "Active"}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  {/* <MenuItem value="Inactive">Inactive</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {plan ? "Save Changes" : "Add Plan"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #2C3333 0%, #1A1F1F 100%)",
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
              color: "white",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Manage Plans
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mb: 4,
            }}
          >
            Create and manage subscription plans
          </Typography>
        </Box>

        {/* Main Content */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            border: "1px solid rgba(114, 47, 55, 0.2)",
          }}
        >
          {/* Toolbar */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "flex-end",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddPlan}
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Add Plan
            </Button>
          </Box>

          {/* Plans Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Plan Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Billing</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Users</TableCell>
                  {/* <TableCell sx={{ fontWeight: 600 }}>Storage</TableCell> */}
                  <TableCell sx={{ fontWeight: 600 }}>Total Enrolled</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7}>Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ color: "error.main" }}>
                      {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  plans.map((plan) => (
                    <TableRow key={plan._id} hover>
                      <TableCell>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {plan.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {plan.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {plan.price === 0
                          ? "Free"
                          : `₹${plan.price.toLocaleString()}`}
                      </TableCell>
                      <TableCell>{plan.daysValidity}</TableCell>
                      <TableCell>
                        {plan.userLimit === 999999
                          ? "Unlimited"
                          : plan.userLimit}
                      </TableCell>
                      {/* <TableCell>{plan.storage}GB</TableCell> */}
                      <TableCell>{plan.totalEnrolled || 0}</TableCell>
                      <TableCell>
                        <Chip
                          label="Active"
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleEditPlan(plan)}
                          sx={{ color: "primary.main" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeletePlan(plan._id)}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Dialog */}
        <PlanDialog
          open={openDialog}
          onClose={handleCloseDialog}
          plan={selectedPlan}
        />
      </Container>
    </Box>
  );
}

export default ManagePlans;

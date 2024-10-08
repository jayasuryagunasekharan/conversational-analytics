import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Box, Typography, TextField, Button, Paper, 
  Avatar, CssBaseline, Link, Grid, Zoom, FormControlLabel, Checkbox
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminKey, setAdminKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      console.log("IM_HERE before response");
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, 
        { 
          username, 
          password,
          is_admin: isAdmin,
          admin_key: isAdmin ? adminKey : undefined
        },
      );
      console.log("IM_HERE after response", response.data);
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.detail);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Paper 
            elevation={6}
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,
              background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
              borderRadius: '15px',
              animation: `${fadeIn} 0.6s ease-out`,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
                label="Register as Admin"
              />
              {isAdmin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="adminKey"
                  label="Admin Secret Key"
                  type="password"
                  id="adminKey"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, mb: 2, 
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
                  }
                }}
              >
                Register
              </Button>
              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Zoom>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
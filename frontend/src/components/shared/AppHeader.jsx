import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
} from '@mui/material';
import { Home, Logout } from '@mui/icons-material';

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 800,
              fontFamily: '"Inter", sans-serif'
            }}
          >
            MONSTRINO
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'secondary.main',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            MONSTER HIGH SOCIAL
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<Home />}
            onClick={() => navigate('/')}
            sx={{ color: 'primary.main' }}
          >
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              Home
            </Typography>
          </Button>
          <Button
            startIcon={<LogOut />}
            onClick={handleLogout}
            sx={{ color: 'primary.main' }}
          >
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              Logout
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
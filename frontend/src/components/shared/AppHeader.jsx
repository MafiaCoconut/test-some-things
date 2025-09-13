import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Divider
} from '@mui/material';
import { Home, Logout, Search, Notifications, Person, Settings, Dashboard } from '@mui/icons-material';
import { mockUserData } from '../../data/mockAppData';

const AppHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action) => {
    handleUserMenuClose();
    switch (action) {
      case 'profile':
        navigate('/user');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
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
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h4" 
            onClick={() => navigate('/')}
            sx={{ 
              color: 'primary.main',
              fontWeight: 800,
              fontFamily: '"Creepster", "Griffy", cursive',
              cursor: 'pointer',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              textShadow: '2px 2px 4px rgba(255, 105, 180, 0.3)',
              '&:hover': {
                textShadow: '2px 2px 8px rgba(255, 105, 180, 0.6)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            MONSTRINO
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'secondary.main',
              display: { xs: 'none', sm: 'block' },
              fontFamily: '"Fira Code", monospace'
            }}
          >
            MONSTER HIGH SOCIAL
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search monsters, collections, posts..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'secondary.main' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                }
              }
            }}
          />
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notifications */}
          <IconButton 
            sx={{ color: 'primary.main' }}
            onClick={() => console.log('Notifications clicked')}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Home Button */}
          <IconButton
            onClick={() => navigate('/')}
            sx={{ color: 'primary.main', display: { xs: 'none', sm: 'flex' } }}
          >
            <Home />
          </IconButton>

          {/* User Avatar Menu */}
          <IconButton onClick={handleUserMenuClick}>
            <Avatar
              src={mockUserData.currentUser.avatar}
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
                color: 'black',
                border: 2,
                borderColor: 'primary.main'
              }}
            >
              {!mockUserData.currentUser.avatar && mockUserData.currentUser.username.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: {
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'rgba(139, 95, 191, 0.3)',
                minWidth: 200
              }
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'rgba(139, 95, 191, 0.2)' }}>
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                {mockUserData.currentUser.username}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {mockUserData.currentUser.email}
              </Typography>
            </Box>
            
            <MenuItem onClick={() => handleMenuAction('profile')}>
              <Person sx={{ mr: 2, color: 'primary.main' }} />
              My Profile
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction('dashboard')}>
              <Dashboard sx={{ mr: 2, color: 'secondary.main' }} />
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction('settings')}>
              <Settings sx={{ mr: 2, color: 'info.main' }} />
              Settings
            </MenuItem>
            <Divider sx={{ borderColor: 'rgba(139, 95, 191, 0.2)' }} />
            <MenuItem onClick={() => handleMenuAction('logout')}>
              <Logout sx={{ mr: 2, color: 'error.main' }} />
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
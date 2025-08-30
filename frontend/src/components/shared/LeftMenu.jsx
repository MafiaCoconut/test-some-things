import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Box
} from '@mui/material';
import { Person, FolderOpen, People, Forum } from '@mui/icons-material';

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/user', label: 'My Page', icon: Person },
    { path: '/collections', label: 'My Collections', icon: FolderOpen },
    { path: '/friends', label: 'My Friends', icon: People },
    { path: '/groups', label: 'My Groups', icon: Forum },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          bgcolor: 'background.default',
          borderRight: 1,
          borderColor: 'rgba(139, 95, 191, 0.2)',
          mt: 8, // Account for AppBar height
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    bgcolor: isActive ? 'secondary.main' : 'transparent',
                    color: isActive ? 'white' : 'primary.main',
                    '&:hover': {
                      bgcolor: isActive ? 'secondary.main' : 'rgba(139, 95, 191, 0.2)',
                      color: 'white',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.75rem',
                      fontFamily: '"Fira Code", monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;
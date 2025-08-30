import React from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  Paper,
  Grid,
  Stack
} from '@mui/material';
import { mockUserData } from '../../data/mockAppData';

const UserHeader = () => {
  const user = mockUserData.currentUser;

  return (
    <Paper 
      sx={{ 
        bgcolor: 'rgba(139, 95, 191, 0.1)',
        borderBottom: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        borderRadius: 0,
        p: 3
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Avatar */}
        <Grid item>
          <Avatar
            src={user.avatar}
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'black'
            }}
          >
            {!user.avatar && user.username.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>

        {/* User Info */}
        <Grid item xs>
          <Typography variant="h5" sx={{ color: 'white', mb: 0.5 }}>
            {user.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {user.bio}
          </Typography>
        </Grid>

        {/* Stats */}
        <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
          <Stack direction="row" spacing={4}>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {user.stats.collections}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Collections
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {user.stats.dolls}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Dolls
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {user.stats.friends}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Friends
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserHeader;
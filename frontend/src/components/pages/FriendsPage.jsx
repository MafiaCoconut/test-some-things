import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, TextField, InputAdornment } from '@mui/material';
import { Search, PersonAdd, Message } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import { mockUserData } from '../../data/mockAppData';

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredFriends = mockUserData.friends.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      <LeftMenu />
      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mt: 8 }}>
        <UserHeader />
        
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ color: 'primary.main', mb: 3 }}>My Friends</Typography>
          
          <TextField
            fullWidth
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 3, maxWidth: 400 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
            }}
          />

          <Grid container spacing={2}>
            {filteredFriends.map((friend) => (
              <Grid item xs={12} sm={6} md={4} key={friend.id}>
                <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                  <CardContent>
                    <Avatar src={friend.avatar} sx={{ width: 60, height: 60, mx: 'auto', mb: 2 }} />
                    <Typography variant="h6" align="center" sx={{ color: 'white', mb: 1 }}>{friend.username}</Typography>
                    <Typography variant="caption" align="center" display="block" sx={{ color: friend.status === 'online' ? 'success.main' : 'text.secondary', mb: 2 }}>
                      {friend.status}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" startIcon={<Message />} fullWidth>Message</Button>
                      <Button size="small" color="error">Remove</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <AppFooter />
      </Box>
    </Box>
  );
};

export default FriendsPage;
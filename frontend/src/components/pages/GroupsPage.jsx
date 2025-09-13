import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, TextField, InputAdornment, Chip } from '@mui/material';
import { Search, Add, People } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import { mockUserData } from '../../data/mockAppData';

const GroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredGroups = mockUserData.groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      <LeftMenu />
      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mt: 8 }}>
        <UserHeader userData={mockUserData.currentUser} />
        
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ color: 'primary.main', mb: 3 }}>My Groups</Typography>
          
          <TextField
            fullWidth
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 3, maxWidth: 400 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
            }}
          />

          <Grid container spacing={2}>
            {filteredGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group.id}>
                <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                  <CardContent>
                    <Avatar src={group.image} sx={{ width: 60, height: 60, mx: 'auto', mb: 2 }} />
                    <Typography variant="h6" align="center" sx={{ color: 'white', mb: 1 }}>{group.name}</Typography>
                    <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mb: 2 }}>{group.description}</Typography>
                    <Chip icon={<People />} label={`${group.members} members`} size="small" sx={{ mb: 2, mx: 'auto', display: 'flex' }} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" fullWidth>View</Button>
                      <Button size="small" color="error">Leave</Button>
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

export default GroupsPage;
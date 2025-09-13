import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Stack,
  Paper,
  Chip,
  Tabs,
  Tab,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search, LocalOffer } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import PostCard from '../cards/PostCard';
import { mockUserData } from '../../data/mockAppData';

const PostsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  const allPosts = mockUserData.posts;
  const allTags = ['vampire', 'collection', 'photography', 'fashion', 'movie', 'tips', 'gothic', 'dolls'];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      <LeftMenu />
      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mt: 8 }}>
        <UserHeader userData={mockUserData.currentUser} />
        
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Typography variant="h4" sx={{ color: 'primary.main', mb: 3 }}>
            My Posts
          </Typography>

          {/* Search and Filter */}
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
              <TextField
                fullWidth
                size="small"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'secondary.main' }} />
                    </InputAdornment>
                  )
                }}
                sx={{ maxWidth: 400 }}
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <LocalOffer sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Tags:</Typography>
                {allTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant={selectedTag === tag ? 'filled' : 'outlined'}
                    color={selectedTag === tag ? 'primary' : 'default'}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(255, 105, 180, 0.1)' }
                    }}
                  />
                ))}
                {selectedTag && (
                  <Chip
                    label="Clear"
                    size="small"
                    color="error"
                    onClick={() => setSelectedTag('')}
                    sx={{ cursor: 'pointer' }}
                  />
                )}
              </Box>
            </Stack>
          </Paper>

          {/* Tabs */}
          <Paper sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main'
                  }
                },
                '& .MuiTabs-indicator': {
                  bgcolor: 'primary.main'
                }
              }}
            >
              <Tab label={`All Posts (${filteredPosts.length})`} />
              <Tab label="Published" />
              <Tab label="Drafts" />
              <Tab label="Popular" />
            </Tabs>
          </Paper>

          {/* Posts Grid */}
          <Stack spacing={3}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} showActions={true} />
              ))
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                  No posts found
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {searchTerm || selectedTag ? 'Try adjusting your search or filters' : 'Start sharing your monster moments!'}
                </Typography>
              </Paper>
            )}
          </Stack>
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
};

export default PostsPage;
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Stack,
  Paper,
  IconButton,
  Divider
} from '@mui/material';
import { Edit, People, Forum, AccessTime, Add } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import PostCard from '../cards/PostCard';
import CollectionCard from '../cards/CollectionCard';
import WritePostModal from '../modals/WritePostModal';
import FriendsModal from '../modals/FriendsModal';
import GroupsModal from '../modals/GroupsModal';
import CollectionsScroller from '../shared/CollectionsScroller';
import { mockUserData } from '../../data/mockAppData';

const UserPage = () => {
  const [posts, setPosts] = useState(mockUserData.posts);
  const [isWritePostModalOpen, setIsWritePostModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [isGroupsModalOpen, setIsGroupsModalOpen] = useState(false);

  const handleCreatePost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now(),
      date: new Date().toISOString(),
      likes: 0,
      comments: 0
    };
    setPosts([newPost, ...posts]);
    setIsWritePostModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      <LeftMenu />
      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mt: 8 }}>
        <UserHeader />
        
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Smaller Action Buttons */}
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<People />}
              onClick={() => setIsFriendsModalOpen(true)}
              size="small"
              sx={{ 
                borderColor: 'primary.main',
                color: 'primary.main',
                minWidth: 120
              }}
            >
              Friends
            </Button>

            <Button
              variant="outlined"
              startIcon={<Forum />}
              onClick={() => setIsGroupsModalOpen(true)}
              size="small"
              sx={{ 
                borderColor: 'warning.main',
                color: 'warning.main',
                minWidth: 120
              }}
            >
              Groups
            </Button>

            <Button
              variant="outlined"
              startIcon={<AccessTime />}
              size="small"
              sx={{ 
                borderColor: 'info.main',
                color: 'info.main',
                minWidth: 120
              }}
            >
              Hours
            </Button>
          </Stack>

          {/* Horizontal Collections Scroller */}
          <CollectionsScroller collections={mockUserData.collections} />

          <Divider sx={{ my: 3, borderColor: 'rgba(139, 95, 191, 0.2)' }} />

          {/* Write Post Menu above Recent Posts */}
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>
                What's on your mind, {mockUserData.currentUser.username}?
              </Typography>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setIsWritePostModalOpen(true)}
                sx={{ bgcolor: 'primary.main', color: 'black' }}
              >
                Write Post
              </Button>
            </Stack>
          </Paper>

          {/* Content Sections */}
          <Grid container spacing={3}>
            {/* Posts Section */}
            <Grid item xs={12} lg={6}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'primary.main',
                  mb: 2,
                  fontWeight: 700
                }}
              >
                Recent Posts
              </Typography>
              <Stack spacing={2}>
                {posts.slice(0, 3).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
                {posts.length === 0 && (
                  <Box textAlign="center" sx={{ py: 4 }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>📝</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      No posts yet
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>

            {/* Featured Collections Section */}
            <Grid item xs={12} lg={6}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'primary.main',
                  mb: 2,
                  fontWeight: 700
                }}
              >
                Featured Collections
              </Typography>
              <Stack spacing={2}>
                {mockUserData.collections.slice(0, 2).map((collection) => (
                  <Box key={collection.id} sx={{ transform: 'scale(0.95)' }}>
                    <CollectionCard collection={collection} size="medium" />
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>

        <AppFooter />
      </Box>

      <WritePostModal
        isOpen={isWritePostModalOpen}
        onClose={() => setIsWritePostModalOpen(false)}
        onSubmit={handleCreatePost}
      />

      <FriendsModal
        isOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
        friends={mockUserData.friends}
      />

      <GroupsModal
        isOpen={isGroupsModalOpen}
        onClose={() => setIsGroupsModalOpen(false)}
        groups={mockUserData.groups}
      />
    </Box>
  );
};

export default UserPage;
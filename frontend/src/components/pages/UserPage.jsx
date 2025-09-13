import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Stack,
  Paper,
  Avatar,
  Chip
} from '@mui/material';
import { Edit, People, Forum, AccessTime } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import PostCard from '../cards/PostCard';
import CollectionCard from '../cards/CollectionCard';
import WritePostModal from '../modals/WritePostModal';
import FriendsModal from '../modals/FriendsModal';
import GroupsModal from '../modals/GroupsModal';
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
        
        {/* Additional User Field */}
        <Paper sx={{ m: 2, p: 2, bgcolor: 'rgba(139, 95, 191, 0.1)' }}>
          <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>Monster Status</Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="Vampire Crew" color="primary" size="small" />
            <Chip label="Active" color="success" size="small" />
            <Chip label="Level 15" color="secondary" size="small" />
          </Stack>
        </Paper>
        
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {/* Action Buttons */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Button variant="outlined" startIcon={<People />} onClick={() => setIsFriendsModalOpen(true)} size="small">Friends</Button>
            <Button variant="outlined" startIcon={<Forum />} onClick={() => setIsGroupsModalOpen(true)} size="small">Groups</Button>
            <Button variant="outlined" startIcon={<AccessTime />} size="small">Hours</Button>
          </Stack>

          {/* Collections Scroller */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>Collections</Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, pb: 1 }}>
              {mockUserData.collections.slice(0, 4).map((collection) => (
                <Box key={collection.id} sx={{ minWidth: 180 }}>
                  <CollectionCard collection={collection} size="small" />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Write Post */}
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography sx={{ flexGrow: 1, color: 'text.secondary' }}>What's on your mind?</Typography>
              <Button variant="contained" startIcon={<Edit />} onClick={() => setIsWritePostModalOpen(true)}>Post</Button>
            </Stack>
          </Paper>

          {/* Posts */}
          <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Recent Posts</Typography>
          <Stack spacing={2}>
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Stack>
        </Container>

        <AppFooter />
      </Box>

      <WritePostModal isOpen={isWritePostModalOpen} onClose={() => setIsWritePostModalOpen(false)} onSubmit={handleCreatePost} />
      <FriendsModal isOpen={isFriendsModalOpen} onClose={() => setIsFriendsModalOpen(false)} friends={mockUserData.friends} />
      <GroupsModal isOpen={isGroupsModalOpen} onClose={() => setIsGroupsModalOpen(false)} groups={mockUserData.groups} />
    </Box>
  );
};

export default UserPage;
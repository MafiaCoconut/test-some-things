import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Stack,
  Paper,
  Chip,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Drawer
} from '@mui/material';
import { Edit, People, Forum, AccessTime, Settings, FavoriteOutlined, EmojiEvents } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import PostCard from '../cards/PostCard';
import WritePostModal from '../modals/WritePostModal';
import FriendsModal from '../modals/FriendsModal';
import GroupsModal from '../modals/GroupsModal';
import EditProfileModal from '../modals/EditProfileModal';
import UserSettingsModal from '../modals/UserSettingsModal';
import ActivityFeed from '../shared/ActivityFeed';
import { mockUserData, mockActivities, mockAchievements } from '../../data/mockAppData';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockUserData.posts);
  const [userData, setUserData] = useState(mockUserData.currentUser);
  const [collections, setCollections] = useState(mockUserData.collections);
  const [favoriteDolls] = useState(mockUserData.dolls.slice(0, 6));
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  
  const [isWritePostModalOpen, setIsWritePostModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [isGroupsModalOpen, setIsGroupsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleCreatePost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now(),
      date: new Date().toISOString(),
      likes: 0,
      comments: 0,
      tags: postData.tags || []
    };
    setPosts([newPost, ...posts]);
    setIsWritePostModalOpen(false);
  };

  const handleUpdateProfile = (newData) => {
    setUserData({...userData, ...newData});
    setIsEditProfileOpen(false);
  };

  const rightDrawerWidth = 280;

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      <LeftMenu />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mr: `${rightDrawerWidth}px`, mt: 8 }}>
        <UserHeader userData={userData} onEditProfile={() => setIsEditProfileOpen(true)} />
        
        {/* Monster Status & Achievements */}
        <Paper sx={{ m: 2, p: 2, bgcolor: 'rgba(139, 95, 191, 0.1)' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>Monster Status</Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Vampire Crew" color="primary" size="small" />
                <Chip label="Active" color="success" size="small" />
                <Chip label="Level 15" color="secondary" size="small" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <EmojiEvents sx={{ color: 'warning.main' }} />
                <Typography variant="h6" sx={{ color: 'warning.main' }}>Achievements</Typography>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {mockAchievements.slice(0, 3).map((achievement) => (
                  <Chip 
                    key={achievement.id}
                    label={achievement.name}
                    size="small"
                    sx={{ 
                      bgcolor: achievement.color,
                      color: 'white',
                      mb: 0.5
                    }}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <IconButton onClick={() => setIsSettingsOpen(true)} sx={{ color: 'primary.main', float: 'right' }}>
                <Settings />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {/* Action Buttons */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Button variant="outlined" startIcon={<People />} onClick={() => setIsFriendsModalOpen(true)} size="small">Friends</Button>
            <Button variant="outlined" startIcon={<Forum />} onClick={() => setIsGroupsModalOpen(true)} size="small">Groups</Button>
            <Button variant="outlined" startIcon={<AccessTime />} size="small">Hours</Button>
            <Button variant="contained" onClick={() => setShowActivityFeed(true)} size="small" sx={{ bgcolor: 'secondary.main' }}>
              Activity Feed
            </Button>
          </Stack>

          {/* Favorite Dolls Horizontal Scroller */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <FavoriteOutlined sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ color: 'primary.main' }}>Favorite Dolls</Typography>
            </Stack>
            <Box sx={{ 
              display: 'flex', 
              overflowX: 'auto', 
              gap: 2, 
              pb: 1,
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-track': { bgcolor: 'rgba(139, 95, 191, 0.1)' },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(139, 95, 191, 0.5)', borderRadius: 3 }
            }}>
              {favoriteDolls.map((doll) => (
                <Card 
                  key={doll.id} 
                  sx={{ 
                    minWidth: { xs: 120, sm: 140, md: 160 }, 
                    maxWidth: { xs: 120, sm: 140, md: 160 },
                    bgcolor: 'rgba(255, 105, 180, 0.1)',
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                  onClick={() => navigate(`/doll/${doll.id}`)}
                >
                  <CardMedia
                    component="img"
                    height={120}
                    image={doll.image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=160&h=120&fit=crop'}
                    alt={doll.name}
                  />
                  <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, display: 'block' }}>
                      {doll.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.65rem' }}>
                      {doll.character}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Write Post */}
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography sx={{ flexGrow: 1, color: 'text.secondary' }}>What's on your mind, {userData.username}?</Typography>
              <Button variant="contained" startIcon={<Edit />} onClick={() => setIsWritePostModalOpen(true)}>Post</Button>
            </Stack>
          </Paper>

          {/* Posts Section */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: 'primary.main' }}>Recent Posts</Typography>
              <Button variant="text" onClick={() => navigate('/posts')} sx={{ color: 'secondary.main' }}>
                View All Posts
              </Button>
            </Stack>
            <Stack spacing={2}>
              {posts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Stack>
          </Box>
        </Container>

        <AppFooter />
      </Box>

      {/* Right Drawer - Collections (moved under favorite dolls position) */}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: rightDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: rightDrawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
            borderLeft: 1,
            borderColor: 'rgba(139, 95, 191, 0.2)',
            mt: 8,
            p: 2
          },
        }}
      >
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>My Collections</Typography>
        <Stack spacing={2} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
          {collections.slice(0, 4).map((collection) => (
            <Card 
              key={collection.id}
              sx={{ 
                bgcolor: 'rgba(139, 95, 191, 0.1)',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(139, 95, 191, 0.2)' }
              }}
              onClick={() => navigate(`/collection/${collection.id}`)}
            >
              <CardMedia
                component="img"
                height={80}
                image={collection.coverImage}
                alt={collection.name}
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Typography variant="subtitle2" sx={{ color: 'white', mb: 0.5 }}>
                  {collection.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'primary.main' }}>
                  {collection.dollsCount} dolls
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Drawer>

      {/* Activity Feed Drawer */}
      <ActivityFeed 
        open={showActivityFeed} 
        onClose={() => setShowActivityFeed(false)} 
        activities={mockActivities} 
      />

      {/* Modals */}
      <WritePostModal isOpen={isWritePostModalOpen} onClose={() => setIsWritePostModalOpen(false)} onSubmit={handleCreatePost} />
      <FriendsModal isOpen={isFriendsModalOpen} onClose={() => setIsFriendsModalOpen(false)} friends={mockUserData.friends} />
      <GroupsModal isOpen={isGroupsModalOpen} onClose={() => setIsGroupsModalOpen(false)} groups={mockUserData.groups} />
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} userData={userData} onSubmit={handleUpdateProfile} />
      <UserSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </Box>
  );
};

export default UserPage;
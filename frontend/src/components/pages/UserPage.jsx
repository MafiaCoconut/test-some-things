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
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Edit, People, Forum, AccessTime, Settings, FavoriteOutlined, EmojiEvents, MenuOpen } from '@mui/icons-material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [posts, setPosts] = useState(mockUserData.posts);
  const [userData, setUserData] = useState(mockUserData.currentUser);
  const [collections, setCollections] = useState(mockUserData.collections);
  const [favoriteDolls] = useState(mockUserData.dolls.slice(0, 6));
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <IconButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          sx={{
            position: 'fixed',
            top: 70,
            left: mobileMenuOpen ? 250 : 10, // Move button right when menu is open
            zIndex: 1300,
            bgcolor: 'background.paper',
            color: 'primary.main',
            transition: 'left 0.3s ease',
            '&:hover': { bgcolor: 'rgba(255, 105, 180, 0.1)' }
          }}
        >
          <MenuOpen sx={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
        </IconButton>
      )}

      <LeftMenu mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          ml: { xs: 0, md: '200px', lg: '220px' },
          mt: 8,
          width: { xs: '100%', md: 'calc(100% - 200px)', lg: 'calc(100% - 220px)' }
        }}
      >
        <UserHeader userData={userData} onEditProfile={() => setIsEditProfileOpen(true)} />
        
        {/* Monster Status & Achievements */}
        <Paper sx={{ 
          m: { xs: 1, md: 2 }, 
          p: { xs: 1.5, md: 2 }, 
          bgcolor: 'rgba(139, 95, 191, 0.1)' 
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} lg={6}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Monster Status
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label="Vampire Crew" color="primary" size="small" />
                <Chip label="Active" color="success" size="small" />
                <Chip label="Level 15" color="secondary" size="small" />
              </Stack>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <EmojiEvents sx={{ color: 'warning.main' }} />
                <Typography variant="h6" sx={{ color: 'warning.main', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  Achievements
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {mockAchievements.slice(0, isMobile ? 2 : 3).map((achievement) => (
                  <Chip 
                    key={achievement.id}
                    label={achievement.name}
                    size="small"
                    sx={{ 
                      bgcolor: achievement.color,
                      color: 'white',
                      fontSize: { xs: '0.65rem', md: '0.75rem' }
                    }}
                    onClick={() => navigate('/achievements')}
                  />
                ))}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate('/achievements')}
                  sx={{ color: 'warning.main', fontSize: '0.7rem', minWidth: 'auto', p: 0.5 }}
                >
                  View All
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={1} sx={{ textAlign: 'right' }}>
              <IconButton onClick={() => setIsSettingsOpen(true)} sx={{ color: 'primary.main' }} size="small">
                <Settings />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        
        <Container maxWidth="xl" sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 } }}>
          {/* Action Buttons */}
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
            useFlexGap
          >
            <Button 
              variant="outlined" 
              startIcon={<People />} 
              onClick={() => setIsFriendsModalOpen(true)} 
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { xs: 'auto', md: 120 } }}
            >
              {isMobile ? '' : 'Friends'}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Forum />} 
              onClick={() => setIsGroupsModalOpen(true)} 
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { xs: 'auto', md: 120 } }}
            >
              {isMobile ? '' : 'Groups'}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<AccessTime />} 
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { xs: 'auto', md: 120 } }}
            >
              {isMobile ? '' : 'Hours'}
            </Button>
            <Button 
              variant="contained" 
              onClick={() => setShowActivityFeed(true)} 
              size={isMobile ? "small" : "medium"}
              sx={{ 
                bgcolor: 'secondary.main',
                minWidth: { xs: 'auto', md: 140 },
                fontSize: { xs: '0.7rem', md: '0.875rem' }
              }}
            >
              Activity Feed
            </Button>
          </Stack>

          {/* Favorite Dolls Horizontal Scroller */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <FavoriteOutlined sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ color: 'primary.main', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Favorite Dolls
              </Typography>
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
                    minWidth: { xs: 100, sm: 120, md: 140, lg: 160 }, 
                    maxWidth: { xs: 100, sm: 120, md: 140, lg: 160 },
                    bgcolor: 'rgba(255, 105, 180, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                  onClick={() => navigate(`/doll/${doll.id}`)}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? 80 : 120}
                    image={doll.image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=160&h=120&fit=crop'}
                    alt={doll.name}
                  />
                  <CardContent sx={{ p: { xs: 0.5, md: 1 }, '&:last-child': { pb: { xs: 0.5, md: 1 } } }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 600, 
                        display: 'block',
                        fontSize: { xs: '0.6rem', md: '0.75rem' }
                      }}
                    >
                      {doll.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'primary.main', 
                        fontSize: { xs: '0.55rem', md: '0.65rem' }
                      }}
                    >
                      {doll.character}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Content Layout */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Posts Section */}
            <Grid item xs={12} lg={8}>
              {/* Write Post */}
              <Paper sx={{ p: 2, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography sx={{ flexGrow: 1, color: 'text.secondary', fontSize: { xs: '0.8rem', md: '1rem' } }}>
                    What's on your mind, {userData.username}?
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<Edit />} 
                    onClick={() => setIsWritePostModalOpen(true)}
                    size={isMobile ? "small" : "medium"}
                  >
                    Post
                  </Button>
                </Stack>
              </Paper>

              {/* Posts */}
              <Box sx={{ mb: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    Recent Posts
                  </Typography>
                  <Button 
                    variant="text" 
                    onClick={() => navigate('/posts')} 
                    sx={{ color: 'secondary.main', fontSize: { xs: '0.7rem', md: '0.875rem' } }}
                    size="small"
                  >
                    View All Posts
                  </Button>
                </Stack>
                <Stack spacing={2}>
                  {posts.slice(0, 3).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* Collections Section */}
            <Grid item xs={12} lg={4}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                My Collections
              </Typography>
              <Stack spacing={2} sx={{ maxHeight: { lg: '600px' }, overflowY: 'auto' }}>
                {collections.slice(0, 4).map((collection) => (
                  <Card 
                    key={collection.id}
                    sx={{ 
                      bgcolor: 'rgba(139, 95, 191, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        bgcolor: 'rgba(139, 95, 191, 0.2)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={() => navigate(`/collection/${collection.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height={isMobile ? 60 : 80}
                      image={collection.coverImage}
                      alt={collection.name}
                    />
                    <CardContent sx={{ p: { xs: 1, md: 1.5 }, '&:last-child': { pb: { xs: 1, md: 1.5 } } }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: 'white', 
                          mb: 0.5,
                          fontSize: { xs: '0.8rem', md: '0.875rem' }
                        }}
                      >
                        {collection.name}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'primary.main',
                          fontSize: { xs: '0.65rem', md: '0.75rem' }
                        }}
                      >
                        {collection.dollsCount} dolls
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>

        <AppFooter />
      </Box>

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
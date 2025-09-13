import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Stack,
  Chip,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { 
  Refresh,
  FilterList,
  Sort
} from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import AppFooter from '../shared/AppFooter';
import PostCard from '../cards/PostCard';
import { mockUserData } from '../../data/mockAppData';

const FriendsPostsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [sortBy, setSortBy] = useState('recent');

  // Mock friends' posts data - in real app this would come from API
  const friendsPosts = [
    {
      id: 1,
      author: "WerewolfStyleQueen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "Just got the new 13 Wishes Lagoona Blue! Her outfit is absolutely stunning! 💙✨ #MonsterHigh #LagoanaBlue #NewDoll",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      likes: 45,
      comments: 12,
      date: "2024-03-15T10:30:00Z",
      tags: ["#MonsterHigh", "#LagoanaBlue", "#NewDoll"]
    },
    {
      id: 2,
      author: "ElectricFrankie",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "Monster High photography tips! 📸 Natural lighting + white poster board = *chef's kiss* Perfect shots every time! What's your setup?",
      likes: 38,
      comments: 22,
      date: "2024-03-14T15:45:00Z",
      tags: ["#Photography", "#Tips", "#MonsterHigh"]
    },
    {
      id: 3,
      author: "MummyPrincess",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c8d8c1?w=100&h=100&fit=crop&crop=face",
      content: "Can we talk about how gorgeous the new vampire collection pieces are? The detail work on their outfits is incredible! Monster High really outdid themselves this time. 🧛‍♀️✨",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      likes: 67,
      comments: 31,
      date: "2024-03-13T09:20:00Z",
      tags: ["#VampireCollection", "#MonsterHigh", "#NewRelease"]
    },
    {
      id: 4,
      author: "SeaMonsterVibes",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      content: "Finally completed my Ocean Dreams collection! 🌊 Took me 2 years but it was worth every hunt. Swipe to see the whole family! Special thanks to @GhoulishCollector for helping me find the last piece!",
      likes: 89,
      comments: 45,
      date: "2024-03-12T18:15:00Z",
      tags: ["#OceanDreams", "#CollectionComplete", "#MonsterHigh"]
    },
    {
      id: 5,
      author: "GothicCollector",
      avatar: "",
      content: "PSA: Target has the new dolls in stock! Just picked up Abbey Bominable and she's perfect! 🛒 Check your local stores, ghouls!",
      likes: 23,
      comments: 8,
      date: "2024-03-11T14:30:00Z",
      tags: ["#Target", "#NewStock", "#AbbeyBominable"]
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filterPosts = () => {
    let filtered = [...friendsPosts];
    
    if (tabValue === 1) {
      // Most liked posts
      filtered = filtered.filter(post => post.likes > 30);
    } else if (tabValue === 2) {
      // Recent posts (last 3 days)
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      filtered = filtered.filter(post => new Date(post.date) > threeDaysAgo);
    }
    
    // Sort posts
    filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'popular') {
        return b.likes - a.likes;
      }
      return 0;
    });
    
    return filtered;
  };

  const displayPosts = filterPosts();

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
            left: mobileMenuOpen ? 250 : 10,
            zIndex: 1300,
            bgcolor: 'background.paper',
            color: 'primary.main',
            transition: 'left 0.3s ease',
            '&:hover': { bgcolor: 'rgba(255, 105, 180, 0.1)' }
          }}
        >
          <FilterList />
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
          width: { xs: '100%', md: 'calc(100% - 200px)', lg: 'calc(100% - 220px)' },
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Container 
          maxWidth="md" 
          sx={{ 
            py: { xs: 2, md: 3 }, 
            px: { xs: 1, md: 2 },
            width: '100%',
            maxWidth: { xs: '100%', sm: '100%', md: '800px', lg: '900px' }
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              alignItems={{ xs: 'center', sm: 'center' }} 
              spacing={2} 
              sx={{ mb: 2 }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 800,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  flexGrow: 1
                }}
              >
                Friends' Posts
              </Typography>
              <IconButton 
                onClick={() => window.location.reload()} 
                sx={{ 
                  color: 'secondary.main',
                  bgcolor: 'rgba(139, 95, 191, 0.1)',
                  '&:hover': { bgcolor: 'rgba(139, 95, 191, 0.2)' }
                }}
              >
                <Refresh />
              </IconButton>
            </Stack>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', md: '1rem' },
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              See what your monster friends are up to! 👻💜
            </Typography>
          </Box>

          {/* Filter Tabs */}
          <Paper sx={{ mb: 3, bgcolor: 'rgba(139, 95, 191, 0.1)' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', md: '0.875rem' },
                  minWidth: { xs: 'auto', md: 120 },
                  '&.Mui-selected': { color: 'primary.main', fontWeight: 600 }
                },
                '& .MuiTabs-indicator': { bgcolor: 'primary.main' }
              }}
            >
              <Tab label={`All Posts (${friendsPosts.length})`} />
              <Tab label="Popular" />
              <Tab label="Recent" />
            </Tabs>
          </Paper>

          {/* Sort Controls */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            alignItems={{ xs: 'stretch', sm: 'center' }} 
            sx={{ mb: 3 }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', alignSelf: 'center' }}>
              Sort by:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              <Button
                variant={sortBy === 'recent' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setSortBy('recent')}
                sx={{ 
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 'auto', md: 100 }
                }}
              >
                Recent
              </Button>
              <Button
                variant={sortBy === 'popular' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setSortBy('popular')}
                sx={{ 
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 'auto', md: 100 }
                }}
              >
                Popular
              </Button>
            </Stack>
          </Stack>

          {/* Posts Feed */}
          <Box sx={{ width: '100%' }}>
            {displayPosts.length > 0 ? (
              <Stack spacing={{ xs: 2, md: 3 }}>
                {displayPosts.map((post) => (
                  <Box 
                    key={post.id}
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        '& .MuiPaper-root': {
                          boxShadow: '0 8px 24px rgba(255, 105, 180, 0.2)'
                        }
                      }
                    }}
                  >
                    <PostCard post={post} />
                  </Box>
                ))}
              </Stack>
            ) : (
              <Paper 
                sx={{ 
                  p: { xs: 3, md: 6 }, 
                  textAlign: 'center',
                  bgcolor: 'rgba(139, 95, 191, 0.1)'
                }}
              >
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                  No posts found
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Try adjusting your filters or check back later!
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Load More Button */}
          {displayPosts.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'white',
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
                onClick={() => console.log('Load more posts')}
              >
                Load More Posts
              </Button>
            </Box>
          )}
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
};

export default FriendsPostsPage;
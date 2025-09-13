import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { EmojiEvents, Lock, CheckCircle } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import { mockUserData, mockAchievements } from '../../data/mockAppData';

const AchievementsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extended achievements list with locked ones
  const allAchievements = [
    ...mockAchievements,
    {
      id: 6,
      name: "Monster High Expert",
      description: "Complete 50 collections",
      icon: "🏆",
      color: "#ff69b4",
      locked: true,
      progress: 24
    },
    {
      id: 7,
      name: "Social Monster",
      description: "Get 50 friends",
      icon: "👥",
      color: "#8b5fbf",
      locked: true,
      progress: 46
    },
    {
      id: 8,
      name: "Content Creator",
      description: "Write 100 posts",
      icon: "✍️",
      color: "#4a90e2",
      locked: true,
      progress: 15
    }
  ];

  const categories = [
    { id: 'all', label: 'All Achievements', count: allAchievements.length },
    { id: 'unlocked', label: 'Unlocked', count: allAchievements.filter(a => !a.locked).length },
    { id: 'locked', label: 'Locked', count: allAchievements.filter(a => a.locked).length }
  ];

  const filteredAchievements = allAchievements.filter(achievement => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'unlocked') return !achievement.locked;
    if (selectedCategory === 'locked') return achievement.locked;
    return true;
  });

  const completionRate = Math.round((allAchievements.filter(a => !a.locked).length / allAchievements.length) * 100);

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      <LeftMenu />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          ml: { xs: 0, md: '200px', lg: '220px' },
          mt: 8,
          width: { xs: '100%', md: 'calc(100% - 200px)', lg: 'calc(100% - 220px)' }
        }}
      >
        <UserHeader userData={mockUserData.currentUser} />
        
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 }, px: { xs: 1, md: 2 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'primary.main', 
              mb: 3,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            🏆 Achievements
          </Typography>

          {/* Progress Overview */}
          <Paper sx={{ 
            p: { xs: 2, md: 3 }, 
            mb: 3, 
            bgcolor: 'rgba(255, 105, 180, 0.1)',
            border: 1,
            borderColor: 'rgba(255, 105, 180, 0.3)'
          }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                  Overall Progress
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={completionRate}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'primary.main',
                      borderRadius: 4,
                    }
                  }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  {mockAchievements.length} of {allAchievements.length} achievements unlocked ({completionRate}%)
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} textAlign="center">
                <EmojiEvents sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                  {mockAchievements.length}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Achievements Earned
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Category Filter */}
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
            useFlexGap
          >
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={`${category.label} (${category.count})`}
                variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                color={selectedCategory === category.id ? 'primary' : 'default'}
                onClick={() => setSelectedCategory(category.id)}
                sx={{ 
                  cursor: 'pointer',
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                  '&:hover': { bgcolor: 'rgba(255, 105, 180, 0.1)' }
                }}
              />
            ))}
          </Stack>

          {/* Achievements Grid */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {filteredAchievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    bgcolor: achievement.locked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                    border: 1,
                    borderColor: achievement.locked ? 'rgba(255, 255, 255, 0.1)' : `${achievement.color}50`,
                    opacity: achievement.locked ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: achievement.locked ? 'none' : 'translateY(-4px)',
                      boxShadow: achievement.locked ? 'none' : `0 8px 24px ${achievement.color}30`
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <Box sx={{ 
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        filter: achievement.locked ? 'grayscale(100%)' : 'none'
                      }}>
                        {achievement.locked ? '🔒' : achievement.icon}
                      </Box>
                      
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: achievement.locked ? 'text.secondary' : 'white',
                              fontWeight: 600,
                              fontSize: { xs: '0.9rem', md: '1.1rem' }
                            }}
                          >
                            {achievement.name}
                          </Typography>
                          {!achievement.locked && (
                            <CheckCircle sx={{ color: 'success.main', fontSize: '1rem' }} />
                          )}
                          {achievement.locked && (
                            <Lock sx={{ color: 'text.secondary', fontSize: '1rem' }} />
                          )}
                        </Stack>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            mb: 2,
                            fontSize: { xs: '0.8rem', md: '0.875rem' }
                          }}
                        >
                          {achievement.description}
                        </Typography>

                        {achievement.locked && achievement.progress !== undefined && (
                          <>
                            <LinearProgress 
                              variant="determinate" 
                              value={achievement.progress}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                mb: 1,
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: achievement.color,
                                  borderRadius: 3,
                                }
                              }}
                            />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Progress: {achievement.progress}%
                            </Typography>
                          </>
                        )}

                        {!achievement.locked && achievement.unlockedAt && (
                          <Typography variant="caption" sx={{ color: 'success.main' }}>
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredAchievements.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
              <EmojiEvents sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                No achievements in this category
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Keep exploring and collecting to unlock more achievements!
              </Typography>
            </Paper>
          )}
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
};

export default AchievementsPage;
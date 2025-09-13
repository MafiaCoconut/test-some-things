import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Button, 
  TextField, 
  InputAdornment, 
  Chip,
  Container,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Search, Add, People, MenuOpen } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import { mockUserData } from '../../data/mockAppData';

const GroupsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const filteredGroups = mockUserData.groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <MenuOpen sx={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
        </IconButton>
      )}
      
      <LeftMenu mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          ml: { xs: 0, md: '200px', lg: '220px' },
          mt: 8,
          width: { xs: '100%', md: 'calc(100% - 200px)', lg: 'calc(100% - 220px)' },
          overflowX: 'hidden'
        }}
      >
        <UserHeader userData={mockUserData.currentUser} />
        
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: { xs: 2, md: 3 }, 
            px: { xs: 1, md: 2 },
            width: '100%'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'primary.main', 
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.125rem' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            My Groups
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              mb: 3, 
              maxWidth: { xs: '100%', md: 400 },
              mx: { xs: 0, md: 0 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                '& fieldset': { borderColor: 'rgba(139, 95, 191, 0.3)' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' }
              }
            }}
          />

          <Grid 
            container 
            spacing={{ xs: 2, md: 3 }}
            sx={{
              width: '100%',
              margin: 0,
              '& .MuiGrid-item': {
                paddingLeft: { xs: '8px', md: '12px' },
                paddingTop: { xs: '8px', md: '12px' }
              }
            }}
          >
            {filteredGroups.map((group) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3}
                key={group.id}
                sx={{
                  display: 'flex'
                }}
              >
                <Card 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    border: 1,
                    borderColor: 'rgba(139, 95, 191, 0.2)',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 24px rgba(255, 105, 180, 0.3)'
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Avatar 
                      src={group.image} 
                      sx={{ 
                        width: { xs: 50, md: 60 }, 
                        height: { xs: 50, md: 60 }, 
                        mx: 'auto', 
                        mb: 2,
                        bgcolor: 'primary.main'
                      }} 
                    >
                      {!group.image && group.name.charAt(0)}
                    </Avatar>
                    
                    <Typography 
                      variant="h6" 
                      align="center" 
                      sx={{ 
                        color: 'white', 
                        mb: 1,
                        fontSize: { xs: '1rem', md: '1.25rem' }
                      }}
                    >
                      {group.name}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      align="center" 
                      sx={{ 
                        color: 'text.secondary', 
                        mb: 2,
                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                        minHeight: { xs: '2.4em', md: '2.6em' },
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {group.description}
                    </Typography>
                    
                    <Chip 
                      icon={<People sx={{ fontSize: { xs: '16px', md: '18px' } }} />} 
                      label={`${group.members} members`} 
                      size="small" 
                      sx={{ 
                        mb: 2, 
                        mx: 'auto', 
                        display: 'flex',
                        maxWidth: 'fit-content',
                        bgcolor: 'rgba(139, 95, 191, 0.2)',
                        color: 'white',
                        fontSize: { xs: '0.7rem', md: '0.75rem' }
                      }} 
                    />
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' }
                      }}
                    >
                      <Button 
                        size="small" 
                        fullWidth
                        variant="contained"
                        sx={{
                          bgcolor: 'secondary.main',
                          color: 'white',
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'secondary.dark',
                            transform: 'translateY(-1px)'
                          }
                        }}
                      >
                        View
                      </Button>
                      <Button 
                        size="small" 
                        color="error"
                        variant="outlined"
                        sx={{
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                          borderColor: 'error.main',
                          color: 'error.main',
                          minWidth: { xs: '100%', sm: 'auto' },
                          '&:hover': {
                            bgcolor: 'rgba(244, 67, 54, 0.1)',
                            borderColor: 'error.main'
                          }
                        }}
                      >
                        Leave
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {filteredGroups.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: { xs: 6, md: 8 },
                px: { xs: 2, md: 0 }
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 2, 
                  fontSize: { xs: '3rem', md: '4rem' }
                }}
              >
                👥
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white', 
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '1.5rem' }
                }}
              >
                {searchTerm ? 'No groups found' : 'No groups yet'}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 3,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  maxWidth: '400px',
                  mx: 'auto'
                }}
              >
                {searchTerm ? 'Try adjusting your search terms' : 'Join some groups to connect with fellow monster collectors!'}
              </Typography>
              {!searchTerm && (
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'black',
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 1 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 105, 180, 0.3)'
                    }
                  }}
                >
                  Discover Groups
                </Button>
              )}
            </Box>
          )}
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
};

export default GroupsPage;
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Add, MenuOpen } from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import CollectionCard from '../cards/CollectionCard';
import CreateCollectionModal from '../modals/CreateCollectionModal';
import { mockUserData } from '../../data/mockAppData';

const AllCollectionsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [collections, setCollections] = useState(mockUserData.collections);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCreateCollection = (newCollection) => {
    const collection = {
      ...newCollection,
      id: Date.now(),
      dollsCount: 0,
      createdAt: new Date().toISOString()
    };
    setCollections([collection, ...collections]);
    setIsCreateModalOpen(false);
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
          width: { xs: '100%', md: 'calc(100% - 200px)', lg: 'calc(100% - 220px)' }
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
          {/* Page Title and Actions */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'stretch', sm: 'center' }} 
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 800,
                fontFamily: '"Inter", sans-serif',
                fontSize: { xs: '1.8rem', md: '2.125rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              My Collections
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setIsCreateModalOpen(true)}
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                minWidth: { xs: '100%', sm: 'auto' },
                py: { xs: 1.5, md: 1 },
                fontSize: { xs: '0.9rem', md: '0.875rem' },
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
                }
              }}
            >
              Create Collection
            </Button>
          </Stack>
              }}
            >
              All Collections
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setIsCreateModalOpen(true)}
              sx={{ bgcolor: 'secondary.main' }}
            >
              Create Collection
            </Button>
          </Stack>

          {/* Collections Grid - Smaller blocks */}
          <Grid container spacing={2}>
            {collections.map((collection) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={collection.id}>
                <CollectionCard collection={collection} size="small" />
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {collections.length === 0 && (
            <Box textAlign="center" sx={{ py: 8 }}>
              <Typography variant="h2" sx={{ mb: 2 }}>👻</Typography>
              <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                No Collections Yet
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Start building your monster collection today!
              </Typography>
              <Button
                variant="contained"
                onClick={() => setIsCreateModalOpen(true)}
                sx={{ bgcolor: 'primary.main', color: 'black' }}
              >
                Create Your First Collection
              </Button>
            </Box>
          )}
        </Container>

        <AppFooter />
      </Box>

      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCollection}
      />
    </Box>
  );
};

export default AllCollectionsPage;
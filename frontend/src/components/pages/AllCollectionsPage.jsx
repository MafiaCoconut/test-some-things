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
  const [collections, setCollections] = useState(mockUserData.collections);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      <LeftMenu />
      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mt: 8 }}>
        <UserHeader userData={mockUserData.currentUser} />
        
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Page Title and Actions */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 800,
                fontFamily: '"Inter", sans-serif'
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
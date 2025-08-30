import React from 'react';
import { 
  Box, 
  Typography, 
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack
} from '@mui/material';
import { FolderOpen, CalendarToday } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CollectionsScroller = ({ collections }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'primary.main',
          mb: 2,
          fontWeight: 700
        }}
      >
        My Collections
      </Typography>
      
      <Box 
        sx={{ 
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'rgba(139, 95, 191, 0.1)',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(139, 95, 191, 0.5)',
            borderRadius: 4,
            '&:hover': {
              bgcolor: 'rgba(139, 95, 191, 0.7)',
            },
          },
        }}
      >
        {collections.map((collection) => (
          <Card
            key={collection.id}
            onClick={() => navigate(`/collection/${collection.id}`)}
            sx={{
              minWidth: 200,
              maxWidth: 200,
              bgcolor: 'rgba(139, 95, 191, 0.1)',
              border: 1,
              borderColor: 'rgba(139, 95, 191, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 24px rgba(139, 95, 191, 0.2)',
              },
            }}
          >
            <CardMedia
              component="img"
              height={120}
              image={collection.coverImage || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=120&fit=crop'}
              alt={collection.name}
              sx={{ 
                objectFit: 'cover',
                bgcolor: 'rgba(0, 0, 0, 0.5)'
              }}
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {collection.name}
              </Typography>
              
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FolderOpen sx={{ fontSize: 12, color: 'primary.main' }} />
                  <Typography variant="caption" sx={{ color: 'primary.main' }}>
                    {collection.dollsCount} {collection.dollsCount === 1 ? 'Doll' : 'Dolls'}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday sx={{ fontSize: 10, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                    {formatDate(collection.createdAt)}
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label="Collection"
                size="small"
                sx={{
                  bgcolor: 'rgba(139, 95, 191, 0.5)',
                  color: 'white',
                  fontSize: '0.6rem',
                  height: 18,
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CollectionsScroller;
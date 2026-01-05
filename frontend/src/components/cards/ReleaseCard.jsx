import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Stack
} from '@mui/material';
import { Launch } from '@mui/icons-material';

const ReleaseCard = ({ release, onClick, variant = "default" }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(release);
    }
  };

  const getTagColor = (tag) => {
    const tagColors = {
      'Vampire': 'error',
      'Werewolf': 'warning', 
      'Frankenstein': 'success',
      'Mummy': 'info',
      'Zombie': 'secondary',
      'Yeti': 'primary',
      'Exclusive': 'error',
      'Limited': 'error',
      'SDCC': 'warning',
      'Movie': 'secondary',
      'Reboot': 'success'
    };
    
    // Find matching color or default
    for (const [key, color] of Object.entries(tagColors)) {
      if (tag.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }
    return 'default';
  };

  const cardStyles = {
    default: {
      card: {
        bgcolor: 'rgba(255, 255, 255, 0.02)',
        border: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
          boxShadow: '0 12px 32px rgba(255, 105, 180, 0.2)',
          '& .release-image': {
            transform: 'scale(1.02)'
          }
        }
      },
      media: {
        height: { xs: 240, sm: 280, md: 320 },
        transition: 'transform 0.3s ease',
        overflow: 'hidden'
      }
    },
    compact: {
      card: {
        bgcolor: 'rgba(255, 255, 255, 0.03)',
        border: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 2,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: 'secondary.main',
          boxShadow: '0 8px 24px rgba(168, 85, 247, 0.15)'
        }
      },
      media: {
        height: { xs: 200, sm: 220, md: 260 },
        transition: 'transform 0.2s ease'
      }
    }
  };

  const currentStyle = cardStyles[variant] || cardStyles.default;

  return (
    <Card 
      sx={currentStyle.card}
      onClick={handleClick}
    >
      <CardMedia
        className="release-image"
        component="img"
        image={release.image}
        alt={release.name}
        sx={currentStyle.media}
      />
      
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 2.5 } }}>
        {/* Release Name */}
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white',
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.3,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {release.name}
        </Typography>

        {/* Metadata */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '0.8rem', md: '0.875rem' }
              }}
            >
              {release.year}
            </Typography>
            <Box sx={{ width: 2, height: 2, bgcolor: 'text.secondary', borderRadius: '50%' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', md: '0.8rem' }
              }}
            >
              {release.tierType}
            </Typography>
            <Box sx={{ width: 2, height: 2, bgcolor: 'text.secondary', borderRadius: '50%' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', md: '0.8rem' }
              }}
            >
              {release.packType}
            </Typography>
          </Box>

          <Typography 
            variant="body2" 
            sx={{ 
              color: 'secondary.main',
              fontWeight: 500,
              fontSize: { xs: '0.8rem', md: '0.875rem' }
            }}
          >
            {release.character}
          </Typography>
        </Stack>

        {/* Tags */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {release.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                color={getTagColor(tag)}
                variant="outlined"
                sx={{
                  fontSize: { xs: '0.65rem', md: '0.7rem' },
                  height: { xs: 20, md: 24 },
                  borderRadius: 1,
                  '& .MuiChip-label': {
                    px: 1
                  }
                }}
              />
            ))}
            {release.exclusive && (
              <Chip
                label="EXCLUSIVE"
                size="small"
                color="error"
                sx={{
                  fontSize: { xs: '0.6rem', md: '0.65rem' },
                  height: { xs: 18, md: 22 },
                  fontWeight: 700,
                  bgcolor: 'error.main',
                  color: 'white',
                  borderRadius: 1
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Action Button */}
        <Button
          variant="contained"
          endIcon={<Launch sx={{ fontSize: '16px' }} />}
          fullWidth
          sx={{
            bgcolor: 'primary.main',
            color: 'black',
            fontWeight: 600,
            fontSize: { xs: '0.8rem', md: '0.875rem' },
            py: { xs: 1, md: 1.25 },
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Open Release
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReleaseCard;
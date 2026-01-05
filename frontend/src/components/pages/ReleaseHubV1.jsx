import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack,
  Pagination,
  Skeleton,
  Alert,
  IconButton,
  useMediaQuery,
  useTheme,
  Chip,
  Divider
} from '@mui/material';
import {
  Search,
  FilterList,
  Sort,
  MenuOpen,
  Archive,
  CalendarToday,
  Person,
  Collections
} from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import AppFooter from '../shared/AppFooter';
import ReleaseCard from '../cards/ReleaseCard';
import {
  monsterHighReleases,
  getUniqueYears,
  getUniqueCharacters,
  getUniqueSeries,
  getTierTypes,
  searchReleases,
  filterReleases,
  sortReleases
} from '../../data/releaseHubData';

const ReleaseHubV1 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(0); // 0: All, 1: By Year, 2: By Character, 3: By Series
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    year: '',
    character: '',
    series: '',
    tierType: '',
    exclusive: ''
  });

  // Constants
  const itemsPerPage = isMobile ? 8 : isTablet ? 12 : 20;
  const years = getUniqueYears();
  const characters = getUniqueCharacters();
  const series = getUniqueSeries();
  const tierTypes = getTierTypes();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, viewMode, sortBy]);

  // Process releases
  const processedReleases = useMemo(() => {
    let filtered = [...monsterHighReleases];

    // Apply search
    if (searchTerm) {
      filtered = searchReleases(filtered, searchTerm);
    }

    // Apply filters
    filtered = filterReleases(filtered, filters);

    // Apply sort
    filtered = sortReleases(filtered, sortBy);

    return filtered;
  }, [searchTerm, filters, sortBy]);

  // Paginate releases
  const paginatedReleases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedReleases.slice(startIndex, startIndex + itemsPerPage);
  }, [processedReleases, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(processedReleases.length / itemsPerPage);

  // Handlers
  const handleViewModeChange = (event, newValue) => {
    setViewMode(newValue);
    // Clear filters when changing view mode
    setFilters({
      year: '',
      character: '',
      series: '',
      tierType: '',
      exclusive: ''
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleReleaseClick = (release) => {
    console.log('Opening release:', release.name);
    // Navigate to release detail page
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  // Get contextual filter options based on view mode
  const getContextualFilters = () => {
    switch (viewMode) {
      case 1: // By Year
        return [
          { key: 'year', label: 'Year', options: years },
          { key: 'character', label: 'Character', options: characters },
          { key: 'tierType', label: 'Tier Type', options: tierTypes }
        ];
      case 2: // By Character
        return [
          { key: 'character', label: 'Character', options: characters },
          { key: 'year', label: 'Year', options: years },
          { key: 'series', label: 'Series', options: series }
        ];
      case 3: // By Series
        return [
          { key: 'series', label: 'Series', options: series },
          { key: 'year', label: 'Year', options: years },
          { key: 'tierType', label: 'Tier Type', options: tierTypes }
        ];
      default: // All
        return [
          { key: 'year', label: 'Year', options: years },
          { key: 'character', label: 'Character', options: characters },
          { key: 'series', label: 'Series', options: series },
          { key: 'tierType', label: 'Tier Type', options: tierTypes }
        ];
    }
  };

  const tabIcons = [Archive, CalendarToday, Person, Collections];
  const tabLabels = ['All Releases', 'By Year', 'By Character', 'By Series'];

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

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: '200px', lg: '220px' },
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          width: 'auto'
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            py: { xs: 3, md: 4 },
            px: { xs: 2, md: 4 },
            maxWidth: 'none',
            width: '100%'
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                letterSpacing: '-0.02em',
                mb: 2,
                textAlign: { xs: 'center', md: 'left' },
                textTransform: 'uppercase'
              }}
            >
              ReleaseHub
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 400,
                maxWidth: 600,
                lineHeight: 1.5,
                textAlign: { xs: 'center', md: 'left' },
                mx: { xs: 'auto', md: 0 }
              }}
            >
              Complete archive of Monster High doll releases. Browse by year, character, series, and discover every ghoulish detail.
            </Typography>
          </Box>

          {/* View Selector Tabs */}
          <Box sx={{ mb: 4 }}>
            <Tabs
              value={viewMode}
              onChange={handleViewModeChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  fontWeight: 600,
                  minWidth: { xs: 'auto', md: 120 },
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  '&.Mui-selected': {
                    color: 'primary.main'
                  }
                },
                '& .MuiTabs-indicator': {
                  bgcolor: 'primary.main',
                  height: 3
                }
              }}
            >
              {tabLabels.map((label, index) => {
                const Icon = tabIcons[index];
                return (
                  <Tab
                    key={index}
                    icon={<Icon sx={{ mb: 0.5 }} />}
                    label={label}
                    iconPosition="top"
                  />
                );
              })}
            </Tabs>
          </Box>

          {/* Filter & Search Toolbar */}
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.02)',
              border: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              p: { xs: 2, md: 3 },
              mb: 4
            }}
          >
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search releases, characters, series..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 2,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  '& fieldset': { border: 'none' },
                  '& input': { color: 'white', py: { xs: 1.5, md: 2 } }
                }
              }}
              sx={{ mb: 3 }}
            />

            {/* Filters Row */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', md: 'center' }}
            >
              {/* Contextual Filters */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ flexGrow: 1 }}
              >
                {getContextualFilters().slice(0, isMobile ? 2 : 4).map((filter) => (
                  <FormControl key={filter.key} size="small" sx={{ minWidth: { xs: '100%', sm: 120 } }}>
                    <InputLabel sx={{ color: 'text.secondary' }}>{filter.label}</InputLabel>
                    <Select
                      value={filters[filter.key]}
                      label={filter.label}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      sx={{
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main'
                        }
                      }}
                    >
                      <MenuItem value="">All {filter.label}s</MenuItem>
                      {filter.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </Stack>

              {/* Sort Control */}
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 140 } }}>
                <InputLabel sx={{ color: 'text.secondary' }}>Sort</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="name-asc">Name A–Z</MenuItem>
                  <MenuItem value="name-desc">Name Z–A</MenuItem>
                  <MenuItem value="character">By Character</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Typography variant="body2" sx={{ color: 'text.secondary', alignSelf: 'center' }}>
                    Active filters:
                  </Typography>
                  {Object.entries(filters).map(([key, value]) => {
                    if (value) {
                      return (
                        <Chip
                          key={key}
                          label={`${key}: ${value}`}
                          size="small"
                          onDelete={() => handleFilterChange(key, '')}
                          sx={{
                            bgcolor: 'rgba(255, 105, 180, 0.2)',
                            color: 'primary.main',
                            '& .MuiChip-deleteIcon': { color: 'primary.main' }
                          }}
                        />
                      );
                    }
                    return null;
                  })}
                </Stack>
              </Box>
            )}
          </Box>

          {/* Results Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              Showing {paginatedReleases.length} of {processedReleases.length} releases
            </Typography>
          </Box>

          {/* Release Grid */}
          {loading ? (
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {Array.from({ length: itemsPerPage }, (_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
                  <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          ) : processedReleases.length === 0 ? (
            <Alert
              severity="info"
              sx={{
                bgcolor: 'rgba(33, 150, 243, 0.1)',
                border: 1,
                borderColor: 'info.main',
                color: 'white',
                textAlign: 'center',
                py: 4
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                No releases found
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Try adjusting your search terms or filters
              </Typography>
            </Alert>
          ) : (
            <>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                sx={{
                  mb: 4,
                  '& .MuiGrid-item': {
                    display: 'flex'
                  }
                }}
              >
                {paginatedReleases.map((release) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={release.id}>
                    <ReleaseCard
                      release={release}
                      onClick={handleReleaseClick}
                      variant="default"
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    size={isMobile ? 'small' : 'large'}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 105, 180, 0.1)'
                        },
                        '&.Mui-selected': {
                          bgcolor: 'primary.main',
                          color: 'black',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }
                      }
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
};

export default ReleaseHubV1;
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  ButtonGroup,
  Button,
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
  Paper,
  Collapse,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import {
  Search,
  FilterList,
  Sort,
  MenuOpen,
  ViewModule,
  ViewList,
  ExpandMore,
  ExpandLess,
  Star,
  Schedule,
  Person4,
  AutoAwesome
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

const ReleaseHubV2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'year', 'character', 'series'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [gridView, setGridView] = useState(true);
  const [filters, setFilters] = useState({
    year: '',
    character: '',
    series: '',
    tierType: '',
    exclusive: ''
  });

  // Constants
  const itemsPerPage = gridView ? (isMobile ? 6 : isTablet ? 9 : 15) : (isMobile ? 8 : 12);
  const years = getUniqueYears();
  const characters = getUniqueCharacters();
  const series = getUniqueSeries();
  const tierTypes = getTierTypes();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
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

  // Group releases by view mode
  const groupedReleases = useMemo(() => {
    if (viewMode === 'all') {
      return { 'All Releases': processedReleases };
    }

    const groups = {};
    processedReleases.forEach(release => {
      let groupKey;
      switch (viewMode) {
        case 'year':
          groupKey = release.year.toString();
          break;
        case 'character':
          groupKey = release.character;
          break;
        case 'series':
          groupKey = release.series;
          break;
        default:
          groupKey = 'All Releases';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(release);
    });

    return groups;
  }, [processedReleases, viewMode]);

  // Paginate releases for 'all' view
  const paginatedReleases = useMemo(() => {
    if (viewMode !== 'all') return processedReleases;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedReleases.slice(startIndex, startIndex + itemsPerPage);
  }, [processedReleases, currentPage, itemsPerPage, viewMode]);

  const totalPages = viewMode === 'all' ? Math.ceil(processedReleases.length / itemsPerPage) : 1;

  // Handlers
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
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

  const clearAllFilters = () => {
    setFilters({
      year: '',
      character: '',
      series: '',
      tierType: '',
      exclusive: ''
    });
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length + (searchTerm ? 1 : 0);
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
            py: { xs: 2, md: 3 },
            px: { xs: 2, md: 3 },
            maxWidth: 'none',
            width: '100%'
          }}
        >
          {/* Compact Header */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent="space-between"
            sx={{ mb: 4 }}
          >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '3rem' },
                  letterSpacing: '-0.01em',
                  mb: 1,
                  background: 'linear-gradient(135deg, #ff69b4 0%, #a855f7 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ReleaseHub
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  maxWidth: { xs: 300, md: 500 }
                }}
              >
                Professional Monster High release archive for collectors and researchers
              </Typography>
            </Box>

            {/* View Controls */}
            <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, md: 0 } }}>
              <ToggleButtonGroup
                value={gridView}
                exclusive
                onChange={(e, value) => value !== null && setGridView(value)}
                size="small"
                sx={{
                  '& .MuiToggleButton-root': {
                    color: 'text.secondary',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'black'
                    }
                  }
                }}
              >
                <ToggleButton value={true}>
                  <ViewModule />
                </ToggleButton>
                <ToggleButton value={false}>
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>

          {/* Navigation Buttons */}
          <Box sx={{ mb: 3 }}>
            <ButtonGroup
              variant="outlined"
              sx={{
                '& .MuiButton-root': {
                  color: 'text.secondary',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  textTransform: 'none',
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  px: { xs: 2, md: 3 },
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(255, 105, 180, 0.1)'
                  },
                  '&.active': {
                    bgcolor: 'primary.main',
                    color: 'black',
                    borderColor: 'primary.main'
                  }
                }
              }}
            >
              <Button
                className={viewMode === 'all' ? 'active' : ''}
                onClick={() => handleViewModeChange('all')}
                startIcon={<Star />}
              >
                All
              </Button>
              <Button
                className={viewMode === 'year' ? 'active' : ''}
                onClick={() => handleViewModeChange('year')}
                startIcon={<Schedule />}
              >
                By Year
              </Button>
              <Button
                className={viewMode === 'character' ? 'active' : ''}
                onClick={() => handleViewModeChange('character')}
                startIcon={<Person4 />}
              >
                By Character
              </Button>
              <Button
                className={viewMode === 'series' ? 'active' : ''}
                onClick={() => handleViewModeChange('series')}
                startIcon={<AutoAwesome />}
              >
                By Series
              </Button>
            </ButtonGroup>
          </Box>

          {/* Search and Quick Filters */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.02)',
              border: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              p: 2,
              mb: 3
            }}
          >
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Quick search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: 'transparent',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  '& fieldset': { border: 'none' },
                  '& input': { 
                    color: 'white', 
                    py: { xs: 1, md: 1.5 },
                    '&::placeholder': { color: 'text.secondary', opacity: 0.7 }
                  }
                }
              }}
              sx={{ mb: 2 }}
            />

            {/* Filter Toggle */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                startIcon={<FilterList />}
                endIcon={showFilters ? <ExpandLess /> : <ExpandMore />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  fontSize: '0.9rem'
                }}
              >
                Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
              </Button>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {processedReleases.length} releases
                </Typography>
                
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    displayEmpty
                    sx={{
                      color: 'white',
                      fontSize: '0.85rem',
                      '& fieldset': { border: 'none' },
                      '& .MuiSelect-select': { py: 0.5 }
                    }}
                  >
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="name-asc">A–Z</MenuItem>
                    <MenuItem value="name-desc">Z–A</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            {/* Collapsible Filters */}
            <Collapse in={showFilters}>
              <Box sx={{ pt: 2, mt: 2, borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Year</InputLabel>
                      <Select
                        value={filters.year}
                        label="Year"
                        onChange={(e) => handleFilterChange('year', e.target.value)}
                        sx={{
                          color: 'white',
                          fontSize: '0.85rem',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                        }}
                      >
                        <MenuItem value="">All Years</MenuItem>
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Character</InputLabel>
                      <Select
                        value={filters.character}
                        label="Character"
                        onChange={(e) => handleFilterChange('character', e.target.value)}
                        sx={{
                          color: 'white',
                          fontSize: '0.85rem',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                        }}
                      >
                        <MenuItem value="">All Characters</MenuItem>
                        {characters.map((character) => (
                          <MenuItem key={character} value={character}>{character}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Series</InputLabel>
                      <Select
                        value={filters.series}
                        label="Series"
                        onChange={(e) => handleFilterChange('series', e.target.value)}
                        sx={{
                          color: 'white',
                          fontSize: '0.85rem',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                        }}
                      >
                        <MenuItem value="">All Series</MenuItem>
                        {series.map((s) => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Type</InputLabel>
                      <Select
                        value={filters.tierType}
                        label="Type"
                        onChange={(e) => handleFilterChange('tierType', e.target.value)}
                        sx={{
                          color: 'white',
                          fontSize: '0.85rem',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                        }}
                      >
                        <MenuItem value="">All Types</MenuItem>
                        {tierTypes.map((type) => (
                          <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {getActiveFiltersCount() > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={clearAllFilters}
                      sx={{
                        color: 'text.secondary',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        textTransform: 'none',
                        fontSize: '0.8rem'
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </Box>
                )}
              </Box>
            </Collapse>
          </Paper>

          {/* Content Display */}
          {loading ? (
            <Grid container spacing={2}>
              {Array.from({ length: itemsPerPage }, (_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={gridView ? 3 : 6} key={index}>
                  <Skeleton variant="rectangular" height={gridView ? 350 : 200} sx={{ borderRadius: 2 }} />
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
                py: 3
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>Nothing found</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Try adjusting your search or filters
              </Typography>
            </Alert>
          ) : viewMode === 'all' ? (
            <>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {paginatedReleases.map((release) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={gridView ? 4 : 6} 
                    lg={gridView ? 3 : 4} 
                    xl={gridView ? 2.4 : 3}
                    key={release.id}
                  >
                    <ReleaseCard
                      release={release}
                      onClick={handleReleaseClick}
                      variant={gridView ? "default" : "compact"}
                    />
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    size={isMobile ? 'small' : 'medium'}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255, 105, 180, 0.1)' },
                        '&.Mui-selected': {
                          bgcolor: 'primary.main',
                          color: 'black',
                          '&:hover': { bgcolor: 'primary.dark' }
                        }
                      }
                    }}
                  />
                </Box>
              )}
            </>
          ) : (
            // Grouped view
            <Stack spacing={4}>
              {Object.entries(groupedReleases).map(([groupName, releases]) => (
                <Box key={groupName}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      mb: 3,
                      pb: 1,
                      borderBottom: 1,
                      borderColor: 'rgba(255, 105, 180, 0.3)'
                    }}
                  >
                    {groupName} ({releases.length})
                  </Typography>
                  <Grid container spacing={2}>
                    {releases.slice(0, gridView ? 8 : 6).map((release) => (
                      <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={gridView ? 4 : 6} 
                        lg={gridView ? 3 : 4} 
                        key={release.id}
                      >
                        <ReleaseCard
                          release={release}
                          onClick={handleReleaseClick}
                          variant={gridView ? "default" : "compact"}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {releases.length > (gridView ? 8 : 6) && (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          color: 'text.secondary',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          textTransform: 'none'
                        }}
                      >
                        Show {releases.length - (gridView ? 8 : 6)} more
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
};

export default ReleaseHubV2;
import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
  List,
  ListItem,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Badge,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Close, 
  Notifications, 
  Favorite, 
  Comment, 
  PersonAdd, 
  Add,
  MarkEmailRead
} from '@mui/icons-material';

const NotificationsModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);

  const notifications = [
    {
      id: 1,
      type: 'like',
      user: 'WerewolfStyleQueen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      message: 'liked your post "New Collection Alert! 🎉"',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      user: 'ElectricFrankie',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      message: 'commented on your Doll Photography Tips post',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'friend',
      user: 'MummyPrincess',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c8d8c1?w=100&h=100&fit=crop&crop=face',
      message: 'sent you a friend request',
      time: '1 hour ago',
      read: false
    },
    {
      id: 4,
      type: 'collection',
      user: 'SeaMonsterVibes',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      message: 'added a new doll to their Ocean Dreams collection',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'like',
      user: 'GothicCollector',
      avatar: '',
      message: 'liked your vampire collection',
      time: '1 day ago',
      read: true
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return <Favorite sx={{ color: 'error.main' }} />;
      case 'comment': return <Comment sx={{ color: 'info.main' }} />;
      case 'friend': return <PersonAdd sx={{ color: 'success.main' }} />;
      case 'collection': return <Add sx={{ color: 'primary.main' }} />;
      default: return <Notifications sx={{ color: 'secondary.main' }} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const recentNotifications = notifications.filter(n => !n.read);
  const allNotifications = notifications;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const displayNotifications = tabValue === 0 ? allNotifications : recentNotifications;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'rgba(139, 95, 191, 0.3)',
          maxHeight: { xs: '100vh', md: '80vh' }
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 0
      }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Notifications sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Badge badgeContent={unreadCount} color="error" />
          )}
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <Box sx={{ bgcolor: 'background.default' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'rgba(139, 95, 191, 0.2)',
            '& .MuiTab-root': {
              color: 'text.secondary',
              fontSize: { xs: '0.8rem', md: '0.875rem' },
              '&.Mui-selected': { color: 'primary.main' }
            },
            '& .MuiTabs-indicator': { bgcolor: 'primary.main' }
          }}
        >
          <Tab label={`All (${allNotifications.length})`} />
          <Tab label={`Unread (${unreadCount})`} />
        </Tabs>
      </Box>

      <DialogContent sx={{ bgcolor: 'background.default', p: 0 }}>
        <List sx={{ maxHeight: { xs: 'calc(100vh - 200px)', md: 400 }, overflow: 'auto' }}>
          {displayNotifications.length > 0 ? (
            displayNotifications.map((notification) => (
              <ListItem 
                key={notification.id}
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'rgba(255, 105, 180, 0.1)',
                  borderBottom: 1,
                  borderColor: 'rgba(139, 95, 191, 0.1)',
                  py: { xs: 1, md: 1.5 },
                  px: { xs: 1, md: 2 },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ width: '100%' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      src={notification.avatar}
                      sx={{
                        width: { xs: 36, md: 40 },
                        height: { xs: 36, md: 40 },
                        bgcolor: 'primary.main',
                        color: 'black',
                        fontSize: { xs: '0.8rem', md: '0.9rem' }
                      }}
                    >
                      {!notification.avatar && notification.user.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: -2, 
                      right: -2,
                      bgcolor: 'background.default',
                      borderRadius: '50%',
                      p: 0.25
                    }}>
                      {getNotificationIcon(notification.type)}
                    </Box>
                  </Box>

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'white', 
                        mb: 0.5,
                        fontSize: { xs: '0.8rem', md: '0.875rem' }
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {notification.user}
                      </Box>{' '}
                      {notification.message}
                    </Typography>
                    
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: { xs: '0.7rem', md: '0.75rem' }
                        }}
                      >
                        {notification.time}
                      </Typography>
                      
                      {!notification.read && (
                        <Chip 
                          label="New" 
                          size="small" 
                          color="primary"
                          sx={{ 
                            height: { xs: 16, md: 20 },
                            fontSize: { xs: '0.6rem', md: '0.7rem' }
                          }}
                        />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </ListItem>
            ))
          ) : (
            <Box textAlign="center" sx={{ py: 4 }}>
              <Notifications sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {tabValue === 0 ? 'No notifications yet' : 'No unread notifications'}
              </Typography>
            </Box>
          )}
        </List>
      </DialogContent>

      <DialogActions sx={{ 
        bgcolor: 'background.default',
        borderTop: 1,
        borderColor: 'rgba(139, 95, 191, 0.2)',
        p: 2,
        justifyContent: 'space-between'
      }}>
        <Button 
          startIcon={<MarkEmailRead />}
          onClick={() => console.log('Mark all as read')}
          sx={{ color: 'secondary.main' }}
          size="small"
        >
          Mark All Read
        </Button>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{ 
            bgcolor: 'primary.main',
            color: 'black'
          }}
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationsModal;
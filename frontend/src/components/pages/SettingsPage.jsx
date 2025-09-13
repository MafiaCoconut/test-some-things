import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { 
  Security, 
  Notifications, 
  Palette, 
  Person, 
  Shield,
  Delete,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import { mockUserData } from '../../data/mockAppData';

const SettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    notifications: true,
    privacy: false,
    darkMode: true,
    emailUpdates: true,
    friendRequests: true,
    profileVisibility: 'public',
    showEmail: false,
    showStats: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [saveAlert, setSaveAlert] = useState(false);

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeader />
      <LeftMenu />
      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', mt: 8 }}>
        <UserHeader userData={mockUserData.currentUser} />
        
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ color: 'primary.main', mb: 4 }}>
            Settings
          </Typography>

          {saveAlert && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Settings saved successfully!
            </Alert>
          )}

          <Paper sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'rgba(139, 95, 191, 0.2)',
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  '&.Mui-selected': { color: 'primary.main' }
                },
                '& .MuiTabs-indicator': { bgcolor: 'primary.main' }
              }}
            >
              <Tab icon={<Person />} label="Profile" />
              <Tab icon={<Security />} label="Security" />
              <Tab icon={<Notifications />} label="Notifications" />
              <Tab icon={<Shield />} label="Privacy" />
              <Tab icon={<Palette />} label="Appearance" />
            </Tabs>

            {/* Profile Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Profile Settings
                </Typography>
                
                <Stack spacing={3}>
                  <TextField
                    label="Display Name"
                    defaultValue={mockUserData.currentUser.username}
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    defaultValue={mockUserData.currentUser.email}
                    fullWidth
                    type="email"
                  />
                  <TextField
                    label="Bio"
                    defaultValue={mockUserData.currentUser.bio}
                    fullWidth
                    multiline
                    rows={4}
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.showEmail}
                        onChange={() => handleSettingChange('showEmail')}
                      />
                    }
                    label="Show email on profile"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.showStats}
                        onChange={() => handleSettingChange('showStats')}
                      />
                    }
                    label="Show collection stats"
                  />
                </Stack>
              </Box>
            </TabPanel>

            {/* Security Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Security Settings
                </Typography>
                
                <Stack spacing={3}>
                  <TextField
                    label="Current Password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                  <TextField
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.new}
                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}  
                    value={passwords.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                    fullWidth
                  />
                  
                  <Divider />
                  
                  <Typography variant="subtitle1" sx={{ color: 'warning.main' }}>
                    Active Sessions
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Current Device"
                        secondary="Chrome on Windows - Active now"
                      />
                      <ListItemSecondaryAction>
                        <Button color="error" size="small">Revoke</Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Stack>
              </Box>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Notification Preferences
                </Typography>
                
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.notifications}
                        onChange={() => handleSettingChange('notifications')}
                      />
                    }
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.emailUpdates}
                        onChange={() => handleSettingChange('emailUpdates')}
                      />
                    }
                    label="Email Updates"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.friendRequests}
                        onChange={() => handleSettingChange('friendRequests')}
                      />
                    }
                    label="Friend Request Notifications"
                  />
                </Stack>
              </Box>
            </TabPanel>

            {/* Privacy Tab */}
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Privacy Settings
                </Typography>
                
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.privacy}
                        onChange={() => handleSettingChange('privacy')}
                      />
                    }
                    label="Private Profile"
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4 }}>
                    Only friends can see your posts and collections
                  </Typography>
                </Stack>
              </Box>
            </TabPanel>

            {/* Appearance Tab */}
            <TabPanel value={tabValue} index={4}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
                  Appearance Settings
                </Typography>
                
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.darkMode}
                        onChange={() => handleSettingChange('darkMode')}
                      />
                    }
                    label="Dark Mode"
                  />
                </Stack>
              </Box>
            </TabPanel>

            <Box sx={{ p: 3, borderTop: 1, borderColor: 'rgba(139, 95, 191, 0.2)' }}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" color="error" startIcon={<Delete />}>
                  Delete Account
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleSaveSettings}
                  sx={{ bgcolor: 'primary.main', color: 'black' }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
};

export default SettingsPage;
import { useState } from 'react'
import { Amplify } from 'aws-amplify'
import { signOut } from 'aws-amplify/auth'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography, IconButton, Button } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import awsconfig from './aws-exports'
import ServiceRequestForm from './components/ServiceRequestForm'
import ServiceRequestList from './components/ServiceRequestList'
import './App.css'

Amplify.configure(awsconfig)

function App() {
  const [refreshList, setRefreshList] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  const handleSubmitSuccess = () => {
    setRefreshList(prev => !prev)
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ 
          position: 'fixed', 
          top: 16, 
          right: 16, 
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            size="small"
          >
            Logout
          </Button>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Service Request Portal
          </Typography>

          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { md: '1fr', lg: '1fr 1fr' } }}>
            <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Submit New Service Request
              </Typography>
              <ServiceRequestForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>

            <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <ServiceRequestList refreshTrigger={refreshList} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default withAuthenticator(App)

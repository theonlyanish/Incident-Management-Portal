import { useState, useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography, Button, IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import awsconfig from './aws-exports'
import ServiceRequestForm from './components/ServiceRequestForm'
import ServiceRequestList from './components/ServiceRequestList'
import { createSampleRequests } from './utils/createSampleData'
import './App.css'

Amplify.configure(awsconfig)

function App() {
  const [refreshList, setRefreshList] = useState(false)
  const [generatingSamples, setGeneratingSamples] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  const handleSubmitSuccess = () => {
    setRefreshList(prev => !prev)
  }

  const handleGenerateSamples = async () => {
    setGeneratingSamples(true)
    try {
      await createSampleRequests()
      setRefreshList(prev => !prev)
    } catch (error) {
      console.error('Error generating samples:', error)
    } finally {
      setGeneratingSamples(false)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1 }}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Service Request Portal
          </Typography>
          
          <Button
            variant="contained"
            onClick={handleGenerateSamples}
            disabled={generatingSamples}
            sx={{ mb: 4 }}
          >
            {generatingSamples ? 'Generating...' : 'Generate Sample Data'}
          </Button>

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

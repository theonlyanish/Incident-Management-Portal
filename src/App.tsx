import { useState, useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsconfig from './aws-exports'
import ServiceRequestForm from './components/ServiceRequestForm'
import ServiceRequestList from './components/ServiceRequestList'
import { createSampleRequests } from './utils/createSampleData'
import './App.css'

Amplify.configure(awsconfig)

function App() {
  const [refreshList, setRefreshList] = useState(false)
  const [generatingSamples, setGeneratingSamples] = useState(false)
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

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
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </span>
        <button
          onClick={toggleDarkMode}
          className="rounded-lg bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">Service Request Portal</h1>
        
        <button
          onClick={handleGenerateSamples}
          disabled={generatingSamples}
          className="mb-8 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {generatingSamples ? 'Generating...' : 'Generate Sample Data'}
        </button>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Submit New Service Request</h2>
            <ServiceRequestForm onSubmitSuccess={handleSubmitSuccess} />
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Service Requests</h2>
            <ServiceRequestList refreshTrigger={refreshList} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthenticator(App)

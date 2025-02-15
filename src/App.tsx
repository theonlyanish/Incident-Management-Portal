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
      <header className="bg-white shadow dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Request Portal</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white
                         hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleGenerateSamples}
                disabled={generatingSamples}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                         text-white bg-indigo-600 hover:bg-indigo-700 
                         dark:bg-indigo-500 dark:hover:bg-indigo-600
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                         dark:focus:ring-offset-gray-900
                         disabled:opacity-50 transition-colors duration-200"
              >
                {generatingSamples ? 'Generating...' : 'Generate Sample Data'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-6 dark:bg-gray-800 transition-colors duration-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Submit New Service Request</h2>
            <ServiceRequestForm onSubmitSuccess={handleSubmitSuccess} />
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 transition-colors duration-200">
            <ServiceRequestList key={String(refreshList)} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default withAuthenticator(App)

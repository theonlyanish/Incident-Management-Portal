import { useState } from 'react'
import { Amplify } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsconfig from './aws-exports'
import ServiceRequestForm from './components/ServiceRequestForm'
import ServiceRequestList from './components/ServiceRequestList'
import './App.css'

Amplify.configure(awsconfig)

function App() {
  const [refreshList, setRefreshList] = useState(false)

  const handleSubmitSuccess = () => {
    setRefreshList(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Request Portal</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Submit New Service Request</h2>
            <ServiceRequestForm onSubmitSuccess={handleSubmitSuccess} />
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <ServiceRequestList key={String(refreshList)} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default withAuthenticator(App)

import { useState, useEffect } from 'react'
import axios from 'axios'
import { ThemeProvider } from './contexts/ThemeContext'
import AppHeader from './components/AppHeader'
import ResourcesModal from './components/ResourcesModal'
import AddResourceForm from './components/AddResourceForm'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [showResourcesModal, setShowResourcesModal] = useState(false)

  // Fetch resources on component mount
  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      const response = await axios.get('/api/resources')
      setResources(response.data)
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddResource = async (newResource) => {
    try {
      const response = await axios.post('/api/resources', newResource)
      setResources([response.data, ...resources])
    } catch (error) {
      console.error('Error adding resource:', error)
    }
  }

  const handleUpdateResource = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/resources/${id}`, updatedData)
      setResources(resources.map(r => r._id === id ? response.data : r))
    } catch (error) {
      console.error('Error updating resource:', error)
    }
  }

  const handleRemoveResource = async (id) => {
    try {
      await axios.delete(`/api/resources/${id}`)
      setResources(resources.filter(r => r._id !== id))
    } catch (error) {
      console.error('Error removing resource:', error)
    }
  }

  const handleToggleCheck = async (id, isChecked) => {
    try {
      const response = await axios.patch(`/api/resources/${id}/check`, { isChecked })
      setResources(resources.map(r => r._id === id ? response.data : r))
    } catch (error) {
      console.error('Error updating resource check:', error)
    }
  }

  return (
    <ThemeProvider>
      <div className="app-container">
        <AppHeader 
          resourceCount={resources.length}
          onOpenResources={() => setShowResourcesModal(true)}
        />

        <main className="app-main">
          <div className="app-content">
            <AddResourceForm onAddResource={handleAddResource} />
          </div>
        </main>

        {showResourcesModal && (
          <ResourcesModal
            isOpen={showResourcesModal}
            onClose={() => setShowResourcesModal(false)}
            resources={resources}
            onUpdateResource={handleUpdateResource}
            onRemoveResource={handleRemoveResource}
            onToggleCheck={handleToggleCheck}
          />
        )}

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

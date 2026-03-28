import { useState } from 'react'
import ResourceCard from './ResourceCard'
import './ResourcesModal.css'

function ResourcesModal({ isOpen, onClose, resources, onUpdateResource, onRemoveResource, onToggleCheck }) {
  const [expandedDates, setExpandedDates] = useState({})

  // Group resources by date
  const groupResourcesByDate = () => {
    const grouped = {}

    resources.forEach(resource => {
      const date = new Date(resource.createdAt)
      const dateKey = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(resource)
    })

    return grouped
  }

  const toggleDateExpand = (dateKey) => {
    setExpandedDates(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey]
    }))
  }

  const isTodayDate = (dateString) => {
    const today = new Date()
    const resourceDate = new Date(dateString)
    return (
      today.getDate() === resourceDate.getDate() &&
      today.getMonth() === resourceDate.getMonth() &&
      today.getFullYear() === resourceDate.getFullYear()
    )
  }

  const formatDateLabel = (dateString) => {
    if (isTodayDate(dateString)) {
      return 'Today'
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const resourceDate = new Date(dateString)

    if (
      yesterday.getDate() === resourceDate.getDate() &&
      yesterday.getMonth() === resourceDate.getMonth() &&
      yesterday.getFullYear() === resourceDate.getFullYear()
    ) {
      return 'Yesterday'
    }

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const groupedResources = groupResourcesByDate()
  const sortedDates = Object.keys(groupedResources).sort(
    (a, b) => new Date(b) - new Date(a)
  )

  if (!isOpen) return null

  return (
    <div className="resources-modal-overlay" onClick={onClose}>
      <div className="resources-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📋 My Resources</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {resources.length === 0 ? (
            <div className="empty-state-modal">
              <p>📭 No resources yet. Start adding resources to get started!</p>
            </div>
          ) : (
            <div className="resources-by-date">
              {sortedDates.map(dateKey => {
                const isExpanded = expandedDates[dateKey] !== false
                const resourcesForDate = groupedResources[dateKey]

                return (
                  <div key={dateKey} className="date-group">
                    <button
                      className="date-header"
                      onClick={() => toggleDateExpand(dateKey)}
                    >
                      <span className="date-label">
                        {formatDateLabel(resourcesForDate[0].createdAt)}
                      </span>
                      <span className="resource-count-badge">
                        {resourcesForDate.length} item{resourcesForDate.length !== 1 ? 's' : ''}
                      </span>
                      <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="date-resources">
                        {resourcesForDate.map((resource, index) => (
                          <ResourceCard
                            key={resource._id}
                            resource={resource}
                            index={index}
                            onUpdate={onUpdateResource}
                            onRemove={onRemoveResource}
                            onToggleCheck={onToggleCheck}
                            isCompact={true}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResourcesModal

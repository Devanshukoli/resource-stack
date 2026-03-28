import { useState } from 'react'
import FeedbackModal from './FeedbackModal'
import './ResourceCard.css'

function ResourceCard({ resource, index, onUpdate, onRemove, onToggleCheck, isCompact = false }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(resource.title)
  const [editContent, setEditContent] = useState(resource.content)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  const handleSaveEdit = () => {
    onUpdate(resource._id, {
      title: editTitle,
      content: editContent
    })
    setIsEditing(false)
  }

  const handleRemoveClick = () => {
    setShowFeedbackModal(true)
  }

  const handleConfirmRemove = (feedback) => {
    // Save feedback first if provided
    if (feedback.trim()) {
      onUpdate(resource._id, {
        feedback: feedback
      })
    }
    // Then remove the resource
    setTimeout(() => onRemove(resource._id), 100)
  }

  const getResourcePreview = () => {
    const lines = resource.content.split('\n')
    return lines[0]?.substring(0, 50) || 'No content'
  }

  return (
    <>
      <div className={`resource-card ${resource.isChecked ? 'checked' : ''}`}>
        <div className="card-header">
          <input
            type="checkbox"
            className="resource-checkbox"
            checked={resource.isChecked || false}
            onChange={(e) => onToggleCheck(resource._id, e.target.checked)}
            title="Mark as done"
          />
          <h3 className="resource-title">{resource.title}</h3>
          {!isCompact && <span className="card-index">#{index + 1}</span>}
        </div>

        <div className="card-body">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-title"
                placeholder="Resource title"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="edit-content"
                placeholder="Resource content (text, links, etc.)"
                rows="4"
              />
              <div className="edit-actions">
                <button className="btn-save" onClick={handleSaveEdit}>
                  ✓ Save
                </button>
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                  ✕ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="content-preview">
              <p>{getResourcePreview()}</p>
              {resource.content.length > 50 && <span className="more-indicator">...</span>}
              {resource.feedback && (
                <div className="feedback-badge">
                  📝 Has feedback
                </div>
              )}
            </div>
          )}
        </div>

        <div className="card-footer">
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            ✎ Edit
          </button>
          <button className="btn-remove" onClick={handleRemoveClick}>
            🗑 Remove
          </button>
        </div>
      </div>

      {showFeedbackModal && (
        <FeedbackModal
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleConfirmRemove}
          resourceTitle={resource.title}
        />
      )}
    </>
  )
}

export default ResourceCard

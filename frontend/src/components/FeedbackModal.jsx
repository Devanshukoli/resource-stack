import { useState } from 'react'
import './FeedbackModal.css'

function FeedbackModal({ onClose, onSubmit, resourceTitle }) {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(feedback)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Feedback/Notes</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p className="resource-info">
              Removing: <strong>{resourceTitle}</strong>
            </p>
            <label htmlFor="feedback">
              Feedback or notes (optional - text, links, etc.):
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add any feedback, notes, or observations before removing this resource..."
              className="feedback-textarea"
              rows="6"
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel-modal" onClick={onClose}>
              ✕ Cancel
            </button>
            <button type="submit" className="btn-remove-modal">
              🗑 Remove Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackModal

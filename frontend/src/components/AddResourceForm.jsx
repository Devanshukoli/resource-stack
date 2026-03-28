import { useState } from 'react'
import './AddResourceForm.css'

function AddResourceForm({ onAddResource }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content')
      return
    }

    setIsLoading(true)
    try {
      await onAddResource({
        title: title.trim(),
        content: content.trim(),
        isChecked: false
      })
      setTitle('')
      setContent('')
    } catch (error) {
      alert('Error adding resource. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="add-resource-form">
      <h2>➕ Add New Resource</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter resource title..."
            disabled={isLoading}
            maxLength="100"
          />
          <span className="char-count">{title.length}/100</span>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content (text, links, etc.)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your content here..."
            rows="5"
            disabled={isLoading}
          />
          <span className="char-count">{content.length} characters</span>
        </div>

        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? '⏳ Adding...' : '➕ Add Resource'}
        </button>
      </form>
    </div>
  )
}

export default AddResourceForm

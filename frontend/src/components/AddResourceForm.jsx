import { useState } from 'react'
import axios from 'axios'
import './AddResourceForm.css'

function AddResourceForm({ onAddResource }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [pastedImageIds, setPastedImageIds] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            e.preventDefault();
            const file = items[i].getAsFile();
            const formData = new FormData();
            formData.append('image', file);
            
            try {
                // To show loading state inline maybe
                const uploadingText = '\n![Uploading image...]()';
                setContent(prev => prev + uploadingText);
                setIsLoading(true);

                const res = await axios.post('/api/images', formData, {
                  headers: { 'Content-Type': 'multipart/form-data' }
                });
                
                const data = res.data;
                if (data.url) {
                   setPastedImageIds(prev => [...prev, data.id]);
                   setContent(prev => prev.replace(uploadingText, `\n![Image](${data.url})\n`));
                }
            } catch (err) {
                alert('Failed to upload image');
                setContent(prev => prev.replace('\n![Uploading image...]()', ''));
            } finally {
                setIsLoading(false);
            }
        }
    }
  };

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
        isChecked: false,
        imageIds: pastedImageIds
      })
      setTitle('')
      setContent('')
      setPastedImageIds([])
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
            onPaste={handlePaste}
            placeholder="Paste your content or images here..."
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

# Developer Guide - Extending Resource Stack

## 🎨 Theming System

The app supports light and dark themes using CSS custom properties. Theme state is managed via React Context (`ThemeContext`) and persisted in localStorage.

### Adding Theme Support to New Components

1. Use theme variables in CSS:
   ```css
   .my-component {
     background: var(--card-bg);
     color: var(--text-color);
     border: 1px solid var(--input-border);
   }
   ```

2. Available theme variables:
   - `--bg-color`: Page background
   - `--text-color`: Primary text color
   - `--card-bg`: Card/component backgrounds
   - `--input-bg`: Form input backgrounds
   - `--input-border`: Form input borders
   - `--header-bg`: Header background (gradient)

3. Theme toggle automatically applies `.dark-theme` class to `<body>` for dark mode styles.

## 🔧 How to Add Features

### Feature: Add Categories/Tags

#### 1. Update Backend (Resource Model)

Edit [backend/src/models/Resource.js](backend/src/models/Resource.js):

```javascript
const resourceSchema = new mongoose.Schema({
  // ... existing fields ...
  category: {
    type: String,
    default: 'General',
    enum: ['General', 'Article', 'Video', 'Image', 'Tool', 'Other']
  },
  tags: {
    type: [String],
    default: []
  }
});
```

#### 2. Update Frontend (AddResourceForm)

Add a select input for category and multi-input for tags.

#### 3. Update API Response

The API will automatically include new fields in responses.

#### 4. Update Frontend Component

Update [frontend/src/components/ResourceCard.jsx](frontend/src/components/ResourceCard.jsx) to display category.

---

### Feature: Add Search/Filter

#### 1. Backend Route

In [backend/src/routes/resourceRoutes.js](backend/src/routes/resourceRoutes.js):

```javascript
// Add search parameter support
router.get('/', async (req, res) => {
  const { search, category } = req.query;
  let query = {};
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (category) {
    query.category = category;
  }
  
  const resources = await Resource.find(query).sort({ createdAt: -1 });
  res.json(resources);
});
```

#### 2. Frontend Search Input

Add search box in [frontend/src/components/AddResourceForm.jsx](frontend/src/components/AddResourceForm.jsx) or create new SearchBar component.

#### 3. Filter Logic

Update App.jsx to pass search term to API:

```javascript
const [searchTerm, setSearchTerm] = useState('');

const fetchResources = async (search = '') => {
  const response = await axios.get('/api/resources', {
    params: { search }
  });
  setResources(response.data);
};
```

---

### Feature: Add User Authentication

#### 1. Backend Setup

Install dependencies:
```bash
npm install jsonwebtoken bcryptjs
```

#### 2. Create User Model

Create [backend/src/models/User.js](backend/src/models/User.js):

```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

#### 3. Add Auth Routes

Create [backend/src/routes/authRoutes.js](backend/src/routes/authRoutes.js) with:
- POST /auth/register
- POST /auth/login

#### 4. Protect Resource Routes

Add middleware to verify JWT token before accessing resources.

#### 5. Frontend Login Page

Create [frontend/src/pages/Login.jsx](frontend/src/pages/Login.jsx) with form.

#### 6. Store JWT Token

Save token in localStorage and attach to API requests:

```javascript
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

---

### Feature: Add Export/Import

#### 1. Export as JSON

```javascript
// In App.jsx or new ExportComponent.jsx
const exportResources = () => {
  const dataStr = JSON.stringify(resources, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resources_${new Date().toISOString()}.json`;
  link.click();
};
```

#### 2. Import Resources

```javascript
const importResources = async (file) => {
  const text = await file.text();
  const imported = JSON.parse(text);
  
  // Create all imported resources
  for (const resource of imported) {
    await axios.post('/api/resources', resource);
  }
  
  // Refresh list
  fetchResources();
};
```

---

### Feature: Add Dark Mode

#### 1. Create Theme Provider

```javascript
// frontend/src/context/ThemeContext.jsx
const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark-mode' : 'light-mode'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
```

#### 2. Add CSS Variables

```css
/* index.css */
:root.light-mode {
  --bg-primary: white;
  --text-primary: #111827;
}

:root.dark-mode {
  --bg-primary: #1f2937;
  --text-primary: #f3f4f6;
}
```

#### 3. Update Components

Use CSS variables instead of hardcoded colors.

---

### Feature: Add Bulk Operations

#### 1. Multi-select Checkboxes

Add state for selected resources in App.jsx.

#### 2. Bulk Delete

Add endpoint in backend:
```javascript
router.delete('/', async (req, res) => {
  const { ids } = req.body;
  await Resource.deleteMany({ _id: { $in: ids } });
  res.json({ message: 'Deleted successfully' });
});
```

#### 3. Bulk Update

Move multiple resources to same category, add same tag, etc.

---

## 📊 Database Optimization

### Add Indexes

In [backend/src/models/Resource.js](backend/src/models/Resource.js):

```javascript
resourceSchema.index({ createdAt: -1 });
resourceSchema.index({ title: 'text', content: 'text' }); // For full-text search
```

### Add Pagination

```javascript
const page = req.query.page || 1;
const limit = 10;
const skip = (page - 1) * limit;

const resources = await Resource
  .find(query)
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });
```

---

## 🎨 UI Enhancements

### Add Drag & Drop Reordering

Use library like `react-beautiful-dnd`:

```bash
npm install react-beautiful-dnd
```

### Add Rich Text Editor

Use library like `react-quill`:

```bash
npm install react-quill quill
```

### Add Image Upload

```javascript
// In ResourceCard.jsx
const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post('/api/upload', formData);
  // Store image URL in resource
};
```

---

## 🔍 Testing

### Backend Unit Tests

Create [backend/test/resource.test.js](backend/test/resource.test.js):

```javascript
const jest = require('jest');
const request = require('supertest');

describe('Resource API', () => {
  test('GET /resources should return array', async () => {
    const res = await request(app).get('/resources');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

### Frontend Component Tests

Create [frontend/src/components/__tests__/ResourceCard.test.js](frontend/src/components/__tests__/ResourceCard.test.js):

```javascript
import { render, screen } from '@testing-library/react';
import ResourceCard from '../ResourceCard';

test('renders resource title', () => {
  render(<ResourceCard resource={{ title: 'Test' }} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy

### Backend Deployment (Heroku)

1. Create Heroku app
2. Connect MongoDB Atlas
3. Deploy from GitHub
4. Update frontend API URL

### Database Deployment (MongoDB Atlas)

1. Create free cluster
2. Set up IP whitelist
3. Get connection string
4. Update `.env`

---

## 📝 Code Style Guide

### File Naming
- Components: `PascalCase` (ResourceCard.jsx)
- Utils: `camelCase` (useApi.js)
- Styles: `kebab-case.css` (resource-card.css)

### Component Structure
```javascript
// Imports
import React, { useState } from 'react'
import axios from 'axios'
import './ComponentName.css'

// Component
function ComponentName({ prop1, prop2 }) {
  // State
  const [state, setState] = useState(null)
  
  // Effects
  useEffect(() => {
    // Setup
  }, [])
  
  // Handlers
  const handleAction = () => {}
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// Export
export default ComponentName
```

### Comments
```javascript
// Simple comment for one line
// Multiple lines of comments
// should be formatted this way

/* Complex multiline comment
   can use block style
   for better readability */
```

---

## 🐛 Common Issues & Solutions

### MongoDB Connection Issues
- Check connection string format
- Verify IP is whitelisted (MongoDB Atlas)
- Use correct database name

### CORS Errors
- Ensure backend has CORS enabled
- Check frontend URL in CORS_ORIGIN
- Both servers running on correct ports

### State Not Updating
- Check that setState is called with new object
- Verify key prop in maps
- Check useEffect dependencies

### Button Not Responding
- Verify onClick handler is bound
- Check if button is disabled
- Check browser console for errors

---

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Vite Guide](https://vitejs.dev)

---

## 🎓 Learning Path for This Project

1. **Understand the Stack**: Review [ARCHITECTURE.md](ARCHITECTURE.md)
2. **Run the App**: Follow [QUICKSTART.md](QUICKSTART.md)
3. **Explore Code**: Read through frontend and backend files
4. **Try Changes**: Modify a simple feature (like button text)
5. **Add Feature**: Implement one of the features above
6. **Deploy**: Push to production

---

Keep coding and have fun extending this project! 🚀

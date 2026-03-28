# Resource Stack - Architecture & Features Overview

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    HTTP/REST API
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
┌───────▼──────────────┐          ┌──────────▼─────────────┐
│   FRONTEND (Vite)    │          │  BACKEND (Express)     │
│   - React Components │          │  - API Routes          │
│   - State Management │          │  - Controllers         │
│   - UI/UX            │          │  - Models              │
└──────────────────────┘          └──────────┬─────────────┘
                                             │
                                      MongoDB Driver
                                             │
                          ┌──────────────────▼──────────────────┐
                          │      MongoDB Database               │
                          │  Collections:                       │
                          │  - resources (Resource docs)        │
                          └─────────────────────────────────────┘
```

## 📱 Frontend Architecture

```
App (Main Component)
├── State: [resources, loading]
├── Effects: fetchResources on mount
│
├── AddResourceForm
│   └── Handles: Adding new resources
│       Input: title, content
│       Action: POST /api/resources
│
└── ResourceStack
    └── Maps over resources
        └── ResourceCard (for each resource)
            ├── Displays: title, content preview, checkbox
            ├── Actions: Edit, Check, Remove
            ├── Edit Mode: Shows textarea for editing
            │   Action: PUT /api/resources/:id
            │
            ├── Check: Toggle checkbox
            │   Action: PATCH /api/resources/:id/check
            │
            └── Remove: Opens FeedbackModal
                └── FeedbackModal
                    ├── Input: User feedback/notes
                    └── Action: DELETE /api/resources/:id
```

## 🔌 Backend API Routes

```
App (Express Server)
│
├── GET  /resources           → Get all resources
├── GET  /resources/:id       → Get single resource
├── POST /resources           → Create new resource
│   Body: { title, content, isChecked?, feedback? }
│
├── PUT /resources/:id        → Update resource
│   Body: { title?, content?, feedback?, isChecked? }
│
├── PATCH /resources/:id/check → Toggle check status
│   Body: { isChecked: boolean }
│
└── DELETE /resources/:id     → Delete resource
```

## 📦 Data Model

### Resource Document (MongoDB)

```json
{
  "_id": "ObjectId",
  "title": "String (max 200 chars)",
  "content": "String (text, links, etc)",
  "feedback": "String (notes before deletion)",
  "isChecked": "Boolean (default: false)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

## 🎨 Component Hierarchy

```
App/
├── AddResourceForm/
│   ├── Input fields (title, content)
│   ├── Character counters
│   └── Submit button
│
└── ResourceStack/
    └── ResourceCard[] (map over resources)
        ├── Header
        │   ├── Checkbox (toggle isChecked)
        │   ├── Title
        │   └── Index badge
        │
        ├── Body (Normal View)
        │   ├── Content preview (first 50 chars)
        │   └── Feedback badge (if feedback exists)
        │
        ├── Body (Edit View)
        │   ├── Title input
        │   ├── Content textarea
        │   └── Save/Cancel buttons
        │
        └── Footer
            ├── Edit button → Toggle edit mode
            └── Remove button → Open FeedbackModal
```

## 🔄 User Workflow

### Adding a Resource
```
User fills form → Click "Add Resource"
            ↓
Frontend validates input
            ↓
POST /resources (with title, content)
            ↓
Backend creates MongoDB document
            ↓
Returns created resource
            ↓
Frontend updates state & displays resource
```

### Editing a Resource
```
User clicks "Edit" on card
            ↓
ResourceCard enters edit mode
            ↓
User modifies title/content
            ↓
User clicks "Save"
            ↓
PUT /resources/:id (with updated data)
            ↓
Backend updates MongoDB document
            ↓
Frontend updates state & exits edit mode
```

### Checking a Resource
```
User clicks checkbox
            ↓
PATCH /resources/:id/check (with isChecked)
            ↓
Backend updates isChecked field
            ↓
Frontend updates UI (strike-through effect)
```

### Removing a Resource
```
User clicks "Remove"
            ↓
FeedbackModal opens
            ↓
User types feedback (optional)
            ↓
User clicks "Remove Resource"
            ↓
PUT /resources/:id (save feedback)
            ↓
DELETE /resources/:id (remove resource)
            ↓
Backend deletes MongoDB document
            ↓
Frontend removes from state
```

## 🎯 Key Features Implementation

### 1. Stack-based UI
- Vector layout with flex
- Cards display in reverse order (newest on top)
- CSS transforms for depth effect
- Smooth animations on add

### 2. Checkbox Layer
- Checkbox input on each card
- Updates isChecked on backend
- Visual feedback (opacity, strikethrough)
- PATCH endpoint for efficiency

### 3. Editable Resources
- Toggle edit mode on ResourceCard
- Textarea for content editing
- Save/Cancel buttons
- Full PUT update to backend

### 4. Feedback Modal
- Modal overlay with form
- Optional feedback text input
- Opens before deletion
- Saves feedback before deleting

### 5. Multi-media Support
- Content field accepts any text
- Can store links, descriptions, etc
- Frontend displays as plain text
- Backend stores as String

## 📊 State Management Flow

```
App Component
    ↓
useState: resources (array of Resource objects)
    ↓
useEffect: Fetch on mount
    ↓
Functions:
├── handleAddResource
├── handleUpdateResource
├── handleRemoveResource
└── handleToggleCheck
    ↓
Pass down to components
as props (onAddResource, onUpdate, etc)
    ↓
Components call these functions
on user actions
```

## 🔐 Error Handling

### Frontend
- Try-catch in async operations
- Alerts for validation errors
- Console logging for debugging

### Backend
- Express error middleware
- Validation in controllers
- Mongoose schema validation
- JSON error responses

## 🚀 Performance Considerations

1. **Frontend**
   - Virtual scrolling for large lists (future enhancement)
   - Lazy loading images from links (future enhancement)
   - CSS animations use GPU acceleration

2. **Backend**
   - MongoDB indexes on common queries
   - Timestamps for sorting efficiency
   - Minimal payload responses

3. **API Communication**
   - Only fetch full resources on mount
   - Targeted updates with PUT/PATCH
   - Proper HTTP status codes

## 📈 Scalability Improvements

Future enhancements:
- User authentication & per-user resources
- Categories/tags for organization
- Search functionality
- Resource sharing
- Export/import resources
- Dark mode toggle

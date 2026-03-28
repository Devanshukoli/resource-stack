# Resource Stack - A Modern Web Application for Managing Resources

A full-stack web application for organizing and managing various types of resources (images, videos, text, links, etc.) with a beautiful stack-based UI.

**Live Demo**: Coming Soon

## 🎯 Features

- ✅ **Stack-based UI**: Organize resources in a visual stack
- ✅ **Checkbox Layer**: Mark resources as completed
- ✅ **Editable Resources**: Edit resource title and content anytime
- ✅ **Feedback System**: Add notes/feedback before removing resources
- ✅ **Multi-media Support**: Store text, links, images, videos, and more
- ✅ **Persistent Storage**: MongoDB database integration
- ✅ **RESTful API**: Complete backend API with Express.js
- ✅ **Modern UI**: React + Vite with beautiful styling
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing

## 📂 Project Structure

```
resource-stack/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── App.jsx     # Main App component
│   │   ├── main.jsx    # Entry point
│   │   └── index.css   # Global styles
│   ├── package.json
│   └── vite.config.js
├── backend/            # Node.js + Express API
│   ├── src/
│   │   ├── config/     # Database config
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # API routes
│   │   └── controllers/# Route handlers
│   ├── server.js       # Express server
│   └── package.json
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/resource-stack
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📖 API Documentation

### Resources Endpoints

#### Get All Resources
```
GET /resources
Response: Array of Resource objects
```

#### Get Single Resource
```
GET /resources/:id
Response: Resource object
```

#### Create Resource
```
POST /resources
Body: { title, content, isChecked?, feedback? }
Response: Created Resource object
```

#### Update Resource
```
PUT /resources/:id
Body: { title?, content?, feedback?, isChecked? }
Response: Updated Resource object
```

#### Toggle Check Status
```
PATCH /resources/:id/check
Body: { isChecked: boolean }
Response: Updated Resource object
```

#### Delete Resource
```
DELETE /resources/:id
Response: { message: "Resource deleted successfully" }
```

## 📊 Resource Model

```javascript
{
  _id: ObjectId,
  title: String,              // Resource title (max 200 chars)
  content: String,            // Resource content (text, links, etc)
  feedback: String,           // Notes/feedback before deletion
  isChecked: Boolean,         // Completion status
  createdAt: Date,           // Creation timestamp
  updatedAt: Date            // Last update timestamp
}
```

## 🎨 Component Structure

### Frontend Components

- **App**: Main application component, handles state and API communication
- **ResourceStack**: Container for all resources
- **ResourceCard**: Individual resource display with edit/delete actions
- **AddResourceForm**: Form to add new resources
- **FeedbackModal**: Modal for adding feedback before deletion

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/resource-stack
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Frontend (vite.config.js)**
- API proxy is configured to forward requests to `http://localhost:5000`

## 📝 Usage

1. **Add Resource**: Click "Add New Resource", fill in title and content, and click "Add Resource"
2. **Edit Resource**: Click "Edit" on any resource card to modify its content
3. **Check Resource**: Click the checkbox to mark a resource as completed
4. **Remove Resource**: Click "Remove" to delete a resource. A modal will open for feedback
5. **Add Feedback**: (Optional) Type feedback or notes before confirming deletion

## 🚀 Production Build

### Frontend
```bash
cd frontend
npm run build
```

This creates an optimized build in `dist/` directory.

### Backend
Set `NODE_ENV=production` and ensure MongoDB is properly configured for production use.

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your connection string
- For MongoDB Atlas, use the full connection string with credentials

### CORS Errors
- Check that frontend URL matches `CORS_ORIGIN` in backend `.env`
- Ensure both servers are running on the correct ports

### API not responding
- Verify backend server is running on port 5000
- Check network tab in browser DevTools for error details

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Happy resource organizing!** 🎉

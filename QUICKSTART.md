# Quick Start Guide 🚀

## Installation & Setup

### Step 1: Backend Setup (5 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server (with auto-reload using nodemon)
npm run dev
```

✅ Backend will be running at: http://localhost:5000

### Step 2: Frontend Setup (5 minutes)

```bash
# In a new terminal, navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend will be available at: http://localhost:5173

### Step 3: Verify Everything Works

1. Open http://localhost:5173 in your browser
2. You should see the "Resource Stack" app
3. Try adding a resource to verify the backend connection

## Environment Setup

### MongoDB Setup (if running locally)

**Windows:**
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and run MongoDB
3. Default connection: `mongodb://localhost:27017/resource-stack`

**For MongoDB Atlas (Cloud):**
1. Create a free account at https://mongodb.com/cloud/atlas
2. Create a cluster
3. Update `.env` with your connection string

## Scripts Reference

**Backend:**
- `npm start` - Run in production
- `npm run dev` - Run with nodemon (auto-reload on file changes)

**Frontend:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build

## Troubleshooting

**Backend won't start?**
- Check if port 5000 is already in use
- Verify MongoDB is running
- Check console for connection errors

**Frontend won't connect to backend?**
- Ensure backend is running on port 5000
- Check browser DevTools Network tab for API errors
- Verify CORS_ORIGIN in backend .env matches frontend URL

**Blank page on frontend?**
- Open browser DevTools (F12) → Console to see errors
- Check if Vite dev server is running properly
- Try clearing browser cache

## Features to Try

1. **Add Resource** - Paste text, links, or describe any resource
2. **Edit** - Click edit to modify the resource
3. **Check** - Mark resources as done with the checkbox
4. **Remove** - Delete resources with optional feedback
5. **View Stack** - See all resources in a beautiful stack layout

## Next Steps

- Explore the component files in `frontend/src/components`
- Check API endpoints in `backend/src/routes/resourceRoutes.js`
- Customize styling in CSS files to match your preferences
- Add more features as needed!

Happy coding! 🎉

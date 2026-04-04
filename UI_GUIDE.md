# UI/UX Guide - Resource Stack

## 🎨 Visual Layout

```
┌══════════════════════════════════════════════════════════════┐
│                                                              │
│         📚 RESOURCE STACK - ORGANIZE YOUR RESOURCES         │
│              Organize and manage with ease                   │
│                                                              │
└══════════════════════════════════════════════════════════════┘

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ➕ ADD NEW RESOURCE                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Title                                     [input]   │   │
│  │                                                     │   │
│  │ Content (text, links, etc.)                        │   │
│  │ ┌───────────────────────────────────────────────┐  │   │
│  │ │ Paste your content here...                    │  │   │
│  │ │                                               │  │   │
│  │ │                                               │  │   │
│  │ └───────────────────────────────────────────────┘  │   │
│  │                                                     │   │
│  │               [➕ ADD RESOURCE]                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Your Resources (3)                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ☑ First Resource Title                         [#1]  │  │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │ This is the first line of content that was pasted...  │  │
│  │ 📝 Has feedback                                       │  │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │              [✎ EDIT]        [🗑 REMOVE]             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ☐ Second Resource Title                        [#2]  │  │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │ Another resource content starts here...              │  │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │              [✎ EDIT]        [🗑 REMOVE]             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ☐ Third Resource Title                         [#3]  │  │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │ The third resource content...                        │  │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │              [✎ EDIT]        [🗑 REMOVE]             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 📋 Component Descriptions

### 1. **Header Section**
- Title: "📚 Resource Stack"
- Subtitle: "Organize and manage your resources with ease"
- **Theme Toggle**: 🌙/☀️ button to switch between light and dark themes
- **My Resources Button**: Shows count of saved resources
- Gradient background for visual appeal

### 2. **Add Resource Form**
- **Title Input**: Max 100 characters with counter
- **Content Textarea**: Multi-line input for any content
- **Character Counter**: Shows current length
- **Submit Button**: Disabled while loading
- **Validation**: Both fields required before adding

### 3. **Resource Stack Area**
- Shows count of resources: "Your Resources (3)"
- Display state if no resources: "📭 No resources yet..."
- Stack displays resources newest-first
- Each resource in a ResourceCard

### 4. **Resource Card**
```
┌─────────────────────────────────────────────┐
│  HEADER                                     │
│  ☑ Title of Resource                  [#N]  │  ← Checkbox + Title + Index
├─────────────────────────────────────────────┤
│  BODY (Normal View)                         │
│  Content preview (truncated at 50 chars)    │
│  [more feedback indicator if exists]        │
├─────────────────────────────────────────────┤
│  BODY (Edit View - when editing)            │
│  Title Input: [________________]            │  ← Editable title
│  Content:  [_____________________]          │  ← Editable content
│           [_____________________]           │
│           [_____________________]           │
│  [Save] [Cancel]                            │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  [✎ EDIT]          [🗑 REMOVE]              │  ← Action buttons
└─────────────────────────────────────────────┘
```

**Card States:**
- **Normal**: Fully opaque, title visible
- **Checked**: 60% opacity, title strikethrough, green accent
- **Editing**: Shows textarea instead of preview

### 5. **Feedback Modal** (Opens on Remove)
```
┌──────────────────────────────────────────────┐
│  ADD FEEDBACK/NOTES                       [✕]│
├──────────────────────────────────────────────┤
│                                              │
│  Removing: Resource Title                    │  ← Shows resource
│                                              │
│  Feedback or notes (optional):               │
│  ┌──────────────────────────────────────┐   │
│  │ Add any feedback before deleting...  │   │
│  │                                      │   │
│  │                                      │   │
│  │                                      │   │
│  │                                      │   │
│  └──────────────────────────────────────┘   │
│                                              │
├──────────────────────────────────────────────┤
│  [CANCEL]          [🗑 REMOVE RESOURCE]     │
└──────────────────────────────────────────────┘
```

## 🎨 Color Scheme

- **Primary**: `#3b82f6` (Blue) - Headers, main buttons
- **Success**: `#10b981` (Green) - Checkmarks, completion
- **Danger**: `#ef4444` (Red) - Delete operations
- **Warning**: `#f59e0b` (Amber) - Information badges
- **Dark Background**: `#1f2937` - Header area
- **Light Background**: `#f3f4f6` - Main content area
- **Text Dark**: `#111827` - Main text
- **Text Light**: `#6b7280` - Secondary text
- **Border**: `#e5e7eb` - Dividers

## 📱 Responsive Behavior

### Desktop (> 1024px)
- Full width cards with max-width 1200px
- Large typography
- Hover effects on buttons

### Tablet (768px - 1024px)
- Slightly smaller cards
- Adjusted padding
- Still readable content

### Mobile (< 768px)
- Full width with small margins
- Smaller font sizes
- Stacked button layouts
- Adjusted modal width (95%)
- Single column layout

## ⌨️ User Interactions

### Adding Resources
1. User fills in Title field
2. User fills in Content textarea
3. User clicks "Add Resource" button
4. Loading state shows "⏳ Adding..."
5. New resource appears at top of stack
6. Form clears for next entry

### Editing Resources
1. User clicks "Edit" button on card
2. Card switches to edit mode
3. Title input and content textarea appear
4. User modifies content
5. User clicks "Save" to submit changes
6. Card updates and exits edit mode
7. OR User clicks "Cancel" to discard changes

### Checking/Unchecking
1. User clicks checkbox on card
2. Request sent to backend
3. Card immediately shows visual feedback:
   - Title becomes strikethrough
   - Card opacity reduces to 60%
   - Border color changes to green
4. Clicking again unchecks it

### Deleting with Feedback
1. User clicks "Remove" button
2. FeedbackModal appears with overlay
3. User can type feedback (optional)
4. User clicks "Remove Resource"
5. Feedback saved to database
6. Resource deleted
7. Card disappears from stack
8. Modal closes

## 🎬 Animations

### Slide In (New Resources)
- Cards slide up and fade in
- Duration: 0.3s easing
- Creates sense of addition

### Hover Effects
- Cards lift up slightly on hover
- Shadow increases
- Subtle movement for interactivity

### Modal Animations
- Overlay fades in
- Modal slides up from bottom
- Creates modal focus

### Loading State
- Button text changes
- Button disabled with reduced opacity
- Shows activity to user

## 🎯 User Experience Goals

1. **Intuitive**: Clear action buttons and visual states
2. **Fast**: Immediate feedback on all actions
3. **Safe**: Confirmation modal before deletion
4. **Accessible**: Good color contrast, readable text
5. **Responsive**: Works on all device sizes
6. **Satisfying**: Smooth animations and transitions

## 📊 Visual Hierarchy

1. **Most Important**: Add new resource (top, prominent color)
2. **High Priority**: Individual resources (large, visual)
3. **Contextual**: Edit/Remove buttons (smaller, grouped)
4. **Supporting**: Feedback badge, index number (small)
5. **Background**: Form labels, placeholders (light gray)

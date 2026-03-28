import ResourceCard from './ResourceCard'
import './ResourceStack.css'

function ResourceStack({ resources, onUpdateResource, onRemoveResource, onToggleCheck }) {
  return (
    <div className="resource-stack-container">
      <h2 className="stack-title">Your Resources ({resources.length})</h2>
      
      {resources.length === 0 ? (
        <div className="empty-state">
          <p>📭 No resources yet. Add your first resource to get started!</p>
        </div>
      ) : (
        <div className="stack">
          {resources.map((resource, index) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              index={index}
              onUpdate={onUpdateResource}
              onRemove={onRemoveResource}
              onToggleCheck={onToggleCheck}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ResourceStack

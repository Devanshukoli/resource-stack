import { useState } from 'react'
import ResourcesModal from './ResourcesModal'
import './AppHeader.css'

function AppHeader({ resourceCount, onOpenResources }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">📚 Resource Stack</h1>
        </div>
        <div className="header-right">
          <button className="btn-my-resources" onClick={onOpenResources}>
            📋 My Resources
            <span className="resource-count">{resourceCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AppHeader

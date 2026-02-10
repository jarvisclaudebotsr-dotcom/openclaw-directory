'use client'

import { RefreshCw } from 'lucide-react'
import { useState } from 'react'

export function SyncButton() {
  const [syncing, setSyncing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSync = async () => {
    setSyncing(true)
    setResult(null)

    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        // Refresh the page after 2 seconds
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        alert(`Sync failed: ${data.error}`)
      }
    } catch (error) {
      console.error('Error syncing:', error)
      alert('Sync failed. Please try again.')
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleSync}
        disabled={syncing}
        className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
        {syncing ? 'Syncing...' : 'Sync Now'}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-green-900/20 border border-green-900/50 rounded-lg">
          <p className="text-green-400 text-sm font-medium mb-2">Sync completed!</p>
          <div className="text-xs text-gray-300 space-y-1">
            <p>• Repos scanned: {result.reposScanned}</p>
            <p>• Skills added: {result.skillsAdded}</p>
            <p>• Skills updated: {result.skillsUpdated}</p>
          </div>
        </div>
      )}
    </div>
  )
}

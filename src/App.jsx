import React, { useState } from 'react'

export default function App() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setPreviewUrl(URL.createObjectURL(droppedFile))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
      <h1>📖 Book Previewer</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: '80%',
          height: 200,
          border: '2px dashed #888',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20
        }}
      >
        <p>Drag & Drop your PDF or Image here</p>
      </div>
      {previewUrl && (
        <div style={{ width: '90%', height: '80vh' }}>
          {file.type === 'application/pdf' ? (
            <embed src={previewUrl} type="application/pdf" width="100%" height="100%" />
          ) : (
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          )}
        </div>
      )}
    </div>
  )
}

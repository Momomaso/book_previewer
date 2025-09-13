import React, { useState, useRef } from 'react'

export default function App() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    handleFile(selectedFile)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
      <h1>📖 Book Previewer</h1>

      {/* منطقة السحب والإفلات + الكليك */}
      <div
        onClick={handleClick}
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
          marginBottom: 20,
          cursor: 'pointer'
        }}
      >
        <p>Click or Drag & Drop your PDF/Image here</p>
        <input
          type="file"
          accept="application/pdf,image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      {/* المعاينة */}
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

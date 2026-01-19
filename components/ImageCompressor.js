'use client'

import { useState } from 'react'
import { compressImage } from '../utils/compressImage'

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState(null)
  const [originalPreview, setOriginalPreview] = useState(null)
  const [compressedBlob, setCompressedBlob] = useState(null)
  const [compressedPreview, setCompressedPreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
      setError('Please select a JPG or PNG image')
      return
    }

    setError(null)
    setOriginalFile(file)
    setCompressedBlob(null)
    setCompressedPreview(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalPreview(e.target.result)
    }
    reader.readAsDataURL(file)

    setIsProcessing(true)
    try {
      const blob = await compressImage(file)
      setCompressedBlob(blob)
      
      const compressedReader = new FileReader()
      compressedReader.onload = (e) => {
        setCompressedPreview(e.target.result)
      }
      compressedReader.readAsDataURL(blob)
    } catch (err) {
      setError(err.message || 'Failed to compress image')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!compressedBlob) return

    const url = URL.createObjectURL(compressedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = originalFile ? originalFile.name.replace(/\.[^/.]+$/, '') + '_compressed.jpg' : 'compressed.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container">
      <h1>Image Compressor</h1>
      <p className="subtitle">Compress images online without quality loss</p>
      
      <div className="ad-placeholder" role="complementary" aria-label="Advertisement">
        <p>Ad slot</p>
      </div>

      <div className="upload-area">
        <input
          type="file"
          id="file-input"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileSelect}
          aria-label="Select image file to compress"
          style={{ display: 'none' }}
        />
        <label 
          htmlFor="file-input" 
          className="upload-button" 
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              document.getElementById('file-input').click()
            }
          }}
        >
          {originalFile ? 'Upload Another Image' : 'Upload Image'}
        </label>
      </div>

      {error && <div className="error" role="alert" aria-live="polite">{error}</div>}

      {isProcessing && <div className="processing" aria-live="polite" aria-busy="true">Processing image...</div>}

      <div className="preview-container">
        {originalPreview && (
          <div className="preview-box">
            <h3>Original Image</h3>
            <img 
              src={originalPreview} 
              alt={`Original image preview showing ${originalFile ? originalFile.name : 'uploaded image'}`}
              loading="lazy"
            />
            {originalFile && (
              <p className="file-size">Size: {(originalFile.size / 1024 / 1024).toFixed(2)} MB</p>
            )}
          </div>
        )}

        {compressedPreview && (
          <div className="preview-box">
            <h3>Compressed Image</h3>
            <img 
              src={compressedPreview} 
              alt={`Compressed image preview showing reduced file size version`}
              loading="lazy"
            />
            {compressedBlob && (
              <p className="file-size">Size: {(compressedBlob.size / 1024 / 1024).toFixed(2)} MB</p>
            )}
            <button 
              onClick={handleDownload} 
              className="download-button"
              aria-label="Download compressed image file"
            >
              Download Compressed Image
            </button>
          </div>
        )}
      </div>

      <section className="content-section">
        <h2>What This Tool Does</h2>
        <p>
          This free image compressor reduces the file size of your JPG and PNG images directly in your browser. 
          No files are uploaded to any server—all processing happens on your device, ensuring complete privacy 
          and security. The tool automatically resizes large images (over 1920px width) and compresses them to 
          JPEG format, typically reducing file size by 50-80% while maintaining acceptable visual quality.
        </p>
        <p>
          Image compression is the process of reducing the file size of an image without significantly degrading 
          its visual quality. This is achieved through techniques like resizing dimensions, adjusting compression 
          quality, and converting between formats. Our tool uses browser-based canvas technology to perform all 
          compression locally, meaning your images are never sent over the internet or stored on external servers.
        </p>

        <h2>How to Compress Images</h2>
        <p>
          Using this image compressor is simple: click the upload button, select a JPG or PNG image from your 
          device, and wait a few seconds. The tool will process your image and display both the original and 
          compressed versions side by side, showing the file size reduction. Once satisfied, click the download 
          button to save your compressed image. The entire process happens instantly in your browser—no waiting 
          for uploads or downloads from external servers.
        </p>
        <p>
          The compression process is automatic and requires no technical knowledge. Simply upload your image, 
          and the tool handles resizing (if needed) and quality optimization. You can compare the original and 
          compressed images side by side to ensure the quality meets your needs before downloading.
        </p>

        <h2>Why Use This Tool</h2>
        <p>
          Smaller image files load faster on websites, use less storage space, and are easier to share via email 
          or messaging apps. This browser-based compressor is ideal when you need to quickly reduce image size 
          without installing software or creating accounts. Since all processing happens locally, your images 
          never leave your device, making it perfect for sensitive or private photos. The tool works on any 
          modern web browser and requires no plugins or downloads.
        </p>
        <p>
          Common use cases include optimizing images for websites, reducing file sizes for email attachments, 
          preparing images for social media posts, and freeing up storage space on devices. The tool is 
          completely free to use with no registration required, making it accessible to everyone who needs 
          quick image compression.
        </p>
      </section>
    </div>
  )
}

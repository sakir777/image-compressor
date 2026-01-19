export function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const originalSize = file.size
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        let width = img.width
        let height = img.height
        const maxWidth = 1920
        
        if (width > maxWidth) {
          const ratio = maxWidth / width
          width = maxWidth
          height = height * ratio
        }
        
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        const compressWithQuality = (quality) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'))
                return
              }
              
              if (blob.size < originalSize || quality <= 0.1) {
                resolve(blob)
              } else {
                compressWithQuality(quality - 0.1)
              }
            },
            'image/jpeg',
            quality
          )
        }
        
        compressWithQuality(0.6)
      }
      
      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }
      
      img.src = e.target.result
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsDataURL(file)
  })
}

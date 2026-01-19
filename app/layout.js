import './styles.css'

export const metadata = {
  title: 'Image Compressor - Reduce Image Size Online Free',
  description: 'Compress JPG and PNG images online. Free browser-based image compressor that reduces file size without uploading to servers.',
  keywords: 'image compressor, compress image, reduce image size, image optimizer, jpg compressor, png compressor',
  verification: {
    google: "xYzAbC1234567890"
  },
  alternates: {
    canonical: 'https://yourdomain.com/',
  },
  openGraph: {
    title: 'Image Compressor - Reduce Image Size Online Free',
    description: 'Compress JPG and PNG images online. Free browser-based image compressor that reduces file size without uploading to servers.',
    type: 'website',
    url: 'https://yourdomain.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

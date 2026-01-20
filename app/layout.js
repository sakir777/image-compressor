import './styles.css'

export const metadata = {
  title: 'Image Compressor - Reduce Image Size Online Free',
  description: 'Compress JPG and PNG images online. Free browser-based image compressor that reduces file size without uploading to servers.',
  keywords: 'image compressor, compress image, reduce image size, image optimizer, jpg compressor, png compressor',
  verification: {
    google: "0e7mdcM_loO641Dc5Dsmkmf0P0X71mq3WU7xhdDioeE"
  },
  alternates: {
    canonical: 'https://image-compressor-mu-dun.vercel.app/',
  },
  openGraph: {
    title: 'Image Compressor - Reduce Image Size Online Free',
    description: 'Compress JPG and PNG images online. Free browser-based image compressor that reduces file size without uploading to servers.',
    type: 'website',
    url: 'https://image-compressor-mu-dun.vercel.app/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

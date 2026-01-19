import ImageCompressor from '../components/ImageCompressor'

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Image Compressor',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    description: 'Free online image compressor that reduces JPG and PNG file sizes using browser-based processing.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ImageCompressor />
    </>
  )
}

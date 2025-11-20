import { Img, Link, Text } from '@react-email/components'

import { footer, link } from '../styles'

const logoUrl = 'https://example.com/logo.png'
const tagline = 'Lorem ipsum'

export function Footer() {
  return (
    <Text style={{ ...footer, marginTop: 30 }}>
      <Img
        src={logoUrl}
        width="32"
        height="32"
        alt="App Logo"
        style={{
          borderRadius: 5,
          marginBottom: 10,
        }}
      />
      <Link
        href="https://example.com"
        target="_blank"
        style={{ ...link, color: '#898989' }}
      >
        example.com
      </Link>{' '}
      ⬩ {tagline}
    </Text>
  )
}

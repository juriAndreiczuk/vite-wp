import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./views/**/*.blade.php', './*.php', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Lexend-SemiBold']
      },
      fontSize: {
        16: '1rem'
      },
      colors: {
        dark: '#000000',
        white: '#ffffff'
      },
      spacing: {
        16: '1rem'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '0'
      }
    }
  },
  screens: {
    sm: '576px',
    md: '767px',
    lg: '992px',
    xl: '1200px'
  },
  plugins: [],
  safelist: ['flex', 'flex-row', 'flex-col', 'grid', 'h-full', 'rounded']
}

export default config

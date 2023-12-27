import { defineConfig, presetIcons, presetWebFonts, presetUno } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      mainBackgroundColor: '#0d1117',
      columnBackgroundColor: '#161c22',
      customWhite: '#fafafa'
    }
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {}
    }),
    presetIcons({
      cdn: 'https://esm.sh/',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ]
})

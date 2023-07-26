import { defineConfig } from 'vitepress'
import { readFileSync } from 'fs'

const allFunctions = JSON.parse(readFileSync('./docs/allFunctions.json'))

// sort functions alphabetically (key is text)
allFunctions.sort((a, b) => {
  if (a.text < b.text) return -1
  if (a.text > b.text) return 1
  return 0
})
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GEOS-WASM",
  description: "API documentation for GEOS-WASM",
  lang: 'en-US',
  head: [
    ['link', { rel: 'icon', href: '/geos-wasm/favicon.ico' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@chrispahm' }],
    ['meta', { name: 'twitter:creator', content: '@chrispahm' }],
    ['meta', { name: 'twitter:title', content: 'GEOS-WASM' }],
    ['meta', { name: 'twitter:description', content: 'API documentation for GEOS-WASM' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'GEOS-WASM' }],
    ['meta', { property: 'og:url', content: 'https://chrispahm.github.io/geos-wasm' }],
    ['meta', { property: 'og:title', content: 'GEOS-WASM' }],
    ['meta', { property: 'og:description', content: 'API documentation for GEOS-WASM' }],
  ],
  base: '/geos-wasm/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'v1 (current)',
          items: [
            {
              text: 'Contributing',
              link: 'https://github.com/chrispahm/geos-wasm/issues'
            }
          ]
      },
      {
        text: 'Examples',
        link: '/examples/buffer'
      },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/#installation' },
          { text: 'Usage', link: '/#usage' },
          { text: 'FAQ', link: '/#faq' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Buffer', link: '/examples/buffer' },
          { text: 'Maximum-Inscribed-Circle', link: '/examples/maximum-inscribed-circle' },
          { text: 'ObservableHQ', link: 'https://observablehq.com/@chrispahm/hello-geos-wasm' },
        ]
      },
      {
        text: 'API Documentation',
        items: allFunctions,
        collapsed: false
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chrispahm/geos-wasm' }
    ],

    search: {
      provider: 'local'
    }
  }
})

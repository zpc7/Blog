import { defineConfig } from 'vitepress';
import blogSidebar from './sidebar/blog';
import snippetsSidebar from './sidebar/snippet';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'PC Blog',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/index' },
      { text: 'Snippet', link: '/snippets/index' },
      {
        text: 'More',
        items: [
          { text: 'api-examples', link: '/api-examples' },
          { text: 'markdown-examples', link: '/markdown-examples' }
        ]
      }
    ],

    sidebar: {
      '/blog/': blogSidebar,
      '/snippets/': snippetsSidebar
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/zpc7/Blog' }]
  }
});

import { defineConfig } from 'vitepress';
import blogSidebar from './sidebar/blog';

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
      { text: 'Blog', link: '/blog/index' }
    ],

    sidebar: {
      '/blog/': blogSidebar
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/zpc7/Blog' }]
  }
});

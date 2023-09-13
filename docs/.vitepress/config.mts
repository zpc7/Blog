import { defineConfig } from 'vitepress';
import blogSidebar from './sidebar/blog';
import snippetsSidebar from './sidebar/snippet';
import demosSidebar from './sidebar/demo';
import interviewSidebar from './sidebar/interview';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'PC',
  description: 'pc 用来记录琐碎的地方',
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    search: {
      provider: 'local'
    },
    outline: 'deep',
    // outlineTitle: '大纲',
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/index' },
      { text: 'Snippets', link: '/snippets/index' },
      { text: 'Demos', link: '/demos/mouse-hover' },
      {
        text: 'More',
        items: [
          { text: '面试', link: '/interview/index' },
          { text: '算法', link: '/algorithm/index' },
          { text: 'api-examples', link: '/more/api-examples' },
          { text: 'markdown-examples', link: '/more/markdown-examples' }
        ]
      }
    ],

    sidebar: {
      '/blog/': blogSidebar,
      '/snippets/': snippetsSidebar,
      '/demos/': demosSidebar,
      '/interview/':interviewSidebar
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/zpc7/Blog' }]
  }
});

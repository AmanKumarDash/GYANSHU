// Add new posts here. Set published to false to keep a post hidden until it is ready.
// Each body entry can be a paragraph or a section with a heading and paragraphs.
export const blogPosts = [
  {
    slug: 'welcome-to-gyanshu-updates',
    title: 'Welcome to Gyanshu updates',
    category: 'Company news',
    date: '2026-10-14',
    readTime: '2 min read',
    excerpt: 'A place for product news, documentation, offers, events, and milestones from the Gyanshu team.',
    published: true,
    body: [
      { heading: 'What you will find here', paragraphs: ['We will use this space to share updates about Gyanshu products and services, newly available documentation, upcoming offers and events, and moments worth celebrating with our community.'] },
      { heading: 'Stay in the loop', paragraphs: ['Check back for new posts. For product or service questions, contact Support.gyanshu@gmail.com.'] },
    ],
  },
]

export const publishedBlogPosts = blogPosts
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

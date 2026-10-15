import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { publishedBlogPosts } from '../../data/blogPosts'
import { ArrowButton, Eyebrow, Reveal } from '../ui/Motion'

const formatDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export function BlogIndex() {
  const categories = ['All', ...new Set(publishedBlogPosts.map((post) => post.category))]
  const [activeCategory, setActiveCategory] = useState('All')
  const visiblePosts = activeCategory === 'All' ? publishedBlogPosts : publishedBlogPosts.filter((post) => post.category === activeCategory)
  return <main className="min-h-screen bg-paper pb-24 pt-36 md:pt-44">
    <div className="shell">
      <Reveal><Eyebrow>News &amp; insights</Eyebrow></Reveal>
      <h1 className="h-section mt-6 max-w-4xl">Updates from Gyanshu.</h1>
      <p className="lede mt-5 max-w-2xl">Product news, new documentation, offers, events, and milestones from our team.</p>
      <div className="mt-12 flex flex-wrap gap-2" aria-label="Blog categories">
        {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`rounded-full border px-4 py-2 text-sm transition-colors ${activeCategory === category ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink/70 hover:border-ink/30'}`}>{category}</button>)}
      </div>
      {publishedBlogPosts.length ? visiblePosts.length ? <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, index) => <Reveal key={post.slug} delay={index * 0.06}>
          <Link to={`/blog/${post.slug}`} className="group flex h-full min-h-64 flex-col rounded-[24px] border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-card">
            <span className="eyebrow w-fit">{post.category}</span>
            <h2 className="mt-7 font-display text-2xl font-medium leading-tight tracking-tight group-hover:text-brand-600">{post.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <span className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted">
              <span>{formatDate(post.date)} <span aria-hidden="true">·</span> {post.readTime}</span>
              <ArrowUpRight size={16} className="text-brand-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>)}
      </div> : <p className="mt-12 rounded-3xl border border-line bg-white p-8 text-muted">No posts in this category yet.</p> : <p className="mt-12 rounded-3xl border border-line bg-white p-8 text-muted">New updates are on the way. Please check back soon.</p>}
      <div className="mt-14"><ArrowButton to="/contact" variant="outline">Talk to our team</ArrowButton></div>
    </div>
  </main>
}

export function BlogArticle() {
  const { slug } = useParams()
  const post = publishedBlogPosts.find((entry) => entry.slug === slug)
  if (!post) return <main className="shell min-h-[65vh] pt-44"><Eyebrow>404</Eyebrow><h1 className="h-section mt-5">Post not found.</h1><Link to="/blog" className="link-arrow mt-8">Back to the blog <ArrowUpRight size={16} /></Link></main>

  return <main className="bg-paper pb-24 pt-36 md:pt-44">
    <article className="shell max-w-4xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"><ArrowLeft size={15} /> All updates</Link>
      <div className="mt-10"><Eyebrow>{post.category}</Eyebrow></div>
      <h1 className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-.04em] text-ink sm:text-5xl lg:text-6xl">{post.title}</h1>
      <p className="mt-5 text-sm text-muted">{formatDate(post.date)} <span aria-hidden="true">·</span> {post.readTime}</p>
      <p className="mt-8 border-b border-line pb-10 text-lg leading-relaxed text-ink/75">{post.excerpt}</p>
      <div className="prose prose-lg mt-10 max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-muted">
        {post.body.map((section, index) => <section key={`${section.heading}-${index}`} className="mb-10">
          {section.heading && <h2 className="mb-4 text-2xl text-ink">{section.heading}</h2>}
          {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
        </section>)}
      </div>
      <div className="mt-14 border-t border-line pt-8"><Link to="/blog" className="link-arrow">Read more updates <ArrowUpRight size={16} /></Link></div>
    </article>
  </main>
}

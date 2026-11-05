import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { publishedBlogPosts } from '../../data/blogPosts'
import SceneArt from '../art/SceneArt'
import { ArrowButton, Reveal } from '../ui/Motion'
import { CardFx, HeroCentered } from '../interior/Blocks'
import { spot } from '../interior/cardFx'

const formatDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export function BlogIndex() {
  const categories = ['All', ...new Set(publishedBlogPosts.map((post) => post.category))]
  const [activeCategory, setActiveCategory] = useState('All')
  const visiblePosts = activeCategory === 'All' ? publishedBlogPosts : publishedBlogPosts.filter((post) => post.category === activeCategory)
  const empty = 'rounded-[1.375rem] border border-line bg-white p-8 text-muted shadow-card'
  return <main>
    <HeroCentered title="Updates from Gyanshu." subtitle="Product news, new documentation, offers, events, and milestones from our team." art="blog" actions={null} compact />
    <section className="py-8 md:py-10 lg:py-12">
      <div className="shell">
        <div className="flex flex-wrap gap-2" aria-label="Blog categories">
          {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`rounded-full border px-4 py-2 text-sm transition-colors ${activeCategory === category ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink/70 hover:border-brand-400'}`}>{category}</button>)}
        </div>
        {publishedBlogPosts.length ? visiblePosts.length ? <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, index) => <Reveal key={post.slug} delay={index * 0.06} className="h-full">
            <Link to={`/blog/${post.slug}`} onMouseMove={spot} className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-[1.375rem] border border-line bg-white shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift">
              <CardFx />
              <div className="relative aspect-[16/9] overflow-hidden bg-ink-950"><SceneArt name="blog" kind="card" live={false} /></div>
              <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                <span className="eyebrow w-fit">{post.category}</span>
                <h2 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight group-hover:text-brand-600">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <span className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4 text-xs text-muted">
                  <span>{formatDate(post.date)} <span aria-hidden="true">·</span> {post.readTime}</span>
                  <ArrowUpRight size={16} className="text-brand-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>)}
        </div> : <p className={`mt-7 ${empty}`}>No posts in this category yet.</p> : <p className={`mt-7 ${empty}`}>New updates are on the way. Please check back soon.</p>}
        <div className="mt-7"><ArrowButton to="/contact" variant="outline">Talk to our team</ArrowButton></div>
      </div>
    </section>
  </main>
}

export function BlogArticle() {
  const { slug } = useParams()
  const post = publishedBlogPosts.find((entry) => entry.slug === slug)
  if (!post) return <main>
    <HeroCentered title="Post not found." art="blog" actions={<ArrowButton to="/blog">Back to the blog</ArrowButton>} compact />
  </main>

  return <main>
    <HeroCentered title={post.title} muted={2} subtitle={post.excerpt} art="blog" actions={null} compact />
    <section className="py-8 md:py-10 lg:py-12">
      <article className="shell max-w-4xl">
        <div className="rounded-[1.375rem] border border-line bg-white p-6 shadow-card md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"><ArrowLeft size={15} /> All updates</Link>
            <span className="text-sm text-muted"><span className="eyebrow mr-3">{post.category}</span>{formatDate(post.date)} <span aria-hidden="true">·</span> {post.readTime}</span>
          </div>
          <div className="prose prose-lg mt-8 max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-muted">
            {post.body.map((section, index) => <section key={`${section.heading}-${index}`} className="mb-8 last:mb-0">
              {section.heading && <h2 className="mb-4 text-2xl text-ink">{section.heading}</h2>}
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            </section>)}
          </div>
          <div className="mt-10 border-t border-line pt-6"><Link to="/blog" className="link-arrow">Read more updates <ArrowUpRight size={16} /></Link></div>
        </div>
      </article>
    </section>
  </main>
}

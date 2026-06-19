import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { getArticleBySlug, getNextArticle } from '../data/articles';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) return <Navigate to="/writing" replace />;

  const next = getNextArticle(slug);

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '10rem 2.5rem 5rem' }}>
        {/* Title */}
        <div style={{ marginBottom: '2rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f0ece4', lineHeight: 1.15 }}
          >
            {article.title}
          </motion.h1>
        </div>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          {[article.date, article.category, article.readTime].map((m, i) => (
            <p key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#8a8680', letterSpacing: '0.04em' }}>{m}</p>
          ))}
        </motion.div>

        {/* Featured image */}
        {article.image && (
          <ScrollReveal>
            <div style={{ marginBottom: '4rem', borderRadius: '2px', overflow: 'hidden' }}>
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Body */}
        <ScrollReveal delay={0.1}>
          <article
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </ScrollReveal>
      </div>

      {/* ── NEXT ARTICLE ── */}
      <div style={{ borderTop: '1px solid rgba(240,236,228,0.08)', padding: '3rem 2.5rem', maxWidth: '860px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8680', marginBottom: '1rem' }}>
          Next Article
        </p>
        <Link
          to={`/writing/${next.slug}`}
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
            color: '#f0ece4',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'gap 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '1.25rem'}
          onMouseLeave={e => e.currentTarget.style.gap = '0.75rem'}
        >
          {next.title} →
        </Link>
      </div>
    </PageTransition>
  );
}

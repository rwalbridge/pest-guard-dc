import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Shield, Clock, ArrowRight, ArrowLeft, ThumbsUp, ThumbsDown,
  Facebook, Twitter, LinkIcon, Lightbulb, AlertTriangle, MessageCircle,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticleBySlug, getRelatedArticles, blogArticles } from "@/data/blog";
import type { ContentSection, BlogArticle as BlogArticleType } from "@/data/blog";

// Pest linking rules — order matters (longer matches first)
const pestLinkRules: { patterns: RegExp; url: string; label: string }[] = [
  { patterns: /\b(bed\s*bugs?)\b/i, url: '/pests/bed-bugs', label: 'Bed Bugs' },
  { patterns: /\b(stink\s*bugs?)\b/i, url: '/pests/stink-bugs', label: 'Stink Bugs' },
  { patterns: /\b(cockroach(?:es)?|roach(?:es)?)\b/i, url: '/pests/cockroaches', label: 'Cockroaches' },
  { patterns: /\b(wasps?|hornets?)\b/i, url: '/pests/wasps-hornets', label: 'Wasps & Hornets' },
  { patterns: /\b(termites?)\b/i, url: '/pests/termites', label: 'Termites' },
  { patterns: /\b(mosquito(?:es)?)\b/i, url: '/pests/mosquitoes', label: 'Mosquitoes' },
  { patterns: /\b(mice|mouse|rodents?)\b/i, url: '/pests/mice-rats', label: 'Mice & Rats' },
  { patterns: /\b(ants?)\b/i, url: '/pests/ants', label: 'Ants' },
  { patterns: /\b(spiders?)\b/i, url: '/pests/spiders', label: 'Spiders' },
  { patterns: /\b(silverfish)\b/i, url: '/pests/silverfish', label: 'Silverfish' },
];

// Track which pest URLs have been linked in current article render
let linkedPestUrls: Set<string> = new Set();

const linkifyText = (text: string): ReactNode[] => {
  // Find the first unlinked pest match
  for (const rule of pestLinkRules) {
    if (linkedPestUrls.has(rule.url)) continue;
    const match = rule.patterns.exec(text);
    if (match) {
      linkedPestUrls.add(rule.url);
      const before = text.slice(0, match.index);
      const matched = match[0];
      const after = text.slice(match.index + matched.length);
      const result: ReactNode[] = [];
      if (before) result.push(...linkifyText(before));
      result.push(
        <Link key={`link-${rule.url}`} to={rule.url} className="text-primary underline hover:text-primary/80 transition-colors">
          {matched}
        </Link>
      );
      if (after) result.push(...linkifyText(after));
      return result;
    }
  }
  return [text];
};

// Related pest guides mapping per article slug
const articlePestGuides: Record<string, { name: string; url: string }[]> = {
  'pest-season-washington-dc': [
    { name: 'Termites', url: '/pests/termites' },
    { name: 'Ants', url: '/pests/ants' },
    { name: 'Mosquitoes', url: '/pests/mosquitoes' },
  ],
  'do-i-have-termites-dc': [
    { name: 'Termites', url: '/pests/termites' },
    { name: 'Ants', url: '/pests/ants' },
    { name: 'Cockroaches', url: '/pests/cockroaches' },
  ],
  'mice-control-washington-dc': [
    { name: 'Mice & Rats', url: '/pests/mice-rats' },
    { name: 'Cockroaches', url: '/pests/cockroaches' },
    { name: 'Spiders', url: '/pests/spiders' },
  ],
  'mosquito-control-washington-dc': [
    { name: 'Mosquitoes', url: '/pests/mosquitoes' },
    { name: 'Wasps & Hornets', url: '/pests/wasps-hornets' },
    { name: 'Ants', url: '/pests/ants' },
  ],
  'cockroach-control-washington-dc': [
    { name: 'Cockroaches', url: '/pests/cockroaches' },
    { name: 'Ants', url: '/pests/ants' },
    { name: 'Mice & Rats', url: '/pests/mice-rats' },
  ],
  'stink-bug-control-washington-dc': [
    { name: 'Stink Bugs', url: '/pests/stink-bugs' },
    { name: 'Spiders', url: '/pests/spiders' },
    { name: 'Silverfish', url: '/pests/silverfish' },
  ],
  'bed-bug-treatment-washington-dc': [
    { name: 'Bed Bugs', url: '/pests/bed-bugs' },
    { name: 'Cockroaches', url: '/pests/cockroaches' },
    { name: 'Spiders', url: '/pests/spiders' },
  ],
  'winterize-home-pest-control-dc': [
    { name: 'Mice & Rats', url: '/pests/mice-rats' },
    { name: 'Stink Bugs', url: '/pests/stink-bugs' },
    { name: 'Cockroaches', url: '/pests/cockroaches' },
  ],
  'pest-control-subscription-vs-one-time-dc': [
    { name: 'Termites', url: '/pests/termites' },
    { name: 'Ants', url: '/pests/ants' },
    { name: 'Mosquitoes', url: '/pests/mosquitoes' },
  ],
  'pest-control-cost-dc-md-va': [
    { name: 'Termites', url: '/pests/termites' },
    { name: 'Bed Bugs', url: '/pests/bed-bugs' },
    { name: 'Mosquitoes', url: '/pests/mosquitoes' },
  ],
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const article = getArticleBySlug(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight - winH;
      setProgress(docH > 0 ? Math.min((window.scrollY / docH) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!article) {
    return (
      <>
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Button asChild><Link to="/blog">Back to The Nest</Link></Button>
        </div>
        <Footer />
      </>
    );
  }

  // Reset linked pest tracker on each render
  linkedPestUrls = new Set();

  const related = getRelatedArticles(article.relatedArticles);
  const headings = article.content.filter(s => s.type === 'heading' && s.level === 2);
  const pestGuides = articlePestGuides[article.slug] || [];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const renderSection = (section: ContentSection, idx: number) => {
    switch (section.type) {
      case 'heading':
        if (section.level === 2) {
          return (
            <h2
              key={idx}
              id={`section-${idx}`}
              className="text-[28px] font-bold text-secondary mt-12 mb-4 pl-4 border-l-4 border-primary"
            >
              {section.text}
            </h2>
          );
        }
        return (
          <h3 key={idx} className="text-[22px] font-bold text-secondary mt-8 mb-3">
            {section.text}
          </h3>
        );

      case 'text':
        return (
          <p key={idx} className="text-lg leading-[1.7] text-[#1A1A2E] mb-4">
            {linkifyText(section.text || '')}
          </p>
        );

      case 'list':
        return (
          <ul key={idx} className="space-y-2 mb-6 ml-1">
            {section.items?.map((item, i) => (
              <li key={i} className="flex gap-3 text-lg leading-[1.7] text-[#1A1A2E]">
                <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                <span>{linkifyText(item)}</span>
              </li>
            ))}
          </ul>
        );

      case 'callout':
        if (!section.callout) return null;
        const { type, text } = section.callout;
        const styles = {
          'tip': 'bg-warning border-amber-400',
          'warning': 'bg-red-50 border-red-400',
          'greenshield': 'bg-secondary text-secondary-foreground border-primary',
          'quick-answer': 'bg-accent border-primary',
        };
        const icons = {
          'tip': <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />,
          'warning': <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />,
          'greenshield': <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />,
          'quick-answer': <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />,
        };
        const labels = {
          'tip': 'Pro Tip',
          'warning': 'Warning',
          'greenshield': 'GreenShield Note',
          'quick-answer': 'Quick Answer',
        };
        return (
          <div key={idx} className={`rounded-xl border-l-4 p-5 mb-6 ${styles[type]}`}>
            <div className="flex gap-3">
              {icons[type]}
              <div>
                <p className={`text-sm font-bold mb-1 ${type === 'greenshield' ? 'text-primary' : ''}`}>
                  {labels[type]}
                </p>
                <p className={`text-base leading-relaxed ${type === 'tip' ? 'italic' : ''} ${type === 'greenshield' ? 'text-muted-foreground' : ''}`}>
                  {text}
                </p>
              </div>
            </div>
          </div>
        );

      case 'stat':
        return (
          <div key={idx} className="bg-secondary text-secondary-foreground rounded-2xl p-8 my-8 text-center">
            <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">{section.stat?.number}</p>
            <p className="text-muted-foreground text-lg">{section.stat?.context}</p>
          </div>
        );

      case 'table':
        return (
          <div key={idx} className="overflow-x-auto mb-6 rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  {section.headers?.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows?.map((row, ri) => (
                  <tr key={ri} className="border-t border-border">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-muted-foreground">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'pull-quote':
        return (
          <blockquote key={idx} className="my-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px w-12 bg-primary/30" />
              <span className="text-primary text-2xl">"</span>
              <div className="h-px w-12 bg-primary/30" />
            </div>
            <p className="text-[22px] italic text-primary font-medium max-w-xl mx-auto leading-relaxed">
              {section.text}
            </p>
          </blockquote>
        );

      default:
        return null;
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image: article.heroImage,
    datePublished: article.publishDate,
    author: { "@type": "Organization", name: "GreenShield Pest Control" },
    publisher: { "@type": "Organization", name: "GreenShield Pest Control" },
  };

  const DOMAIN = "https://pest-guard-dc.lovable.app";
  const ogDesc = article.quickAnswer.length > 155 ? article.quickAnswer.slice(0, 152) + '...' : article.quickAnswer;

  return (
    <>
      <Helmet>
        <title>{article.titleTag}</title>
        <meta name="description" content={article.metaDescription} />
        <meta property="og:site_name" content="GreenShield" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:url" content={`${DOMAIN}/blog/${article.slug}`} />
        <meta property="og:image" content={article.heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@GreenShieldDC" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={ogDesc} />
        <meta name="twitter:image" content={article.heroImage} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-muted">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      <Header />

      <main className="pt-20">
        {/* Article Header */}
        <section className="bg-background section-padding pb-8">
          <div className="container-max max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to The Nest
            </Link>

            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${article.categoryColor}`}>
              {article.category}
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-secondary leading-tight mb-4"
            >
              {article.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span>By {article.author}</span>
              </div>
              <span>·</span>
              <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readTime} min read</span>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs text-muted-foreground mr-1">Share:</span>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors" aria-label="Share on Facebook">
                <Facebook className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors" aria-label="Share on X">
                <Twitter className="h-3.5 w-3.5" />
              </button>
              <button onClick={copyLink} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors" aria-label="Copy link">
                <LinkIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img src={article.heroImage} alt={article.heroAlt} className="w-full aspect-video object-cover" />
            </div>
          </div>
        </section>

        {/* Article Body + Sidebar */}
        <section className="bg-background pb-16">
          <div className="container-max max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
              {/* Body */}
              <article className="max-w-none">
                {/* Quick Answer */}
                <div className="bg-accent border-l-4 border-primary rounded-xl p-5 mb-8">
                  <div className="flex gap-3">
                    <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-primary mb-1">Quick Answer</p>
                      <p className="text-base leading-relaxed text-foreground">{article.quickAnswer}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                {article.content.map((section, i) => renderSection(section, i))}

                {/* FAQ */}
                {article.faqs.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-[28px] font-bold text-secondary mb-6 pl-4 border-l-4 border-primary">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {article.faqs.map((faq, i) => (
                        <details key={i} className="group bg-card border border-border rounded-xl overflow-hidden">
                          <summary className="flex items-start gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            <MessageCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                            <span className="font-semibold text-foreground flex-1">{faq.q}</span>
                            <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="px-5 pb-5 pl-12">
                            <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback */}
                <div className="mt-12 py-8 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-3">Was this article helpful?</p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setFeedback('up')}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-colors ${
                        feedback === 'up' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" /> Yes
                    </button>
                    <button
                      onClick={() => setFeedback('down')}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-colors ${
                        feedback === 'down' ? 'bg-destructive text-destructive-foreground border-destructive' : 'border-border text-muted-foreground hover:border-destructive hover:text-destructive'
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" /> No
                    </button>
                  </div>
                  {feedback && (
                    <p className="text-sm text-muted-foreground mt-3">Thanks for your feedback.</p>
                  )}
                </div>

                {/* Author Bio */}
                <div className="bg-muted rounded-2xl p-6 flex gap-4 items-start mt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Written by the {article.author}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Licensed pest control technicians serving Washington DC, Maryland & Virginia. Every article is reviewed for accuracy by our field operations team.
                    </p>
                  </div>
                </div>

                {/* Related Pest Guides */}
                {pestGuides.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-border">
                    <p className="text-sm font-semibold text-muted-foreground mb-4">Learn More About Specific Pests:</p>
                    <div className="flex flex-wrap gap-3">
                      {pestGuides.map(pg => (
                        <Link
                          key={pg.url}
                          to={pg.url}
                          className="px-5 py-2.5 rounded-full border border-primary bg-background text-secondary font-medium text-sm hover:bg-accent transition-colors"
                        >
                          {pg.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Sticky Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  {/* TOC */}
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-foreground mb-3">In This Article</h3>
                    <nav className="space-y-1.5">
                      {headings.map((h, i) => {
                        const sectionIdx = article.content.indexOf(h);
                        return (
                          <a
                            key={i}
                            href={`#section-${sectionIdx}`}
                            className="block text-sm text-muted-foreground hover:text-primary transition-colors leading-snug py-1"
                          >
                            {h.text}
                          </a>
                        );
                      })}
                    </nav>
                  </div>

                  {/* CTA */}
                  <div className="bg-secondary text-secondary-foreground rounded-2xl p-5">
                    <Shield className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-bold mb-1">Get a Quote</h3>
                    <p className="text-xs text-muted-foreground mb-3">Plans from $49/mo. No contracts.</p>
                    <Button asChild size="sm" className="w-full">
                      <Link to="/#plans">See Plans</Link>
                    </Button>
                  </div>

                  {/* Related */}
                  {related.length > 0 && (
                    <div className="bg-card border border-border rounded-2xl p-5">
                      <h3 className="text-sm font-bold text-foreground mb-3">Related Articles</h3>
                      <ul className="space-y-3">
                        {related.map(r => (
                          <li key={r.slug}>
                            <Link to={`/blog/${r.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors leading-snug block">
                              {r.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Articles Grid */}
        {related.length > 0 && (
          <section className="bg-muted section-padding">
            <div className="container-max">
              <h2 className="text-2xl font-bold text-secondary mb-8">You Might Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(r => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video overflow-hidden">
                      <img src={r.heroImage} alt={r.heroAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.categoryColor}`}>{r.category}</span>
                      <h3 className="text-base font-bold text-foreground mt-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground mt-2"><Clock className="h-3 w-3" />{r.readTime} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Band */}
        <section className="bg-secondary section-padding text-center">
          <div className="container-max max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-foreground mb-4">
              Ready to stop dealing with this yourself?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our protection plans cover the pests that bug DC metro homeowners most. No contracts. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/#plans">See Our Protection Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 text-primary-foreground hover:bg-primary/10">
                <Link to="/#plans">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;

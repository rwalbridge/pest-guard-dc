import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Clock, ArrowRight, Mail, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogArticles, blogCategories, getMostReadArticles } from "@/data/blog";

const ARTICLES_PER_PAGE = 6;

const BlogIndex = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");

  const filtered = activeCategory === "all"
    ? blogArticles
    : blogArticles.filter(a => a.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const mostRead = getMostReadArticles();

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const DOMAIN = "https://pest-guard-dc.lovable.app";

  return (
    <>
      <Helmet>
        <title>The Nest — Home Protection Insights by GreenShield</title>
        <meta name="description" content="Real pest control advice for DC metro homeowners. Seasonal guides, DIY tips, pest identification, and honest pricing info." />
        <meta property="og:site_name" content="GreenShield" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="The Nest — Home Protection Insights by GreenShield" />
        <meta property="og:description" content="Real pest control advice for DC metro homeowners. Seasonal guides, DIY tips, pest identification, and honest pricing info." />
        <meta property="og:url" content={`${DOMAIN}/blog`} />
        <meta property="og:image" content={`${DOMAIN}/og-images/blog-index.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PestGuardDC" />
        <meta name="twitter:title" content="The Nest — Home Protection Insights by GreenShield" />
        <meta name="twitter:description" content="Real pest control advice for DC metro homeowners. Seasonal guides, DIY tips, pest identification, and honest pricing info." />
        <meta name="twitter:image" content={`${DOMAIN}/og-images/blog-index.jpg`} />
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground section-padding">
          <div className="container-max">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-primary font-medium">by GreenShield</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            >
              The Nest
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl"
            >
              Real pest control advice for DC metro homeowners — straight from the field.
            </motion.p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-background border-b border-border sticky top-16 sm:top-20 z-30">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {blogCategories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="section-padding bg-background">
          <div className="container-max">
            <div className="lg:grid lg:grid-cols-3 lg:gap-10">
              {/* Articles */}
              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-6">
                  {paginated.map((article, i) => (
                    <motion.article
                      key={article.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <Link to={`/blog/${article.slug}`}>
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={article.heroImage}
                            alt={article.heroAlt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${article.categoryColor}`}>
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {article.readTime} min read
                          </span>
                        </div>
                        <Link to={`/blog/${article.slug}`}>
                          <h2 className="text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h2>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                              <Shield className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-foreground">{article.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <Link
                            to={`/blog/${article.slug}`}
                            className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Read <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block space-y-8 mt-0">
                {/* CTA Card */}
                <div className="bg-secondary text-secondary-foreground rounded-2xl p-6">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-lg font-bold mb-2">Protect Your Home</h3>
                  <p className="text-sm text-muted-foreground mb-1">Plans start at $49/mo.</p>
                  <p className="text-sm text-muted-foreground mb-4">No contracts. Cancel anytime.</p>
                  <Button asChild className="w-full">
                    <Link to="/#plans">See Plans</Link>
                  </Button>
                </div>

                {/* Most Read */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <h3 className="font-bold text-foreground">Most Read</h3>
                  </div>
                  <ul className="space-y-3">
                    {mostRead.map((a, i) => (
                      <li key={a.slug}>
                        <Link
                          to={`/blog/${a.slug}`}
                          className="flex gap-3 group"
                        >
                          <span className="text-lg font-bold text-primary/40 group-hover:text-primary transition-colors">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                            {a.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter */}
                <div className="bg-accent rounded-2xl p-6">
                  <Mail className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Seasonal Pest Alerts</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get seasonal pest alerts for the DC metro area. No spam — just useful stuff.
                  </p>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button className="w-full" type="submit">Subscribe</Button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogIndex;

import React from 'react';
import { Search, Sparkles, Star, TrendingUp } from 'lucide-react';

const seoHighlights = [
  {
    icon: Search,
    title: 'Search-friendly learning',
    description: 'Explore trigonometry with clear lesson titles, helpful headings and structured content for students and teachers.',
  },
  {
    icon: Sparkles,
    title: 'Colorful guided practice',
    description: 'Enjoy vibrant visuals while solving triangles step by step with the sine rule, cosine rule and area formulas.',
  },
  {
    icon: Star,
    title: 'Built for Google snippets',
    description: 'The app keeps important SEO text visible so your published GitHub Pages site can present a stronger summary.',
  },
  {
    icon: TrendingUp,
    title: 'Interactive trigonometry hub',
    description: 'Move through tabs for ratios, graphs, triangles and practice questions in one colourful learning experience.',
  },
];

export default function SEOHighlights() {
  return (
    <section
      aria-labelledby="seo-highlights-heading"
      className="mt-8 rounded-3xl border border-white/30 bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-500 p-5 shadow-2xl sm:p-7"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white/20 p-3 text-white shadow-lg backdrop-blur">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">SEO Subheadline</p>
          <h2 id="seo-highlights-heading" className="text-2xl font-black text-white sm:text-3xl">
            Make trigonometry easy to find, fun to learn, and simple to share
          </h2>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-base leading-7 text-white/90 sm:text-lg">
        This colourful SEO section can sit under the main hero area or inside a suitable tab so the app keeps
        the earlier search-optimised description visible while adding a more engaging and vibrant presentation.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {seoHighlights.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl bg-white/15 p-4 text-white shadow-lg ring-1 ring-white/20 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-2">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/85">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

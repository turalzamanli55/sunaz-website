import type { Dictionary } from "@/types/dictionary";

interface HeroProps {
  dict: Dictionary;
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[90vh] overflow-hidden pt-16 lg:pt-20">
      <div className="absolute inset-0 bg-sunaz-green">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%),
              linear-gradient(135deg, #0a2e22 0%, #0f3d2e 40%, #1a5c45 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sunaz-green via-transparent to-sunaz-green/80" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(90vh-4rem)] max-w-7xl flex-col justify-center px-6 py-20 lg:px-8 lg:py-32">
        <div className="max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sunaz-gold/30 bg-white/10 px-5 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-sunaz-gold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sunaz-gold-light">
              {dict.hero.badge}
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
            {dict.hero.headline}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl lg:text-2xl">
            {dict.hero.subheadline}
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-sunaz-green shadow-lg transition-all hover:bg-sunaz-gold hover:text-white hover:shadow-xl"
            >
              {dict.hero.ctaProducts}
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/60 hover:bg-white/20"
            >
              {dict.hero.ctaAbout}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/60 hover:bg-white/20"
            >
              {dict.hero.ctaContact}
            </a>
            <a
              href="#export"
              className="inline-flex items-center justify-center rounded-full bg-sunaz-gold px-8 py-3.5 text-sm font-semibold text-sunaz-green shadow-lg shadow-sunaz-gold/20 transition-all hover:bg-sunaz-gold-light hover:shadow-xl"
            >
              {dict.hero.ctaExport}
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block">
          <a href="#stats" className="flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/70">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

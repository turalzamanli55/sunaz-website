import SectionHeader from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/types/dictionary";

const WHY_ICONS = [
  <svg key="0" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008H17.25V7.5Zm0 3h.008v.008H17.25V10.5Zm0 3h.008v.008H17.25V13.5Z" />
  </svg>,
  <svg key="1" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>,
  <svg key="2" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.069 48.069 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
  </svg>,
  <svg key="3" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>,
  <svg key="4" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>,
  <svg key="5" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>,
  <svg key="6" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>,
];

interface AboutPageContentProps {
  dict: Dictionary;
}

export default function AboutPageContent({ dict }: AboutPageContentProps) {
  const { page } = dict.about;

  return (
    <>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-6">
            {page.introduction.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-sunaz-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50/60 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-sunaz-gold">
                {page.mission.title}
              </span>
              <div className="mt-4 h-0.5 w-12 bg-sunaz-gold" />
              <p className="mt-6 text-base leading-relaxed text-sunaz-muted sm:text-lg">
                {page.mission.content}
              </p>
            </article>
            <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-sunaz-gold">
                {page.vision.title}
              </span>
              <div className="mt-4 h-0.5 w-12 bg-sunaz-gold" />
              <p className="mt-6 text-base leading-relaxed text-sunaz-muted sm:text-lg">
                {page.vision.content}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow={dict.about.eyebrow} title={page.why.title} />

          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-16 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {page.why.items.map((item, i) => (
              <article
                key={item.title}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50/50 p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-sunaz-gold/30 hover:bg-white hover:shadow-xl md:p-8"
              >
                <div className="inline-flex h-9 w-9 rounded-xl bg-sunaz-green/5 p-2 text-sunaz-green transition-colors duration-300 group-hover:bg-sunaz-green group-hover:text-white md:h-12 md:w-12 md:p-3">
                  {WHY_ICONS[i]}
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-sunaz-green md:mt-6 md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-sunaz-muted md:mt-3 md:text-sm">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

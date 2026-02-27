import { faqs } from "@/_data/home";
import SectionHeading from "../shared/SectionHeading";


export default function FaqSection() {
  return (
    <section id="faq" className="bg-[#F9FAFB]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-18">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Quick answers about compatibility, setup, and how the app works."
          className="text-[#0F172A]"
        />

         <div className="mx-auto mt-10 max-w-3xl ">
        <div className="faq-scroll-container divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(16,24,40,0.06)] max-h-[400px] overflow-y-auto">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="faq-item"
              >
                <summary className="faq-summary flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/30">
                  <span className="text-base font-semibold text-(--color-secondary)">
                    {item.question}
                  </span>
                  <span
                    className="faq-chevron shrink-0 rounded-full bg-black/5 px-2 py-1 text-sm text-black/70"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <div className="faq-panel">
                  <div className="faq-panel-inner overflow-hidden">
                    <div className="faq-answer px-6 pb-6 text-sm leading-6 text-zinc-600">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* <p className="mt-4 text-center text-xs text-zinc-500">
            Still have questions? Scroll down to download the app and try it on
            your TV.
          </p> */}
        </div>
      </div>
    </section>
  );
}


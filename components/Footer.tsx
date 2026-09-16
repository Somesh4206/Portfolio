import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-choco/15 bg-cream" aria-label="Footer">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-script text-4xl text-choco">Somesh M</p>
            <p className="label mt-3 !text-[10px] text-fawn">
              AI Developer · Full Stack Engineer · Cybersecurity Enthusiast
            </p>
          </div>
          <nav aria-label="Social links">
            <ul className="flex items-center gap-5">
              {[
                { label: "GitHub", href: SITE.github },
                { label: "LinkedIn", href: SITE.linkedin },
                { label: "LeetCode", href: SITE.leetcode },
                { label: "HackerRank", href: SITE.hackerrank },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="u-link text-[12px] font-semibold uppercase tracking-[0.18em] text-choco">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#home" aria-label="Back to top" className="block rounded-full bg-choco p-2.5 text-cream transition-colors hover:bg-bark">
                  <ArrowUp size={16} />
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 text-[13px] text-fawn sm:flex-row sm:justify-between">
          <p>© 2026 Somesh M — All stories told honestly.</p>
          <p className="label !text-[10px]">Set in Cormorant & Inter · Printed on pixels</p>
        </div>
      </div>
    </footer>
  );
}

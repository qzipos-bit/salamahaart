import type { LegalSection } from "@/lib/legal-pages";

type Props = {
  sections: LegalSection[];
  className?: string;
};

export function LegalDocumentBody({ sections, className = "" }: Props) {
  return (
    <div className={`prose-legal space-y-8 ${className}`.trim()}>
      {sections.map((section, index) => (
        <section
          key={`${section.heading ?? "intro"}-${index}`}
          id={section.id}
        >
          {section.heading ? (
            <h2 className="font-serif text-xl font-semibold text-green-deep sm:text-2xl">
              {section.heading}
            </h2>
          ) : null}
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className={`text-sm leading-relaxed text-fg/80 sm:text-base ${
                section.heading ? "mt-3" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
          {section.list?.length ? (
            <ul
              className={`space-y-2 text-sm leading-relaxed text-fg/80 sm:text-base ${
                section.heading ? "mt-3" : ""
              }`}
            >
              {section.list.map((item) => (
                <li key={item.slice(0, 48)} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {section.table ? (
            <div className="mt-4 overflow-x-auto rounded-[var(--radius-lg)] border border-green/12">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm text-fg/80">
                {section.table.caption ? (
                  <caption className="border-b border-green/10 bg-sage-muted/30 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-green/70">
                    {section.table.caption}
                  </caption>
                ) : null}
                <thead>
                  <tr className="border-b border-green/12 bg-sage-muted/40">
                    {section.table.headers.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-4 py-3 font-semibold text-green-deep"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rowIndex) => (
                    <tr
                      key={`row-${rowIndex}`}
                      className="border-b border-green/8 last:border-b-0"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`cell-${rowIndex}-${cellIndex}`}
                          className="px-4 py-3 align-top leading-relaxed"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}

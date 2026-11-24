import Image from "next/image";
import type { ArticleBlock } from "@/lib/articles";

/**
 * Renders article blocks. Images are floated left/right so the text wraps around them
 * on wide screens, and become full-width blocks on small screens.
 */
export default function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return <div className="flow-root">{blocks.map((block, index) => renderBlock(block, index))}</div>;
}

function renderBlock(block: ArticleBlock, index: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={index} className="mt-10 first:mt-0">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul key={index} className="mt-10 space-y-5">
          {block.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="relative pl-6 before:absolute before:left-1 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-blue-600 before:content-['']"
            >
              {item.lead && (
                <>
                  <strong className="font-semibold text-slate-900">{item.lead}</strong>{" "}
                </>
              )}
              {item.text}
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div
          key={index}
          className="clear-both mt-12 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <table className="w-full min-w-[320px] border-collapse text-left text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} scope="col" className="px-5 py-3.5 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-slate-200 odd:bg-white even:bg-slate-50">
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cellIndex} scope="row" className="px-5 py-3.5 align-top font-semibold text-slate-900">
                        {cell}
                      </th>
                    ) : (
                      <td key={cellIndex} className="px-5 py-3.5 align-top text-slate-700">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "image":
      return (
        <figure
          key={index}
          className={`mb-10 mt-8 w-full sm:w-[42%] ${
            block.align === "left" ? "sm:float-left sm:mr-10" : "sm:float-right sm:ml-10"
          }`}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      );

    case "note":
      return (
        <div
          key={index}
          className="clear-both mt-14 rounded-xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4 text-sm leading-relaxed text-slate-700"
        >
          {block.text}
        </div>
      );

    default:
      return null;
  }
}

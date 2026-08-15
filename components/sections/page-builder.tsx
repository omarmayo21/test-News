import React from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import { Locale } from "@/i18n-config";

export function PageBuilder({ blocks, locale }: { blocks: any[], locale: Locale }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="w-full flex flex-col">
      {blocks.map((block: any, idx: number) => {
        const key = block._key || idx;

        switch (block._type) {
          case 'richTextBlock':
            return <RichTextBlock key={key} block={block} locale={locale} />;
          case 'splitBlock':
            return <SplitBlock key={key} block={block} locale={locale} index={idx} />;
          case 'cardsBlock':
            return <CardsBlock key={key} block={block} locale={locale} />;
          case 'statsBlock':
            return <StatsBlock key={key} block={block} locale={locale} />;
          case 'accordionBlock':
            return <AccordionBlock key={key} block={block} locale={locale} />;
          case 'twoColumnBlock':
            return <TwoColumnBlock key={key} block={block} locale={locale} />;
          default:
            return <div key={key} className="hidden">Unknown block type: {block._type}</div>;
        }
      })}
    </div>
  );
}

function TwoColumnBlock({ block, locale }: { block: any, locale: Locale }) {
  const bgClass = block.theme === 'gray' ? 'bg-surface-container-low' : 'bg-white';
  
  const leftCol = block.leftColumn || {};
  const rightCol = block.rightColumn || {};

  return (
    <section className={`${bgClass} py-section-padding px-margin-mobile md:px-section-padding border-t border-surface-container-high`}>
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter lg:gap-24">
          
          {/* Left Column */}
          <div>
            {leftCol.title && (
              <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
                {leftCol.title?.[locale] || leftCol.title?.en}
              </span>
            )}
            {leftCol.heading && (
              <h2 className="font-headline text-headline-lg text-primary-navy mb-6">
                {leftCol.heading?.[locale] || leftCol.heading?.en}
              </h2>
            )}
            {leftCol.content && (
              <div className="font-body text-body-md text-on-surface opacity-80 leading-relaxed whitespace-pre-wrap space-y-4">
                <PortableText value={leftCol.content} />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {rightCol.title && (
              <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
                {rightCol.title?.[locale] || rightCol.title?.en}
              </span>
            )}
            {rightCol.heading && (
              <h2 className="font-headline text-headline-lg text-primary-navy mb-6">
                {rightCol.heading?.[locale] || rightCol.heading?.en}
              </h2>
            )}
            {rightCol.content && (
              <div className="font-body text-body-md text-on-surface opacity-80 leading-relaxed whitespace-pre-wrap space-y-4 mb-8">
                <PortableText value={rightCol.content} />
              </div>
            )}
            {rightCol.cards && rightCol.cards.length > 0 && (
              <ul className="space-y-8">
                {rightCol.cards.map((c: any, idx: number) => (
                  <li key={idx} className="pl-4 border-l-2 border-primary-gold">
                    {c.title && (
                      <h3 className="font-headline text-headline-sm text-primary-navy mb-2">
                        {c.title?.[locale] || c.title?.en}
                      </h3>
                    )}
                    {c.description && (
                      <p className="font-body text-body-md text-on-surface opacity-75 whitespace-pre-wrap">
                        {c.description?.[locale] || c.description?.en}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RichTextBlock({ block, locale }: { block: any, locale: Locale }) {
  const title = block.title?.[locale] || block.title?.en;
  
  return (
    <section className="bg-white py-section-padding px-margin-mobile md:px-section-padding border-t border-surface-container-high">
      <div className="max-w-container-max mx-auto">
        {title && (
          <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
            {title}
          </span>
        )}
        <div className="prose prose-lg prose-p:font-body prose-p:text-body-md prose-p:opacity-80 prose-li:font-body prose-li:text-body-md prose-li:opacity-90 prose-h2:font-headline prose-h2:text-headline-lg prose-h2:text-primary-navy prose-h2:mb-6 marker:text-primary-gold max-w-none">
          <PortableText value={block.content} />
        </div>
      </div>
    </section>
  );
}

function SplitBlock({ block, locale, index }: { block: any, locale: Locale, index: number }) {
  const isEven = index % 2 === 0;
  const isImageLeft = block.layout === "imageLeft";
  const imageFirst = isImageLeft; // You can refine this logic based on index or layout

  return (
    <section className="py-16 px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
        <div className={`space-y-6 ${!isEven ? 'md:order-2' : 'md:order-1'}`}>
          {block.title && (
            <h2 className="font-headline text-headline-lg text-primary-navy">
              {block.title?.[locale] || block.title?.en}
            </h2>
          )}
          {block.subtitle && (
            <p className="font-body text-body-md opacity-80 leading-relaxed whitespace-pre-wrap">
              {block.subtitle?.[locale] || block.subtitle?.en}
            </p>
          )}
          {block.buttonLabel && block.buttonLink && (
             <div className="mt-8">
               <Link
                 href={block.buttonLink}
                 className="inline-block px-8 py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors"
               >
                 {block.buttonLabel?.[locale] || block.buttonLabel?.en}
               </Link>
             </div>
          )}
        </div>
        <div className={`relative h-[400px] border-4 border-white shadow-xl overflow-hidden bg-surface-container-high ${!isEven ? 'md:order-1' : 'md:order-2'}`}>
          {block.image && urlForImage(block.image) ? (
            <Image
              src={urlForImage(block.image)!.url()}
              alt={block.title?.[locale] || block.title?.en || "Image"}
              fill
              className="object-cover grayscale-[15%]"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-surface-container-highest flex items-center justify-center text-on-surface opacity-30 font-label tracking-widest uppercase">
              No Image
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CardsBlock({ block, locale }: { block: any, locale: Locale }) {
  const title = block.title?.[locale] || block.title?.en;
  
  return (
    <section className="bg-surface-container-low py-section-padding px-margin-mobile md:px-section-padding border-t border-surface-container-high">
      <div className="max-w-container-max mx-auto">
        {title && (
          <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
            {title}
          </span>
        )}
        <ul className="space-y-8 mt-8">
          {block.cards?.map((card: any, idx: number) => (
            <li key={idx} className="pl-4 border-l-2 border-primary-gold">
              {card.title && (
                <h3 className="font-headline text-headline-sm text-primary-navy mb-2">
                  {card.title?.[locale] || card.title?.en}
                </h3>
              )}
              {card.description && (
                <p className="font-body text-body-md text-on-surface opacity-75 whitespace-pre-wrap">
                  {card.description?.[locale] || card.description?.en}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatsBlock({ block, locale }: { block: any, locale: Locale }) {
  return (
    <section className="px-margin-mobile md:px-section-padding max-w-container-max mx-auto py-12">
      {block.stats && block.stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter bg-surface-container-low p-10 border-l-4 border-primary-gold">
          {block.stats.map((s: any, idx: number) => (
            <div key={idx}>
              <div className="font-headline text-display-lg text-primary-navy mb-1">{s.number}</div>
              <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold">
                {s.label?.[locale] || s.label?.en}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AccordionBlock({ block, locale }: { block: any, locale: Locale }) {
  return (
    <section className="py-16 px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      {block.title && (
        <h2 className="font-headline text-headline-lg text-primary-navy mb-8">
          {block.title?.[locale] || block.title?.en}
        </h2>
      )}
      <div className="space-y-6">
        {block.items?.map((item: any, idx: number) => (
          <div key={idx} className="border-b border-surface-container-high pb-4">
            <h3 className="font-headline text-headline-sm text-primary-navy mb-2">
              {item.heading?.[locale] || item.heading?.en}
            </h3>
            <p className="font-body text-body-md opacity-80 leading-relaxed">
              {item.content?.[locale] || item.content?.en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

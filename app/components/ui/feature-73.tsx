import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Feature73Props {
  heading?: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  features?: Feature[];
}

export const Feature73 = ({
  heading = "Powerful Features",
  description = "Discover the powerful features that make our platform stand out from the rest. Built with the latest technology and designed for maximum productivity.",
  linkUrl = "https://www.shadcnblocks.com",
  linkText = "Book a demo",
  features = [
    {
      id: "feature-1",
      title: "Modern Design",
      description:
        "Clean and intuitive interface built with the latest design principles. Optimized for the best user experience.",
      image: "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
    },
    {
      id: "feature-2",
      title: "Responsive Layout",
      description:
        "Fully responsive design that works seamlessly across all devices and screen sizes. Perfect for any platform.",
      image: "https://www.shadcnblocks.com/images/block/placeholder-2.svg",
    },
    {
      id: "feature-3",
      title: "Easy Integration",
      description:
        "Simple integration process with comprehensive documentation and dedicated support team.",
      image: "https://www.shadcnblocks.com/images/block/placeholder-3.svg",
    },
  ],
}: Feature73Props) => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="max-w-3xl">
          <p className="public-kicker">Tuyến tham quan</p>
          <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-7 text-[var(--foreground)]/76">{description}</p>
          <Link
            href={linkUrl}
            className="group mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--tour-ink)] transition-colors hover:text-[var(--primary)]"
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.8} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {features[0] && (
            <article className="public-card public-stagger-item grid overflow-hidden rounded-[8px] md:col-span-2 md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[22rem] md:min-h-[28rem]">
                <Image
                  src={features[0].image}
                  alt={features[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <h3 className="text-2xl font-bold leading-tight text-[var(--tour-ink)] lg:text-3xl">
                  {features[0].title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)] sm:text-base">
                  {features[0].description}
                </p>
              </div>
            </article>
          )}
          {features.slice(1).map((feature) => (
            <article
              key={feature.id}
              className="public-card public-stagger-item overflow-hidden rounded-[8px]"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-[var(--tour-ink)]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

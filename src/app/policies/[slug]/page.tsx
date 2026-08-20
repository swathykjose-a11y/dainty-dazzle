import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalPolicies, getLocalPolicyBySlug } from "@/lib/policies";
import { getPolicyBySlug as getShopifyPolicyBySlug } from "@/lib/shopify";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// ─── Resolve policy: local first, Shopify fallback ──────────────────────────

async function resolvePolicy(slug: string) {
  const local = getLocalPolicyBySlug(slug);
  if (local) return local;

  // Fallback to Shopify if local content is not available for this slug
  const shopify = await getShopifyPolicyBySlug(slug);
  return shopify;
}

// ─── Static params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  const policies = getLocalPolicies();
  return policies.map((p) => ({ slug: p.slug }));
}

// ─── Dynamic Metadata ───────────────────────────────────────────────────────

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = await resolvePolicy(slug);

  if (!policy) {
    return { title: "Policy Not Found" };
  }

  return {
    title: policy.title,
    description: `${policy.title} for Dainty Dazzle fine jewelry store.`,
    alternates: {
      canonical: `/policies/${policy.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = await resolvePolicy(slug);

  if (!policy) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          {
            name: policy.title,
            url: `${siteUrl}/policies/${policy.slug}`,
          },
        ]}
      />

      <section className="py-12 md:py-20 bg-sage-canvas">
        <div className="w-full px-4 sm:px-8 lg:px-12 max-w-3xl mx-auto">
          <h1 className="font-secondary text-3xl md:text-4xl text-charcoal tracking-tight font-normal mb-8">
            {policy.title}
          </h1>

          <div
            className="prose prose-sm max-w-none font-primary text-charcoal/80 leading-relaxed
              prose-headings:font-secondary prose-headings:text-charcoal prose-headings:tracking-tight prose-headings:font-normal
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
              prose-p:mb-4
              prose-a:text-charcoal prose-a:underline prose-a:underline-offset-4"
            dangerouslySetInnerHTML={{ __html: policy.contentHtml }}
          />
        </div>
      </section>
    </>
  );
}

import { getProducts, getHeroBanner } from "@/lib/shopify";
import { HeroSection } from "@/components/sections/home/hero-section";
import { FeaturedCollectionsSection } from "@/components/sections/home/featured-collections-section";
import { EditorialBanner } from "@/components/sections/home/editorial-banner";
import { StorySection } from "@/components/sections/home/story-section";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [products, heroData] = await Promise.all([
    getProducts(),
    getHeroBanner(),
  ]);

  return (
    <>
      <HeroSection heroData={heroData} />

      <FeaturedCollectionsSection products={products} />

      <EditorialBanner
        imageUrl="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=85&auto=format&fit=crop"
        imageAlt="Elegant gold jewelry editorial"
        headline="Elegance in every detail."
        subtitle="Handcrafted with love, designed to be worn every single day."
        align="left"
      />

      <StorySection />

      <EditorialBanner
        imageUrl="https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1920&q=85&auto=format&fit=crop"
        imageAlt="Gold earrings close-up editorial"
        headline="Emotion embraces technique."
        subtitle="Where craftsmanship meets quiet confidence."
        align="right"
      />
    </>
  );
}

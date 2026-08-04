import { getProducts } from "@/lib/shopify";
import { HeroSection } from "@/components/sections/home/hero-section";
import { FeaturedCollectionsSection } from "@/components/sections/home/featured-collections-section";
import { EditorialBanner } from "@/components/sections/home/editorial-banner";
import { CategoriesSection } from "@/components/sections/home/categories-section";
import { StorySection } from "@/components/sections/home/story-section";

export const revalidate = 3600;

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <HeroSection />

      <FeaturedCollectionsSection products={products} />

      <EditorialBanner
        imageUrl="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=85&auto=format&fit=crop"
        imageAlt="Elegant gold jewelry editorial"
        headline="Elegance in every detail."
        subtitle="Handcrafted with love, designed to be worn every single day."
        align="left"
      />

      <CategoriesSection products={products} />

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

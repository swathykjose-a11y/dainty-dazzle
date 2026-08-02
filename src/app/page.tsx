import { getProducts } from "@/lib/shopify";
import { HeroSection } from "@/components/sections/home/hero-section";
import { FeaturedCollectionsSection } from "@/components/sections/home/featured-collections-section";
import { StorySection } from "@/components/sections/home/story-section";

export const revalidate = 3600;

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <HeroSection />
      <FeaturedCollectionsSection products={products} />
      <StorySection />
    </>
  );
}

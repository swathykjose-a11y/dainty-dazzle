import {
  getProducts,
  getHeroBanner,
  getFeaturedSection,
  getEditorialBanner,
  getStorySection,
  getBottomBanner,
} from "@/lib/shopify";
import { HeroSection } from "@/components/sections/home/hero-section";
import { FeaturedCollectionsSection } from "@/components/sections/home/featured-collections-section";
import { EditorialBanner } from "@/components/sections/home/editorial-banner";
import { StorySection } from "@/components/sections/home/story-section";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [products, heroData, featuredData, editorialData, storyData, bottomData] =
    await Promise.all([
      getProducts(),
      getHeroBanner(),
      getFeaturedSection(),
      getEditorialBanner(),
      getStorySection(),
      getBottomBanner(),
    ]);

  return (
    <>
      <HeroSection heroData={heroData} />

      <FeaturedCollectionsSection
        products={products}
        featuredData={featuredData}
      />

      <EditorialBanner
        imageUrl={
          editorialData?.imageUrl ||
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=85&auto=format&fit=crop"
        }
        imageAlt="Elegant gold jewelry editorial"
        headline={editorialData?.headline || "Elegance in every detail."}
        subtitle={
          editorialData?.subtitle ||
          "Handcrafted with love, designed to be worn every single day."
        }
        align="left"
      />

      <StorySection storyData={storyData} />

      <EditorialBanner
        imageUrl={
          bottomData?.imageUrl ||
          "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1920&q=85&auto=format&fit=crop"
        }
        imageAlt="Gold earrings close-up editorial"
        headline={bottomData?.headline || "Emotion embraces technique."}
        subtitle={
          bottomData?.subtitle ||
          "Where craftsmanship meets quiet confidence."
        }
        align="right"
      />
    </>
  );
}

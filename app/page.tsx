import { Header } from "@/components/boty/header"
import { Hero } from "@/components/boty/hero"
import { TrustBadges } from "@/components/boty/trust-badges"
import { FeatureSection } from "@/components/boty/feature-section"
import { ProductGrid } from "@/components/boty/product-grid"
import { FeaturedProduct } from "@/components/boty/featured-product"
import { Testimonials } from "@/components/boty/testimonials"
import { CTABanner } from "@/components/boty/cta-banner"
import { PromoBanner } from "@/components/boty/promo-banner"
import { Footer } from "@/components/boty/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedProduct />
      <TrustBadges />
      {/* <ProductGrid /> */}
      <FeatureSection />
      <Testimonials />
      <CTABanner />
      {/* <PromoBanner /> */}
      <Footer />
    </main>
  )
}

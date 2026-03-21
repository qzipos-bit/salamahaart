import { LandingShell } from "@/components/layout/landing-shell";
import { About } from "@/components/sections/about";
import { Advantages } from "@/components/sections/advantages";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Categories } from "@/components/sections/categories";
import { Contacts } from "@/components/sections/contacts";
import { Courses } from "@/components/sections/courses";
import { CustomOrder } from "@/components/sections/custom-order";
import { Delivery } from "@/components/sections/delivery";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { QuickLead } from "@/components/sections/quick-lead";
import { Reviews } from "@/components/sections/reviews";

export default function Home() {
  return (
    <LandingShell>
      <Hero />
      <About />
      <Categories />
      <FeaturedProducts />
      <Advantages />
      <QuickLead />
      <CustomOrder />
      <Gallery />
      <Reviews />
      <Courses />
      <BlogPreview />
      <Delivery />
      <Contacts />
    </LandingShell>
  );
}

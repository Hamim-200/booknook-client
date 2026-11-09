import FAQ from "@/components/home/FAQ";
import HeroSlider from "@/components/home/HeroSlider";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import ReaderReviews from "@/components/home/ReaderReviews";
import TopCategories from "@/components/home/TopCategories";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
      <ReaderReviews />
      <FAQ />
    </>
  );
}
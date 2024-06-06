import { personalData } from "@/utils/data/personal-data";
import Blog from "./components/homepage/blog";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
const { parse } = require("rss-to-json");

async function getData() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const filtered = data
    .filter((item) => item?.cover_image)
    .sort(() => Math.random() - 0.5);

  return filtered;
}

export default async function Home() {
  const blogs = await getData();

  return (
    <>
      <HeroSection />
      <Experience />
      <Blog blogs={blogs} />
    </>
  );
}

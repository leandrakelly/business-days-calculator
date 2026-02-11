import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://diasuteis.com.br", // TODO: change later
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

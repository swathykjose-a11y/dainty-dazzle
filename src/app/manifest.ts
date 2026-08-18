import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dainty Dazzle | Fine Jewelry",
    short_name: "Dainty Dazzle",
    description:
      "True beauty shines from within. Discover delicate, handcrafted jewelry designed to reflect it.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2F5EF",
    theme_color: "#1A211D",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

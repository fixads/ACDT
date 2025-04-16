interface ImageConfig {
  url: string;
  alt: string;
  recommendedSize: string;
  format: string;
}

interface ProgramImages {
  kravMaga: ImageConfig;
  firearms: ImageConfig;
  cqb: ImageConfig;
}

interface ImagesConfig {
  logo: ImageConfig;
  hero: ImageConfig;
  programs: ProgramImages;
  story: ImageConfig;
}

export const IMAGES: ImagesConfig = {
  logo: {
    url: "/images/logo.svg",
    alt: "ACDT Logo",
    recommendedSize: "48x48px (SVG preferred)",
    format: "SVG - For sharp rendering at all sizes"
  },
  hero: {
    url: "/images/hero.webp",
    alt: "Hero Background - Training Session",
    recommendedSize: "1920x1080px minimum (16:9 aspect ratio)",
    format: "WebP - Best compression with high quality, JPEG as fallback"
  },
  programs: {
    kravMaga: {
      url: "/images/program-defense.webp",
      alt: "Advanced Self-Defense Training",
      recommendedSize: "800x600px minimum (4:3 aspect ratio)",
      format: "WebP - Best compression with high quality, JPEG as fallback"
    },
    firearms: {
      url: "/images/program-protection.webp",
      alt: "Personal Protection Training",
      recommendedSize: "800x600px minimum (4:3 aspect ratio)",
      format: "WebP - Best compression with high quality, JPEG as fallback"
    },
    cqb: {
      url: "/images/program-advanced.webp",
      alt: "Advanced Defense Training",
      recommendedSize: "800x600px minimum (4:3 aspect ratio)",
      format: "WebP - Best compression with high quality, JPEG as fallback"
    }
  },
  story: {
    url: "/images/story.webp",
    alt: "Our Story Image",
    recommendedSize: "600x600px (1:1 aspect ratio)",
    format: "WebP - Best compression with high quality, JPEG as fallback"
  }
};
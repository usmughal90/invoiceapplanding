import { slides } from "./home";

export interface BrandData {
    slug: string;
    name: string;
    image: string;
}

export function getBrandBySlug(slug: string): BrandData | undefined {
    const normalizedSlug = slug.toLowerCase();
    const slide = slides.find(s => {
        const slideSlug = s.alt.toLowerCase().replace(/ /g, "-");
        return slideSlug === normalizedSlug;
    });

    if (slide) {
        return {
            slug: normalizedSlug,
            name: slide.alt, // e.g. "Samsung TV"
            image: slide.src
        };
    }

    // Fallback or explicit handling if needed
    return undefined;
}

export function getAllBrandSlugs(): string[] {
    return slides.map(s => s.alt.toLowerCase().replace(/ /g, "-"));
}

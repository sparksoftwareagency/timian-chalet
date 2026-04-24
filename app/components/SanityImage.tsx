import Image, { type ImageProps } from "next/image";

import type { CmsImage } from "@/sanity/lib/queries";

type SanityImageProps = Omit<ImageProps, "src" | "alt"> & {
  image: CmsImage;
};

function resolveHotspotObjectPosition(source: unknown): string | undefined {
  if (!source || typeof source !== "object") {
    return undefined;
  }

  const hotspot = (source as { hotspot?: { x?: number; y?: number } }).hotspot;
  const x = hotspot?.x;
  const y = hotspot?.y;
  if (typeof x !== "number" || typeof y !== "number") {
    return undefined;
  }

  return `${x * 100}% ${y * 100}%`;
}

export default function SanityImage({ image, style, ...props }: SanityImageProps) {
  const hotspotPosition = resolveHotspotObjectPosition(image?.image);
  const mergedStyle = hotspotPosition
    ? { ...style, objectPosition: style?.objectPosition ?? hotspotPosition }
    : style;
  const alt = image.alt ?? "";

  return <Image {...props} src={image.url} alt={alt} style={mergedStyle} />;
}

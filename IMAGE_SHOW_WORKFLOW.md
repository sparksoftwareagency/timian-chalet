# Image Show Workflow

This guide explains the preferred CMS pattern:
- editors upload one or more images in one array field
- UI renders a plain image when there is one item
- UI renders `ImageShow` when there are multiple items

## What was implemented (Wellness farm sauna)

We integrated the farm sauna image in Wellness with a single source field:

- Added `highlightImages` array field to `sanity/schemaTypes/wellnessPage.ts` with validation `required().min(1)`
- Added `highlightImages[]` to `wellnessPageQuery` in `sanity/lib/queries.ts`
- Set `highlightImages: CmsImage[]` in `WellnessPageData`
- Updated `app/components/WellnessClientPage.tsx` to use conditional rendering:

```tsx
const highlightImages = data.highlightImages.filter((image) => image?.url);
const hasImageShow = highlightImages.length > 1;
const singleHighlightImage = highlightImages[0];

{hasImageShow ? (
  <ImageShow ... images={highlightImages} />
) : singleHighlightImage ? (
  <Image ... src={singleHighlightImage.url} />
) : null}
```

### Why this approach

- One field is easier for editors to understand and maintain
- Image count directly controls behavior (1 = static image, 2+ = slider)
- No duplicated content fields for the same section

## Reusable pattern: one field, two render modes

Use this same process for any section (`legacy`, `signature`, etc.).

### 1) Add one array field in schema

```ts
defineField({
  name: "legacyImages",
  title: "Legacy image gallery",
  description: "Upload one or more images. One image renders as static; multiple as slider.",
  type: "array",
  of: [{ type: "imageBlock" }],
  validation: (Rule) => Rule.required().min(1),
})
```

### 2) Add field to GROQ query

```ts
legacyImages[] ${imageProjection},
```

### 3) Add field to TypeScript data type

```ts
legacyImages: CmsImage[]
```

### 4) Render conditionally in component

```tsx
import ImageShow from "@/app/components/ImageShow";

const legacyImages = data.legacyImages.filter((image) => image?.url);
const hasImageShow = legacyImages.length > 1;
const singleLegacyImage = legacyImages[0];

{hasImageShow ? (
  <ImageShow
    images={legacyImages}
    aspectRatioClassName="aspect-[4/3]"
    frameClassName="shadow-xl"
    className="w-full"
    sizes="(min-width: 1024px) 50vw, 100vw"
  />
) : singleLegacyImage ? (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
    <Image src={singleLegacyImage.url} alt={singleLegacyImage.alt} fill className="object-cover" />
  </div>
) : null}
```

## `ImageShow` UX behavior

- arrows are overlaid left/right with semi-transparent background
- dots are below the image
- users can navigate with arrows and dots
- next/previous does directional side push animation
- controls hide automatically when there is only one image

# Experiences Video Side Images Workflow

This runbook documents the exact process used to add two side images around the Experiences page video and sync them to Sanity CMS.

## Goal

- Update `app/components/ExperiencesClientPage.tsx` so the video is centered with two side images.
- Use:
  - `public/experiences/experiences-video-2.jpg` (left)
  - `public/experiences/experiences-video.jpg` (right)
- Store these images in Sanity and connect them to `experiencesPage` documents.

## What changed in code

1. **Component layout update**
   - File: `app/components/ExperiencesClientPage.tsx`
   - Replaced single video container with a responsive 3-column media layout on desktop:
     - left image
     - center video
     - right image
   - Added mobile fallback where side images render below the video.
   - Added fallback logic:
     - Prefer CMS-provided side images.
     - Fallback to local `/public/experiences/...` paths when CMS images are missing.

2. **Schema fields added**
   - File: `sanity/schemaTypes/experiencesPage.ts`
   - Added:
     - `experienceVideoSideImageLeft` (`imageBlock`)
     - `experienceVideoSideImageRight` (`imageBlock`)

3. **Query + type update**
   - File: `sanity/lib/queries.ts`
   - `ExperiencesPageData` now includes optional:
     - `experienceVideoSideImageLeft?: CmsImage`
     - `experienceVideoSideImageRight?: CmsImage`
   - `experiencesPageQuery` now projects both fields with `imageProjection`.

## CMS operations that worked

### 1) Load Sanity MCP rules first (required)

- `list_sanity_rules`
- `get_sanity_rules` with relevant rules (`image`, `groq`, `nextjs`)

### 2) Upload the local image files

Important: The Sanity MCP toolset used here did not expose a direct binary upload tool.  
Reliable approach:

- Use Node + `@sanity/client` asset upload from local filesystem:
  - `client.assets.upload('image', <buffer>, { filename })`

Uploaded asset IDs:

- `experiences-video-2.jpg` -> `image-68db2558e6eadd163f1060ab869453a847ea9c88-6000x4000-jpg`
- `experiences-video.jpg` -> `image-a94f7052a6c063c765d16bb1196e0a98cd6dadc4-6000x4000-jpg`

### 3) Deploy schema

- Run:
  - `npx sanity@latest schema deploy`

### 4) Patch documents with MCP

Using MCP `patch_document_from_json`, set on each `experiencesPage` document:

- `experienceVideoSideImageLeft`
- `experienceVideoSideImageRight`

Value shape used:

```json
{
  "_type": "imageBlock",
  "image": {
    "_type": "image",
    "asset": {
      "_type": "reference",
      "_ref": "<image-asset-id>"
    }
  },
  "alt": "<alt text>"
}
```

### 5) Publish drafts with MCP

- `publish_documents` for:
  - `drafts.b7cc22b1-ef13-4698-a12b-be23fd61ad06` (en)
  - `drafts.74c086d3-f20e-4357-a2a3-93d5ebd6912e` (hu)
  - `drafts.99554408-8f47-426b-8b63-41a2fb54984e` (ro)

### 6) Verify with MCP query

GROQ used:

```groq
*[_type == "experiencesPage"]{
  language,
  "left": experienceVideoSideImageLeft.image.asset->url,
  "right": experienceVideoSideImageRight.image.asset->url
} | order(language asc)
```

Expected result: `en`, `hu`, `ro` all return both URLs.

## Practical notes for future agents

- If a direct MCP upload tool is unavailable, combine:
  1. local Sanity client upload for binaries
  2. MCP patch + publish for document updates
- Always deploy schema before patching new fields.
- Keep frontend fallback image paths so the section remains stable even if CMS data is temporarily empty.

## Troubleshooting from this task

- **Symptom:** Side images render as alt text only.
  - **Cause:** Image object existed, but URL could be empty/null; object-level fallback was too permissive.
  - **Fix:** In frontend, use URL-aware fallback:
    - `data.experienceVideoSideImageLeft?.url ? ... : <local fallback>`
    - `data.experienceVideoSideImageRight?.url ? ... : <local fallback>`

- **Symptom:** Studio warning "Unknown fields found" for:
  - `experienceVideoLeftImage`
  - `experienceVideoRightImage`
  - **Cause:** Legacy field names existed in documents while schema only defined the new names.
  - **Fix used here:** Add hidden/read-only legacy fields in schema for compatibility and use GROQ `coalesce()` to resolve new/legacy field names.
  - **Note:** MCP `patch_document_from_json` could not `unset` these unknown paths directly due path validation.

## Final cleanup sequence (completed)

When ready to fully remove legacy fields:

1. Temporarily make legacy fields patchable in schema (remove `hidden` and `readOnly`), deploy schema.
2. Use MCP `patch_document_from_json` + `unset` to remove:
   - `experienceVideoLeftImage`
   - `experienceVideoRightImage`
3. Publish resulting drafts.
4. Remove legacy fields from schema.
5. Remove query `coalesce()` fallback and query only canonical fields:
   - `experienceVideoSideImageLeft`
   - `experienceVideoSideImageRight`
6. Deploy schema again and verify no docs still define legacy fields.

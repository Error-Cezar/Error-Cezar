import type { CollectionEntry } from "astro:content";

export type ContentEntry =
  | CollectionEntry<"projects">
  | CollectionEntry<"blog">;

import type { CollectionEntry } from "astro:content";

export type SiteSettings = {};

export type ContentEntry = CollectionEntry<"projects">;

export type AllContentEntry = CollectionEntry<"projects">;

export type ContentCollections = "projects";

export interface PostMeta {
  plainText: string;
  readingTimeText: string;
}

export type WithMeta<T> = T & { meta: PostMeta };

export type ImageLoading = "eager" | "lazy" | null;

import { tr } from "../i18n/translations";
import type { Language } from "../i18n/translations";

type T = Record<Language, string>;

export interface RoomInfo {
  slug: string;
  name: T;
  tagline: T;
  desc: T;
  imageCount: number;
}

export const ROOMS: RoomInfo[] = [
  { slug: "crang", name: tr.menu.grove, tagline: tr.rooms.crang.tagline, desc: tr.rooms.crang.desc, imageCount: 7 },
  { slug: "frunzis", name: tr.menu.leafage, tagline: tr.rooms.frunzis.tagline, desc: tr.rooms.frunzis.desc, imageCount: 7 },
  { slug: "timian", name: tr.menu.thyme, tagline: tr.rooms.timian.tagline, desc: tr.rooms.timian.desc, imageCount: 7 },
  { slug: "con", name: tr.menu.cone, tagline: tr.rooms.con.tagline, desc: tr.rooms.con.desc, imageCount: 7 },
  { slug: "lichen", name: tr.menu.lichen, tagline: tr.rooms.lichen.tagline, desc: tr.rooms.lichen.desc, imageCount: 7 },
  { slug: "mineral", name: tr.menu.mineral, tagline: tr.rooms.mineral.tagline, desc: tr.rooms.mineral.desc, imageCount: 7 },
  { slug: "zori-de-zi", name: tr.menu.dawn, tagline: tr.rooms.zoriDeZi.tagline, desc: tr.rooms.zoriDeZi.desc, imageCount: 7 },
  { slug: "comoara", name: tr.menu.treasure, tagline: tr.rooms.comoara.tagline, desc: tr.rooms.comoara.desc, imageCount: 7 },
  { slug: "mini-chalet", name: tr.menu.miniChalet, tagline: tr.rooms.miniChalet.tagline, desc: tr.rooms.miniChalet.desc, imageCount: 7 },
];

export const ROOM_SLUGS = ROOMS.map((r) => r.slug);

export function getRoomBySlug(slug: string): RoomInfo | undefined {
  return ROOMS.find((r) => r.slug === slug);
}

export function roomImage(slug: string, index: number): string {
  return `/rooms/${slug}/${index}.jpg`;
}

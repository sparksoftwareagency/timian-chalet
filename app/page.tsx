import { redirect } from "next/navigation";

import { DEFAULT_SITE_LOCALE } from "./lib/locale";

export default function RootRedirectPage() {
  redirect(`/${DEFAULT_SITE_LOCALE}`);
}

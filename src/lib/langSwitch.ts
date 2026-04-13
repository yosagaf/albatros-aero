/**
 * Chemins sans slash final (sauf racines `/` et `/en`).
 */
export function normalizePathname(pathname: string): string {
	const t = pathname.replace(/\/+$/, "");
	if (t === "") return "/";
	return t;
}

export function getLangSwitchUrls(pathname: string): {
	frHref: string;
	enHref: string;
	locale: "fr" | "en";
} {
	const p = normalizePathname(pathname);

	if (p === "/en" || (p.startsWith("/en/") && p.length > 3)) {
		const rest = p === "/en" ? "/" : p.slice(3) || "/";
		const frHref = rest === "" ? "/" : rest.startsWith("/") ? rest : `/${rest}`;
		return { frHref: frHref === "" ? "/" : frHref, enHref: p, locale: "en" };
	}

	const enHref = p === "/" ? "/en" : `/en${p}`;
	return { frHref: p, enHref, locale: "fr" };
}

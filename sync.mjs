/**
 * Same field mapping as @localesfs/contentful.
 * CMA: https://www.contentful.com/developers/docs/references/content-management-api/
 */

export const STRING_TYPES = new Set(["Symbol", "Text"]);

export function entryKey(entryId, fieldId) {
  return `cf.entry.${entryId}.${fieldId}`;
}

export function parseKey(key) {
  const match = /^cf\.entry\.([^.]+)\.(.+)$/.exec(key);
  if (!match) return null;
  return { entryId: match[1], fieldId: match[2] };
}

export function collectEntries(entry, contentType, sourceLocale) {
  const typeByField = Object.fromEntries(
    (contentType?.fields || []).map((field) => [field.id, field])
  );
  const out = [];
  for (const [fieldId, localized] of Object.entries(entry.fields || {})) {
    const def = typeByField[fieldId];
    if (def && !STRING_TYPES.has(def.type)) continue;
    const value = localized?.[sourceLocale];
    if (typeof value !== "string" || value === "") continue;
    out.push({
      key: entryKey(entry.sys.id, fieldId),
      text: value,
      context: `${contentType?.sys?.id || "entry"}.${fieldId}`,
    });
  }
  return out;
}

export function applyLocaleMap(fields, localeMap, targetLocale) {
  const next = structuredClone(fields || {});
  let writes = 0;
  for (const [key, text] of Object.entries(localeMap || {})) {
    const parsed = parseKey(key);
    if (!parsed) continue;
    if (!next[parsed.fieldId] || typeof next[parsed.fieldId] !== "object") {
      next[parsed.fieldId] = {};
    }
    next[parsed.fieldId][targetLocale] = text;
    writes += 1;
  }
  return { fields: next, writes };
}

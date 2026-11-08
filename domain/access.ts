export const MAX_JSON_BODY_BYTES = 4096;

/** Only the server-provided identity is accepted; payloads never supply this value. */
export function actorIdFromIdentity(identity: unknown): string | null {
  if (
    typeof identity !== "object" ||
    identity === null ||
    Array.isArray(identity)
  )
    return null;
  const userId: unknown = (identity as Record<string, unknown>).userId;
  if (
    typeof userId !== "string" ||
    userId.length < 1 ||
    userId.length > 512 ||
    userId.trim() !== userId
  )
    return null;
  return userId;
}

/** No forwarded-host trust or wildcard origins. Browser writes must be same-origin. */
export function isSameOrigin(
  origin: string | null,
  requestUrl: string,
): boolean {
  if (!origin || origin === "null") return false;
  try {
    const url = new URL(requestUrl);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      origin === url.origin
    );
  } catch {
    return false;
  }
}

export function isWithinBodyLimit(
  byteLength: number,
  limit = MAX_JSON_BODY_BYTES,
): boolean {
  return (
    Number.isSafeInteger(byteLength) && byteLength >= 0 && byteLength <= limit
  );
}

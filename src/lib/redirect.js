export function safeRedirect(path) {
  if (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.startsWith("/\\")
  ) {
    return path;
  }
  return "/";
}
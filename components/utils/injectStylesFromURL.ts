/**
 * Injects a stylesheet from a URL into the document head at runtime.
 *
 * @param url
 *
 * @example
 * ```typescript
 * import { loadStylesheet } from "@utils/injectStylesFromURL";
 *
 * loadStylesheet("https://cdn.example.com/styles.css");
 * ```
 *
 * Now styles are available.
 */
export function injectStylesFromURL(urls: string[]): void {
  urls.map((url) => {
    const linkElem = document.createElement("link");
    linkElem.rel = "stylesheet";
    linkElem.href = url;
    document.head.appendChild(linkElem);
  });
}

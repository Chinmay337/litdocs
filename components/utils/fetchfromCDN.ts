/**
 * Fetches a JavaScript bundle from a CDN and appends it to the document.
 * @param {string} url - URL of the bundle to fetch.
 * @returns {Promise<void>} Resolves when the bundle is loaded successfully.
 * @throws {Error} Throws an error if there's an issue loading the bundle.
 * @example
 *
 * import { fetchJSBundleFromCDN } from "@utils/fetchfromCDN";
 *
 * try {
 *   await fetchJSBundleFromCDN("https://cdn.example.com/bundle.js");
 *   console.log("Bundle loaded successfully!");
 * } catch (error) {
 *   console.error("Failed to load bundle:", error);
 * }
 */
export async function fetchJSBundleFromCDN (url: string): Promise<void> {
  await addScriptToWindow(url)
}

/**
 * Fetches multiple JavaScript bundles from a CDN and appends them to the document.
 * @param {string[]} urls - Array of URLs of the bundles to fetch.
 * @returns {Promise<void[]>} Resolves when all bundles are loaded successfully.
 * @throws {Error} Throws an error if there's an issue loading any of the bundles.
 * @example
 *
 * import { fetchJSBundlesFromCDN } from "@utils/fetchfromCDN";
 *
 * const urls = [
 *   "https://cdn.example.com/bundle1.js",
 *   "https://cdn.example.com/bundle2.js"
 * ];
 *
 * try {
 *   await fetchJSBundlesFromCDN(urls);
 *   console.log("All bundles loaded successfully!");
 * } catch (error) {
 *   console.error("Failed to load one or more bundles:", error);
 * }
 */
export async function fetchJSBundlesParallelFromCDN (
  urls: string[]
): Promise<void[]> {
  return await Promise.all(urls.map(async (url) => { await addScriptToWindow(url) }))
}

/**
 * Fetches multiple JavaScript bundles from a CDN sequentially and appends them to the document.
 * Unlike `fetchJSBundlesFromCDN`, this function ensures each script is loaded fully before moving to the next.
 *
 * @param {string[]} urls - Array of URLs of the bundles to fetch.
 * @returns {Promise<void[]>} Resolves when all bundles are loaded successfully.
 * @throws {Error} Throws an error if there's an issue loading any of the bundles.
 * @example
 *
 * import { fetchJSBundlesSequentiallyFromCDN } from "@utils/fetchfromCDN";
 *
 * const urls = [
 *   "https://cdn.example.com/bundle1.js",
 *   "https://cdn.example.com/bundle2.js"
 * ];
 *
 * try {
 *   await fetchJSBundlesSequentiallyFromCDN(urls);
 *   console.log("All bundles loaded successfully!");
 * } catch (error) {
 *   console.error("Failed to load one or more bundles:", error);
 * }
 */
export async function fetchJSBundlesSequentiallyFromCDN (
  urls: string[]
): Promise<void[]> {
  const results: void[] = []

  for (const url of urls) {
    const result = await addScriptToWindow(url)
    results.push(result)
  }

  return results
}

/**
 * Adds a script element to the document's head, pointing to the provided URL.
 * Mainly used as a helper function for fetching JS bundles from a CDN.
 * @private
 * @param {string} url - The URL of the script to add.
 * @returns {Promise<void>} Resolves when the script has been loaded.
 * @throws {Error} Throws an error if there's an issue loading the script.
 */
async function addScriptToWindow (url: string): Promise<void> {
  await new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = url
    script.onload = () => { resolve() } // Resolves when script is successfully loaded
    script.onerror = (error) => { reject(error) } // Rejects if script loading encounters an error
    document.head.appendChild(script) // Appends the script element to the document head
  })
}

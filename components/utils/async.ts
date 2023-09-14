/**
 * Lazy-loads a module by its filename.
 *
 * This is an asynchronous function that returns a promise. Use it in contexts where
 * you want to await the result or chain other promises.
 *
 * @example
 * ```javascript
 * await lazyLoad('SomeComponent');
 * ```
 *
 * @param {string} tsComponentFileName - The name of the module to load.
 * @returns {Promise<void>} A promise that resolves when the module has been loaded.
 */
export async function lazyLoad (tsComponentFileName: string): Promise<void> {
  await import(`/bundle/${tsComponentFileName}.bundle.js`)
  console.log(`Success Importing ./${tsComponentFileName}`)
}

/**
 * Lazy-loads multiple modules by their filenames.
 *
 * This is an asynchronous function that returns a promise. Use it in contexts where
 * you want to await the result or chain other promises.
 *
 * @example
 * ```javascript
 * await lazyLoadAll(['Component1', 'Component2']);
 * ```
 *
 * @param {string[]} tsComponentFileNames - The names of the modules to load.
 * @returns {Promise<void>} A promise that resolves when all modules have been loaded.
 */
export async function lazyLoadAll (tsComponentFileNames: string[]): Promise<void> {
  await Promise.all(
    tsComponentFileNames.map(async filename => {
      await import(`/bundle/${filename}.bundle.js`).then(() => {
        console.log(`Success Importing ./${filename}`)
      })
    }
    )
  )
  console.log(`Success Importing all ${tsComponentFileNames.length} components`)
}

/**
 * Lazy-loads a module by its filename.
 *
 * This is a non-async version that doesn't return a promise. Use it in contexts where
 * you don't need to wait for the module to load before proceeding.
 *
 * @example
 * ```javascript
 * lazyLoadSimple('SomeComponent');
 * ```
 *
 * @param {string} tsComponentFileName - The name of the module to load.
 */
export function lazyLoadSimple (tsComponentFileName: string): void {
  import(`/bundle/${tsComponentFileName}.bundle.js`)
    .then(() => {
      console.log(`Success Importing ./${tsComponentFileName}`)
    })
    .catch(error => {
      console.error(`Failed to import ./${tsComponentFileName}`, error)
    })
}

/**
 * Lazy-loads multiple modules by their filenames.
 *
 * This is a non-async version that doesn't return a promise. Use it in contexts where
 * you don't need to wait for the modules to load before proceeding.
 *
 * @example
 * ```javascript
 * lazyLoadAllSimple(['Component1', 'Component2']);
 * ```
 *
 * @param {string[]} tsComponentFileNames - The names of the modules to load.
 */
export function lazyLoadAllSimple (tsComponentFileNames: string[]): void {
  void Promise.all(
    tsComponentFileNames.map(async filename => {
      await import(`/bundle/${filename}.bundle.js`)
        .then(() => {
          console.log(`Success Importing ./${filename}`)
        })
        .catch(error => {
          console.error(`Failed to import ./${filename}`, error)
        })
    }
    )
  )
    .then(() => {
      console.log(`Finished attempting to import all ${tsComponentFileNames.length} components`)
    })
}

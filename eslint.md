# eslint

- eslint setup

```bash
pnpm add eslint --save-dev
npx eslint --init

# Eslint extension - turn on Eslint to autoformat and be used as a Formatter

```

- Cleaning up Unused Packages

```bash
# Checking unused dependencies
pnpm add -g depcheck
depcheck
# Remove Dependencies
pnpm remove @iconify/iconify
# Remove Dev Dependencies
pnpm remove --save-dev @types/highlight.js @types/marked



```

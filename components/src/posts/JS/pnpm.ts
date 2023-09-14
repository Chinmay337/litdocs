import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CreateCodeBlock } from 'src/components/code/CodeBlock'
import { postStyles } from 'src/pages/styles/postStyles'
import type { Post } from 'src/types/postTypes'

export const post: Post = {
  rootPagePath: 'js',
  title: 'pnpm',
  shortTitle: 'pnpm',
  description: 'Using pnpm for JS projects and build tooling.',
  tags: 'js build-tooling pnpm',
  date: 'August 17, 2023',
  postId: 'js-pnpm',
  pathForDynamicLoad: 'src/posts/JS/Classes',
  component: '<js-pnpm></js-pnpm>',
  renderFunc: () => html`<js-pnpm></js-pnpm>`
}

@customElement('js-pnpm')
export class JSpnpm extends LitElement {
  @property()
    someProp = 'pnpm: A Performant Node Package Manager'

  static styles = postStyles

  protected render (): TemplateResult {
    return html`
      <div class="title">pnpm: An Efficient Package Manager for JavaScript</div>
      <div class="description">
        Dive into pnpm, a fast, disk-efficient package manager for JavaScript.
      </div>

      <p>
        pnpm stands out among package managers for its efficiency. Unlike other
        package managers that copy packages to node_modules, pnpm uses hard
        links and symlinks to save disk space.
      </p>

      ${CreateCodeBlock('pnpm add lodash', 'bash')}
      <div class="explanation">
        Installing a package with pnpm is as simple as:
      </div>

      ${CreateCodeBlock(
        `pnpm init
pnpm install
# Add your desired packages
pnpm add react react-dom`,
        'bash'
      )}

      <div class="explanation">To create a new project using pnpm modules</div>

      <p>
        One of the powerful features of pnpm is its support for workspaces,
        which allows managing multiple projects in a single repository. This is
        especially useful for component repositories or monorepos.
      </p>

      <p>To set up a component repo with pnpm modules:</p>

      ${CreateCodeBlock(
        `pnpm init --yes
pnpm add -W @pnpm/typescript typescript
# Configure your tsconfig.json and other settings
# Now you can manage multiple components efficiently!`,
        'bash'
      )}

      <p>
        Overall, pnpm provides a robust solution for managing JavaScript
        dependencies efficiently and is especially beneficial for large projects
        or monorepos.
      </p>

      <p>
        For more insights, visit the official ${this.someProp} documentation.
      </p>
    `
  }
}

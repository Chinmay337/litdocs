import { html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { type Post } from 'src/types/postTypes'
import { AbstractPage } from '../AbstractPage'
import { goPosts } from 'src/posts/Go/goPosts'

@customElement('go-page')
export class GoPage extends AbstractPage {
  readonly routePrefix = 'go'
  readonly pageName = 'Go'

  get posts (): Post[] {
    return goPosts
  }

  getPageIntroHeader (): string {
    return 'Go'
  }

  getBreadcrumbItems (): string[] {
    return ['Home', 'Languages', 'Go']
  }

  getPageIntroDescription (): TemplateResult {
    return html`
    <p class="desc">
            Go is an amazing language & for me personally, it enables me to
            write reliable software with incredible performance and velocity.
          </p>

          <p class="desc">
            I always have an incredibly pleasant experience with the language
            and it is improving day by day - highly highly recommend anyone to
            give it a shot!
          </p>

          <p class="desc">
            absolutely incredible standard library, intuitive and effective
            module and package management, and well designed and simple
            concurrency primitives.
          </p>
    `
  }

  protected render (): TemplateResult {
    console.log('Rendering cpp page')
    return this.renderPostContent()
  }
}

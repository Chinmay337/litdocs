import { html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { type Post } from 'src/types/postTypes'

import { AbstractPage } from '../AbstractPage'
import { jsPosts } from 'src/posts/JS/jsPosts'

@customElement('js-page')
export class JSPage extends AbstractPage {
  readonly routePrefix = 'js'
  readonly pageName = 'JS'

  get posts (): Post[] {
    return jsPosts // you should import cppPosts at the top
  }

  getPageIntroHeader (): string {
    return 'JS'
  }

  getBreadcrumbItems (): string[] {
    return ['Home', 'Tech', 'JavaScript']
  }

  getPageIntroDescription (): TemplateResult {
    return html`
    <p class="desc">
      js is one of the MOST useful languages anyone can know. it is extremely versatile and can be used in several contexts.
      </p>
  
      <p class="desc">
      it has decades of depth and intracies to it and can unlock several design patterns for you.
      </p>
  
      <p class="desc">
      JS is most definitely a love it or don't love it kind of language.
      I personally absolutely love it , but there certainly are lots of tradeoffs in terms of creating robust applications and systems and the Ecosystem is very fragmented
      </p>
    `
  }

  protected render (): TemplateResult {
    console.log('Rendering cpp page')
    return this.renderPostContent()
  }
}

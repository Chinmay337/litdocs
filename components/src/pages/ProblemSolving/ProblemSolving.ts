import { html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { type Post } from 'src/types/postTypes'

import { AbstractPage } from '../AbstractPage'
import { generalPosts } from 'src/posts/General/generalPosts'

@customElement('problem-solving')
export class ProblemSolvingPage extends AbstractPage {
  readonly routePrefix = 'interviewing'
  readonly pageName = 'Problem Solving'

  get posts (): Post[] {
    return generalPosts // you should import cppPosts at the top
  }

  getPageIntroHeader (): string {
    return 'Problem Solving'
  }

  getBreadcrumbItems (): string[] {
    return ['Home', 'Tech', 'Interviewing']
  }

  getPageIntroDescription (): TemplateResult {
    return html`
    <p class="desc">
    Tips for Interviews and approaching Problem Solving
    </p>
    `
  }

  protected render (): TemplateResult {
    console.log('Rendering cpp page')
    return this.renderPostContent()
  }
}

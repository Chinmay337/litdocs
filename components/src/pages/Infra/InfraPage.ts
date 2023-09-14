import { html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { type Post } from 'src/types/postTypes'
import { AbstractPage } from '../AbstractPage'
import { infraPosts } from 'src/posts/Infra/infraPosts'

@customElement('infra-page')
export class InfraPage extends AbstractPage {
  readonly routePrefix = 'infra'
  readonly pageName = 'Infra'

  get posts (): Post[] {
    return infraPosts // you should import cppPosts at the top
  }

  getPageIntroHeader (): string {
    return 'Infra'
  }

  getBreadcrumbItems (): string[] {
    return ['Home', 'Tech', 'Infra']
  }

  getPageIntroDescription (): TemplateResult {
    return html`
    <p class="desc">
    Infrastructure relates to the actual physical resources and
    abstractions required for applications and code to run.
  </p>

  <p class="desc">
    Learning about Infra is crucial - and empowers anyone to build and
    run their own full fledged systems however they want. System design
    and infra go hand in hand - and in a lot of cases good system design
    revolves around Infra constraints and characteristics.
  </p>

  <p class="desc">
    infra can include topics such as servers and efficient compute
    patterns , databases and storage , utilizing the cloud to create and
    utilize clusters.
  </p>
    `
  }

  protected render (): TemplateResult {
    console.log('Rendering cpp page')
    return this.renderPostContent()
  }
}

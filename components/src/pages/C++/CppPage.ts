import { html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { type Post } from 'src/types/postTypes'
import { cppPosts } from 'src/posts/C++/cppPosts'
import { AbstractPage } from '../AbstractPage'

@customElement('cpp-page')
export class CppPage extends AbstractPage {
  readonly routePrefix = 'cpp'
  readonly pageName = 'C++'

  get posts (): Post[] {
    return cppPosts // you should import cppPosts at the top
  }

  getPageIntroHeader (): string {
    return 'C++'
  }

  getBreadcrumbItems (): string[] {
    return ['Home', 'Languages', 'C++']
  }

  getPageIntroDescription (): TemplateResult {
    return html`
    <p class="desc">
    C++ stands as a testament to the balance between performance and expressiveness. It empowers developers to craft software that scales, from embedded systems to large-scale distributed systems.
    </p>

    <p class="desc">
    With its rich Standard Library and powerful abstraction mechanisms, C++ remains at the forefront of modern software engineering, continually evolving to meet the needs of its diverse user base.
    </p>

    <p class="desc">
    Its key strengths lie in performance-critical applications, systems programming, and the ability to interface seamlessly with other languages, making it an enduring and indispensable tool for many.
    </p>
    `
  }

  protected render (): TemplateResult {
    console.log('Rendering cpp page')
    return this.renderPostContent()
  }
}

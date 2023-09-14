import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CreateCodeBlock } from 'src/components/code/CodeBlock'
import { postStyles } from 'src/pages/styles/postStyles'

export const post = {
  rootPagePath: 'infra',
  title: 'Serverless Compute using Workers',
  shortTitle: 'Serverless Edge Compute',
  description:
    'An overview of how to leverage Serverless solutions and the benefits of this approach with an example using Cloudflare Workers.',
  tags: 'serverless compute cloudflare lowlatency microservices',
  date: 'August 30, 2023',
  postId: 'serverless-cfworkers',
  pathForDynamicLoad: 'src/posts/Infra/ServerlessCFWorkers',
  component: '<serverless-cfworkers></serverless-cfworkers>',
  renderFunc: () => html`<serverless-cfworkers></serverless-cfworkers>`
}

@customElement('serverless-cfworkers')
export class ServerlessCFWorkers extends LitElement {
  @property()
    someProp = 'Random Value'

  static styles = postStyles

  protected render (): TemplateResult {
    return html`
      <div class="title">Serverless Functions CF Workers</div>
      <div class="description">
        An introduction to Go's new Generics feature
      </div>
      <p>
        This post will dive deep into how generics work in Go with code examples
        and clear explanations.
      </p>

      ${CreateCodeBlock(
        `// Defining a generic function
func PrintSlice[T any](s []T) {
    for _, v := range s {
        fmt.Println(v)
    }
}`,
        'go'
      )}

      <p>
        The function <code>PrintSlice</code> uses generics to work with slices
        of any type. The generic type is represented by <code>T</code>.
      </p>

      ${CreateCodeBlock(
        `// Using the generic function
PrintSlice[int]([]int{1, 2, 3})  // Prints numbers
PrintSlice[string]([]string{"a", "b", "c"})  // Prints strings`,
        'go'
      )}

      <p>
        You can use the generic function with different types of slices, as
        demonstrated above.
      </p>

      <p>
        Generics in Go provide type safety while retaining code reusability and
        performance.
      </p>
    `
  }
}

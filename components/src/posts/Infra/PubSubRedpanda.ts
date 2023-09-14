import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CreateCodeBlock } from 'src/components/code/CodeBlock'
import { postStyles } from 'src/pages/styles/postStyles'
import type { Post } from 'src/types/postTypes'

export const post: Post = {
  rootPagePath: 'infra',
  title: 'Pub/Sub Patterns using Redpanda',
  shortTitle: 'Pub Sub',
  description:
    'Intro to the Pub/Sub pattern and an example application using Redpanda to showcase the usefulness of this pattern.',
  tags: 'infra real time streaming redpanda data',
  date: 'September 1, 2023',
  postId: 'pubsub-redpanda',
  component: '<pubsub-redpanda></pubsub-redpanda>',
  pathForDynamicLoad: 'src/posts/Infra/PubSubRedpanda',
  renderFunc: () => html`<pubsub-redpanda></pubsub-redpanda>`
}

@customElement('pubsub-redpanda')
export class PubSubRedpanda extends LitElement {
  @property()
    someProp = 'Random Value'

  static styles = postStyles

  protected render (): TemplateResult {
    return html`
      <div class="title">Redpanda Pub Sub</div>
      <div class="description">A deep dive into Go's interface mechanisms</div>
      <p>
        This post will provide an insight into how interfaces work in Go,
        offering you code examples and clear explanations.
      </p>

      ${CreateCodeBlock(
        `// Defining an interface
interface Speaker {
    Speak() string
}`,
        'go'
      )}

      <p>
        Let's start by defining a simple interface. Above, we have an interface
        named <code>Speaker</code> with a method named <code>Speak</code> that
        returns a string.
      </p>

      ${CreateCodeBlock(
        `// Implementing the interface on a struct
type Dog struct {}

func (d Dog) Speak() string {
    return "Woof!"
}`,
        'go'
      )}

      <p>
        Here, we've defined a struct called <code>Dog</code>. We then
        implemented the <code>Speak</code> method on it, making the
        <code>Dog</code> struct now satisfy the <code>Speaker</code> interface.
      </p>

      ${CreateCodeBlock(
        `// Using interfaces in functions
func Introduce(speaker Speaker) {
    fmt.Println(speaker.Speak())
}

// Usage:
dog := Dog{}
Introduce(dog)  // Outputs: Woof!`,
        'go'
      )}

      <p>
        With the function <code>Introduce</code>, we are accepting any type that
        satisfies the <code>Speaker</code> interface. It's a demonstration of
        how you can use interfaces for polymorphism in Go.
      </p>

      <p>
        This is just a basic introduction to interfaces in Go. Interfaces are a
        powerful tool in Go, allowing for flexible and modular code design.
      </p>
    `
  }
}

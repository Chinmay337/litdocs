import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styles } from './styles'
import '../../components/post/AllPosts'
import '@shoelace-style/shoelace/dist/components/input/input.js'

export function RenderHomePage (): TemplateResult {
  return html`<home-page></home-page>`
}

@customElement('home-page')
export class HomePage extends LitElement {
  @property()
    someProp = 'Random Value'

  static styles = styles

  protected render (): TemplateResult {
    return html`
    <div class="home-page">
      <div class="entry-header">crud oop infra </div>
      <div class="description">
        sharing useful notes and takes based on my experiences
      </div>
      <div class="search-box">
        <div class="search">
          <sl-input
            autofocus
            width="auto"
            placeholder="Search Items!"
          ></sl-input>
        </div>
      </div>
      <all-posts></all-posts>
      </div>

    `
  }
}

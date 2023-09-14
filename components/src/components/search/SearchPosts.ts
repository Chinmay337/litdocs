import { LitElement, html, css, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('search-posts-component')
export class SearchPosts extends LitElement {
  @property()
    someProp = 'Random Value'

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      text-align: center;
    }
  `

  protected render (): TemplateResult {
    return html`
      <p>Welcome to the Lit tutorial!</p>
      <p>This is from the ${this.someProp} prop.</p>
    `
  }
}

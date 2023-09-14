// Hamburger.ts
import { LitElement, html, css, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { hamburgerStyles } from './sidebarStyles'

@customElement('hamburger-icon')
export class Hamburger extends LitElement {
  static styles = css`
    ${hamburgerStyles}
  `

  protected render (): TemplateResult {
    return html`
      <div class="hamburger-container" @click="${this.handleClick}">
        <svg
          class="hamburger-icon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 6H21M3 12H21H3ZM3 18H21H3Z"></path>
        </svg>
      </div>
    `
  }

  private handleClick (): void {
    this.dispatchEvent(
      new CustomEvent('hamburgerClicked', { bubbles: true, composed: true })
    )
  }
}

import { LitElement, html, css, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/components/breadcrumb/breadcrumb.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/components/breadcrumb-item/breadcrumb-item.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/components/dropdown/dropdown.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/components/button/button.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/components/icon/icon.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/components/menu/menu.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/components/menu-item/menu-item.js'

@customElement('breadcrumb-deepness')
export class Breadcrumb extends LitElement {
  @property({ type: Array }) crumbs = []

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    .crumb-text {
      font-size: 1.5rem;
    }

    @media (max-width: 768px) {
    .crumb-text {
      font-size: 1rem;
    }
    }


  `

  protected render (): TemplateResult {
    return html`
      <sl-breadcrumb>
        ${this.crumbs.map((crumb, index) => html`
          <sl-breadcrumb-item>
            <span class="crumb-text">${crumb}</span>
            ${index === this.crumbs.length - 1
              ? html`
              <sl-dropdown slot="suffix">
                <sl-button slot="trigger" size="small" circle>...</sl-button>
                <sl-menu>
                  <sl-menu-item type="checkbox" checked>Web Design</sl-menu-item>
                  <sl-menu-item type="checkbox">Web Development</sl-menu-item>
                  <sl-menu-item type="checkbox">Marketing</sl-menu-item>
                </sl-menu>
              </sl-dropdown>
            `
            : ''}
          </sl-breadcrumb-item>
        `)}
      </sl-breadcrumb>
    `
  }
}

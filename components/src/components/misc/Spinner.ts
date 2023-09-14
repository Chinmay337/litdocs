import { LitElement, html, css, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/components/spinner/spinner.js'

export function CreateSpinner (): TemplateResult {
  return html` <spinner-comp></spinner-comp> `
}

@customElement('spinner-comp')
export class Spinner extends LitElement {
  @property()
    someProp = 'Random Value'

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      text-align: center;
    }
  `

  render () {
    return html` <sl-spinner style="font-size: 2rem;"></sl-spinner> `
  }
}

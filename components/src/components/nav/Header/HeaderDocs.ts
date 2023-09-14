import { LitElement, html, css, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import { headerStyles } from './headerStyles'

@customElement('header-docs')
export class HeaderDocs extends LitElement {
  @property({ type: String }) name: string = 'Header Title'

  @property({ type: Array }) items: string[] = ['Text1', 'Text2', 'Text3']

  @property({ type: String }) activeItem: string = ''

  @property({ type: Boolean }) debug: boolean = false

  @property({ type: Boolean }) reset = false

  static styles = css`
    ${headerStyles}
  `

  render (): TemplateResult {
    return html`
      <div class="header-container">
        <div class="header-docs" @click=${() => { this.changeRoute('') }}>
          ${this.name}
        </div>
        <div class="text-container">
          ${this.items.map(
            (item) =>
              html`<sl-button
                class="header-btn ${this.activeItem === item ? 'active' : ''}"
                variant="text"
                size="large"
                @click=${() => { this.changeRoute(item) }}
              >
                ${item}
              </sl-button>`
          )}
        </div>
      </div>
    `
  }

  updated (changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties)
    if (changedProperties.has('reset') && this.reset) {
      this.activeItem = ''
    }
  }

  private changeRoute (item: string): void {
    let urlPath = item.toLowerCase()
    if (urlPath === 'c++') {
      urlPath = 'cpp'
    }
    if (urlPath === 'problem solving') {
      urlPath = 'interviewing'
    }
    window.history.pushState({}, '', `/${urlPath}`)
    window.dispatchEvent(new Event('popstate'))
    console.log('from changeRoute ', item)
    this.activeItem = item
  }

  connectedCallback (): void {
    super.connectedCallback()
    // console.log('Added header event listener')
    if (this.debug) {
      this.printUsage()
    }
    this.addLevel1RenderListener()
    this.addLevel0RenderListener()
  }

  // Event listener to detect level 0 events , to set active header
  addLevel1RenderListener (): void {
    window.addEventListener('level-1-render', (e) => {
      const { path } = (e as CustomEvent).detail
      console.log('From router active path', path)
      // this.activeItem = path
      this.updateActiveItemFromSegment(path)
    })
  }

  // to make sure the active item is reset
  addLevel0RenderListener (): void {
    window.addEventListener('level-0-render', (e) => {
      this.activeItem = ''
    })
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()
    this.activeItem = ''
  }

  private updateActiveItemFromSegment (segment: string): void {
    const segmentToItemMapping: Record<string, string> = {
      '': '',
      go: 'Go',
      js: 'JS',
      cpp: 'C++',
      infra: 'Infra',
      interviewing: 'Problem Solving'
    }
    this.activeItem = segmentToItemMapping[segment] // fallback to empty string if segment is not recognized
  }

  printUsage (): void {
    console.log(`Usage with Props -

      <header-docs
          name="${this.name}"
          items='${JSON.stringify(this.items)}'
      ></header-docs>
    `)
  }
}

// SidebarDrawer.ts
import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { lazyLoad } from '@utils/async'
import { type Post } from 'src/types/postTypes'

import { sidebarStyles } from './sidebarStyles'

@customElement('sidebar-drawer')
export class SidebarDrawer extends LitElement {
  static styles = [sidebarStyles]
  private isSidebarInitialized = false

  @property({ type: Boolean }) isDrawerOpen = false
  @property({ type: Array }) posts: Post[] = []

  constructor () {
    super()
    this.addEventListener('initialized', () => {
      this.isSidebarInitialized = true
    })
  }

  connectedCallback (): void {
    super.connectedCallback()
    void lazyLoad('Hamburger')
    console.log('Loaded hamburger')
  }

  async handleHamburgerClick (): Promise<void> {
    if (customElements.get('open-sidebar') === undefined) {
      await lazyLoad('OpenSidebar')
      console.log('Loaded main sidebar opened imports')
    }

    const openSidebar = this.shadowRoot?.querySelector('open-sidebar')
    if (openSidebar !== undefined) {
      if (this.isDrawerOpen) {
        (openSidebar as any).hideDrawer()
      } else {
        (openSidebar as any).showDrawer()
      }
    }
  }

  protected render (): TemplateResult {
    return html`
      <div class="sidenav-container">
        <hamburger-icon
          @hamburgerClicked="${this.handleHamburgerClick}"
        ></hamburger-icon>
        <open-sidebar 
            .isDrawerOpen="${this.isDrawerOpen}"
            .posts="${this.posts}">
        </open-sidebar>
      </div>
    `
  }
}

// OpenSidebar.ts
import { LitElement, type TemplateResult, html } from 'lit'
import { type Post } from 'src/types/postTypes'
import { customElement, property } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'
import '@shoelace-style/shoelace/dist/components/divider/divider.js'
import { sidebarStyles } from './sidebarStyles'

@customElement('open-sidebar')
export class OpenSidebar extends LitElement {
  @property()
    name = 'Drawer'

  @property({ type: Array }) posts: Post[] = []

  @property({ type: Boolean }) isDrawerOpen = false

  static styles = [sidebarStyles]

  showDrawer (): void {
    const drawer = this.shadowRoot?.querySelector('sl-drawer')
    if (drawer !== undefined) {
      (drawer as any).show()
      this.isDrawerOpen = true
    }
  }

  hideDrawer (): void {
    const drawer = this.shadowRoot?.querySelector('sl-drawer')
    if (drawer !== undefined) {
      (drawer as any).hide()
      this.isDrawerOpen = false
    }
  }

  private setSidebarContent (): TemplateResult {
    if (this.posts.length === 0) {
      return html`
      <div class="sidebar-desc-title">
        hello friends
      </div>

      <div class="sidebar-desc-content">
        notes about stuff I use 
      </div>

      <div class="sidebar-desc-content">
        Work in Progress - feedback is welcome 
      </div>
      `
    }
    return html`
    <div class="post-titles">
    ${this.posts.map(post => html`<div>${post.title}</div>`)}
    </div>
    `
  }

  protected render (): TemplateResult {
    return html`
      <sl-drawer
        class="drawer-custom-size drawer-focus"
        label=${this.name}
        contained
        @sl-show="${() => (this.isDrawerOpen = true)}"
        @sl-hide="${() => (this.isDrawerOpen = false)}"
      >
      ${this.setSidebarContent()}
      </sl-drawer>
    `
  }
}

/*

   <div class="sidebar-desc-title">hey!</div>
        <div class="sidebar-desc-content">
          this will just be casual thoughts and content based on software and
          tooling I am currently using and trying to get better at.
        </div>
        <div class="sidebar-desc-content">
          It is still a work in progress so feel free to reach out with any
          suggestions or improvements :)
        </div>

*/

import { LitElement, html } from 'lit'
import type { TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styles } from './styles'
import { injectStylesFromURL } from '@utils/injectStylesFromURL'
import './components/nav/Header/HeaderDocs'
import './components/nav/SideBar/Sidebar'

import { HierarchicalRouter } from './router/Router'

import './pages/Default/HomePage'
import './components/misc/Spinner'

// Setup global router once
(window as any).router = new HierarchicalRouter()

@customElement('docs-app')
export class DocsApp extends LitElement {
  // Updating this prop will rerender the component with the right Page
  @property({ type: String }) currentRoute = this.getFirstSegment(
    window.location.pathname
  )

  isLoading = false

  @property({ type: Number }) level = 0

  // Anything called in connected should be undone. Such as adding event listeners , etc
  connectedCallback (): void {
    super.connectedCallback()
    console.log('initital route', this.currentRoute)
    injectStylesFromURL([
      'https://fonts.googleapis.com/css?family=Lato',
      'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/themes/dark.css'
    ])
    this.addEventListener('posts-updated', this.handleCurrPagePostsToSidebar as EventListener)

    this.setupEventListenersForRouter()
  }

  setupEventListenersForRouter (): void {
    // addLevel0RenderListener
    // level1 cleanup
    // level1 resetState
    // level1 readySender
    this.addResetStateListener()
    this.addLevel1RenderListener() // Listens for /infra
    this.addLevel0RenderListener() // Listens for /
  }

  // Router needs to send level-0-render event to trigger render of page
  // Created Helper in routeHelpers for this
  addLevel1RenderListener (): void {
    window.addEventListener('level-1-render', (e) => {
      const { path } = (e as CustomEvent).detail
      // this.currentRoute = `/${path}`
      this.renderStateBasedOnRouterEvent(path)
    })
  }

  addLevel0RenderListener (): void {
    window.addEventListener('level-0-render', (e) => {
      const { path } = (e as CustomEvent).detail
      this.renderStateBasedOnRouterEvent(path)
    })
  }

  sendLevel0ReadySignal (): void {
    window.dispatchEvent(new CustomEvent('level-0-ready'))
  }

  addResetStateListener (): void {
    window.addEventListener('level-0-reset', (e) => {
      this.currentRoute = '/'
    })
  }

  renderStateBasedOnRouterEvent (level0EventFromRouter: string): void {
    if (level0EventFromRouter !== this.currentRoute) {
      this.isLoading = false
    }
    this.currentRoute = `/${level0EventFromRouter}`
    console.log('Level 0 event received and setting state to ', level0EventFromRouter)
  }

  disconnectedCallback (): void {
    console.log('-----ENTRY_DISCONNECTED-----')
    super.disconnectedCallback()
    this.removeEventListener('posts-updated', this.handleCurrPagePostsToSidebar as EventListener)

    // window.removeEventListener("popstate", this.handlePopState);
  }

  // func -> Set Posts from Page on Sidebar
  handleCurrPagePostsToSidebar (e: CustomEvent): void {
    const sidebar = this.shadowRoot?.querySelector('sidebar-drawer')
    if (sidebar !== undefined) {
      (sidebar as any).posts = e.detail.posts
      console.log('SIDEBAR_POSTS_UPDATED', e.detail.posts)
    }
  }

  private checkResetSideBar (): void { // reset sidebar content if on home page
    if (this.currentRoute !== '/') return
    const sidebar = this.shadowRoot?.querySelector('sidebar-drawer')
    if (sidebar !== undefined) {
      (sidebar as any).posts = []
      console.log('Reset sidebars posts')
    }
  }

  // Called in render to show right page
  renderContentBasedOnRoute (): TemplateResult | undefined {
    console.log('Page Render within render() execing' + this.currentRoute)

    if (this.isPageRoute(this.currentRoute)) {
      console.log('Valid page Route')
      if (!this.isLoading) {
        console.log("Page isn't loaded yet")
        this.loadAndSetLoadingState(this.currentRoute)
      }
      return this.getPageTemplate(this.currentRoute)
    }

    switch (this.currentRoute) {
      case '/chat':
        return html`<div class="entry-header">Chat Page</div>`
      case '/about':
        return html`<div class="entry-header">About Page</div>`
      default:
        return html`<home-page></home-page>`
    }
  }

  isPageRoute (route: string): boolean {
    const pageRoutes = ['/go', '/js', '/cpp', '/infra', '/interviewing']
    return pageRoutes.includes(route)
  }

  loadAndSetLoadingState (route: string): void {
    const filename = this.getFileNameFromRoute(route)
    console.log('Loading Page:', filename)
    this.loadPage(filename).then(() => {
      this.isLoading = true
      console.log('Page Loaded:', filename)
    }).catch(error => {
      console.error(`Error loading the ${filename} Page:`, error)
      this.isLoading = false
    })
  }

  getFileNameFromRoute (route: string): string {
    const routeToFileMapping: Record<string, string> = {
      '/go': 'GoPage',
      '/js': 'JSPage',
      '/cpp': 'CppPage',
      '/infra': 'InfraPage',
      '/interviewing': 'ProblemSolving'
    }
    return routeToFileMapping[route]
  }

  getPageTemplate (route: string): TemplateResult {
    const routeToTemplateMapping: Record<string, TemplateResult> = {
      '/go': html`<go-page></go-page>`,
      '/js': html`<js-page></js-page>`,
      '/cpp': html`<cpp-page></cpp-page>`,
      '/infra': html`<infra-page></infra-page>`,
      '/interviewing': html`<problem-solving></problem-solving>`
    }
    return routeToTemplateMapping[route]
  }

  async loadPage (filename: string): Promise<void> {
    // const path = `/build/individual/${filename}.bundle.js` DEV
    const path = (`/bundle/${filename}.bundle.js`) // PROD

    console.log('Attempting to load:', path)
    await import(path)
  }

  sendReadySignal (): void {
    window.dispatchEvent(new CustomEvent('level-0-ready'))

    console.log('Level 0 component signaled ready')
  }

  handleRootPath (e: CustomEvent): void {
    console.log('received event', e)
  }

  getFirstSegment (path: string): string {
    const segments = path.split('/').filter(Boolean)
    return segments.length > 0 ? `/${segments[0]}` : '/'
  }

  static styles = styles

  // prettier-ignore
  headerItems = ['Infra', 'Go', 'JS', 'C++', 'Problem Solving', 'Chat', 'About']
  headerName = 'kuro docs'
  debugFlag = true

  // Called after Render
  updated (changedProperties: Map<string | number | symbol, unknown>): void {
    console.log('Running updated lifecycle')
    super.updated(changedProperties)
    this.checkResetSideBar()
    this.sendLevel0ReadySignal()
  }

  protected render (): TemplateResult {
    console.log('rendering index.ts ')
    return html`
      <header-docs
        .name="${this.headerName}"
        .items="${this.headerItems}"
        ?debug="${this.debugFlag}"
        reset 
      >
      </header-docs>

      <div class="layout-content-and-sidenav">
        <div class="layout-content">
          <div>
            <div>${this.renderContentBasedOnRoute()}</div>
          </div>
        </div>
        <div class="layout-sidenav"><sidebar-drawer></sidebar-drawer></div>
      </div>
    `
  }
}

/*

docker stop nginx-server
docker rm nginx-server
pnpm build
docker build -t nginx-serve-index-spa .
docker run -d -p 80:80 --name nginx-server nginx-serve-index-spa

*/

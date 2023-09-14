import { LitElement, html, type TemplateResult } from 'lit'
import { property } from 'lit/decorators.js'
import { type Post } from 'src/types/postTypes'
import { pageStyles } from './styles/pageStyles'
import { CreatePostCard } from 'src/components/post/PostCard'
import '../components/nav/Breadcrumb/Breadcrumb'
import '../components/misc/Spinner'

/* The code above does the following, explained in English:
1. The b event is sent by the router.
2. The event is received by the abstract page component.
3. The abstract page component looks up the post that matches the currentSubRoute.
4. If the post is found and not loaded yet, the component is loaded, and the isPostLoaded flag is set to true.
5. If the post is not found, the isPostLoaded flag is set to true, and the currentSubRoute is set to empty string.
6. The post component is displayed.
7. When the user navigates away from the post, the currentSubRoute is set to empty string.
8. The abstract page component is unloaded.
9. The abstract page component is loaded when the user navigates back to the post. */

/*
This the page so a level 1 component - .com/page
receives level-2-render event from router
sends level-1-ready event to router
*/

enum Level1ComponentTasks {
  PERFORM_SEND_READY_EVENT_LEVEL_1,
  INIT_RENDER_LISTENER_LEVEL_2,
  INIT_SETUP_RESET_LISTENER_LEVEL_1,
  INIT_SEND_POSTS_METADATA_TO_SIDEBAR,
  CLEANUP_PAGE_POSTS_METADATA_FROM_SIDEBAR,
  CLEANUP_RESET_LISTENER_LEVEL_1,
  CLEANUP_RENDER_LISTENER_LEVEL_2,
}

export abstract class AbstractPage extends LitElement {
  @property({ type: String }) currentSubRoute = ''
  @property({ type: Boolean }) isPostLoaded = false
  @property({ type: Array }) crumbItems = ['Home']

  // Implement these in the child class
  abstract get routePrefix (): string
  abstract get posts (): Post[]
  abstract getPageIntroHeader (): string
  abstract getPageIntroDescription (): TemplateResult
  abstract getBreadcrumbItems (): string[]

  static styles = pageStyles

  constructor () {
    super()
    console.log('Constructor called')
    this.crumbItems = this.getBreadcrumbItems() // <-- Ensure breadcrumbs are initialized
    this.findPostAndLoad = this.findPostAndLoad.bind(this)
    this.resetL1AfterResetEventReceived = this.resetL1AfterResetEventReceived.bind(this)
    this.handlePostClick = this.handlePostClick.bind(this)
  }

  protected renderPostContent (): TemplateResult {
    if (this.currentSubRoute !== '') {
      const post = this.posts.find(p => p.postId === this.currentSubRoute)
      if (post !== undefined && this.isPostLoaded) {
        return html`
          <breadcrumb-deepness .crumbs='${[...this.crumbItems, post.shortTitle]}'></breadcrumb-deepness>
          ${post.renderFunc()}
          `
      } else if (post === undefined) {
        return html`<h1>404: Post Not Found</h1>`
      } else {
        return html`<spinner-comp></spinner-comp>`
      }
    } else {
      console.log('during render post', this.crumbItems)
      return html`
            <breadcrumb-deepness .crumbs='${this.crumbItems}'></breadcrumb-deepness>
            <div class="intro">
                <div class="intro-header">${this.getPageIntroHeader()}</div>
                ${this.getPageIntroDescription()}
                <br />
                <hr />
            </div>
            <div class="posts">
                ${this.posts.map(post => html`
                    <div @click=${() => { this.handlePostClick(post) }}>
                        ${CreatePostCard(post)}
                    </div>
                `)}
            </div>
        `
    }
  }

  // When navigated away , set the subroute "/subroute" to empty string ''

  resetL1AfterResetEventReceived (e: CustomEvent): void {
    console.log('Received reset event for level 1', e)
    this.crumbItems = this.getBreadcrumbItems()
    this.currentSubRoute = ''
  }

  // clicking on the post - update  URL
  protected handlePostClick (post: Post): void {
    this.addLevel2RouteToUrl(post.postId)
  }

  public addLevel2RouteToUrl (postId: string): void {
    window.history.pushState({}, '', `/${this.routePrefix}/${postId}`)
    window.dispatchEvent(new Event('popstate'))
  }

  connectedCallback (): void {
    console.log(`>>>>>>>>\nLevel 1 Abstract Component Connected - ${this.routePrefix}\n>>>>>>>>`)
    super.connectedCallback()
    this.performL1componentTasks(Level1ComponentTasks.INIT_RENDER_LISTENER_LEVEL_2)
    this.performL1componentTasks(Level1ComponentTasks.INIT_SETUP_RESET_LISTENER_LEVEL_1)
    this.performL1componentTasks(Level1ComponentTasks.INIT_SEND_POSTS_METADATA_TO_SIDEBAR)
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()
    console.log(`>>>>>>>>\nAbstract Page Disconnected callback ${this.routePrefix}\n>>>>>>>>`)
    this.performL1componentTasks(Level1ComponentTasks.CLEANUP_PAGE_POSTS_METADATA_FROM_SIDEBAR)
    this.performL1componentTasks(Level1ComponentTasks.CLEANUP_RENDER_LISTENER_LEVEL_2)
    this.performL1componentTasks(Level1ComponentTasks.CLEANUP_RESET_LISTENER_LEVEL_1)
  }

  // Called after Render - sends Ready Event
  updated (changedProperties: Map<string | number | symbol, unknown>): void {
    console.log('Running updated lifecycle')
    super.updated(changedProperties)
    this.performL1componentTasks(Level1ComponentTasks.PERFORM_SEND_READY_EVENT_LEVEL_1)
  }

  // Find Post and Load Component or catch error

  private findPostAndLoad (e: CustomEvent): void {
    console.log("Received level-2-render event, finding post and loading it's component", e)
    // Find Post that matches the currentSubRoute
    const post = this.posts.find((p) => p.postId === this.currentSubRoute)

    // If the post is found and not loaded yet, the component is loaded, and the isPostLoaded flag is set to true.
    if (post !== undefined && !this.isPostLoaded) {
      this.loadPost(post.pathForDynamicLoad).then(() => {
        this.isPostLoaded = true

        if (e.detail.path !== undefined) {
          this.currentSubRoute = e.detail.path
        } else {
          // Post not found , set isPostLoaded to true and leaving currSubR empty
          this.currentSubRoute = ''
        }
      }).catch(error => {
        console.error(`Error loading the ${post.pathForDynamicLoad} Page:`, error)
      })
    } else {
      if (e.detail.path !== undefined) {
        this.currentSubRoute = e.detail.path
      } else {
        this.currentSubRoute = ''
      }
      console.log(this.crumbItems)
      this.isPostLoaded = true
    }
  }

  private sendCurrPagePostsMetadataToSidebar (posts: Post[]): void {
    console.log('Sending current page posts metadata to sidebar')
    const event = new CustomEvent('posts-updated', {
      detail: { posts },
      bubbles: true, // This makes the event bubble up the DOM
      composed: true // This lets the event pass through shadow DOM boundaries
    })
    this.dispatchEvent(event)
    console.log('SENT_RESET_EVENT', posts)
  }

  private async loadPost (postPath: string): Promise<void> {
    try {
      await import(`/bundle/${postPath}.bundle.js`)
      console.log('post path during load', postPath)
    } catch (error) {
      console.error(`Failed to load post component from ${postPath}`, error)
    }
  }

  performL1componentTasks (task: Level1ComponentTasks): void {
    switch (task) {
      case Level1ComponentTasks.INIT_SEND_POSTS_METADATA_TO_SIDEBAR:
        console.log('INIT_POST_METADATA_SEND')
        this.sendCurrPagePostsMetadataToSidebar(this.posts)
        break

      case Level1ComponentTasks.CLEANUP_PAGE_POSTS_METADATA_FROM_SIDEBAR:
        console.log('POST_METADATA_CLEANUP')
        this.sendCurrPagePostsMetadataToSidebar([])
        break

      case Level1ComponentTasks.PERFORM_SEND_READY_EVENT_LEVEL_1:
        console.log('Sending level-1-ready event')
        window.dispatchEvent(new CustomEvent('level-1-ready'))
        break

      case Level1ComponentTasks.INIT_RENDER_LISTENER_LEVEL_2:
        window.addEventListener('level-2-render', this.findPostAndLoad as EventListener)
        console.log('Added level-2-render listener for ', this.routePrefix)
        break

      case Level1ComponentTasks.CLEANUP_RENDER_LISTENER_LEVEL_2:
        window.removeEventListener('level-2-render', this.findPostAndLoad as EventListener)
        break

      case Level1ComponentTasks.INIT_SETUP_RESET_LISTENER_LEVEL_1:
        window.addEventListener('level-1-reset', this.resetL1AfterResetEventReceived as EventListener)
        break

      case Level1ComponentTasks.CLEANUP_RESET_LISTENER_LEVEL_1:
        window.removeEventListener('level-1-reset', this.resetL1AfterResetEventReceived as EventListener)
        break
    }
  }
}

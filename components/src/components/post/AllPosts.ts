import { LitElement, html, css, type TemplateResult } from 'lit'
import { property, customElement } from 'lit/decorators.js'
import { CreatePostCard } from './PostCard'
import { type Post } from 'src/types/postTypes'
import { allPosts } from 'src/posts/allPosts'
import { updateUrlAndTriggerRouteChange } from 'src/router/helpers'
@customElement('all-posts')
export class AllPosts extends LitElement {
  @property()
    someProp = 'Random Value'

  static styles = css`
      .all-posts {
        display: flex;
        flex-direction: column;
        gap:2.5rem;
      }
    `
  private readonly posts: Post[] = allPosts

  protected render (): TemplateResult {
    return html`
      <div class="all-posts">
        ${this.posts.map(post => html`
          <div @click=${() => { this.handlePostClick(post) }}>
            ${CreatePostCard(post)}
          </div>
        `)}
      </div>
    `
  }

  // Click handler to navigate to the specific post's URL.
  private handlePostClick (post: Post): void {
    const url = `/${post.rootPagePath}/${post.postId}`
    updateUrlAndTriggerRouteChange(url)
  }
}

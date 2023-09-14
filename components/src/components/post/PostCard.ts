import { LitElement, html, css, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { fetchJSBundleFromCDN } from '@utils/fetchfromCDN'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import { type Post } from '../../types/postTypes'

export function CreatePostCard (post: Post): TemplateResult {
  return html`
    <post-card
      .postTitle=${post.title}
      .postDescription=${post.description}
      .tags=${post.tags}
      .date=${post.date}
    ></post-card>
  `
}

@customElement('post-card')
export class PostCard extends LitElement {
  @property({ type: String }) imageUrl =
    'https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80'

  @property({ type: String }) postTitle = 'Great Insightful Post'
  @property({ type: String }) postDescription =
    'This post will transfer immense knowledge.'

  @property({ type: String }) tags = 'JS Go C++'
  @property({ type: String }) date = 'January 20, 2024'
  @property({ type: String }) postId = '0'

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    .post-card::part(base) {
      width: 50%;
    }

    .post-card::part(base):hover {
      filter: brightness(1.2); /* 20% brighter */
    }

    @media (max-width: 768px) {
      /* You can adjust this breakpoint as needed */
      .post-card::part(base) {
        width: 100%;
      }
    }

    sl-card {
      display: flex;
      justify-content: center;
    }

    sl-card .card-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .card-content > *:not(:last-child) {
      margin-bottom: 10px;
    }
    .title {
      font-size: 1.5rem;
    }
    .date {
      color: #ffffff;
      font-size: 0.9rem;
      font-style: italic;
    }

    .tags {
      display: flex;
      flex-wrap: wrap; /* Add this line to make tags wrap */
      width: 100%; /* Set the width to 100% to ensure tags wrap within the container */
    }

    .tags span {
      background-color: #333333;
      border-radius: 4px;
      padding: 2px 6px;
      font-family: "Courier New", Courier, monospace;
      font-size: 0.9rem;
      color: #ffffff;
      margin-right: 5px;
    }

    .title,
    description,
    .tags,
    .date {
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    .title,
    .description {
      text-align: left;
    }
  `

  connectedCallback (): void {
    super.connectedCallback()
    fetchJSBundleFromCDN(
      'https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js'
    )
  }

  render () {
    return html`
      <div>
        <sl-card class="post-card">
          <div class="card-content">
            <div class="title">${this.postTitle}</div>
            <div class="description">${this.postDescription}</div>
            <div class="tags">
              ${this.tags.split(' ').map((tag) => html`<span>${tag}</span>`)}
            </div>
            <div class="date">${this.date}</div>
          </div>
        </sl-card>
      </div>
    `
  }
}

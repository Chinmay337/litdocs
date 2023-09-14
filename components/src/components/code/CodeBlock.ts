import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fetchJSBundlesSequentiallyFromCDN } from "@utils/fetchfromCDN";
import { prismcss, githubdarkcss } from "./prismcss";

import "../../components/misc/Spinner";

export function CreateCodeBlock(
  code?: string,
  language?: string
): TemplateResult {
  return html`${code && language
    ? html`<code-block code=${code} language=${language}></code-block>`
    : code
    ? html`<code-block code=${code}></code-block>`
    : html`<code-block></code-block>`}`;
}

@customElement("code-block")
export class CodeBlock extends LitElement {
  @property()
  code = `
  package main
  func main() {
    fmt.Println("Hello World")
  }
  `;

  @property({ type: Boolean })
  private loading = true; // Added a loading state
  @property() language = "go"; // default to Go language
  @property({ type: Boolean })
  private copied = false;

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      text-align: center;
      width: 100%;
      margin-right: 1rem;
    }

    pre {
      border: 1px solid white;
      position: relative;
      max-width: 100%; /* Ensure it doesn't exceed the parent width */
      overflow-x: auto; /* Allow for horizontal scrolling */
    }
    pre::before {
      content: attr(data-language);
      color: #d0ebff;
      font-family: "Courier New", Courier, monospace;
      font-size: 10px;
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0.7);
      padding: 2px 5px;
      border-radius: 3px;
      position: absolute;
      top: 10px;
      right: 5px;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    pre::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE and Edge */
    pre {
      -ms-overflow-style: none;
    }

    .copied-tooltip {
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-size: 12px;
      padding: 2px 8px;
      background-color: black;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      pointer-events: none;
      visibility: hidden; // Added to hide the tooltip by default
    }

    .tooltip-visible {
      // This class is toggled for the tooltip visibility
      opacity: 1;
      visibility: visible;
    }

    iconify-icon {
      color: white;
      cursor: pointer;
      font-size: 1.5rem;
    }

    iconify-icon:hover {
      transform: scale(1.1);
      opacity: 0.8;
    }

    ${githubdarkcss}
  `;

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    const jsBundles = [
      "https://cdn.jsdelivr.net/npm/prismjs@1.23.0/prism.js",
      "https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js",
    ];
    if (this.language === "cpp") {
      jsBundles.push(
        "https://cdn.jsdelivr.net/npm/prismjs@1.23.0/components/prism-c.min.js"
      );
    }

    jsBundles.push(
      `https://cdn.jsdelivr.net/npm/prismjs@1.23.0/components/prism-${this.language}.min.js`
    );

    try {
      await fetchJSBundlesSequentiallyFromCDN(jsBundles);

      this.loading = false;
      await this.updateComplete;
      this.tryHighlighting();
    } catch (error) {
      console.error("Error loading resources: ", error);
    }
  }

  protected render(): TemplateResult {
    if (this.loading) return html`<spinner-comp></spinner-comp>`;
    return html`
      <div
        style="position: relative; display: flex; justify-content: flex-end; "
      >
        <span
          class=${this.copied
            ? "copied-tooltip tooltip-visible"
            : "copied-tooltip"}
          >Copied!</span
        >
        <!-- Here's the tooltip -->
        <iconify-icon
          color="white"
          icon=${this.copied ? "ph:check-fill" : "ph:code-fill"}
          @click=${this.copyToClipboard.bind(this, this.code)}
        ></iconify-icon>
      </div>

      <pre data-language=${this.language}><code class="language-${this
        .language}">${this.code}</code></pre>
    `;
  }
  private async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");

      this.copied = true;

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        this.copied = false;
        this.requestUpdate();
      }, 1000);

      this.requestUpdate();
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  // Call to make sure script is available before highlighting
  private tryHighlighting(attempts = 5): void {
    const codeElement = this.shadowRoot?.querySelector("code");

    if (codeElement && (window as any).Prism) {
      (window as any).Prism.highlightElement(codeElement);
      this.loading = false;
      this.requestUpdate();
    } else if (attempts > 0) {
      // Wait for 100ms and try again
      setTimeout(() => this.tryHighlighting(attempts - 1), 100);
    } else {
      console.error("Prism is not available after multiple attempts.");
    }
  }
}

/*
https://lucidar.me/en/web-dev/list-of-supported-languages-by-prism/

<sl-icon name="icon-name-here"></sl-icon>

<sl-icon name="code-slash"></sl-icon>

code-slash


  package main
  func main() {
    fmt.Println("Hello World")
  }
  
  
*/

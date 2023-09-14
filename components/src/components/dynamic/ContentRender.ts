// import { LitElement, html, css, TemplateResult } from "lit";
// import { customElement, property } from "lit/decorators.js";
// import { fetchJSBundleFromCDN } from "@utils/fetchfromCDN";
// import { CreateCodeBlock } from "../code/CodeBlock";
// import { cppCode } from "../code/samplecode";

// /**
//  * Custom event detail for content change events.
//  * @typedef {Object} ContentChangeEventDetail
//  * @property {string} item - The name of the selected item.
//  */
// type ContentChangeEventDetail = {
//   item: string;
// };

// /**
//  * RenderContent function returns a TemplateResult for rendering content.
//  * @returns {TemplateResult} A Lit HTML TemplateResult.
//  */
// export function RenderContent(): TemplateResult {
//   return html`<content-render></content-render>`;
// }

// /**
//  * Custom element for rendering content  based on emitted changeContent events
//  * @extends LitElement
//  */
// @customElement("content-render")
// export class ContentRender extends LitElement {
//   @property({ type: String }) content = html`<h2>Welcome!</h2>
//     <p>Select a topic from the header to view its documentation.</p>`;

//   @property({ type: Boolean }) debug = false;

//   protected render() {
//     return html` <p @changeContent=${this._displayContent}><slot></slot></p>

//       <div>${this.content}</div>`;
//   }

//   static styles = css`
//     :host {
//       display: block;
//       max-width: 800px;
//       margin: 0 auto;
//       padding: 16px;
//       color: #fff;
//       font-family: "Raleway", sans-serif;
//       line-height: 1.6;
//     }

//     h2 {
//       font-size: 1.5rem;
//       margin-bottom: 16px;
//     }

//     p {
//       margin-bottom: 16px;
//     }

//     /* Mobile styles */
//     @media (max-width: 768px) {
//       :host {
//         padding: 12px;
//       }

//       h2 {
//         font-size: 1.2rem;
//       }
//     }
//   `;

//   private _boundDisplayContent: (e: Event) => void;

//   /**
//    * Constructor initializes the displaycontent function
//    * @returns {any}
//    */
//   constructor() {
//     super();
//     this._boundDisplayContent = this._displayContent.bind(this);
//   }

//   connectedCallback() {
//     super.connectedCallback();
//     document.addEventListener("changeContent", this._boundDisplayContent);
//   }

//   disconnectedCallback() {
//     super.disconnectedCallback();
//     document.removeEventListener("changeContent", this._boundDisplayContent);
//   }

//   /**
//    * Handles the display of content based on the selected item.
//    * @param {Event} e - The custom changeContent event.
//    * @private
//    */
//   private async _displayContent(e: Event) {
//     const event = e as CustomEvent<ContentChangeEventDetail>;
//     if (this.debug) console.log("Received event", event);

//     switch (event.detail.item) {
//       case "Go":
//         this.content = html`
//           <h2>Go Documentation</h2>
//           ${CreateCodeBlock()}
//           <p>Go is an open-source programming language...</p>
//         `;
//         break;
//       case "JS":
//         this.content = html`
//           <h2>JavaScript Documentation</h2>
//           <p>JavaScript (often shortened as JS) is a programming language...</p>
//           ${CreateCodeBlock(`console.log('Hello World!');`, "javascript")}
//         `;
//         break;
//       case "About":
//         try {
//           // Dynamically load the BarChart bundle
//           await fetchJSBundleFromCDN(
//             "https://cdn.kuro337.com/BarChart.bundle.js"
//           );

//           // Create a new bar-chart element and render it
//           const barChartElement = document.createElement("bar-chart");
//           barChartElement.id = "bar-cloud";
//           barChartElement.setAttribute("width", "400px");

//           this.content = html`${barChartElement}`;
//         } catch (error) {
//           console.error("Failed to load BarChart bundle:", error);
//         }
//         break;
//       case "C++":
//         this.content = html`
//           <h2>C++ Documentation</h2>
//           <p>C++ is a general-purpose programming language</p>
//           ${CreateCodeBlock(cppCode, "cpp")}
//         `;
//         break;
//       default:
//         this.content = html`
//           <h2>Welcome</h2>
//           <p>Select a topic from the header to view its documentation.</p>
//         `;
//     }
//   }
// }

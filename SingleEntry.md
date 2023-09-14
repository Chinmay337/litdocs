# Lit Components App Structure

- App defined in src/entry/index.ts

```ts
Component defined in components/Header.ts

// Create func to just be passed props and create the final html component
export function CreateHeader(
  name: string,
  items: string[],
  debug: boolean
): TemplateResult {
  return html`
    <header-docs .name=${name} .items=${items} ?debug=${debug}></header-docs>
  `;
}

// This is defining the component as header-docs
@customElement("header-docs")
export class HeaderDocs extends LitElement {
  protected render() : TemplateResult {
    return someHtml
  }
}

```

- In our entry point - we still need to import the component

```ts
import { HeaderDocs, CreateHeader } from "../components/Header";

// Note - still require to import HeaderDocs or the component wont be registered


// Index class....

protected render() {
    return html`
      ${CreateHeader("Docs", ["Go", "C++", "TS"], true)}
      <h1 id="header-main">Docs</h1>
      <p>Welcome to the Docs tutorial!</p>
    `;
  }
```

- Lifecycles https://lit.dev/docs/components/lifecycle/

  - connectedCallback() - called when the element is added to the DOM
  - disconnectedCallback() - called when the element is removed from the DOM
  - attributeChangedCallback() - called when an attribute is added, removed, updated, or replaced on the element. Note: this callback is only called for observed attributes. See the attributes property for more information.

- firstUpdated() - called after the element’s template has been created and inserted into the DOM by LitElement. Note: this callback is called once per element instance, not once per element definition.

```ts
// Fired AFTER 1st render - and it renders again - but before the 2nd render
async firstUpdated() {
  // Give the browser a chance to paint
  await new Promise((r) => setTimeout(r, 0));
  this.addEventListener('click', this._handleClick);
}
```

## Current App

- When defining a new Page

```ts
// index.ts -
${CreateHeader("Kuro Docs",
["Infra", "Go", "JS", "C++", "Problem Solving", "Chat", "About"],true)}

// By default - URL gets set to "problem solving"
// so we need to update HeaderDocs to resolve it to "interviewing" for example

// For Problem Solving - if the page is src/pages/ProblemSolving/ProblemSolving.ts
// Then we can set the property for our page to /interviewing in the Page ts



```

import { css } from 'lit-element'

export const postStyles = css`
  :host {
    display: block;
    font-family: sans-serif;
    text-align: left; /* Set the text alignment to left */
    padding: 16px;
    line-height: 1.6; /* Improve readability */
  }

  .title {
    font-size: 2em;
    font-family: "Raleway", sans-serif;
    margin-bottom: 2rem;
    text-align: center; /* Keep the title centered */
  }

  .description {
    font-size: 1em;
    margin-bottom: 4rem;
    font-family: "Raleway", sans-serif;
    text-align: center; /* Keep the description centered */
  }

  .code-block {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    margin-top: 16px;
    /* Text inside the code block can remain centered or adjusted as needed */
  }

  .explanation {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #333333; /* Slightly lighter background for explanations */
    border-left: 4px solid #e6e6e6; /* Highlight border on the left */
    font-size: 0.9em;
  }

  .explanation span {
    color: #ffcc66; /* Highlight color for code mentions */
  }
`

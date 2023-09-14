import { css } from 'lit-element'

export const pageStyles = css`
  :host {
    display: block;
    font-family: sans-serif;
    max-width: 60%;
    margin: 0 auto;
    padding: 16px; /* Add padding for better spacing */
  }

  .intro {
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  .intro-header {
    font-family: "Raleway", sans-serif;
    text-align: left;

    font-size: 2rem; /* Increased font size for the header */
    margin-bottom: 1rem; /* Space between header and description */
  }

  .desc {
    text-align: left;
    font-family: "Lato", sans-serif;
    margin-bottom: 16px; /* Space between each paragraph */
    line-height: 1.8; /* Improved line spacing for readability */
    font-size: 1.25rem;
  }

  /* Mobile */
  @media (max-width: 768px) {
    :host {
      max-width: 100%;
    }
    .desc {
      font-size: 1rem;
    }
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`

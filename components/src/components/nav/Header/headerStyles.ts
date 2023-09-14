import { css } from 'lit'

export const headerStyles = css`
  :host {
    display: block;
    font-family: sans-serif;
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 10px;
    border-bottom: 1px solid #ffffff;
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .text-container {
    display: flex;
    justify-content: center;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-right: 0.25rem;

    ::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .header-docs {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
    font-size: 2rem;
  }

  sl-button.header-btn {
    --sl-button-font-size-large: 1rem;
  }

  .text-container sl-button.header-btn:nth-of-type(4) {
    margin-right: 2rem; /* or 3rem based on your preference */
  }

  .text-container sl-button.header-btn:nth-of-type(5) {
    margin-right: 4rem; /* or 3rem based on your preference */
  }

  .header-btn {
    position: relative;
  }

  .header-btn.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background-color: var(--sl-color-sky-700);
    border-radius: 1px;
  }

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    .header-container {
      justify-content: flex-start;
    }

    .header-docs {
      margin-left:1rem;
      font-size:1.75rem;
    }

    .text-container {
      justify-content: flex-start;
      margin-right: 0;
      margin-top: 10px;
    }

    .text-container sl-button.header-btn:nth-of-type(4) {
      margin-right: 0; /* Resetting the margin */
    }
    .text-container sl-button.header-btn:nth-of-type(5) {
      margin-right: 0; /* Resetting the margin */
    }
  }
`

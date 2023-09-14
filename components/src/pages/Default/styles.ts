import { css } from 'lit-element'

export const styles = css`
  :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    padding: 2rem;
    line-height: 1.6;
  }

  .home-page {

  }

  .entry-header {
    font-family: "Raleway", sans-serif;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1.2rem;
  }

  .search {
    width: 20%;
  }

  @media (max-width: 768px) {
    .search {
      width: 100%;
    }
  }

  .search-box {
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }
`

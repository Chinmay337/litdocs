import { css } from 'lit-element'

export const styles = css`
  html,
  body {
    margin: 0;
    padding: 0;
  }
  :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    background-color: #1a1a1a;
    color: #ffffff;
  }

  .entry-header {
    margin-top: 2rem;
    font-family: "Raleway", sans-serif;
    font-size: 1rem;
  }

  #header-main {
    font-family: "Lato", sans-serif;
    font-size: 3rem;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  body::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  body {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .layout-content-and-sidenav {
    display: flex;
    position: relative;
    min-height: 100vh;
  }



  

  .layout-content {
    width: 80%; /* Large screens 80% */
    z-index: 1; /* This will be overlapped by the sidenav on small screens */
  }

  .layout-sidenav {
    width: 20%; /* Large screens 20% */
    z-index: 2; /* This will overlap the content on small screens */
    overflow: hidden; /* Hide overflowing content */
  }

  @media (max-width: 768px) {
    .layout-content {
      width: 100%; /* Small screens 90% */
    }

    .layout-sidenav {
      width: 40%; /* Small screens 40% */
      position: absolute; /* Set this to absolute to allow it to overlap the content */
      right: 0; /* Make sure it's anchored to the right side */
      top: 0; /* Start from the top */
      height: 100%; /* Take full height */
    }
  }
`

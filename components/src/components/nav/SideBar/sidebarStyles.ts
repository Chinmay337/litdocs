import { css } from "lit";

export const hamburgerStyles = css`
  .hamburger-container {
    width: 36px;
    height: 36px;
    position: absolute; /* <-- changed to absolute */
    top: 1.5%;
    right: 0; /* <-- absolute right */
    cursor: pointer;
    transition: background-color 0.3s;
    z-index: 1; /* <-- make sure it's on top */
  }

  .hamburger-container:hover .hamburger-icon {
    stroke: skyblue;
  }

  .hamburger-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 36px; /* doubled from 24px */
    height: 36px; /* doubled from 24px */
    fill: none;
    stroke: white;
    stroke-width: 2;
    transition: stroke 0.3s;
  }

  @media (max-width: 768px) {
    .hamburger-icon {
      width: 24px;
      height: 24px;
    }

    .hamburger-container {
      width: 24px;
      height: 24px;
  }
`;

export const sidebarDocsStyles = css`
  /* Root styles of the SidebarDocs */
  :host {
    display: block;
    height: 100%;
    width: 100%;
    overflow: hidden; /* Hide the scrollbar */
  }

  .sidenav-container {
    display: flex; /* Set the container as a flex container */
    justify-content: flex-end; /* Push content to the end (right side) */
    position: relative;
    height: 100%;
  }

  .sidenav-container.border {
    border: solid 2px var(--sl-panel-border-color);
  }

  .sl-drawer::part(overlay) {
    background-color: transparent; /* Set the overlay background color explicitly */
  }

  .sl-drawer::part(header) {
    text-align: left;
  }

  sl-drawer::part(content)::-webkit-scrollbar {
    display: none;
  }

  sl-drawer::part(content) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .sidebar-desc-title {
    font-family: "Raleway", sans-serif;
    margin-bottom: 2rem;
  }

  .sidebar-desc-content {
    line-height: 1.5;
    margin-bottom: 3rem;
    font-size: 1rem;
  }

  sl-menu-label,
  sl-menu-item {
    text-align: right;
  }
  sl-button {
    color: white;
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    sl-button {
      width: 4rem;
      margin-right: 0rem;
    }
  }

  sl-drawer {
    color: white;
    --size: 100%;
    overflow: hidden; /* Hide the scrollbar */
    text-align: left;
  }
`;

export const sidebarStyles = css`
  /* Root styles of the SidebarDocs */
  :host {
    display: block;
    height: 100%;
    width: 100%;
    overflow: hidden; /* Hide the scrollbar */
  }

  .sidenav-container {
    display: flex; /* Set the container as a flex container */
    justify-content: flex-end; /* Push content to the end (right side) */
    position: relative;
    height: 100%;
  }

  .sidenav-container.border {
    border: solid 2px var(--sl-panel-border-color);
  }

  .sl-drawer::part(overlay) {
    background-color: transparent; /* Set the overlay background color explicitly */
  }

  .sl-drawer::part(header) {
    text-align: left;
  }

  sl-drawer::part(content)::-webkit-scrollbar {
    display: none;
  }

  sl-drawer::part(content) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .sidebar-desc-title {
    font-family: "Raleway", sans-serif;
    margin-bottom: 2rem;
  }

  .sidebar-desc-content {
    line-height: 1.5;
    margin-bottom: 3rem;
    font-size: 1rem;
  }

  sl-menu-label,
  sl-menu-item {
    text-align: right;
  }
  sl-button {
    color: white;
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    sl-button {
      width: 4rem;
      margin-right: 0rem;
    }
  }

  sl-drawer {
    color: white;
    --size: 100%;
    overflow: hidden; /* Hide the scrollbar */
    text-align: left;
  }
`;

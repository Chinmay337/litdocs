import { css } from "lit";

export const prismcss = css`
  /**
 * Minified by jsDelivr using clean-css v4.2.3.
 * Original file: /npm/prismjs@1.23.0/themes/prism.css
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
  code[class*="language-"],
  pre[class*="language-"] {
    color: #000;
    background: 0 0;
    text-shadow: 0 1px #fff;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  code[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection,
  pre[class*="language-"] ::-moz-selection,
  pre[class*="language-"]::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
  }
  code[class*="language-"] ::selection,
  code[class*="language-"]::selection,
  pre[class*="language-"] ::selection,
  pre[class*="language-"]::selection {
    text-shadow: none;
    background: #b3d4fc;
  }
  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #f5f2f0;
  }
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
  .token.cdata,
  .token.comment,
  .token.doctype,
  .token.prolog {
    color: #708090;
  }
  .token.punctuation {
    color: #999;
  }
  .token.namespace {
    opacity: 0.7;
  }
  .token.boolean,
  .token.constant,
  .token.deleted,
  .token.number,
  .token.property,
  .token.symbol,
  .token.tag {
    color: #905;
  }
  .token.attr-name,
  .token.builtin,
  .token.char,
  .token.inserted,
  .token.selector,
  .token.string {
    color: #690;
  }
  .language-css .token.string,
  .style .token.string,
  .token.entity,
  .token.operator,
  .token.url {
    color: #9a6e3a;
    background: hsla(0, 0%, 100%, 0.5);
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #07a;
  }
  .token.class-name,
  .token.function {
    color: #dd4a68;
  }
  .token.important,
  .token.regex,
  .token.variable {
    color: #e90;
  }
  .token.bold,
  .token.important {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  /*# sourceMappingURL=/sm/928e23e6b9fcef82c5f1d1f05b6f7fc5a6e187c60195e59fbf16fc9d071ee057.map */
`;

export const githubdarkcss = css`
  /**
 * Github Dark theme for Prism.js
 * Based on Github: https://github.com
 * @author Katorly
 */
  /* General */
  pre[class*="language-"],
  code[class*="language-"] {
    color: #c9d1d9;
    font-size: 13px;
    text-shadow: none;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  pre[class*="language-"]::selection,
  code[class*="language-"]::selection,
  pre[class*="language-"]::mozselection,
  code[class*="language-"]::mozselection {
    text-shadow: none;
    background: #234879;
  }
  @media print {
    pre[class*="language-"],
    code[class*="language-"] {
      text-shadow: none;
    }
  }
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    background: #161b22;
  }
  :not(pre) > code[class*="language-"] {
    padding: 0.1em 0.3em;
    border-radius: 0.3em;
    color: #c9d1d9;
    background: #343942;
  }
  /* Line highlighting */
  pre[data-line] {
    position: relative;
  }
  pre[class*="language-"] > code[class*="language-"] {
    position: relative;
    z-index: 1;
  }
  .line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    padding: inherit 0;
    margin-top: 1em;
    background: #2f2a1e;
    box-shadow: inset 5px 0 0 #674c16;
    z-index: 0;
    pointer-events: none;
    line-height: inherit;
    white-space: pre;
  }
  /* Tokens */
  .namespace {
    opacity: 0.7;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #8b949e;
  }
  .token.punctuation {
    color: #c9d1d9;
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #79c0ff;
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #a5d6ff;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #a5d6ff;
    background: #161b22;
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #a5d6ff;
  }
  .token.function {
    color: #d2a8ff;
  }
  .token.regex,
  .token.important,
  .token.variable {
    color: #a8daff;
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
`;

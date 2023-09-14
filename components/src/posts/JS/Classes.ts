import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CreateCodeBlock } from 'src/components/code/CodeBlock'
import { postStyles } from 'src/pages/styles/postStyles'
import type { Post } from 'src/types/postTypes'

export const post: Post = {
  rootPagePath: 'js',
  title: 'Classes - JS',
  shortTitle: 'Classes',
  description: 'Leveraging Classes in JS development.',
  tags: 'js class oop',
  date: 'August 23, 2023',
  postId: 'js-classes',
  pathForDynamicLoad: 'src/posts/JS/Classes',
  component: '<js-classes></js-classes>',
  renderFunc: () => html`<js-classes></js-classes>`
}

@customElement('js-classes')
export class JSClasses extends LitElement {
  @property()
    someProp = 'JavaScript Classes Overview'

  static styles = postStyles

  protected render (): TemplateResult {
    return html`
      <div class="title">JavaScript Classes: Basics, Fundamentals & Tricks</div>
      <div class="description">
        A guide to understanding and effectively using JavaScript classes.
      </div>

      <p>
        JavaScript classes, introduced in ECMAScript 2015, are primarily
        syntactical sugar over JavaScript's existing prototype-based
        inheritance. They offer a cleaner and more object-oriented programming
        approach.
      </p>

      ${CreateCodeBlock(
        `class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log(\`\${this.name} says Woof!\`);
  }
}

const myDog = new Dog("Rex");
myDog.bark(); // Rex says Woof!`,
        'javascript'
      )}

      <div class="explanation">
        The code above defines a simple class named <span>Dog</span>. It has a
        constructor that sets the name property and a method named
        <span>bark</span> that logs a message.
      </div>

      <br />

      <p>
        One of the great things about classes in JavaScript is the ability to
        extend them. This allows developers to create new classes based on the
        existing ones, inheriting properties and behaviors.
      </p>

      ${CreateCodeBlock(
        `class GoldenRetriever extends Dog {
  playFetch() {
    console.log(\`\${this.name} loves to play fetch!\`);
  }
}

const myGolden = new GoldenRetriever("Buddy");
myGolden.bark(); // Buddy says Woof!
myGolden.playFetch(); // Buddy loves to play fetch!`,
        'javascript'
      )}

      <div class="explanation">Leveraging Classes for Extensability</div>

      <p>
        Leveraging classes and inheritance can lead to cleaner, more modular,
        and maintainable code.
      </p>

      <p>This guide is a part of the ${this.someProp} series.</p>
    `
  }
}

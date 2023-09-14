import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CreateCodeBlock } from 'src/components/code/CodeBlock'
import { postStyles } from 'src/pages/styles/postStyles'
import type { Post } from 'src/types/postTypes'

export const post: Post = {
  rootPagePath: 'cpp',
  title: 'Object Oriented Programming in C++',
  shortTitle: 'OOP in C++',
  description: 'Intro to Object Oriented Programming in C++.',
  tags: 'cpp oop abstraction',
  date: 'September 4, 2023',
  postId: 'cpp-oop',
  pathForDynamicLoad: 'OOP',
  component: '<cpp-oop></cpp-oop>',
  renderFunc: () => html`<cpp-oop></cpp-oop>`
}

@customElement('cpp-oop')
export class CPPOOP extends LitElement {
  @property()
    someProp = 'Object-Oriented Programming in C++'

  static styles = postStyles

  protected render (): TemplateResult {
    return html`
      <div class="title">
        Object-Oriented Programming in C++: Virtual Functions & Polymorphism
      </div>
      <div class="description">
        Dive deep into OOP concepts in C++ with a focus on virtual functions and
        polymorphism.
      </div>

      <p>
        C++ is known for its support for object-oriented programming (OOP). OOP
        in C++ allows for defining classes and creating objects, encapsulating
        data, and behaviors, inheritance, and polymorphism.
      </p>

      ${CreateCodeBlock(
        `class Base {
  virtual void show() {
    std::cout << "In Base";
  }
};

class Derived: public Base {
  void show() {
    std::cout << "In Derived";
  }
};`,
        'cpp'
      )}
      <div class="explanation">
        A simple example of a base and derived class with a virtual function.
      </div>

      <p>
        The keyword <code>virtual</code> tells the C++ compiler to perform
        dynamic linkage or late binding on the function. This ensures the
        correct function is called for an object, regardless of the type of
        reference (or pointer) used for function call, enabling polymorphism.
      </p>

      <p>
        Object-oriented programming in C++, especially the use of virtual
        functions, allows developers to write more maintainable and scalable
        code, leading to robust software solutions.
      </p>

      <p>
        For more advanced topics and best practices in C++ OOP, refer to the
        official C++ documentation and community guidelines.
      </p>
    `
  }
}

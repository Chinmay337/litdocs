import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CreateCodeBlock } from 'src/components/code/CodeBlock'
import { postStyles } from 'src/pages/styles/postStyles'
import type { Post } from 'src/types/postTypes'

export const post: Post = {
  rootPagePath: 'cpp',
  title: 'Smart Pointers',
  shortTitle: 'Smart Pointers',
  description:
    'Exploring the benefits and usage of smart pointers in modern C++ for safer memory management.',
  tags: 'cpp oop memory pointers',
  date: 'August 7, 2023',
  postId: 'cpp-smart-pointers',
  pathForDynamicLoad: 'src/posts/C++/SmartPointers',
  component: '<cpp-smart-pointers></cpp-smart-pointers>',
  renderFunc: () => html`<cpp-smart-pointers></cpp-smart-pointers>`
}

@customElement('cpp-smart-pointers')
export class CPPSmartPointers extends LitElement {
  @property()
    postTitle = 'Modern Memory Management in C++ with Smart Pointers'

  static styles = postStyles

  protected render (): TemplateResult {
    return html`
      <div class="title">
        Modern Memory Management with Smart Pointers in C++
      </div>
      <div class="description">
        Exploring the benefits and usage of smart pointers in modern C++ for
        safer memory management.
      </div>

      <p>
        Introduced in C++11, smart pointers provide a way to store pointers to
        automatically manage the lifetime of objects they own. They are a
        fundamental tool in modern C++ to ensure that programs are free of
        memory leaks and are exception-safe.
      </p>

      ${CreateCodeBlock(
        'std::unique_ptr<int> ptr = std::make_unique<int>(5);',
        'cpp'
      )}
      <div class="explanation">
        Creating a unique_ptr, which represents a uniquely-owned object.
      </div>

      <p>
        Let's delve into a more intricate example using smart pointers with a
        class.
      </p>

      ${CreateCodeBlock(
        `// Define a Rectangle class
class Rectangle {
private:
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const {
        return width * height;
    }
};

// Using smart pointers with the Rectangle class
std::unique_ptr<Rectangle> r1 = std::make_unique<Rectangle>(5.0, 7.0);
std::cout << "Area of r1: " << r1->area() << std::endl;

std::shared_ptr<Rectangle> r2 = std::make_shared<Rectangle>(4.0, 6.0);
std::shared_ptr<Rectangle> r2_copy = r2;  // r2 and r2_copy share the ownership
std::cout << "Area of r2: " << r2->area() << std::endl;`,
        'cpp'
      )}

      <div class="explanation">
        In this example, we define a simple <span>Rectangle</span> class and use
        smart pointers for its memory management. The unique_ptr
        <span>r1</span> ensures single ownership of the Rectangle object, while
        the shared_ptr <span>r2</span> allows shared ownership, demonstrated by
        the r2_copy.
      </div>

      <p>
        Smart pointers come in several flavors, each suitable for different
        scenarios:
      </p>

      <ul>
        <li>
          <strong>std::unique_ptr:</strong> Ensures a single ownership of the
          object.
        </li>
        <li>
          <strong>std::shared_ptr:</strong> Allows multiple pointers to own the
          same object.
        </li>
        <li>
          <strong>std::weak_ptr:</strong> A companion to shared_ptr, but doesn't
          contribute to the reference count.
        </li>
      </ul>

      <p>
        Leveraging smart pointers in your C++ code can lead to more robust
        software, free from memory-related errors.
      </p>

      <p>
        For more in-depth details and best practices, refer to the official C++
        documentation and guidelines.
      </p>
    `
  }
}

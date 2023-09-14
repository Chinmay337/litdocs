import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CreateCodeBlock } from 'src/components/code/CodeBlock'
import { postStyles } from 'src/pages/styles/postStyles'
import type { Post } from 'src/types/postTypes'

export const post: Post = {
  rootPagePath: 'go',
  title: 'Testing in Go: Introduction',
  shortTitle: 'Testing',
  description: 'An introduction to creating and running tests in Go.',
  tags: 'go testing unit-tests',
  date: 'June 30, 2023',
  postId: 'go-testing',
  pathForDynamicLoad: 'Testing',
  component: '<go-testing></go-testing>',
  renderFunc: () => html`<go-testing></go-testing>`
}

@customElement('go-testing')
export class GoTesting extends LitElement {
  @property()
    someProp = 'Random Value'

  static styles = postStyles

  protected render (): TemplateResult {
    return html`
      <div class="title">Testing in Go: A Beginner's Guide</div>
      <div class="description">An introduction to creating and running tests in Go.</div>
      <p>
        Testing is a crucial aspect of software development, ensuring that your code works as expected. In Go, testing is built into the language, making it straightforward and idiomatic. Let's dive into how to create and run tests in Go.
      </p>

      ${CreateCodeBlock(
        `// A simple Go function
func Sum(a int, b int) int {
    return a + b
}`,
        'go'
      )}

      <p>
        Let's say we have the simple function <code>Sum</code> above. To test this function, we would create a new file named <code>Sum_test.go</code>.
      </p>

      ${CreateCodeBlock(
        `// Sum_test.go
package main

import "testing"

func TestSum(t *testing.T) {
    got := Sum(5, 6)
    want := 11

    if got != want {
        t.Errorf("got %d; want %d", got, want)
    }
}`,
        'go'
      )}

      <p>
        The test function starts with the word <code>Test</code> followed by the name of the function being tested. It takes a pointer to the testing framework (type <code>*testing.T</code>) as its only parameter.
      </p>

      <h3>Directory Structure</h3>
      <p>
        In Go, tests reside in the same package as the code you're testing. Typically, you'll see a structure like this:
      </p>

      ${CreateCodeBlock(
        `.
├── main.go
└── main_test.go`,
        'bash'
      )}

      <p>
        Both the source code and the test code are in the same directory, and the test files are named after the source files with a "_test.go" suffix.
      </p>

      <h3>Running the Tests</h3>
      <p>
        To run tests in Go, you can use the built-in <code>go test</code> command. Navigate to the directory containing your tests and run:
      </p>

      ${CreateCodeBlock(
        '$ go test',
        'bash'
      )}

      <p>
        This command will find any files matching the pattern *_test.go, execute them, and report the results. If all tests pass, it will only show the total time taken. If any test fails, it will report the failure, helping you pinpoint issues.
      </p>

      <h3>Conclusion</h3>
      <p>
        Testing in Go is designed to be simple and efficient. By following Go's conventions, you can ensure your applications are robust and maintainable. As you continue to explore Go, you'll discover more advanced testing features like benchmarks, test suites, and more. Happy testing!
      </p>
    `
  }
}

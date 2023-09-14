import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CreateCodeBlock } from 'src/components/code/CodeBlock'
import { postStyles } from 'src/pages/styles/postStyles'
import type { Post } from 'src/types/postTypes'

export const post: Post = {
  rootPagePath: 'interviewing',
  shortTitle: 'Problem Solving',
  title: 'Approaching Problem Solving During an Interview',
  description:
    'A comprehensive guide on using abstract classes, interfaces, and other OOP principles in Java.',
  tags: 'interviews datastructures algorithms java oop abstract classes interfaces enums',
  date: 'September 10, 2023',
  postId: 'interview-problemsolving',
  component: '<interview-problemsolving></interview-problemsolving>',
  pathForDynamicLoad: 'src/posts/General/InterviewProblemSolving',

  renderFunc: () => html`<interview-problemsolving></interview-problemsolving>`
}

@customElement('interview-problemsolving')
export class InterviewProblemSolving extends LitElement {
  @property()
    someProp = 'Random Value'

  static styles = postStyles

  protected render (): TemplateResult {
    return html`
      <div class="title">${post.title}</div>
      <div class="description">${post.description}</div>
      <p>
        In this post, we will explore the differences between abstract classes
        and interfaces in Java, understand when to use them, and see practical
        examples that demonstrate their utility.
      </p>

      <h2>Abstract Classes</h2>
      <ul>
        <li>Abstract Classes vs Interfaces</li>
        <li>
          Abstract Classes can define an extensible Blueprint - vs Interfaces
          define a "contract".
        </li>
        <li>
          Abstract Classes can actually have default implementations for
          Methods.
        </li>
        <li>A Class can only Extend a Single Abstract Class</li>
      </ul>

      ${CreateCodeBlock(
        `
public interface Engine {
    int getSpeed();
    void refuel(int amount);
}

public abstract class Vehicle implements Engine {
    protected int speed;
    protected int fuel;
    public int getSpeed() {
        return speed;
    }
    public void refuel(int amount) {
        this.fuel += amount;
    }
    public abstract void start();
    public abstract void stop();
}

public class Car extends Vehicle {
    @Override
    public void start() {
        System.out.println("Turning the ignition key");
    }
    @Override
    public void stop() {
        System.out.println("Pressing the brake pedal");
    }
}

public class Boat extends Vehicle {
    @Override
    public void start() {
        System.out.println("Turning the boat's starter switch");
    }
    @Override
    public void stop() {
        System.out.println("Cutting off the boat's fuel supply");
    }
}`,
        'java'
      )}

      <h2>Enums</h2>
      <p>
        Enums can be useful when solving problems in a more object-oriented
        manner. For instance, consider the problem of finding integers in an
        array based on certain conditions.
      </p>

      ${CreateCodeBlock(
        `
public class ElementFinder<T> {
    private Comparator<T> comparator;
    private OperationType operationType;

    ElementFinder(Comparator<T> comparator, OperationType operationType) {
        this.comparator = comparator;
        this.operationType = operationType;
    }
    public T[] findElems(T[] input) {
        // implementation...
    }
}

public enum OperationType {
    GREATER_THAN, LESSER_THAN, EQUALS
}

public abstract class Comparator {
    protected OperationType type;
    public Comparator(OperationType type) {
        this.type = type;
    }
    public abstract boolean compare(int a, int b);
}

public class IntComparator extends Comparator {
    public IntComparator(OperationType type) {
        super(type);
    }
    @Override
    public boolean compare(int a, int b) {
        // switch-case implementation...
    }
}

public class Solution {
    public String[] leetcodemaxx(String[] input) {
        // implementation...
    }
}`,
        'java'
      )}

      <h2>Benefits</h2>
      <ul>
        <li>
          Separation of Concerns: The logic for each operation is encapsulated
          within the compare method of the IntComparator class.
        </li>
        <li>
          Scalability: Easily add new operations by updating the OperationType
          enum and the switch case in the compare method.
        </li>
        <li>
          Flexibility: Use an abstract class for different ways to compare.
        </li>
      </ul>
    `
  }
}

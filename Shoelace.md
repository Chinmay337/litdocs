# Shoelace

- Target through part

```css
// If the docs say overlay is a part - we can target like this

  static styles = css`
    :host {
      font-family: Raleway;
    }
    .sl-drawer::part(overlay) {
      background-color: transparent; /* Set the overlay background color explicitly */
    }
  `;


```

```java

public interface Container {
    boolean insertChunk(int size, int pos);
    boolean removeChunk(int size, int pos);
}


enum ErrorCode {
  INSERT_CAPACITY_EXCEEDED,
  INSERT_CAPACITY_NOT_FREE,
  INSERT_INVALID_INPUT,
  REMOVAL_INVALID_INPUT,
  REMOVAL_SUCCESS,
  REMOVAL_FAILURE,
}

// Space     - O(N) where N is the capacity
// Insertion - O(N) where N is the size of the chunk region
// Removal   - O(N) where N is the size of the chunk region


public class CircularContainer implements Container {

    private int capacity;
    private boolean[] chunks;

    public CircularContainer(int capacity) {
        this.capacity = capacity;
        this.chunks = new boolean[capacity];
    }

    public boolean insertChunk(int size, int pos) {
        if (size > capacity) {
            System.out.println("Size is greater than capacity");
            return false;
        }

        ArrayList<Integer> freeChunks = scanForFreeChunks(size, pos);

        if (freeChunks.size() == size) {
            commitChunks(freeChunks);
            System.out.println("Chunks committed");
            return true;
        }

        System.out.println("Not enough free space to insert. Chunks already occupied.");
        return false;
    }


    public boolean removeChunk(int size, int pos) {
        if (size > capacity) {
            System.out.println("Only valid size chunks can be removed.");
            return false;
        }

        for (int i = 0; i < size; i++) {
            int index = (pos + i) % capacity;
            chunks[index] = false;
        }

        System.out.println("Removed chunks successfully");
        return true;
    }

    private ArrayList<Integer> scanForFreeChunks(int size, int pos) {
        ArrayList<Integer> freeChunks = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            int index = (pos + i) % capacity;
            if (!chunks[index]) {
                freeChunks.add(index);
            } else {
                System.out.printf("Chunk already exists at position %s",index);
                break;
            }
        }

        return freeChunks;
    }

    private void commitChunks(ArrayList<Integer> freeChunks) {
        for (int index : freeChunks) {
            chunks[index] = true;
        }
    }
}



/*
Optimize for Storage Efficiency? (Memory)

Optimize for Retrieval Speed? (time)


Operations :

1. insert(size , pos) -> returns true/false

insert(7,0) -> inserts 0-6
insert(9,8) -> inserts 8-16 returns false

2. remove -> returns true/false

getCapacity()

*/

size = 15
valid ind 0-14

place chunk size 7 at 0 , returns true
place chunk size 9 at 8 , returns false


0-6

8-16


```

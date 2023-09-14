export const cppCode = `
#include <iostream>
#include <memory>
#include <vector>

class MyClass {
public:
    MyClass(int value) : value(value) {}

    void display() const {
        std::cout << "Value: " << value << std::endl;
    }

private:
    int value;
};

int main() {
    std::shared_ptr<MyClass> obj1 = std::make_shared<MyClass>(10);
    std::shared_ptr<MyClass> obj2 = obj1; // Shared ownership

    obj1->display();
    obj2->display();

    // Ownership count
    std::cout << "Ownership count: " << obj1.use_count() << std::endl;

    return 0;
}
`;

// Usage
// ${CreateCodeBlock(cppCode, 'cpp')}

class Node:
    """Node class for Binary Search Tree"""
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    """Binary Search Tree implementation with various operations"""
    def __init__(self):
        self.root = None
    
    def insert_iterative(self, value):
        """Insert a value into BST using iterative approach
        Time Complexity: O(h) where h is height of tree
        Space Complexity: O(1)
        """
        new_node = Node(value)
        
        if not self.root:
            self.root = new_node
            return
        
        current = self.root
        while True:
            if value < current.value:
                if current.left is None:
                    current.left = new_node
                    break
                current = current.left
            else:
                if current.right is None:
                    current.right = new_node
                    break
                current = current.right
    
    def insert_recursive(self, value):
        """Insert a value into BST using recursive approach
        Time Complexity: O(h) where h is height of tree
        Space Complexity: O(h) due to recursive call stack
        """
        self.root = self._insert_recursive(self.root, value)
    
    def _insert_recursive(self, node, value):
        if not node:
            return Node(value)
        
        if value < node.value:
            node.left = self._insert_recursive(node.left, value)
        else:
            node.right = self._insert_recursive(node.right, value)
        
        return node
    
    def search_iterative(self, value):
        """Search for a value in BST using iterative approach
        Time Complexity: O(h) where h is height of tree
        Space Complexity: O(1)
        """
        current = self.root
        while current:
            if value == current.value:
                return True
            elif value < current.value:
                current = current.left
            else:
                current = current.right
        return False
    
    def search_recursive(self, value):
        """Search for a value in BST using recursive approach
        Time Complexity: O(h) where h is height of tree
        Space Complexity: O(h) due to recursive call stack
        """
        return self._search_recursive(self.root, value)
    
    def _search_recursive(self, node, value):
        if not node:
            return False
        
        if value == node.value:
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)
    
    def delete(self, value):
        """Delete a value from BST
        Time Complexity: O(h) where h is height of tree
        Space Complexity: O(h) due to recursive call stack
        """
        self.root = self._delete_recursive(self.root, value)
    
    def _delete_recursive(self, node, value):
        if not node:
            return None
        
        if value < node.value:
            node.left = self._delete_recursive(node.left, value)
        elif value > node.value:
            node.right = self._delete_recursive(node.right, value)
        else:
            # Case 1: Leaf node
            if not node.left and not node.right:
                return None
            # Case 2: Node with one child
            elif not node.left:
                return node.right
            elif not node.right:
                return node.left
            # Case 3: Node with two children
            else:
                min_node = self._find_min(node.right)
                node.value = min_node.value
                node.right = self._delete_recursive(node.right, min_node.value)
        
        return node
    
    def _find_min(self, node):
        """Helper function to find minimum value node"""
        current = node
        while current.left:
            current = current.left
        return current
    
    # Tree Traversal Methods
    def inorder(self):
        """Inorder traversal: Left -> Root -> Right"""
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.value)
            self._inorder_recursive(node.right, result)
    
    def preorder(self):
        """Preorder traversal: Root -> Left -> Right"""
        result = []
        self._preorder_recursive(self.root, result)
        return result
    
    def _preorder_recursive(self, node, result):
        if node:
            result.append(node.value)
            self._preorder_recursive(node.left, result)
            self._preorder_recursive(node.right, result)
    
    def postorder(self):
        """Postorder traversal: Left -> Right -> Root"""
        result = []
        self._postorder_recursive(self.root, result)
        return result
    
    def _postorder_recursive(self, node, result):
        if node:
            self._postorder_recursive(node.left, result)
            self._postorder_recursive(node.right, result)
            result.append(node.value)

def run_test_case(bst, operations, test_name):
    """Helper function to run test cases"""
    print(f"\n{test_name}")
    print("=" * len(test_name))
    
    for op, value in operations:
        if op == "insert":
            method = input("\nChoose insertion method (1: Iterative, 2: Recursive): ").strip()
            if method == "2":
                bst.insert_recursive(value)
                print(f"Recursively inserted: {value}")
            else:
                bst.insert_iterative(value)
                print(f"Iteratively inserted: {value}")
        
        elif op == "search":
            method = input("\nChoose search method (1: Iterative, 2: Recursive): ").strip()
            if method == "2":
                found = bst.search_recursive(value)
                print(f"Recursive search for {value}: {'Found' if found else 'Not found'}")
            else:
                found = bst.search_iterative(value)
                print(f"Iterative search for {value}: {'Found' if found else 'Not found'}")
        
        elif op == "delete":
            bst.delete(value)
            print(f"Deleted: {value}")
    
    print("\nTree Traversals:")
    print(f"Inorder:   {bst.inorder()}")
    print(f"Preorder:  {bst.preorder()}")
    print(f"Postorder: {bst.postorder()}")

def main():
    """Main function to demonstrate BST operations"""
    print("\nBinary Search Tree Implementation Demo")
    print("====================================")
    
    while True:
        print("\nChoose a test case:")
        print("1. Basic BST Operations")
        print("2. Deletion Test Cases")
        print("3. Empty Tree Operations")
        print("4. Single Node Operations")
        print("5. Exit")
        
        choice = input("\nEnter your choice (1-5): ").strip()
        
        if choice == "5":
            print("\nThank you for using BST Demo!")
            break
        
        bst = BinarySearchTree()
        
        if choice == "1":
            operations = [
                ("insert", 50), ("insert", 30), ("insert", 70),
                ("insert", 20), ("insert", 40), ("insert", 60), ("insert", 80),
                ("search", 40), ("search", 90),
                ("delete", 30), ("search", 30)
            ]
            run_test_case(bst, operations, "Basic BST Operations Test")
            
        elif choice == "2":
            operations = [
                ("insert", 50), ("insert", 30), ("insert", 70),
                ("delete", 50),  # Delete root
                ("delete", 30),  # Delete leaf
                ("search", 70)   # Verify remaining node
            ]
            run_test_case(bst, operations, "Deletion Test Cases")
            
        elif choice == "3":
            operations = [
                ("search", 10),  # Search in empty tree
                ("delete", 10),  # Delete from empty tree
                ("insert", 10),  # Insert into empty tree
                ("search", 10)   # Verify insertion
            ]
            run_test_case(bst, operations, "Empty Tree Operations")
            
        elif choice == "4":
            operations = [
                ("insert", 10),  # Create single node
                ("search", 10),  # Search existing value
                ("search", 20),  # Search non-existing value
                ("delete", 10),  # Delete the only node
                ("search", 10)   # Verify deletion
            ]
            run_test_case(bst, operations, "Single Node Operations")
        
        else:
            print("\nInvalid choice! Please enter a number between 1 and 5.")

if __name__ == "__main__":
    main()
"""
    Perform binary search iteratively to find the target element in a sorted array.
    
    Args:
        arr (list): The sorted input array to search through
        target (int): The element to search for
    
    Returns:
        int: Index of the target element if found, -1 otherwise
        
    Time Complexity: O(log n) where n is the length of the array
    Space Complexity: O(1) as we only use a constant amount of extra space
"""
def binary_search_iterative(arr: list, target: int) -> int:
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # If target is found at mid, return the index
        if arr[mid] == target:
            return mid
        # If target is greater, ignore left half
        elif arr[mid] < target:
            left = mid + 1
        # If target is smaller, ignore right half
        else:
            right = mid - 1
    
    # Target not found
    return -1



"""
    Perform binary search recursively to find the target element in a sorted array.
    
    Args:
        arr (list): The sorted input array to search through
        target (int): The element to search for
        left (int): Left boundary of current search space (optional)
        right (int): Right boundary of current search space (optional)
    
    Returns:
        int: Index of the target element if found, -1 otherwise
        
    Time Complexity: O(log n) where n is the length of the array
    Space Complexity: O(log n) due to recursive call stack
"""
def binary_search_recursive(arr: list, target: int, left: int = None, right: int = None) -> int:
    # Initialize left and right for first call
    if left is None:
        left = 0
    if right is None:
        right = len(arr) - 1
        
    # Base case: if search space is exhausted
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    # If target is found at mid
    if arr[mid] == target:
        return mid
    # If target is greater, search right half
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    # If target is smaller, search left half
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

def run_test_case(search_func, arr: list, target: int, test_name: str):
    """Helper function to run and display test case results."""
    result = search_func(arr, target)
    print(f"\n{test_name}:")
    print(f"Array: {arr}")
    print(f"Target: {target}")
    print(f"Result: {'Found at index ' + str(result) if result != -1 else 'Not found'}")

def main():
    """Main function to demonstrate both binary search implementations."""
    print("\nBinary Search Implementation Demo")
    print("=================================")
    
    while True:
        print("\nChoose a binary search variation:")
        print("1. Iterative Binary Search")
        print("2. Recursive Binary Search")
        print("3. Run All Test Cases")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ").strip()
        
        if choice == '4':
            print("\nThank you for using Binary Search Demo!")
            break
            
        # Test cases
        test_cases = [
            # Regular case with element present
            ([1, 2, 3, 4, 5, 6, 7, 8, 9], 6, "Test 1: Element exists in middle"),
            # Element at beginning
            ([1, 2, 3, 4, 5], 1, "Test 2: Element at start"),
            # Element at end
            ([1, 2, 3, 4, 5], 5, "Test 3: Element at end"),
            # Element not present
            ([1, 2, 3, 4, 5], 6, "Test 4: Element not in array"),
            # Empty array
            ([], 1, "Test 5: Empty array"),
            # Array with single element - target present
            ([1], 1, "Test 6: Single element array - target exists"),
            # Array with single element - target not present
            ([1], 2, "Test 7: Single element array - target doesn't exist"),
        ]
        
        if choice in ['1', '2', '3']:
            for arr, target, test_name in test_cases:
                if choice == '1':
                    run_test_case(binary_search_iterative, arr, target, 
                                f"Iterative Binary Search: {test_name}")
                    break
                elif choice == '2':
                    run_test_case(binary_search_recursive, arr, target, 
                                f"Recursive Binary Search: {test_name}")
                    break
                else:  # choice == '3'
                    run_test_case(binary_search_iterative, arr, target,
                                f"Iterative Binary Search: {test_name}")
                    run_test_case(binary_search_recursive, arr, target,
                                f"Recursive Binary Search: {test_name}")
        else:
            print("\nInvalid choice! Please enter a number between 1 and 4.")

if __name__ == "__main__":
    main()
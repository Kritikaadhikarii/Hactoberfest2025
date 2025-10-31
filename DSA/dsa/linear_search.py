"""
    Perform linear search to find the target element in the array.
    
    Args:
        arr (list): The input array to search through
        target (int): The element to search for
    
    Returns:
        int: Index of the target element if found, -1 otherwise
        
    Time Complexity: O(n) where n is the length of the array
    Space Complexity: O(1) as we only use a constant amount of extra space
"""
def linear_search(arr: list, target: int) -> int:
    # Iterate through each element in the array
    for i in range(len(arr)):
        # If current element matches target, return its index
        if arr[i] == target:
            return i
    
    # If target is not found, return -1
    return -1


# Example usage and test cases
if __name__ == "__main__":
    # Test case 1: Element exists in array
    test_arr1 = [1, 4, 2, 8, 5, 3]
    target1 = 8
    result1 = linear_search(test_arr1, target1)
    print(f"\nTest Case 1:")
    print(f"Array: {test_arr1}")
    print(f"Target: {target1}")
    print(f"Result: Found at index {result1}")
    
    # Test case 2: Element doesn't exist
    test_arr2 = [1, 4, 2, 8, 5, 3]
    target2 = 6
    result2 = linear_search(test_arr2, target2)
    print(f"\nTest Case 2:")
    print(f"Array: {test_arr2}")
    print(f"Target: {target2}")
    print(f"Result: {'Not found' if result2 == -1 else f'Found at index {result2}'}")
    
    # Test case 3: Empty array
    test_arr3 = []
    target3 = 5
    result3 = linear_search(test_arr3, target3)
    print(f"\nTest Case 3:")
    print(f"Array: {test_arr3}")
    print(f"Target: {target3}")
    print(f"Result: {'Not found' if result3 == -1 else f'Found at index {result3}'}")
from collections import defaultdict, deque
from typing import Dict, List, Set

class Graph:
    """Graph implementation using adjacency list"""
    def __init__(self):
        """Initialize empty graph using defaultdict for adjacency list"""
        self.graph = defaultdict(list)
    
    def add_edge(self, vertex: int, neighbor: int, directed: bool = False):
        """
        Add edge to graph
        
        Args:
            vertex: Source vertex
            neighbor: Destination vertex
            directed: If True, adds one-way edge; if False, adds bidirectional edge
        """
        self.graph[vertex].append(neighbor)
        if not directed:
            self.graph[neighbor].append(vertex)
    
    def dfs_recursive(self, start: int) -> List[int]:
        """
        Depth First Search - Recursive implementation
        
        Args:
            start: Starting vertex
            
        Returns:
            List of vertices in DFS order
            
        Time Complexity: O(V + E) where V is vertices and E is edges
        Space Complexity: O(V) for visited set and recursion stack
        """
        visited = set()
        traversal = []
        
        def dfs_util(vertex: int):
            visited.add(vertex)
            traversal.append(vertex)
            
            for neighbor in self.graph[vertex]:
                if neighbor not in visited:
                    dfs_util(neighbor)
        
        dfs_util(start)
        return traversal
    
    def dfs_iterative(self, start: int) -> List[int]:
        """
        Depth First Search - Iterative implementation using stack
        
        Args:
            start: Starting vertex
            
        Returns:
            List of vertices in DFS order
            
        Time Complexity: O(V + E)
        Space Complexity: O(V)
        """
        visited = set()
        traversal = []
        stack = [start]
        
        while stack:
            vertex = stack.pop()
            if vertex not in visited:
                visited.add(vertex)
                traversal.append(vertex)
                # Add neighbors in reverse order to match recursive DFS
                for neighbor in reversed(self.graph[vertex]):
                    if neighbor not in visited:
                        stack.append(neighbor)
        
        return traversal
    
    def bfs(self, start: int) -> List[int]:
        """
        Breadth First Search implementation using queue
        
        Args:
            start: Starting vertex
            
        Returns:
            List of vertices in BFS order
            
        Time Complexity: O(V + E)
        Space Complexity: O(V)
        """
        visited = set()
        traversal = []
        queue = deque([start])
        visited.add(start)
        
        while queue:
            vertex = queue.popleft()
            traversal.append(vertex)
            
            for neighbor in self.graph[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return traversal

def run_test_case(test_name: str, graph: Graph, start_vertex: int):
    """Helper function to run test cases with both DFS and BFS"""
    print(f"\n{test_name}")
    print("=" * len(test_name))
    
    while True:
        print("\nChoose search algorithm:")
        print("1. DFS (Recursive)")
        print("2. DFS (Iterative)")
        print("3. BFS")
        print("4. Run All")
        print("5. Back to Main Menu")
        
        choice = input("\nEnter your choice (1-5): ").strip()
        
        if choice == "5":
            break
            
        if choice in ["1", "4"]:
            result = graph.dfs_recursive(start_vertex)
            print(f"\nDFS (Recursive) traversal from vertex {start_vertex}:")
            print(" -> ".join(map(str, result)))
            
        if choice in ["2", "4"]:
            result = graph.dfs_iterative(start_vertex)
            print(f"\nDFS (Iterative) traversal from vertex {start_vertex}:")
            print(" -> ".join(map(str, result)))
            
        if choice in ["3", "4"]:
            result = graph.bfs(start_vertex)
            print(f"\nBFS traversal from vertex {start_vertex}:")
            print(" -> ".join(map(str, result)))
            
        if choice not in ["1", "2", "3", "4", "5"]:
            print("\nInvalid choice! Please enter a number between 1 and 5.")

def main():
    """Main function to demonstrate graph traversals"""
    print("\nGraph Traversal Algorithms Demo")
    print("==============================")
    
    while True:
        print("\nChoose a test case:")
        print("1. Simple Connected Graph")
        print("2. Disconnected Graph")
        print("3. Cyclic Graph")
        print("4. Linear Graph (Path)")
        print("5. Star Graph")
        print("6. Exit")
        
        choice = input("\nEnter your choice (1-6): ").strip()
        
        if choice == "6":
            print("\nThank you for using Graph Traversal Demo!")
            break
        
        graph = Graph()
        
        if choice == "1":
            # Simple connected graph
            edges = [(0, 1), (0, 2), (1, 2), (2, 3)]
            for v1, v2 in edges:
                graph.add_edge(v1, v2)
            run_test_case("Simple Connected Graph Test", graph, 0)
            
        elif choice == "2":
            # Disconnected graph
            edges = [(0, 1), (2, 3), (4, 5)]
            for v1, v2 in edges:
                graph.add_edge(v1, v2)
            run_test_case("Disconnected Graph Test", graph, 0)
            
        elif choice == "3":
            # Cyclic graph
            edges = [(0, 1), (1, 2), (2, 3), (3, 0)]
            for v1, v2 in edges:
                graph.add_edge(v1, v2)
            run_test_case("Cyclic Graph Test", graph, 0)
            
        elif choice == "4":
            # Linear graph (path)
            edges = [(0, 1), (1, 2), (2, 3), (3, 4)]
            for v1, v2 in edges:
                graph.add_edge(v1, v2)
            run_test_case("Linear Graph Test", graph, 0)
            
        elif choice == "5":
            # Star graph
            edges = [(0, 1), (0, 2), (0, 3), (0, 4)]
            for v1, v2 in edges:
                graph.add_edge(v1, v2)
            run_test_case("Star Graph Test", graph, 0)
            
        else:
            print("\nInvalid choice! Please enter a number between 1 and 6.")

if __name__ == "__main__":
    main()
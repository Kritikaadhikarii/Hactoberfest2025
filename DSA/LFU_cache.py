"""
🧠 DSA Problem: LFU (Least Frequently Used) Cache Implementation
-------------------------------------------------------------

🔹 Difficulty Level: Hard
🔹 Topic: Data Structures, HashMap, Doubly Linked List
🔹 Language: Python 3

📜 Problem Description:
Design and implement a data structure for an LFU (Least Frequently Used) Cache.

- The LFU Cache should support two operations:
    1️⃣ get(key): Return the value of the key if it exists in the cache; otherwise, return -1.
    2️⃣ put(key, value): Insert or update the key with the given value.

When the cache reaches its capacity, it should remove the **least frequently used** key.
If multiple keys have the same frequency, remove the **least recently used** among them.

⚙️ Constraints:
- All operations (get and put) must be performed in O(1) time complexity.
- You may assume all keys and values are positive integers.

🔢 Example:
-------------------------------------------------------------
Input:
    cache = LFUCache(2)
    cache.put(1, 10)
    cache.put(2, 20)
    print(cache.get(1))   # returns 10
    cache.put(3, 30)      # evicts key 2 (least frequently used)
    print(cache.get(2))   # returns -1 (not found)
    print(cache.get(3))   # returns 30

Output:
    10
    -1
    30

🧩 Key Concepts Used:
-------------------------------------------------------------
1. Hash Map to store key -> (value, frequency)
2. Hash Map of frequency -> OrderedDict (to maintain LRU order within frequency)
3. Keep track of the minimum frequency to know which node to evict

🧠 Algorithm Overview:
-------------------------------------------------------------
1. When 'get' is called:
   - If the key exists:
     - Increase its frequency count.
     - Move it to the next frequency bucket.
     - Return its value.

2. When 'put' is called:
   - If key exists: update value & increase frequency.
   - Else:
     - If cache is full, remove the least frequently used (and least recently used if tie).
     - Insert the new key with frequency 1.

3. Maintain:
   - key_to_val_freq: {key: (value, freq)}
   - freq_to_keys: {freq: OrderedDict of keys}
   - min_freq: integer storing the lowest frequency currently in cache.

👩‍💻 Author: Ishwari Shinde
🚀 Suitable For: Advanced DSA / System Design Projects
-------------------------------------------------------------
"""

from collections import defaultdict, OrderedDict


class LFUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.key_to_val_freq = {}
        self.freq_to_keys = defaultdict(OrderedDict)

    def _update_freq(self, key: int):
        """Helper function to update frequency of a key."""
        value, freq = self.key_to_val_freq[key]
        # Remove from current frequency list
        del self.freq_to_keys[freq][key]
        # If current freq list becomes empty and it was the min_freq, increase it
        if not self.freq_to_keys[freq] and self.min_freq == freq:
            self.min_freq += 1
        # Add to next frequency list
        self.freq_to_keys[freq + 1][key] = None
        self.key_to_val_freq[key] = (value, freq + 1)

    def get(self, key: int) -> int:
        """Return value if key exists, else -1."""
        if key not in self.key_to_val_freq:
            return -1
        self._update_freq(key)
        return self.key_to_val_freq[key][0]

    def put(self, key: int, value: int) -> None:
        """Insert or update key-value pair with LFU policy."""
        if self.capacity == 0:
            return

        if key in self.key_to_val_freq:
            self.key_to_val_freq[key] = (value, self.key_to_val_freq[key][1])
            self._update_freq(key)
            return

        if len(self.key_to_val_freq) >= self.capacity:
            # Remove least frequently and least recently used key
            least_freq_keys = self.freq_to_keys[self.min_freq]
            evict_key, _ = least_freq_keys.popitem(last=False)
            del self.key_to_val_freq[evict_key]

        # Insert new key with frequency 1
        self.key_to_val_freq[key] = (value, 1)
        self.freq_to_keys[1][key] = None
        self.min_freq = 1


# 🧪 Example Test Run
if __name__ == "__main__":
    cache = LFUCache(2)
    cache.put(1, 10)
    cache.put(2, 20)
    print(cache.get(1))   # 10
    cache.put(3, 30)      # evicts key 2
    print(cache.get(2))   # -1
    print(cache.get(3))   # 30

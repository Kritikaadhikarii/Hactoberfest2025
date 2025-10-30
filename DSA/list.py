# Creating and using a list
my_list = [1, 2, 3, 4, 5]

# Add elements
my_list.append(6)
my_list.insert(0, 0)

# Remove elements
my_list.remove(3)
popped_item = my_list.pop()

# Access elements
print(my_list[0])  # Output: 0
print(my_list[-1]) # Output: 5

# Loop through list
for item in my_list:
    print(item)

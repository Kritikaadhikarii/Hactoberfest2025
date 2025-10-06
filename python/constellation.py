import random
import os
import time

def generate_constellation(width=50, height=20, stars=30):
    grid = [[" " for _ in range(width)] for _ in range(height)]
    
    positions = []
    for _ in range(stars):
        x = random.randint(0, width-1)
        y = random.randint(0, height-1)
        grid[y][x] = "*"
        positions.append((x,y))
    
    # randomly connect stars with lines
    for i in range(len(positions)-1):
        if random.random() > 0.6:  # ~40% stars get connected
            x1,y1 = positions[i]
            x2,y2 = positions[i+1]
            dx = 1 if x2 > x1 else -1
            dy = 1 if y2 > y1 else -1
            # draw a rough line
            for x in range(x1, x2, dx):
                grid[y1][x] = "-"
            for y in range(y1, y2, dy):
                grid[y][x2] = "|"
    
    return "\n".join("".join(row) for row in grid)

# animation
for _ in range(3):
    os.system("cls" if os.name == "nt" else "clear")
    print("✨ Random Constellation ✨\n")
    print(generate_constellation())
    time.sleep(2)

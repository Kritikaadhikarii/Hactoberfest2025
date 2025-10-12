class Solution:
    def solveSudoku(self, board: list[list[str]]) -> None:
        n, N = 3, 9
        rows = [[0] * (N + 1) for _ in range(N)]
        cols = [[0] * (N + 1) for _ in range(N)]
        boxes = [[0] * (N + 1) for _ in range(N)]
        sudokuSolved = False

        def couldPlace(d, row, col):
            idx = (row // n) * n + col // n
            return rows[row][d] + cols[col][d] + boxes[idx][d] == 0

        def placeNumber(d, row, col):
            idx = (row // n) * n + col // n
            rows[row][d] += 1
            cols[col][d] += 1
            boxes[idx][d] += 1
            board[row][col] = str(d)

        def removeNumber(d, row, col):
            idx = (row // n) * n + col // n
            rows[row][d] -= 1
            cols[col][d] -= 1
            boxes[idx][d] -= 1
            board[row][col] = '.'

        def placeNextNumbers(row, col):
            nonlocal sudokuSolved
            if row == N - 1 and col == N - 1:
                sudokuSolved = True
            elif col == N - 1:
                backtrack(row + 1, 0)
            else:
                backtrack(row, col + 1)

        def backtrack(row, col):
            nonlocal sudokuSolved
            if board[row][col] == '.':
                for d in range(1, 10):
                    if couldPlace(d, row, col):
                        placeNumber(d, row, col)
                        placeNextNumbers(row, col)
                        if not sudokuSolved:
                            removeNumber(d, row, col)
            else:
                placeNextNumbers(row, col)

        for i in range(N):
            for j in range(N):
                if board[i][j] != '.':
                    placeNumber(int(board[i][j]), i, j)
        backtrack(0, 0)

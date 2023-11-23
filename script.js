//your code here

document.addEventListener('DOMContentLoaded', function () {
      // Get references to the game container and score element
      const gameContainer = document.getElementById('gameContainer');
      const scoreElement = document.getElementById('score');

      // Define constants for the game grid size and pixel size
      const gridSize = 40;
      const pixelSize = 10;

      // Initialize variables for the snake, direction, food, and score
      let snake = [{ row: 19, col: 0 }];
      let direction = 'right';
      let food = generateFood();
      let score = 0;

      // Function to create a pixel element with specified row, col, and class
      function createPixel(row, col, className) {
        const pixel = document.createElement('div');
        pixel.className = `pixel ${className}`;
        pixel.id = `pixel${row * gridSize + col}`;
        pixel.style.gridColumn = col + 1;
        pixel.style.gridRow = row + 1;
        gameContainer.appendChild(pixel);
      }

      // Function to draw the game grid, snake, and food
      function draw() {
        gameContainer.innerHTML = '';
        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            const isSnakeBodyPixel = snake.some(s => s.row === row && s.col === col);
            const isFoodPixel = food.row === row && food.col === col;

            if (isSnakeBodyPixel) {
              createPixel(row, col, 'snakeBodyPixel');
            } else if (isFoodPixel) {
              createPixel(row, col, 'food');
            } else {
              createPixel(row, col, '');
            }
          }
        }
      }

      // Function to generate a random position for the food
      function generateFood() {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        return { row, col };
      }

      // Function to update the score element
      function updateScore() {
        score += 10;
        scoreElement.textContent = score;
      }

      // Function to handle the snake movement and game logic
      function move() {
        const head = { ...snake[0] };

        switch (direction) {
          case 'up':
            head.row -= 1;
            break;
          case 'down':
            head.row += 1;
            break;
          case 'left':
            head.col -= 1;
            break;
          case 'right':
            head.col += 1;
            break;
        }

        snake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
          updateScore();
          food = generateFood();
        } else {
          snake.pop();
        }

        // Check for collision with walls or itself
        if (
          head.row < 0 || head.row >= gridSize ||
          head.col < 0 || head.col >= gridSize ||
          snake.some((segment, index) => index !== 0 && segment.row === head.row && segment.col === head.col)
        ) {
          alert('Game Over! Your score: ' + score);
          resetGame();
        }

        draw();
      }

      // Function to reset the game state
      function resetGame() {
        snake = [{ row: 19, col: 0 }];
        direction = 'right';
        food = generateFood();
        score = 0;
        scoreElement.textContent = score;
      }

      // Event listener for keyboard input to change snake direction
      document.addEventListener('keydown', function (event) {
        switch (event.key) {
          case 'ArrowUp':
            if (direction !== 'down') {
              direction = 'up';
            }
            break;
          case 'ArrowDown':
            if (direction !== 'up') {
              direction = 'down';
            }
            break;
          case 'ArrowLeft':
            if (direction !== 'right') {
              direction = 'left';
            }
            break;
          case 'ArrowRight':
            if (direction !== 'left') {
              direction = 'right';
            }
            break;
        }
      });

      // Set an interval to move the snake every 100 milliseconds
      setInterval(move, 100);
      // Initial draw of the game
      draw();
    });

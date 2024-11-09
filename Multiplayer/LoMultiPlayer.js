const statusDisplay = document.getElementById("jön");

statusDisplay.style.color = "blue";

const cells = document.querySelectorAll(".click");
let currentPlayer = "O"; 
let isActive = true;

const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 5, 9], [3, 5, 7],
    [1, 4, 7], [2, 5, 8], [3, 6, 9]
];

// A cellák 
cells.forEach(cell => {
  cell.addEventListener("click", function () {
    if (cell.textContent === "" && isActive) { 
      cell.textContent = currentPlayer;
      cell.style.color = currentPlayer === "X" ? "red" : "blue";

      statusDisplay.style.color = "rgb(14, 13, 13)";  
      let dots = 0;

      const dotInterval = setInterval(() => {
        statusDisplay.style.color = "rgb(245, 245, 245)";  
        dots = (dots + 1) % 4; 
        statusDisplay.textContent = ".".repeat(dots); 
      }, 334);

      isActive = false; 

      setTimeout(() => {
        clearInterval(dotInterval);
        statusDisplay.textContent = "..."; 

        setTimeout(() => {
          if (checkWinner()) {
              statusDisplay.textContent = currentPlayer === "X" ? "A Piros játékos nyert!" : "A Kék játékos nyert!";
              statusDisplay.style.color = currentPlayer === "X" ? "red" : "blue";
              alert(currentPlayer === "X" ? "A Piros játékos nyert!" : "A Kék játékos nyert!");
              isActive = false;
            return;
          }

          currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.textContent = currentPlayer === "X" ? "A piros játékos jön!" : "A kék játékos jön!";
            statusDisplay.style.color = currentPlayer === "X" ? "red" : "blue";
          if (isGameOver()) {
            statusDisplay.textContent = "Döntetlen!";
            statusDisplay.style.color = "whitesmoke"; 
            alert("A játéknak vége! A pálya betelt, ezért döntetlen.");
          } else {
            isActive = true;
          }
        }, 334); 
      }, 1000);
    }
  });
});

//győz
function checkWinner() {
  return winningCombinations.some(combination => {
      const [a, b, c] = combination.map(index => index - 1);
      return (
          cells[a].textContent === currentPlayer &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent
      );
  });
}

//game over
function isGameOver() {
  return Array.from(cells).every(cell => cell.textContent !== "");
}

/*Comment*/
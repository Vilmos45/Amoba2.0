const jon = document.getElementById("jön");
const cells = document.querySelectorAll(".click");
let currentPlayer = "O"; 
let isActive = true;

const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 5, 9], [3, 5, 7],
    [1, 4, 7], [2, 5, 8], [3, 6, 9]
];

console.info("Több játékos");
// A cellák 
cells.forEach(cell => {
  cell.addEventListener("click", function () {
    if (cell.textContent === "" && isActive) { 
      cell.textContent = currentPlayer;
      cell.style.color = currentPlayer === "X" ? "red" : "blue";
      jon.textContent = "";
      jon.style.color = "rgb(245, 245, 245)"; 
      
      let dots = 0;

      const dotInterval = setInterval(() => {
         
        dots = (dots + 1) % 4; 
        jon.textContent = ".".repeat(dots); 
      }, 334);

      isActive = false; 

      setTimeout(() => {
        clearInterval(dotInterval);
        jon.textContent = "..."; 

        setTimeout(() => {
          if (checkWinner()) {
              jon.textContent = currentPlayer === "X" ? "Piros játékos nyert!" : "Kék játékos nyert!";
              jon.style.color = currentPlayer === "X" ? "red" : "blue";
              alert(currentPlayer === "X" ? "A Piros játékos nyert!\nA Kék játékos vesztett." : "A Kék játékos nyert!\nA Piros játékos vesztett.");
              isActive = false;
            return;
          }

          currentPlayer = currentPlayer === "X" ? "O" : "X";
            jon.textContent = currentPlayer === "X" ? "A piros játékos jön!" : "A kék játékos jön!";
            jon.style.color = currentPlayer === "X" ? "red" : "blue";
          if (isGameOver()) {
            jon.textContent = "Döntetlen!";
            jon.style.color = "whitesmoke"; 
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
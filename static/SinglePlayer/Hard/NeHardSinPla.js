const statusDisplay = document.getElementById("jön");

const cells = document.querySelectorAll(".click");
let currentPlayer = "O"; 
let isActive = true;

const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 5, 9], [3, 5, 7],
    [1, 4, 7], [2, 5, 8], [3, 6, 9]
];

console.info("Nehézség : nehéz, Egyjátékos");
// A cellák kezelése
cells.forEach(cell => {
  cell.addEventListener("click", function () {
    if (cell.textContent === "" && isActive) { 
      cell.textContent = "O";
      cell.style.color = "blue";

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
              isActive = false;
              statusDisplay.textContent = currentPlayer === "O" ?  "Te nyertél!":"A Bot nyert!" ;
              statusDisplay.style.color = currentPlayer === "O" ?  "blue" :"red" ;
              alert(currentPlayer === "O" ? "Nyertél!" : "Vesztettél!"  );
              currentPlayer = "-";
              isActive = false;
            }
          
            if (currentPlayer === "O") {
              botm()
            }
            
          if (isGameOver()) {
            statusDisplay.textContent = "Döntetlen!";
            statusDisplay.style.color = "whitesmoke"; 
            alert("A játéknak vége! A pálya betelt, ezért döntetlen.");
            isActive = false;
          }
        
        }, 334); 
      }, 1000);
    }
  });
});

//bot
function botm() {
  const emptyC = Array.from(cells).filter(cell => cell.textContent === "");
  if (emptyC.length > 0) {
    const randomC = emptyC[Math.floor(Math.random() * emptyC.length)];
    randomC.textContent = "X";
    randomC.style.color = "red";
    if (checkWinner()) {
      statusDisplay.textContent = "Vesztettél!";
      statusDisplay.style.color = "red";
      alert("A Bot nyert!");
      isActive = false;
    } else {
      isActive = true;
      currentPlayer = "O";
      statusDisplay.textContent = "Te jössz!";
      statusDisplay.style.color = "blue";
    }
  }
}

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
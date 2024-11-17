const statusDisplay = document.getElementById("jön");
statusDisplay.style.color = "rgb(80,77,255)";

const cells = document.querySelectorAll(".click");
let currentPlayer = "O"; 
let isActive = true;

const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 5, 9], [3, 5, 7],
    [1, 4, 7], [2, 5, 8], [3, 6, 9]
];

//Játékosok lépése
cells.forEach(cell => {
  cell.addEventListener("click", function () {
    if (cell.textContent === "" && isActive) { 
      cell.textContent = "O";
      cell.style.color = "rgb(80,77,255)";

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
              statusDisplay.style.color = currentPlayer === "O" ?  "rgb(80,77,255)" :"red" ;
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
/*
const botHLeh = [
  [1,2], [2,3], [1,3], //viszintes 1.sor
  [4,5], [5,6], [4,6], //viszintes 2.sor
  [7,8], [8,9], [7,9], //viszintes 3.sor
  [1,4], [4,7], [1,7], //függőleges 1.sor
  [2,5], [5,8], [2,8], //függőleges 2.sor
  [3,6], [6,9], [3,9], //függőleges 3.sor
  [1,5], [5,9], [1,9], //átlós 1 jobbról ballra
  [3,5], [5,7], [3,7], //átlós 2 ballról jobbra
];

//bot
function botm() {
  const emptyC = Array.from(cells).filter(cell => cell.textContent === "");
  if (emptyC.length > 0) {
    let randomC;
    let comb = null;

    for (const [a, b] of botHLeh) { // Bejárjuk az összes mintát
      const cellA = document.getElementById(`s${a}`).textContent;
      const cellB = document.getElementById(`s${b}`).textContent;

      if (cellA === "X" && cellB === "X") {
          comb = [cellA, cellB];

      }else{
        randomC = emptyC[Math.floor(Math.random() * emptyC.length)];
      }
    }
    
    
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
      statusDisplay.style.color = "rgb(80,77,255)";
    }
  }
}
*/
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

/**
 * 
 */
const combMap = new Map([
  [[1, 2].toString(), 3],
  [[2, 3].toString(), 1],
  [[1, 3].toString(), 2],
  [[4, 5].toString(), 6],
  [[5, 6].toString(), 4],
  [[4, 6].toString(), 5],
  [[7, 8].toString(), 9],
  [[8, 9].toString(), 7],
  [[7, 9].toString(), 8],
  [[1, 4].toString(), 7],
  [[4, 7].toString(), 1],
  [[1, 7].toString(), 4],
  [[2, 5].toString(), 8],
  [[5, 8].toString(), 2],
  [[2, 8].toString(), 5],
  [[3, 6].toString(), 9],
  [[6, 9].toString(), 3],
  [[3, 9].toString(), 6],
  [[1, 5].toString(), 9],
  [[5, 9].toString(), 1],
  [[1, 9].toString(), 5],
  [[3, 5].toString(), 7],
  [[5, 7].toString(), 3],
  [[3, 7].toString(), 5],
]);

function botm() {
  const emptyC = Array.from(cells).filter(cell => cell.textContent === "");

  if (emptyC.length > 0) {
    let randomC;

    for (const [a, b] of botHLeh) {
      const cellA = document.getElementById(`s${a}`).textContent;
      const cellB = document.getElementById(`s${b}`).textContent;

      // Ha mindkét cella "X", nézzük meg a megfelelt cellát
      if (cellA === "X" && cellB === "X") {
        const key = [a, b].toString();
        if (combMap.has(key)) {
          randomC = document.getElementById(`s${combMap.get(key)}`);
          break;
        }
      }
    }

    // Ha nincs találat, véletlenszerű cella
    if (!randomC) {
      randomC = emptyC[Math.floor(Math.random() * emptyC.length)];
    }

    // Bot megteszi a lépést
    if (randomC) {
      randomC.textContent = "O"; // Bot jele
    }
  }
}

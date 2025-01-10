const jon = document.getElementById("jön");
const cells = document.querySelectorAll(".click");
let currentPlayer = "O"; 
let isActive = true;

const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 5, 9], [3, 5, 7],
    [1, 4, 7], [2, 5, 8], [3, 6, 9]
];

console.info("Nehézség : könnyű, Egyjátékos");
cells.forEach(cell => {
  cell.addEventListener("click", function () {
    if (cell.textContent === "" && isActive) { 
      cell.textContent = "O";
      cell.style.color = "blue";
      jon.textContent = "";
      jon.style.color = "rgb(245, 245, 245)"; 
      let pontok = 0;

      const pontsorozat = setInterval(() => {
        pontok = (pontok + 1) % 4; 
        jon.textContent = ".".repeat(pontok); 
      }, 334);

      isActive = false; 

      setTimeout(() => {
        
        clearInterval(pontsorozat);
        jon.textContent = "..."; 

        setTimeout(() => {
          if (checkWinner()) {
            isActive = false;
            jon.textContent = currentPlayer === "O" ?  "Nyertél!":"Vesztettél" ;
            jon.style.color = currentPlayer === "O" ?  "blue" :"red" ;
            alert(currentPlayer === "O" ? "Nyertél! \nNem lehetett nehéz." : "Vesztettél,\nde hogyan???"  );
            currentPlayer = "n/a";
            isActive = false;
          }
          
          if (currentPlayer === "O") {
            botm()
          }
          
          if (isGameOver()) {
            jon.textContent = "Döntetlen!";
            jon.style.color = "whitesmoke"; 
            alert("A játéknak vége! A pálya betelt, ezért döntetlen.");
            isActive = false;
          }
        
        }, 334); 
      }, 1000);
    }
  });
});


function botm() {
  const emptyC = Array.from(cells).filter(cell => cell.textContent === "");
  if (emptyC.length > 0) {
    const randomC = emptyC[Math.floor(Math.random() * emptyC.length)];
    randomC.textContent = "X";
    randomC.style.color = "red";
    if (checkWinner()) {
      isActive = false;
      jon.textContent = "Vesztettél!";
      jon.style.color = "red";
      alert("A Bot nyert!");
    } else {
      isActive = true;
      currentPlayer = "O";
      jon.textContent = "Te jössz!";
      jon.style.color = "blue";
    }
  }
}

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

function isGameOver() {
  return Array.from(cells).every(cell => cell.textContent !== "");
}

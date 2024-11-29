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

// A cellák kezelése
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

//bot
function botm() {
  let emptyC = Array.from(cells).filter(cell => cell.textContent === "");
  if (emptyC.length > 0) {

    const randomC = emptyC[Math.floor(Math.random() * emptyC.length)];
  if(s1.textContent === O && s2.textContent === O){ //1,2
  emptyC = s3;
  }  else if(s4.textContent === O && s5.textContent === O){ //4,5
    emptyC = s6;
    }  else if(s7.textContent === O && s8.textContent === O){ //7,8
      emptyC = s9;
      }  else if(s1.textContent === O && s4.textContent === O){ //1,4
        emptyC = s7;
        }  else if(s2.textContent === O && s5.textContent === O){ //2,5
          emptyC = s8;
          }  else if(s3.textContent === O && s6.textContent === O){ //3,6
            emptyC = s9;
            } else if(s4.textContent === O && s5.textContent === O){ //3,2
              emptyC = s1;
              }  else if(s6.textContent === O && s5.textContent === O){ //6,5
                emptyC = s4;
                }  else if(s9.textContent === O && s8.textContent === O){ //9,8
                  emptyC = s7;
                  } else if(s1.textContent === O && s3.textContent === O){ //1,3
                    emptyC = s2;
                    } else if(s4.textContent === O && s6.textContent === O){ //4,6
                      emptyC = s5;
                      } else if(s7.textContent === O && s9.textContent === O){ //7,9
                        emptyC = s8;
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
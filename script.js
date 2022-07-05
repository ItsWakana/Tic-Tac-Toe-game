const gameBoardModule = (() => {
    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];
    const button = document.querySelector('.start-game');
    const innerAnswerText = [...document.querySelectorAll('p')];

    const gameBoard = (() => {
        //stores current gameboard as an array
        let array = ['','','','','','','','',''];
        let a = array;
      
        //clears the gameBoard display
        button.addEventListener('click', () => {
          clearDisplay();
        });
      
        //game display that renders the contents of array to gameboard
        const display = (index, name) => {
          //renders players click to the board, taking in the index of the square
          gameBoard.array.splice(index, 1, name.team);
          innerAnswerText[index].innerText = gameBoard.array[index];
        }
        
        //clears the array and display
        const clearDisplay = () => {
          gameBoard.array = ['','','','','','','','',''];
          innerAnswerText.forEach(text => text.innerText = '');
        }
  
      
        return { display, array, clearDisplay }
    })();


    //contains all of our game logic
    const game = (() => {    
                
        //starts our game and controls the flow of player vs ai
        const startGame = (index) => {
          //game display that takes in the players click index and renders the             contents of array to gameboard
          gameBoard.display(index, ryan);  
          let result = checkWinner(ryan);
          if (result !== undefined) {
            console.log(result + ' has won the round!');
            return;
          }
          //computers turn that takes a random choice from the indexes that are           empty and prints it to the board
          
          // let compIndex = computerAnswer();
          let compMove;
          let bestScore = -Infinity;
          gameBoard.array.forEach((item,index) => {
            if (item == '') {
              item = 'O';
              let score = minimax(gameBoard.array, 0, false);
              item = '';
              if (score > bestScore) {
                bestScore = score;
                compMove = index;
              }
            }
          });
          console.log(compMove);
          gameBoard.display(compMove, computer);
    
          result = checkWinner(computer);
          if (result !== undefined) {
            console.log(result + ' has won the round!');
            return;
          }
        }
        
        //loop through our html boxes and apply event listeners to each square that       will initiate the players round
        boxes.forEach((square, index) => {
          square.onclick = () => {
            startGame(index);
          }
        });   
        
        //checks for a win or a tie using current player variable to check whose turn     it is
        const checkWinner = (name) => {
          let a = gameBoard.array;
          //horizontal win check
          if (a[0] == name.team && a[1] == name.team && a[2] == name.team) {
            return name.team
          }
          if (a[3] == name.team && a[4] == name.team && a[5] == name.team) {
            return name.team
          }
          if (a[6] == name.team && a[7] == name.team && a[8] == name.team) {
            return name.team
          }
          
          //vertical win check
          if (a[0] == name.team && a[3] == name.team && a[6] == name.team) {
            return name.team
          }
          if (a[1] == name.team && a[4] == name.team && a[7] == name.team) {
            return name.team
          }
          if (a[2] == name.team && a[5] == name.team && a[8] == name.team) {
            return name.team
          }
          
          //diagonal win check
          if (a[0] == name.team && a[4] == name.team && a[8] == name.team) {
            return name.team
          }
          if (a[2] == name.team && a[4] == name.team && a[6] == name.team) {
            return name.team
          }
        }
          //generates a random answer from the available spots on the board
          const computerAnswer = () => {
            let originalIndex = [];
            const filtered = gameBoard.array.filter((item,index) => item == '');
            gameBoard.array.forEach((item,index) => {
              if (item == '') {
                originalIndex.push(index);
              }
            });
            
            const random = Math.floor(Math.random() * originalIndex.length);
            return originalIndex[random];
          }
          
          let scores = {
            X: 10,
            O: -10,
            tie: 0
          }
          
          const minimax = (board, depth, maximizingPlayer) => {
            let resultPlayer = checkWinner(ryan);
            let resultComputer = checkWinner(computer);
            
            if (resultPlayer !== undefined) {
              let score = scores[result];
              return score;
            }
            if (resultComputer !== undefined) {
              let score = scores[result];
              return score;
            }
            
            if (maximizingPlayer) {
              let bestScore = -Infinity;
              gameBoard.array.forEach((item,index) => {
                if (item == '') {
                  item = 'X';
                  let score = minimax(board, depth + 1, false);
                  item = '';
                  if (score > bestScore) {
                    bestScore = score;
                  }
                }
              });
              
              return bestScore;
            } else {
                let bestScore = -Infinity;
                gameBoard.array.forEach((item,index) => {
                  if (item == '') {
                    item = 'X';
                    let score = minimax(board, depth + 1, false);
                    item = '';
                    if (score < bestScore) {
                      bestScore = score;
                    }
                  }
                });
    
                return bestScore;
            }
          }
    
        
        return { startGame, checkWinner }

        
        
      })();

        //factory function that produces our player object taking in name and team
    const player = (name, team) => {
        
        return { name, team };
    }
    
    const ryan = player('ryan', 'X');
    const computer = player('computer', 'O');
  
  
  
})();

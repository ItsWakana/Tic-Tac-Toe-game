const gameBoardModule = (() => {
    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];
    const button = document.querySelector('.start-game');
    const startButton = document.querySelector('.submit');
    const innerAnswerText = [...document.querySelectorAll('p')];
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');

    const gameBoard = (() => {
        //stores current gameboard as an array
        let array = ['','','','','','','','',''];
        let currentPlayer;
        let myPlayers = [];
      
        //game display that renders the contents of array to gameboard
        const display = (index, name) => {
          //renders players click to the board, taking in the index of the square
          gameBoard.array.splice(index, 1, name.team);
          innerAnswerText[index].innerText = gameBoard.array[index];
          innerAnswerText[index].classList.add('show');
        }
        
        //clears the array and display
        const clearDisplay = () => {
          gameBoard.array = ['','','','','','','','',''];
          innerAnswerText.forEach(text => text.classList.remove('show'));
          // innerAnswerText.forEach(text => text.innerText = '');
          const results = document.querySelector('.results-table');
          results.classList.remove('active');

        }
    
        const addNewPlayer = (e) => {
          e.preventDefault()
          const input = document.getElementById('name').value;
          const user = Player(input, 'X');
  
          return user;
        }

        const openModal = () => {
          if (modal == null) {
            return;
          }
          modal.classList.add('active');
          overlay.classList.add('active');
        }

        const closeModal = () => {
          if (modal == null) {
            return;
          }
          modal.classList.remove('active');
          overlay.classList.remove('active');
        }

        const gameOver = (result) => {
          button.classList.remove('clicked');
          const results = document.querySelector('.results-table');
          const textResult = results.querySelector('p');

          textResult.innerText = result;
          results.classList.add('active');
          mainBoard.classList.add('no-pointer');

        };
      
        return { display, array, clearDisplay, currentPlayer, addNewPlayer, openModal, closeModal, myPlayers, gameOver };
    })();


    //contains all of our game logic
    const game = (() => {
      
        button.addEventListener('click', () => {
          gameBoard.openModal();
        });

        overlay.addEventListener('click', () => {
          gameBoard.closeModal();
        });

        startButton.addEventListener('click', (e) => {
          button.classList.add('clicked');
          mainBoard.classList.remove('no-pointer');

          let newPlayer = gameBoard.addNewPlayer(e);
          gameBoard.myPlayers.splice(0, 1, newPlayer);
          gameBoard.clearDisplay();
          gameBoard.closeModal();
          //loop through our html boxes and apply event listeners to each square that will initiate the players round
          boxes.forEach((square, index) => {
            square.onclick = () => {
              startGame(index);
            }
          }); 
        });
                
        //starts our game and controls the flow of player vs ai
        const startGame = (index) => {
          
          //game display that takes in the players click index and renders the             contents of array to gameboard
          if (gameBoard.array[index] == 'X' || gameBoard.array[index] == 'O') {
            return;
          }
          gameBoard.display(index, gameBoard.myPlayers[0]);  
          gameBoard.currentPlayer = 'X';
          let gameResultPlayer = checkWinner(gameBoard.currentPlayer);

          if (gameResultPlayer !== null) {
            if (gameResultPlayer == 'tie') {
              gameBoard.gameOver('It was a tie');
            } else {
            gameBoard.gameOver(gameBoard.myPlayers[0].name + ' has won the round!');
            return;
            }
          }
          //computers turn that takes a random choice from the indexes that are           empty and prints it to the board
          
          let compMove;
          let bestScore = Infinity;
          for (let i = 0; i < 9; i++) {
            if (gameBoard.array[i] == '') {
              gameBoard.array[i] = 'O';
              let score = minimax(gameBoard.array, 0, true);
              gameBoard.array[i] = '';
              if (score < bestScore) {
                bestScore = score;
                compMove = i;
              }
            }
          }
          gameBoard.display(compMove, computer);
          gameBoard.currentPlayer = 'O';
          let gameResultComputer = checkWinner(gameBoard.currentPlayer);
          if (gameResultComputer !== null) {

            if (gameResultComputer == 'tie') {
              gameBoard.gameOver('It was a tie');
            } else {
            gameBoard.gameOver('The ' + computer.name + ' has won the round!');
            return;
            }
          }
        } 
        
        //checks for a win or a tie using current player variable to check whose turn     it is
        const checkWinner = (player) => {
          let winner = null;
          let a = gameBoard.array;

          let openSpaces = 0;
          //horizontal win check
          if (a[0] == player && a[1] == player && a[2] == player) {
            winner = player;
          }
          if (a[3] == player && a[4] == player && a[5] == player) {
            winner = player;
          }
          if (a[6] == player && a[7] == player && a[8] == player) {
            winner = player;
          }
          
          //vertical win check
          if (a[0] == player && a[3] == player && a[6] == player) {
            winner = player;
          }
          if (a[1] == player && a[4] == player && a[7] == player) {
            winner = player;
          }
          if (a[2] == player && a[5] == player && a[8] == player) {
            winner = player;
          }
          
          //diagonal win check
          if (a[0] == player && a[4] == player && a[8] == player) {
            winner = player;
          }
          if (a[2] == player && a[4] == player && a[6] == player) {
            winner = player;
          }

          for (let i=0; i < 8; i++) {
            if (gameBoard.array[i] == '') {
              openSpaces++;
            }
          }

          if (winner == null && openSpaces == 0) {
            return 'tie';
          }

          return winner;

        }
          
          let scores = {
            X: 10,
            O: -10,
            tie: 0
          }
          
          const minimax = (board, depth, maximizingPlayer) => {
            let result = checkWinner('XO' [+maximizingPlayer]);
            
            if (result !== null) {
              return scores[result];
            }
            
            if (maximizingPlayer) {
              let bestScore = -Infinity;
              for (let i = 0; i < 9; i++) {
              
                if (board[i] == '') {
                  board[i] = 'X';
                  let score = minimax(board, depth + 1, false);
                  board[i] = '';
                  if (score > bestScore) {
                    bestScore = score;
                  }
                }
              }
              return bestScore;

            } else {
                let bestScore = Infinity;
                for (let i = 0; i < 9; i++) {
                  if (board[i] == '') {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    if (score < bestScore) {
                      bestScore = score;
                    }
                  }
                }
    
                return bestScore;
            }
          }
        
        return { startGame, checkWinner }
      })();

        //factory function that produces our player object taking in name and team
    const Player = (name, team) => {
        return { name, team };
    }
    
    const computer = Player('computer', 'O');
})();

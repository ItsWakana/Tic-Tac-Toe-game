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

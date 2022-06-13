const myModule = (function () {

    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];

    const gameBoard = {

        gameBoardArray: [],

        playerAnswerToArray(answer) {
            gameBoard.gameBoardArray.splice(answer, 1, 'x');
            const dataId = boxes[answer].dataset.id = answer;
            boxes[answer].innerText = ryan.team;
        }
    }

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            gameBoard.playerAnswerToArray(index);
        });
    });

    const Player = (name, team) => {

        

        return { name, team };
    }
    
    const ryan = Player('Ryan', 'X');
    const computer = Player('comp', 'O');

})();

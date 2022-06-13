const myModule = (function () {

    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];

    const gameBoard = (() => {

        gameBoardArray = [];

        playerAnswerToArray = (answer) => {
            gameBoardArray.splice(answer, 1, 'x');
            const playerIndex = boxes[answer].dataset.id = answer;
            const crosses = boxes[answer].dataset.result = ryan.team;
            boxes[answer].innerText = ryan.team;
        }

        return { playerAnswerToArray }
    })();

    const gameLogic = (() => {

        boxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                gameBoard.playerAnswerToArray(index);
            });
        });



    })();

    const Player = (name, team) => {

        return { name, team };
    }
    
    const ryan = Player('Ryan', 'X');
    const computer = Player('comp', 'O');

})();

const myModule = (function () {

    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];

    const gameBoard = (() => {

        gameBoardArray = [];

        playerAnswerToArray = (answer) => {
            gameBoardArray.splice(answer, 1, ryan.team);
            const crosses = boxes[answer].dataset.result = ryan.team;
            boxes[answer].innerText = ryan.team;
            boxes[answer].dataset.taken = 'true';
        }

        computerAnswerToArray = (answer) => {
            gameBoardArray.splice(answer, 1, computer.team);
            const crosses = boxes[answer].dataset.result = computer.team;
            boxes[answer].innerText = computer.team;
            boxes[answer].dataset.taken = 'true';
        }

        return { playerAnswerToArray, computerAnswerToArray, gameBoardArray }
    })();

    const gameLogic = (() => {

        computerAnswer = () => {

            const freeBlocks = boxes.filter(box => {
                return box.dataset.taken == 'false';
            });

            const mapped = freeBlocks.map((item) => {
                return item.dataset.id;
            });

            const random = Math.floor(Math.random() * mapped.length);

            return random;
        }

        boxes.forEach((box, index) => {

            box.dataset.taken = 'false';
            box.addEventListener('click', () => {
                gameBoard.playerAnswerToArray(index);

                const computerIndex = computerAnswer();
                computerAnswerToArray(computerIndex);
            });
        });

    })();

    const Player = (name, team) => {

        return { name, team };
    }
    
    const ryan = Player('Ryan', 'X');
    const computer = Player('comp', 'O');

})();

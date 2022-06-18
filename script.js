

const gameBoardModule = (function () {

    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];
    const button = document.querySelector('button');
    const innerAnswerText = [...document.querySelectorAll('p')];
    const row1 = [boxes[0],boxes[1],boxes[2]];
    const row2 = [boxes[3],boxes[4],boxes[5]];
    const row3 = [boxes[6],boxes[7],boxes[8]];

    const col1 = [boxes[0],boxes[3],boxes[6]];
    const col2 = [boxes[1],boxes[4],boxes[7]];
    const col3 = [boxes[2],boxes[5],boxes[8]];

    const diag1 = [boxes[0],boxes[4],boxes[8]];
    const diag2 = [boxes[2],boxes[4],boxes[6]];

    let gameBoardArray = [0,1,2,3,4,5,6,7,8];

    const game = () => {

        boxes.forEach((box) => {
            box.dataset.taken = 'false';
            box.onclick = () => {
                makeMoves(box);
            };
        });

        const playerMove = (box) => {
            if (box.dataset.taken == 'true') {
                return;
            }
            ryan.answerOnDisplay(box.dataset.id);
        }

        const clearTheBoard = () => {
            mainBoard.classList.remove('no-pointer');
            gameBoardArray = [0,1,2,3,4,5,6,7,8];
            boxes.forEach((box, index) => {
                box.dataset.taken = 'false';
                box.dataset.result = '';
                innerAnswerText[index].classList.remove('show');
            });
        };

        const computerMove = () => {
            const computerIndex = computer.computerAnswer();
            computer.answerOnDisplay(computerIndex);
        }

        const makeMoves = (box) => {

            playerMove(box);
            if (ryan.checkWin() !== undefined) {
                ryan.displayGameResult();
                mainBoard.classList.add('no-pointer');
                return;
            }

            // setTimeout(computerMove, 600);
            computerMove();
            if (computer.checkWin() !== undefined) {
                computer.displayGameResult();
                mainBoard.classList.add('no-pointer');
                return;
            }
        }

        return { clearTheBoard };
    }

    const Player = (name, team) => {

        const checkWin = () => {
            const equalsX = (box) => box.dataset.result == team;
            if (row1.every(equalsX) == true || row2.every(equalsX) == true ||
                row3.every(equalsX) == true || col1.every(equalsX) == true ||
                col2.every(equalsX) == true || col3.every(equalsX) == true ||
                diag1.every(equalsX) == true || diag2.every(equalsX) == true) {
                
                return name;
            }
        }

        const displayGameResult = () => {
            
            const childNodes = [...document.querySelector('.results-table').childNodes];
            childNodes[3].innerText = name + ' has won the round!';

            const resultsTable = document.querySelector('.results-table');
            resultsTable.classList.add('show');

        }

        let answerOnDisplay = (index) => {
            innerAnswerText[index].classList.add('show');
            gameBoardArray.splice(index, 1, team);
            boxes[index].dataset.result = team;
            innerAnswerText[index].innerText = gameBoardArray[index];
            boxes[index].dataset.taken = 'true';
        }

        let computerAnswer = () => {

            const freeBlocks = boxes.filter(box => {
                return box.dataset.taken == 'false';
            });

            const mapped = freeBlocks.map((item) => {
                return item.dataset.id;
            });

            const random = Math.floor(Math.random() * mapped.length);

            return mapped[random];
        }

        return { name, team, answerOnDisplay, checkWin, computerAnswer, displayGameResult };
    }
    
    const ryan = Player('Ryan', 'X');
    const computer = Player('Computer', 'O');

    button.addEventListener('click', () => {
        const resultsTable = document.querySelector('.results-table');
        resultsTable.classList.remove('show');
        game().clearTheBoard();
    });

})();

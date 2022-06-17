

const myModule = (function () {

    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];
    const row1 = [boxes[0],boxes[1],boxes[2]];
    const row2 = [boxes[3],boxes[4],boxes[5]];
    const row3 = [boxes[6],boxes[7],boxes[8]];

    const col1 = [boxes[0],boxes[3],boxes[6]];
    const col2 = [boxes[1],boxes[4],boxes[7]];
    const col3 = [boxes[2],boxes[5],boxes[8]];

    const diag1 = [boxes[0],boxes[4],boxes[8]];
    const diag2 = [boxes[2],boxes[4],boxes[6]];

    let gameBoardArray = [0,1,2,3,4,5,6,7,8];

    const gameLogic = (() => {

        boxes.forEach(box => {

            box.dataset.taken = 'false';
            box.addEventListener('click', () => {
                playerMove(box);
                const playerWinCheck = ryan.checkWin(box);
                console.log(playerWinCheck)

                if (playerWinCheck !== undefined) {
                    gameBoardArray = [0,1,2,3,4,5,6,7,8];
                    clearTheBoard();
                    return;
                }

                computerMove();
                computer.checkWin();
            });
        });

        const playerMove = (box) => {
            if (box.dataset.taken == 'true') {
                return;
            }
            ryan.answerOnDisplay(box.dataset.id);
        }

        const clearTheBoard = () => {
            boxes.forEach(box => {
                box.dataset.taken = 'false';
                box.dataset.result = '';
                box.innerText = '';
            });
        }

        const computerMove = () => {
            const computerIndex = computer.computerAnswer();
            computer.answerOnDisplay(computerIndex);
        }

    })();

    const Player = (name, team) => {

        const checkWin = (box) => {
            const equalsX = (box) => box.dataset.result == team;
            if (row1.every(equalsX) == true || row2.every(equalsX) == true ||
                row3.every(equalsX) == true || col1.every(equalsX) == true ||
                col2.every(equalsX) == true || col3.every(equalsX) == true ||
                diag1.every(equalsX) == true || diag2.every(equalsX) == true) {
                alert(name + ' wins!');
                return name;
                
            }

        }

        let answerOnDisplay = (index) => {
            gameBoardArray.splice(index, 1, team);
            boxes[index].dataset.result = team;
            boxes[index].innerText = gameBoardArray[index];
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

        return { name, team, answerOnDisplay, checkWin, computerAnswer };
    }
    
    const ryan = Player('Ryan', 'X');
    const computer = Player('Computer', 'O');
})();

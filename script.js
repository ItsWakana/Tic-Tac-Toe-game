

const gameBoardModule = (() => {

    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];
    const button = document.querySelector('.start-game');
    const modalSubmit = document.querySelector('.submit');
    const innerAnswerText = [...document.querySelectorAll('p')];

    const gameLogic = (() => {

        

        const row1 = [boxes[0],boxes[1],boxes[2]];
        const row2 = [boxes[3],boxes[4],boxes[5]];
        const row3 = [boxes[6],boxes[7],boxes[8]];
    
        const col1 = [boxes[0],boxes[3],boxes[6]];
        const col2 = [boxes[1],boxes[4],boxes[7]];
        const col3 = [boxes[2],boxes[5],boxes[8]];
    
        const diag1 = [boxes[0],boxes[4],boxes[8]];
        const diag2 = [boxes[2],boxes[4],boxes[6]];
    
        let gameBoardArray = [0,1,2,3,4,5,6,7,8];

        let myPlayers = [];

        const clearTheBoard = () => {
            mainBoard.classList.remove('no-pointer');
            gameBoardArray = [0,1,2,3,4,5,6,7,8];
            boxes.forEach((box, index) => {
                box.dataset.taken = 'false';
                box.dataset.result = '';
                innerAnswerText[index].classList.remove('show');
            });
        };

        const makeMoves = (box) => {

            let move = gameLogic.myPlayers[0].playerMove(box);
            if (gameLogic.myPlayers[0].checkWin(gameLogic) !== undefined) {
                gameLogic.myPlayers[0].displayGameResult();
                mainBoard.classList.add('no-pointer');
                return;
            }
            if (move == 'yes') {
            } else {
                // setTimeout(computerMove, 600);
                computer.computerMove(box);
                if (computer.checkWin(gameLogic) !== undefined) {
                    computer.displayGameResult();
                    mainBoard.classList.add('no-pointer');
                    return;
                }
            }
        }

        const openModal = (modal,overlay) => {
            if (modal == null) return;
            modal.classList.add('active');
            overlay.classList.add('active');
        }

        const closeModal = (modal,overlay) => {
            if (modal == null) return;
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }

        const addNewPlayer = (e) => {
            e.preventDefault();

            let playerName = document.getElementById('name').value

            const newPlayer = Player(playerName, 'X');
            return newPlayer;
        }

        const gameRound = (newPlayer) => {
            gameLogic.myPlayers.splice(0, 1 ,newPlayer);
            gameLogic.closeModal(modal,overlay);
            const resultsTable = document.querySelector('.results-table');
            resultsTable.classList.remove('show');
            playGame.gameStart();
            gameLogic.clearTheBoard();
        }

        return { clearTheBoard, makeMoves, openModal, closeModal, addNewPlayer, gameRound,
                row1,row2,row3,col1,col2,col3,diag1,diag2,gameBoardArray, myPlayers };
    })();

    const playGame = (() => {

        const modal = document.querySelector('.user-input');
        const overlay = document.querySelector('#overlay');

        const gameStart = () => {
            boxes.forEach((box) => {
                box.dataset.taken = 'false';
                box.onclick = () => {
                    gameLogic.makeMoves(box);
                };
            });
        }

        button.addEventListener('click', () => {
            gameLogic.openModal(modal, overlay);
        });
    
        overlay.addEventListener('click', () => {
            gameLogic.closeModal(modal,overlay);
        });
    
        modalSubmit.addEventListener('click', (e) => {
            let newPlayer = gameLogic.addNewPlayer(e);
            gameLogic.gameRound(newPlayer);
        });

        return { gameStart }

})();

    const Player = (name, team) => {

        const playerMove = (box) => {
            if (box.dataset.taken == 'true') {
                return 'yes';
            }
            gameLogic.myPlayers[0].answerOnDisplay(box.dataset.id);
        }

        const computerMove = (box) => {
            const computerIndex = computer.computerAnswer();
            computer.answerOnDisplay(computerIndex);
        }

        const checkWin = (game) => {
            const equalsXorO = (box) => box.dataset.result == team;
            if (game.row1.every(equalsXorO) == true || game.row2.every(equalsXorO) == true ||
                game.row3.every(equalsXorO) == true || game.col1.every(equalsXorO) == true ||
                game.col2.every(equalsXorO) == true || game.col3.every(equalsXorO) == true ||
                game.diag1.every(equalsXorO) == true || game.diag2.every(equalsXorO) == true) {
                
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
            gameLogic.gameBoardArray.splice(index, 1, team);
            boxes[index].dataset.result = team;
            innerAnswerText[index].innerText = gameLogic.gameBoardArray[index];
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

        return { name, team, answerOnDisplay, checkWin, computerAnswer, displayGameResult, playerMove, computerMove };
    }

    const computer = Player('Computer', 'O');

})();

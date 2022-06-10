const myModule = (function () {

    const gameBoard = {

        gameBoardArray: [],
        pushElementsToArray: () => {

            const mainBoard = document.querySelector('[data-game-board]');
            const boxes = mainBoard.querySelectorAll('.box');
            gameBoard.gameBoardArray.push(boxes);
        },
    }
    gameBoard.pushElementsToArray();




    const createGamePlayer = (name, id) => {
        return { name, id };
    }
    
    const james = createGamePlayer('James', 1);

})();







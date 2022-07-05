const gameBoardModule = (() => {
    const mainBoard = document.querySelector('[data-game-board]');
    const boxes = [...mainBoard.querySelectorAll('.box')];
    const button = document.querySelector('.start-game');
    const innerAnswerText = [...document.querySelectorAll('p')];

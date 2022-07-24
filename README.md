# Tic-Tac-Toe-game

I found this project to be quite straight forward overall. I enjoyed using factory functions and modules to self contain a lot of my content and encapsulate certain aspects of our functionality.

Where I really ran into trouble was trying to implement the mini-max algorithm which would allow us to play vs an unbeatable AI. I ran into issues where the computer wasn't performing the most efficient moves. I did do many things to try to fix that algorithm, but i was unable to fix it. This led me to find help on stack overflow and this way I was able to pin down what went wrong. The algorithm wasn't working effectively as the current player variable was not changing during the minimax function, so we were missing potential wins for our AI.

Overall I learned a lot about when to use factory functions vs modules and how to self contain certain variables and functions that we want to be accessible in certain places in the codebase.

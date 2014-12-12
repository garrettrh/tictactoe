angular
	.module('TTTApp')
	.controller('ticTacToeCtrl', ticTacToeCtrl);


  function ticTacToeCtrl($scope) {

  	$scope.greeting = "Let's Play!";
  	$scope.players = ['X', 'O'];

    var turn, hasWon = function(p) {
    	console.log("game")
    	// Array of winning indexes
        return ['012', '345', '678', '036', '147', '258', '048', '246']
        // .some checks each element to see if any element passes the test of the function condition
        .some(function(t) { 
        	// returns (t) function, split as array of strings
        	return t.split('')
        	// .every checks whether every element passes the test of the function
        	.every(function(i) { 

        		return $scope.board[i] == p; 
        	}); 
        });
    };

    // sets the board to array of 9 and turn to 0
    $scope.newGame = function() {
    	console.log("new game");
        $scope.board = new Array(9);
        turn = 0;

        // Change greetings/winner announcement
        // Make board fade in
        // Change button greeting/info "Start Game/Play Again"
        $scope.greeting = "Play Again";
    };

    // places X or O on the board, determines winner
    $scope.place = function(i) {
    	// alternate turns between X and O
        $scope.board[i] = $scope.board[i] || $scope.players[turn++ % 2];
        // $scope.board[i] = $scope.board[i] || 'X'[turn++ % 1],'O'[turn++ % 1];
        // checks if hasWon array condition is met
        if (hasWon('OX'[turn % 2])) {
        	// alerts who won based on turn
        	$scope.winner = ('OX'[turn % 2] + ' wins! Al Davis would be proud!');
        // delays board reset after win to see result
        setTimeout($scope.reset, 1000);
        
    }
    };

    // calls the reset function to empty the boxes and restart the game
    $scope.reset = function(){
    	$scope.winner = "Play Again!";
    	$scope.newGame();
    };
}
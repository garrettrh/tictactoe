angular
	.module('TTTApp')
	.controller('TTTController', TTTController);

    TTTController.$inject = ['$firebase'];




  function TTTController($firebase) {
    var self = this;

    console.log("ctrl func runs");

  	self.greeting = "Let's Play!";
    self.button = "Start Game";
  	self.players = ['X', 'O'];
   


    var turn, hasWon = function(p) {
    	console.log("has won runs");
    	// Array of winning indexes
        return ['012', '345', '678', '036', '147', '258', '048', '246']
        // .some checks each element to see if any element passes the test of the function condition
        .some(function(t) { 
        	// returns (t) function, split as array of strings
        	return t.split('')
        	// .every checks whether every element passes the test of the function
        	.every(function(i) { 

        		return self.board[i] == p; 
        	}); 
        });
    };

    // sets the board to array of 9 and turn to 0
    self.newGame = function() {
    	console.log("new game runs");
        self.board = new Array(9);
        turn = 0;

        // Change greetings/winner announcement
        // Make board fade in
        // Change button greeting/info "Start Game/Play Again"
        self.greeting = "Tic Tac Go!";
    };

    // places X or O on the board, determines winner
    self.place = function(i) {
        console.log("place runs");
    	// alternate turns between X and O
        self.board[i] = self.board[i] || self.players[turn++ % 2];
        // self.board[i] = self.board[i] || 'X'[turn++ % 1],'O'[turn++ % 1];
        // checks if hasWon array condition is met
        if (hasWon('OX'[turn % 2])) {
        	// alerts who won based on turn
        	self.winner = ('OX'[turn % 2] + ' wins! Al Davis would be proud!');
            self.button = "New Game";
        // delays board reset after win to see result
        setTimeout(self.reset, 1000);
        
    }
    };

    // calls the reset function to empty the boxes and restart the game
    self.reset = function(){
        console.log("reset runs");
    	self.greeting = "Play Again!";
        self.winner = "";
    	self.newGame();
    };





    // Multiplayer/Firebase shit



// ORIGINAL LOBBY (code works)
    // function gameLobby(){
    //     console.log("firebase");
    //     var ref = new Firebase("https://tttapplobbywdiga.firebaseio.com/gameLobby");
    //     var lobby = $firebase(ref).$asObject();
    //     return lobby;

    // }

        // self.playerName = function(name){
        //     self.playerName.$add(name);
        // }

    // self.text = null;







// TEST LOBBY

     self.lobby = gameLobby();
     console.log("before prompt");

    function gameLobby() {
        // Change to front page input, w/ placeholder
        console.log("game lobby prompt");
        var playerName = setTimeout(prompt('Username?', 'Guest'), 30000);
        console.log("after afterf after");
        var gameRef = new Firebase('https://tictactoega.firebaseio.com');
        initGame(playerName, gameRef);
    };
     
    // Called after player assignment completes.
    function playGame(playerNum, playerName, justJoinedGame, gameRef) {
      var playerInfo = gameRef.child('/players').child(playerNum);
      alert('You are player number ' + playerNum );
     
      if (justJoinedGame) {
        alert('Are you ready for some Tic Tac Toe?!?!?!');
        playerInfo.set({playerName: playerName, state: 'game state'});
      }
    }
     
    // Use transaction() to assign a player number, then call playGame().
    function initGame(playerName, gameRef) {
      var playerList = gameRef.child('/lobby');
      var playerNum, alreadyInGame = false;
     
      playerList.transaction(function(playerList) {
        if (playerList === null) {
          playerList = [];
        }
        for (var i = 0; i < playerList.length; i++) {
          if (playerList[i] === playerName) {
            // Already joined so abort transaction
            alreadyInGame = true;
            playerNum = i;
            return;
          }
        }
        if (i < 2) {
          playerList[i] = playerName;
          playerNum = i;
          return playerList;
        }
        // Abort transaction, game full
        playerNum = null;
      }, 
      function (error, committed) {
        if (committed || alreadyInGame) {
          playGame(playerNum, playerName, !alreadyInGame, gameRef);
        } else {
          alert('Sorry! Game is full!');
        }
      });
    }









    }
    var N=9;
    var h=1;// hint
    var c=1;// check
    var board =[];

    for(var i=0;i<N;i++){
    board.push([0,0,0,0,0,0,0,0,0]);
    }

    NewBoard();

    var box= cloneGrid(board);

    function cloneGrid(grid) {
    // Clone the 1st dimension (column)
    const newGrid = [...grid]
    // Clone each row
    newGrid.forEach((row, rowIndex) => newGrid[rowIndex] = [...row])
    return newGrid
    }

    solveSudoku(board,9);
    start();
    

    function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
    }  


    function isSafe(board, row, col, num) 
        { 
            for (var d = 0; d < board.length; d++) { 
                if (board[row][d] == num) { 
                    return false; 
                } 
            } 

            for (var r = 0; r < board.length; r++) { 
                if (board[r][col] == num) { 
                    return false; 
                } 
            } 

            var sqrt = 3; 
            var boxRowStart = row - row % sqrt; 
            var boxColStart = col - col % sqrt; 

            for (var r = boxRowStart; 
                r < boxRowStart + sqrt; r++) { 
                for (var d = boxColStart; 
                    d < boxColStart + sqrt; d++) { 
                    if (board[r][d] == num) { 
                        return false; 
                    } 
                } 
            } 

            // if there is no clash, it's safe 
            return true; 
        } 


        function solveSudoku(board, n) 
        { 
            var row = -1; 
            var col = -1; 
            var isEmpty = true; 
            for (var i = 0; i < n; i++) { 
                for (var j = 0; j < n; j++) { 
                    if (board[i][j] == 0) { 
                        row = i; 
                        col = j; 

                        // we still have some remaining 
                        // missing values in Sudoku 
                        isEmpty = false; 
                        break; 
                    } 
                } 
                if (!isEmpty) { 
                    break; 
                } 
            } 

            // no empty space left 
            if (isEmpty) { 
                return true; 
            } 

            // else for each-row backtrack 
            for (var num = 1; num <= n; num++) { 
                if (isSafe(board, row, col, num)) { 
                    board[row][col] = num; 
                    if (solveSudoku(board, n)) { 
                        // prvar(board, n); 
                        return true; 
                    } 
                    else { 
                        // replace it 
                        board[row][col] = 0; 
                    } 
                } 
            } 
            return false; 
        } 


    function start() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var index = "#" + i + j;
            if (box[i][j] !== 0) {
                $(index).val(box[i][j]);
                $(index).prop("disabled", true);
                $(index).css("background-color", "#eff0e6");
            }
        }
    }
    }


    $("#solve").click(function(){
        solve();
        h=4;
        $("#submit").text("Submit");
    });


    $("#submit").click(function(){
        if(check())
    {
        $(this).text("Correct!");
    }
    else{
        $(this).text("Incorrect!!");
    }
    })


    $("#playAgain").click(function(){
    reset();
    });


    $("#newGame").click(function(){
        for(var i=0;i<9;i++){
        for(var j=0; j<9;j++){
            board[i][j]=0;
        }
    }
    NewBoard();
    box=cloneGrid(board);
    solveSudoku(board,9);
    start();
    reset();
    })


    $("#hint").click(function(){
        if(h===1){
            hint(4);
            $("#no").text(h);
        }
        else if(h===2){
            hint(6);
            $("#no").text(h);
        }
        else if(h===3){
            hint(8);
            $("#no").text(h);
        }
        h++;
    })
    

    $("#check").click(function(){
        if(c===1)
        {
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    var index = "#" + i + j;
                    if(Number($(index).val())!==board[i][j] && $(index).val()!='')
                    {
                        $(index).css("color","red");
                    }
            }
            $(this).css("background-color","#ffc107");
            $(this).css("color","white");
            c=0;
        }
        }
        else
        {
            $(this).css("background-color","");
            $(this).css("color","");
            c=1;
            $("input").css("color","");
        }
        

    })


    $("#solver").click(function(){
        if($("#solver").text()==="Sudoku Solver")
        {
            for(var i=0;i<N;i++){
                board.push([0,0,0,0,0,0,0,0,0]);
            }
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    var index = "#" + i + j;
                    $(index).val('');
                    $(index).css("background-color","white");
                    $(index).prop("disabled",false);
            }
        }
        $("#solver").text("Done");
        } 
        else
        {
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    var index = "#" + i + j;
                    if($(index).val()!=='')
                        board[i][j]=Number($(index).val());
                    else
                        board[i][j]=0;
                }
            }
        box=cloneGrid(board);   
        start();
        solve();
        $("#solver").text("Sudoku Solver");
        }
        $("#submit").text("Submit");
    });


    function solve(){
        solveSudoku(board,9);
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var index = "#" + i + j;
                if (box[i][j] === 0) {
                    $(index).val(board[i][j]);
                    $(index).prop("disabled", true);
                    $(index).css("background-color", "#bad8e0");
            }
        }
    }
    }

    function reset(){
    for(var i=0; i<9; i++)
    {
        for(var j=0; j<9; j++)
        {
            var index="#"+ i + j;
            $(index).css("background-color","white");
            if(box[i][j]!==0)
            {
                $(index).val(box[i][j]);
                $(index).prop("disabled",true);
                $(index).css("background-color","#eff0e6");
            }
            else{
                $(index).val('');
                $(index).prop("disabled",false);
            }
        }
    }
    $("#submit").text("Submit");
    h=1;
    $("#no").text(0);
    }


    function check()
    {
        solveSudoku(board,9);
    for(var i=0; i<9; i++)
    {
        for(var j=0; j<9; j++)
        {
            var index="#"+ i + j;
            if(Number($(index).val())!==board[i][j])
            {
                return false;
            }
        }
    }
    return true;
    }


    function hint(n){
        var t=0;
        while(t<n){
            var i=randomNumber(0,9);
            var j=randomNumber(0,9);
            var index="#"+ i + j;
            if($(index).val()!=="")
                continue;
            t++;
            $(index).val(board[i][j]);
            $(index).prop("disabled",true);
            $(index).css("background-color","#e3cd86");
    }
    }
 



                                                // To Create New Board


    function NewBoard() 
    { 

    fillDiagonal();
    
        // Fill remaining blocks 
    solveSudoku(board,N); 
  
        // Remove Randomly K digits to make game 
    removeKDigits(); 

    } 



    function fillDiagonal() 
    { 
  
        for (var i = 0; i<N; i=i+3) 
  
            // for diagonal box, start coordinates->i==j 
            fillBox(i, i); 
    } 

    function unUsedInBox(rowStart,colStart,num) 
    { 
        for (var i = 0; i<3; i++) 
            for (var j = 0; j<3; j++) 
                if(board[rowStart+i][colStart+j]===num) 
                    return false; 
  
        return true; 
    } 
    
    function fillBox(row,col) 
    { 
        var num; 
        for (var i=0; i<3; i++) 
        { 
            for (var j=0; j<3; j++) 
            { 
                do
                { 
                    num = randomNumber(1,10); 
                } 
                while (!unUsedInBox(row, col, num)); 
  
                board[row+i][col+j] = num; 
            } 
        } 
    } 

    function removeKDigits() 
    { 
        var count = 55; 
        while (count !== 0) 
        { 
            var cellId = randomNumber(0,81); 
  
            var i = Math.floor(cellId/9); 
            var j = cellId%9; 
   
            if (board[i][j] !== 0) 
            { 
                count--; 
                board[i][j] = 0; 
            } 
        } 
    } 

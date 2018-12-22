let vueInstance = new Vue({
    el:'#app',
    data:{
        name:"2048", 
        current_score:0,
        grid:[
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ], 
        nextCell : [0,0]
    },
    created:function(){
        this.grid = this.insertNumberRandom(this.grid);
        this.grid = this.insertNumberRandom(this.grid);
       
    },
    mounted:function(){
        this.paintCellColors(this.$refs);
    },
    updated:function(){
        this.paintCellColors(this.$refs);
        this.updateNewAddedCellBorder(this.$refs, this.nextCell);
    },
    methods:{

        // this function is solution for challenge #1 Testing the Waters
        insertNumberRandom:function(prevGrid){

            let emptyTiles = [];
            for(let i=0; i<prevGrid.length; i++) {
                for(let j=0; j<prevGrid[i].length; j++){
                    if(prevGrid[i][j] === 0){
                        emptyTiles.push({
                            x:i,
                            y:j
                        })
                    }
                }
            }
            if(emptyTiles.length > 0){
                let rand1 = Math.floor(Math.random() * emptyTiles.length);
                prevGrid[emptyTiles[rand1].x][emptyTiles[rand1].y] = Math.random(1) > 0.5 ? 2 : 4;
                this.nextCell = [emptyTiles[rand1].x ,emptyTiles[rand1].y]                
            }
            if ( emptyTiles.length === 1){
                alert(`Game Over ! Your score is ${this.current_score}`)
                window.location = '/'
            }
            return prevGrid;
        }, 
        keyPressed:function(event){
            let pastGrid = this.copyGrid(this.grid); 
            if(event){
                switch (event.code){
                    case 'ArrowDown':
                        this.keyPressedDown();
                    break;
                    case 'ArrowUp':
                        this.keyPressedUp();
                    break;
                    case 'ArrowLeft':
                        this.keyPressedLeft();
                    break;
                    case 'ArrowRight':
                        this.keyPressedRight(); 
                    break;               
                }
            }
            if(this.compareGrids(pastGrid,this.grid)){
                this.grid = this.insertNumberRandom(this.grid);            
                this.paintCellColors(this.$refs);      
                          
            }
        },
        keyPressedUp: function(){
            this.grid = this.transposeGrid(this.grid);
            this.grid = this.slideArraysInGrid(this.grid, 'left');
            this.grid = this.transposeGrid(this.grid);            
        },
        keyPressedDown: function(){
            this.grid = this.transposeGrid(this.grid);
            this.grid = this.slideArraysInGrid(this.grid, 'right');
            this.grid = this.transposeGrid(this.grid);            
        },
        keyPressedLeft: function(){
            this.grid = this.slideArraysInGrid(this.grid, 'left');            
        },
        keyPressedRight: function(){
            this.grid = this.slideArraysInGrid(this.grid, 'right');            
        }, 
        setScore:function(s){
            this.current_score+=s;
        },

        //this function is solution for challenge #2 Swipe right, please
        slideArraysInGrid:function(prevGrid, dir){
            let g = this.copyGrid(prevGrid); 
            for(let i = 0; i< g.length; i++){
                let lengthOfArray = g[i].length;
                g[i] = g[i].filter(v => v);     
                g[i] = this.combineValues(g[i], dir)
                g[i] = g[i].filter(v => v); 
                let tempLength = g[i].length; 
                for(let k = 0; k< lengthOfArray - tempLength; k++){
                    if(dir == 'left')
                        g[i].push(0);
                    else if(dir == 'right')
                        g[i].unshift(0);
                }
            };
            return g; 
        }, 
        //
        combineValues:function(gridArray, dir){
            if(dir == 'left'){
                for(let i = 0; i< gridArray.length-1; i++){
                    if( gridArray[i]!== 0 && gridArray[i] === gridArray[i+1]){
                        gridArray[i] = gridArray[i]*2;
                        gridArray[i+1] = 0;
                        this.setScore(gridArray[i]);
                    }
                }
            }
            else if(dir == 'right'){
                for(let i = gridArray.length-1; i > -1 ; i--){
                    if( gridArray[i]!== 0 && gridArray[i] === gridArray[i-1]){
                        gridArray[i] = gridArray[i]*2;
                        gridArray[i-1] = 0;
                        this.setScore(gridArray[i]);
                    }
                }
            }
            
            return gridArray;
        },
        transposeGrid:function(prevGrid){
            let res = [[],[],[],[]]; 
            for(let i = 0; i<prevGrid.length; i++){
                for(let j = prevGrid[i].length - 1; j > -1; j--){
                    res[j][i] = prevGrid[i][j];
                }
            }
            return res;
        }, 
        copyGrid:function(prevGrid){
            let res = [[],[],[],[]]; 
            for(let i = 0; i<prevGrid.length; i++){
                for(let j = prevGrid[i].length - 1; j > -1; j--){
                    res[i][j] = prevGrid[i][j];
                }
            }
            return res;
        }, 
        compareGrids:function(prevGrid, currentGrid){
            for(let i=0; i<prevGrid.length; i++) {
                for(let j=0; j<currentGrid.length; j++){
                    if(prevGrid[i][j]!== currentGrid[i][j])
                        return true;
                }
            }
            return false; 

        },
        paintCellColors:function(refrences){
            let cell;
            let classList = 'col span_1_of_4' ;
            for(let r = 0; r<this.grid.length; r++){
                for(let k = 0; k<this.grid[r].length; k++){
                    cell = refrences['counter_'+r+'_'+k][0];
                    cell.classList = [];
                    switch (cell.textContent){
                        case '2':
                        case '4':
                            cell.classList.value=classList + " bg_2_4";
                        break;
                        case '8':
                            cell.classList.value=classList + " bg_8";
                        break;
                        case '16':
                            cell.classList.value=classList + " bg_16";
                        break;
                        case '32':
                            cell.classList.value=classList + " bg_32";
                        break;
                        case '64':
                            cell.classList.value=classList + " bg_64";
                        break;
                        case '128':
                            cell.classList.value=classList + " bg_128";
                        break;
                        case '256':
                            cell.classList.value=classList + " bg_256";
                        break;
                        case '2048':
                            cell.classList.value=classList + " newBorder2048";
                        break;
                        case '':
                            cell.classList.value=classList + "";
                        break;
                        default:
                            cell.classList.value=classList + " bg_high";
                        break;
                    }
                }

            }
        }, 
        updateNewAddedCellBorder:function(refrences, newCell){
            let cell = refrences['counter_'+newCell[0]+'_'+newCell[1]][0];
            cell.classList.value = cell.classList.value + " newBorder";
        }


    }
    
})

document.onkeyup = function(e){
    // console.log(e.target);
    
    vueInstance.keyPressed(e)
}
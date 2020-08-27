class Problem {

    constructor() {
        this.nonZero = this.n = Math.floor(Math.random()*20)+1;
        let lwin = Math.random() > 0.5;
        this.player = 2;
        this.current = 0;
        this.generateProblem(lwin);
    }

    generateProblem(lwin){
        this.stones = [];
        let xsum = 0;
        for(let i=1;i<=this.n;i++){
            if(this.n!=1 && i===this.n && lwin){
                this.stones[i] = xsum;
                xsum ^= this.stones[i];
            }
            else{
                this.stones[i] = Math.floor(Math.random()*32)+1;
                xsum ^= this.stones[i];
            }
        }

        this.winner = xsum !== 0?0:1;
    }

    operate(pile,count){
        console.log(pile,count);
        if(this.stones[pile] >= count)this.stones[pile] -= count;
        if(this.stones[pile] === 0)this.nonZero--;
        if(this.nonZero === 0)return this.current;
        this.current ^= 1;
        return -1;
    }
}
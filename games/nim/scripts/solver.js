class Solver {
    constructor(problem,drawer){
        this.problem = problem;
        this.drawer = drawer;
    }

    getHighest(x){
        let res = 1;
        while(x-res>0){
            res=(res<<1)+1;
        }
        return (res+1)>>1;
    }

    operate(){
        let xsum = 0,max=0;
        for(let i=1;i<=this.problem.n;i++){
            xsum ^= this.problem.stones[i];
        }

        if(xsum == 0){
            let pile;
            do pile = Math.floor(Math.random()*this.problem.n)+1;while (this.problem.stones[pile]==0);
            let count = Math.floor(Math.random()*this.problem.stones[pile])+1;
            this.showOperation(pile,count);
        }
        else {
            let h = this.getHighest(xsum);
            console.log(xsum,h);
            for(let i=1;i<=this.problem.n;i++){
                if((h&this.problem.stones[i])>0){
                    let pile = i;
                    let count = this.problem.stones[i] - (this.problem.stones[i]^xsum);
                    this.showOperation(pile, count);
                    break;
                }
            }
        }
    }

    showOperation(pile,count){
        new Promise((resolve,reject)=>{
            console.log(pile,count);
            setTimeout(()=>{
                this.drawer.select(pile,count);
                setTimeout(() => {
                    this.drawer.remove(pile,count);
                    resolve(this.problem.operate(pile,count));
                }, 1000);
            },500);
        }).then((win)=>{
            if(win != -1){
                lost();
            }
        });
    }
}
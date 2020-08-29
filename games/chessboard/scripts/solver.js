class Solver {
    constructor(problem) {
        this.n = problem.n;
        this.m = problem.m;
        this.c = problem.c;
        this.answer = 0;

        this.solverPromise = new Promise((resolve, reject) => {

            this.calculate();

            resolve(this.answer);
        });

        this.solverPromise.then(console.log);
    }

    calculate(){
        this.left = [];
        this.right = [];
        this.up = [];

        for(let i=0;i<this.n;i++){
            this.left[i] = [];
            this.right[i] = [];
            this.up[i] = [];
            for(let j=0;j<this.m;j++){
                this.left[i][j] = this.right[i][j] = j;
                this.up[i][j]=1;
            }
        }

        for(let i=0;i<this.n;i++){
            for(let j=1;j<this.m;j++){
                if(this.c[i][j-1]^this.c[i][j]===1)this.left[i][j]=this.left[i][j-1];
            }
            for(let j=this.m-2;j>=0;j--){
                if(this.c[i][j+1]^this.c[i][j]===1)this.right[i][j]=this.right[i][j+1];
            }

        }

        for(let i=0;i<this.n;i++){
            for(let j=0;j<this.m;j++){
                if(i>0&&this.c[i-1][j]^this.c[i][j]===1){
                    this.left[i][j]=Math.max(this.left[i][j],this.left[i-1][j]);
                    this.right[i][j]=Math.min(this.right[i][j],this.right[i-1][j]);
                    this.up[i][j]=this.up[i-1][j]+1;
                }
                let s = (this.right[i][j]-this.left[i][j]+1)*this.up[i][j];
                if(this.answer < s){
                    this.answer = s;
                    console.log(i,j);
                }
            }
        }
    }
}
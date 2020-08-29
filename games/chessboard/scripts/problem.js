class Problem {


    constructor(type = 0,...args) {
        this.answer = 0;
        this.n = Math.floor(Math.random()*30)+1;
        this.m = Math.floor(Math.random()*30)+1;
        this.c = [];
        for(let i=0;i<this.n;i++){
            this.c[i]=[];
            for(let j=0;j<this.m;j++){
                this.c[i][j]=Math.random()<0.5?0:1;
            }
        }
        let num = Math.floor(Math.random()*10);
        for(let i=0;i<num;i++) this.generateBiggerAnswer();
    }

    checkValid(p1,p2,mode){
        let u=Math.min(p1[0],p2[0]),d=Math.max(p1[0],p2[0]),l=Math.min(p1[1],p2[1]),r=Math.max(p1[1],p2[1]);
        for(let i=u;i<=d;i++){
            for(let j=l;j<=r;j++){
                if(!(i-1<u||this.c[i-1][j]^this.c[i][j]===1)||!(j-1<l||this.c[i][j-1]^this.c[i][j]===1)){
                    return false;
                }
            }
        }
        if (mode==="current") this.answer = (r-l+1)*(d-u+1);
        else if(mode==="max") this.answer = Math.max(this.answer,(r-l+1)*(d-u+1));
        return true;
    }

    generateBiggerAnswer(){
        let n = Math.floor(Math.random()*this.n)+1;
        let m = Math.floor(Math.random()*this.m)+1;
        let x = Math.floor(Math.random()*(this.n-n));
        let y = Math.floor(Math.random()*(this.m-m));
        let base = Math.random<0.5?0:1;
        for(let i=x;i<x+n;i++){
            for(let j=y;j<y+m;j++){
                this.c[i][j] = (base+i+j)&1;
            }
        }
    }
}
class Problem {
    

    constructor(type = 0){
        this.answer=0;
        this.operations = [];
        switch (type){
            case 0:
                this.n = Math.floor(Math.random() * 20 + 2);
                this.curX = this.x = Math.floor(Math.random()*this.n);
                do {
                    this.curY = this.y = Math.floor(Math.random()*this.n);
                }while (this.x == this.y);
                this.generateEdges();
                console.log(this.edges);
                break;
        }
        
    }

    generateEdges(){
        this.m=0;
        this.edges = [];
        for(let i=1;i<this.n;i++){
            this.edges.push([i,Math.floor(Math.random()*i),Math.floor(Math.random()*100+1)]);
        }
        let red=Math.floor(Math.random()*40);

        reduntant:for(let i=0;i<red;i++){
            let u=Math.floor(Math.random()*this.n),v=Math.floor(Math.random()*this.n);
            if(u==v)continue;
            for(let e of this.edges){
                if((e[0]==u&&e[1]==v)||(e[0]==v&&e[1]==u))continue reduntant;
            }
            this.edges.push([u,v,Math.floor(Math.random()*100+1)]);
        }

        this.m = this.edges.length;
    }

    swap(e){
        if(e<0)return false;
        let edge = this.edges[e];

        if(
            (edge[0]==this.curX&&edge[1]!=this.curY)||
            (edge[1]==this.curX&&edge[0]!=this.curY)
        ){
            this.curX = edge[0]+edge[1]-this.curX;
            this.operations.push([e,this.answer]);
            this.answer = Math.max(this.answer, edge[2]);
        }
        else if(
            (edge[0]==this.curY&&edge[1]!=this.curX)||
            (edge[1]==this.curY&&edge[0]!=this.curX)
        ){
            this.curY = edge[0]+edge[1]-this.curY;
            this.operations.push([e,this.answer]);
            this.answer = Math.max(this.answer, edge[2])
        }
        return (this.x==this.curY&&this.y==this.curX);
    }

    _swap(e){
        if(e<0)return false;
        let edge = this.edges[e];

        if(
            (edge[0]==this.curX&&edge[1]!=this.curY)||
            (edge[1]==this.curX&&edge[0]!=this.curY)
        ){
            this.curX = edge[0]+edge[1]-this.curX;
        }
        else if(
            (edge[0]==this.curY&&edge[1]!=this.curX)||
            (edge[1]==this.curY&&edge[0]!=this.curX)
        ){
            this.curY = edge[0]+edge[1]-this.curY;
        }
        return (this.x==this.curY&&this.y==this.curX);
    }

    undo(){
        if(this.operations.length==0)return;
        let op = this.operations.pop();
        let ret = this._swap(op[0]);
        this.answer = op[1];
        return ret;
    }
}
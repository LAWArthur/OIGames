class Drawer {
    constructor(canvas, problem, width, height) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.problem = problem;
        canvas.width = this.width = width;
        canvas.height = this.height = height;


        this.generatePosition();
    }

    getRandomPosition(){
        return [Math.random() * this.width, Math.random() * this.canvas.height];
    }

    generatePosition(){
        this.positions = [];
        for(let i=0;i<this.problem.n;i++){
            this.positions.push(this.getRandomPosition());
        }
    }

    isPointOnLine(x0,y0,x1,y1,x,y){
        let a=y1-y0,b=x0-x1,c=x1*y0-x0*y1;
        return((a*x+b*y+c)*(a*x+b*y+c)/(a*a+b*b))<=5;
    }

    draw(mouseX,mouseY){
        this.clear();

        let clickEdge = -1;

        for(let i=0;i<this.problem.m;i++){
            this.context.beginPath();

            let u=this.positions[this.problem.edges[i][0]],v=this.positions[this.problem.edges[i][1]];
            this.context.moveTo(u[0],u[1]);
            this.context.lineTo(v[0],v[1]);
            this.context.fillStyle = this.context.strokeStyle = "#000000";

            if(
                (this.problem.edges[i][0]==this.problem.curX&&this.problem.edges[i][1]!=this.problem.curY)||
                (this.problem.edges[i][1]==this.problem.curX&&this.problem.edges[i][0]!=this.problem.curY)||
                (this.problem.edges[i][0]==this.problem.curY&&this.problem.edges[i][1]!=this.problem.curX)||
                (this.problem.edges[i][1]==this.problem.curY&&this.problem.edges[i][0]!=this.problem.curX)
            ) {
                this.context.fillStyle = this.context.strokeStyle = "#FF0000";

                let rect = this.canvas.getBoundingClientRect();
                let x = mouseX - rect.left * (this.canvas.width / rect.width);
                let y = mouseY - rect.top * (this.canvas.height / rect.height);

                if(this.isPointOnLine(u[0],u[1],v[0],v[1],x,y)){
                    this.context.fillStyle = this.context.strokeStyle = "#FFFF00";
                    clickEdge = i;
                }
            }

            this.context.stroke();

            this.context.beginPath();
            
            this.context.fillText(String(this.problem.edges[i][2]), (u[0]+v[0])/2, (u[1]+v[1])/2);
        }

        for(let i=0;i<this.problem.n;i++){
            
            this.context.beginPath();
            this.context.arc(this.positions[i][0],this.positions[i][1],7,0,Math.PI * 2);
            this.context.fillStyle = "#000000";
            if(i==this.problem.x)this.context.fillStyle="#00FF00";
            else if(i==this.problem.y)this.context.fillStyle="#3333FF";
            this.context.fill();
        }

        this.context.beginPath();
        this.context.arc(this.positions[this.problem.curX][0],this.positions[this.problem.curX][1],5,0,Math.PI * 2);
        this.context.fillStyle="#00CC00";
        this.context.fill();

        this.context.beginPath();
        this.context.arc(this.positions[this.problem.curY][0],this.positions[this.problem.curY][1],5,0,Math.PI * 2);
        this.context.fillStyle="#0000CC";
        this.context.fill();
        return clickEdge;
    }

    clear(){
        this.canvas.width = this.width;
    }
}
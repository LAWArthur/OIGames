class Drawer {
    constructor(problem) {
        this.problem = problem;
        this.chessboard = [];
        this.rows = [];
        this.firstAngle = null;
        this.secondAngle = null;
        this.mouseout = false;
        this.selecting = false;
        $("#game").empty();

        for(let i=0;i<this.problem.n;i++){
            this.chessboard[i] = [];
            this.rows[i] = $("<tr></tr>");
            $("#game").append(this.rows[i]);
            for(let j=0;j<this.problem.m;j++){
                this.chessboard[i][j] = $("<td></td>").addClass("cell");
                if(problem.c[i][j]==0)this.chessboard[i][j].addClass("white");
                else this.chessboard[i][j].addClass("black");
                this.rows[i].append(this.chessboard[i][j]);

                let r=i,c=j;
                this.chessboard[i][j].mousedown((e)=>{
                    e.preventDefault();
                    this.firstAngle = this.secondAngle = [r,c];
                    this.selecting = true;
                    this.render();
                });

                this.chessboard[i][j].mouseover((e)=>{
                    e.preventDefault();
                    if(!this.selecting) return;
                    this.secondAngle = [r,c];
                    this.render();
                });
            }
        }

        $(document).mouseup((e)=>{
            this.selecting = false;
            if(!this.problem.checkValid(this.firstAngle,this.secondAngle,$("#mode").val())){
                this.firstAngle = this.secondAngle = null;
                this.render();
                $("#answer").text(this.problem.answer);
            }
            else {
                $("#answer").text(this.problem.answer);
            }
        });
    }

    render(){

        for(let i=0;i<this.problem.n;i++){
            for(let j=0;j<this.problem.m;j++){
                if(this.chessboard[i][j].hasClass("whiteSelected")){
                    this.chessboard[i][j].removeClass("whiteSelected").addClass("white");
                }
                else if(this.chessboard[i][j].hasClass("blackSelected")){
                    this.chessboard[i][j].removeClass("blackSelected").addClass("black");
                }
            }
        }

        if(this.firstAngle==null||this.secondAngle==null)return;
        for(let i=Math.min(this.firstAngle[0],this.secondAngle[0]);i<=Math.max(this.firstAngle[0],this.secondAngle[0]);i++){
            for(let j=Math.min(this.firstAngle[1],this.secondAngle[1]);j<=Math.max(this.firstAngle[1],this.secondAngle[1]);j++){
                if(this.chessboard[i][j].hasClass("white")){
                    this.chessboard[i][j].removeClass("white").addClass("whiteSelected");
                }
                else if(this.chessboard[i][j].hasClass("black")){
                    this.chessboard[i][j].removeClass("black").addClass("blackSelected");
                }
            }
        }
    }
}
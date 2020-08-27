class Drawer {
    constructor(table, problem) {
        this.table = table;
        this.problem = problem;

        this.initializeTable();
    }

    initializeTable(){
        this.table.empty();
        this.containers = [];
        this.counters = [];
        this.stones = [];
        for(let i=1;i<=this.problem.n;i++){
            this.counters[i] = $("<td></td>").text(this.problem.stones[i]);
            this.containers[i] = $("<tr></tr>").append(this.counters[i]);
            this.stones[i]=[];
            for(let j=1;j<=this.problem.stones[i];j++){
                this.stones[i][j]=$("<td class=stone></td>");
                this.containers[i].append(this.stones[i][j]);
                let st = this.stones[i][j];
                let ind = i;
                this.stones[i][j].mouseover(()=>{
                    if(this.problem.player != this.problem.current) return;
                    let lst = this.stones[ind].indexOf(st);
                    this.select(ind,lst);
                });
                this.stones[i][j].mouseout(()=>{
                    if(this.problem.player != this.problem.current) return;
                    let lst = this.stones[ind].indexOf(st);
                    this.deselect(ind,lst);
                });

                this.stones[i][j].click(()=>{
                    if(this.problem.player != this.problem.current) return;
                    let lst = this.stones[ind].indexOf(st);
                    selectedPile = ind;
                    selectedStoneCount = lst;
                    operate();
                    this.remove(ind,lst);
                });
            }
            this.table.append(this.containers[i]);
        }
    }

    select(ind, lst){
        for(let i=1;i<=lst;i++){
            this.stones[ind][i].css("background","yellowgreen");
        }
        this.stones[ind][lst].text(lst);
    }

    deselect(ind, lst){
        for(let i=1;i<=lst;i++){
            this.stones[ind][i].css("background","springgreen");
        }
        this.stones[ind][lst].text("");
    }

    remove(ind, lst){
        for(let i=1;i<=lst;i++){
            this.stones[ind][1].remove();
            this.stones[ind].splice(1,1);
        }
        this.counters[ind].text(this.stones[ind].length-1);
    }
}
class Problem {


    constructor(type = 0,...args) {
        this.answer = 0;
        this.operations = [];
        switch (type) {
            case 0:
                this.n = Math.floor(Math.random() * 20 + 2);
                this.curX = this.x = Math.floor(Math.random() * this.n);
                do {
                    this.curY = this.y = Math.floor(Math.random() * this.n);
                } while (this.x == this.y);
                this.generateEdges();
                this.name = Math.floor(Math.random()*1000000);
                console.log(this.edges);
                break;
            case 1:
                this.n = args[0];
                this.curX = this.x = args[1];
                this.curY = this.y = args[2];
                this.edges = args[3];
                this.m = this.edges.length;
                this.name = args[4];
                break;
        }

    }

    generateEdges() {
        this.m = 0;
        this.edges = [];
        for (let i = 1; i < this.n; i++) {
            this.edges.push({ u: i, v: Math.floor(Math.random() * i), w: Math.floor(Math.random() * 100 + 1) });
        }
        let red = Math.floor(Math.random() * 40);

        reduntant: for (let i = 0; i < red; i++) {
            let u = Math.floor(Math.random() * this.n), v = Math.floor(Math.random() * this.n);
            if (u == v) continue;
            for (let e of this.edges) {
                if ((e.u == u && e.v == v) || (e.u == v && e.v == u)) continue reduntant;
            }
            this.edges.push({ u: u, v: v, w: Math.floor(Math.random() * 100 + 1) });
        }

        this.m = this.edges.length;
    }

    swap(e) {
        if (e < 0) return false;
        let edge = this.edges[e];

        if (
            (edge.u == this.curX && edge.v != this.curY) ||
            (edge.v == this.curX && edge.u != this.curY)
        ) {
            this.curX = edge.u + edge.v - this.curX;
            this.operations.push([e, this.answer]);
            this.answer = Math.max(this.answer, edge.w);
        }
        else if (
            (edge.u == this.curY && edge.v != this.curX) ||
            (edge.v == this.curY && edge.u != this.curX)
        ) {
            this.curY = edge.u + edge.v - this.curY;
            this.operations.push([e, this.answer]);
            this.answer = Math.max(this.answer, edge.w);
        }
        return (this.x == this.curY && this.y == this.curX);
    }

    _swap(e) {
        if (e < 0) return false;
        let edge = this.edges[e];

        if (
            (edge.u == this.curX && edge.v != this.curY) ||
            (edge.v == this.curX && edge.u != this.curY)
        ) {
            this.curX = edge.u + edge.v - this.curX;
        }
        else if (
            (edge.u == this.curY && edge.v != this.curX) ||
            (edge.v == this.curY && edge.u != this.curX)
        ) {
            this.curY = edge.u + edge.v - this.curY;
        }
        return (this.x == this.curY && this.y == this.curX);
    }

    undo() {
        if (this.operations.length == 0) return;
        let op = this.operations.pop();
        let ret = this._swap(op[0]);
        this.answer = op[1];
        return ret;
    }
}
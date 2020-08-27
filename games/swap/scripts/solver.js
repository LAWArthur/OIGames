class Solver {
    constructor(problem) {
        this.n = problem.n;
        this.m = problem.m;
        this.x = problem.x;
        this.y = problem.y;
        this.edges = problem.edges;
        this.answer = 0;

        this.solverPromise = new Promise((resolve, reject) => {
            for (let i = 0; i < 2 * this.n; i++) {
                this.val.push([0, 0, 0]);
                this.st.push([0]);
                this.p.push([]);
                this.d.push(0);
            }
            this.kruscal();
            this.buildTree(0, -1);
            this.doublep();
            this.dfs_fh(0);
            this.dfs_FH(0, 0);
            this.getMinimalFuelCapacity(this.x, this.y);

            resolve(this.answer);
        });

        this.solverPromise.then(console.log);
    }

    getMinimalFuelCapacity(X, Y) {
        let lxy = this.lca(X, Y);
        this.answer = Math.max(this.ST(X, Y), Math.min(this.F[lxy], this.H[lxy]));
        if (this.answer == Infinity) this.answer = -1;;
    }


    id = [];
    es = [];
    val = [];
    st = [];
    p = [];
    d = [];
    idx = 0;
    h = [];
    f = [];
    H = [];
    F = [];

    find(x) {
        if (x !== this.id[x]) {
            this.id[x] = this.find(this.id[x]);
        }
        return this.id[x];
    }

    unite(x, y) {
        this.id[this.find(x)] = this.find(y);
    }

    addEdge(u, v, w, isTree) {
        this.es[u].push({ u: u, v: v, w: w, isTree: isTree });
        if (this.val[u][0] === 0 || w < this.val[u][0]) {
            this.val[u][2] = this.val[u][1]; this.val[u][1] = this.val[u][0]; this.val[u][0] = w;
        }
        else if (this.val[u][1] === 0 || w < this.val[u][1]) {
            this.val[u][2] = this.val[u][1]; this.val[u][1] = w;
        }
        else if (this.val[u][2] === 0 || w < this.val[u][2]) {
            this.val[u][2] = w;
        }
    }

    kruscal() {
        let idx = 0;
        this.edges.sort((a, b) => a.w - b.w);
        for (let i = 0; i < 2 * this.n; i++) {
            this.id.push(i);
            this.es.push([]);
        }
        for (let i = 0; i < this.m; i++) {
            let u = this.edges[i].u, v = this.edges[i].v, w = this.edges[i].w;
            if (this.find(u) !== this.find(v)) {
                this.unite(u, v);
                this.addEdge(u, this.n + idx, w, true);
                this.addEdge(v, this.n + idx, w, true);
                this.addEdge(this.n + idx, u, w, true);
                this.addEdge(this.n + idx, v, w, true);
                this.st[this.n + idx][0] = w;
                idx++;
            }
            else {
                this.addEdge(u, v, w, false);
                this.addEdge(v, u, w, false);
            }
        }
        this.idx = idx;
        console.log(this.es);
        console.log(this.val);
    }

    buildTree(u, fa) {
        this.p[u].push(fa);
        if (fa >= 0) this.d[u] = this.d[fa] + 1; else this.d[u] = 1;//注意此处特判根节点

        for (let e of this.es[u]) {
            if (!e.isTree || e.v == fa) continue;
            this.buildTree(e.v, u);
        }
    }

    doublep() {
        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < this.n + this.idx; j++) {
                if (this.p[j][i - 1] >= 0) {
                    this.p[j].push(this.p[this.p[j][i - 1]][i - 1]);
                    this.st[j].push(Math.max(this.st[j][i - 1], this.st[this.p[j][i - 1]][i - 1]));
                }
                else {
                    this.p[j].push(-1); this.st[j].push(this.st[j][i - 1]);//事实上此处不管如何赋值st都没有太多意义
                }
            }
        }
        console.log(this.p);
        console.log(this.st);
    }

    lca(u, v) {
        if (this.d[u] < this.d[v]) {
            let t = u;
            u = v;
            v = t;
        }
        for (let i = 9; i >= 0; i--) {
            if (this.p[u][i] >= 0 && this.d[this.p[u][i]] >= this.d[v]) u = this.p[u][i];
        }
        if (u == v) return v;
        for (let i = 9; i >= 0; i--) {
            if (this.p[u][i] != this.p[v][i]) u = this.p[u][i], v = this.p[v][i];
        }
        return this.p[u][0];
    }

    ST(u, v) {
        let res = 0;
        //照搬lca
        if (this.d[u] < this.d[v]) {
            let t = u;
            u = v;
            v = t;
        }
        for (let i = 9; i >= 0; i--) {
            if (this.p[u][i] >= 0 && this.d[this.p[u][i]] >= this.d[v]) res = Math.max(res, this.st[u][i]), u = this.p[u][i];
        }
        if (u == v) return Math.max(res, this.st[u][0]);
        for (let i = 9; i >= 0; i--) {
            if (this.p[u][i] != this.p[v][i]) res = Math.max(res, Math.max(this.st[u][i], this.st[v][i])), u = this.p[u][i], v = this.p[v][i];
        }
        return Math.max(Math.max(res, this.st[this.p[u][0]][0]), Math.max(this.st[u][0], this.st[v][0]));
    }

    dfs_fh(u) {
        this.f[u] = Infinity;
        this.h[u] = this.val[u][2] ? this.val[u][2] : Infinity;
        let v;
        for (let i of this.es[u]) {
            if (i.v == this.p[u][0]) continue;
            v = i.v;
            if (i.isTree) {
                this.dfs_fh(v);
                this.f[u] = Math.min(this.f[u], Math.max(this.f[v], i.w));
                this.h[u] = Math.min(this.h[u], Math.max(this.h[v], i.w));
            }
            else {
                this.f[u] = Math.min(this.f[u], i.w);
            }
        }
    }

    dfs_FH(u, w) {
        this.F[u] = this.f[u]; this.H[u] = this.h[u];
        if (this.p[u][0] >= 0) {
            this.F[u] = Math.min(this.F[u], Math.max(w, this.F[this.p[u][0]]));
            this.H[u] = Math.min(this.H[u], Math.max(w, this.H[this.p[u][0]]));
        }
        let v;
        for (let i of this.es[u]) {
            if (i.v == this.p[u][0]) continue;
            v = i.v;
            if (i.isTree) {
                this.dfs_FH(v, i.w);
            }
        }
    }
}
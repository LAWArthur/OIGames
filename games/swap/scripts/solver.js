// class Solver {
//     constructor(problem) {
//         this.n = problem.n;
//         this.m = problem.m;
//         this.edges = problem.edges;
//         this.x = problem.x;
//         this.y = problem.y;

//         this.hd=[];
//         this.hd.fill(0,0,2*this.n);
//         this.t=0;
//         this.deg=[];
//         this.deg.fill(0,0,2*this.n);

//         this.es=[];

//         this.val=[];
//         this.val.fill([0,0,0],0,2*this.n);

//         this.idx=0;

//         this.p=[];
//         this.p.fill
//     }

//     //////前向星，前三小值
//     //int hd[2 * NMAX], t, deg[2 * NMAX];

// //     struct edge{
// //     int u, v, w;
// //     bool isTree;//边是否在树上
// //     int nxt;
// // } es[4 * MMAX];

//     add_edge(u, v, w, isTree){
//         this.es[++t] = [u, v, w, isTree, this.hd[u]];
//         this.hd[u] = t;

//     // 同时计算前三小值
//     if (this.val[u][0] == 0 || w < this.val[u][0]) this.val[u][2] = this.val[u][1], this.val[u][1] = this.val[u][0], this.val[u][0] = w;
//     else if (this.val[u][1] == 0 || w < this.val[u][1]) this.val[u][2] = this.val[u][1], this.val[u][1] = w;
//     else if (this.val[u][2] == 0 || w < this.val[u][2]) this.val[u][2] = w;
// }
// //////

// //////建树，倍增，树上st表
// // int idx;//新增节点数
// // int p[2 * NMAX][LOGNMAX], st[2 * NMAX][LOGNMAX], d[2 * NMAX];

// void buildTree(int u, int fa){
//     p[u][0] = fa;
//     if (fa >= 0) d[u] = d[fa] + 1; else d[u] = 1;//注意此处特判根节点

//     for (int i = hd[u]; i; i = es[i].nxt) {
//         if (!es[i].isTree || es[i].v == fa) continue;
//         buildTree(es[i].v, u);
//     }
// }

// void doublep(){//建立倍增关系
//     for (int i = 1; i < LOGNMAX; i++) {
//         for (int j = 0; j < n + idx; j++) {
//             if (p[j][i - 1] >= 0) {
//                 p[j][i] = p[p[j][i - 1]][i - 1];
//                 st[j][i] = max(st[j][i - 1], st[p[j][i - 1]][i - 1]);
//             }
//             else p[j][i] = -1, st[j][i] = st[j][i - 1];//事实上此处不管如何赋值st都没有太多意义
//         }
//     }
// }

// inline int lca(int u, int v){
//     if (d[u] < d[v]) swap(u, v);
//     for (int i = LOGNMAX - 1; i >= 0; i--) {
//         if (p[u][i] >= 0 && d[p[u][i]] >= d[v]) u = p[u][i];
//     }
//     if (u == v) return v;
//     for (int i = LOGNMAX - 1; i >= 0; i--) {
//         if (p[u][i] != p[v][i]) u = p[u][i], v = p[v][i];
//     }
//     return p[u][0];
// }

// inline int ST(int u, int v){
//     int res = 0;
//     //照搬lca
//     if (d[u] < d[v]) swap(u, v);
//     for (int i = LOGNMAX - 1; i >= 0; i--) {
//         if (p[u][i] >= 0 && d[p[u][i]] >= d[v]) res = max(res, st[u][i]), u = p[u][i];
//     }
//     if (u == v) return max(res, st[u][0]);
//     for (int i = LOGNMAX - 1; i >= 0; i--) {
//         if (p[u][i] != p[v][i]) res = max(res, max(st[u][i], st[v][i])), u = p[u][i], v = p[v][i];
//     }
//     return max(max(res, st[p[u][0]][0]), max(st[u][0], st[v][0]));
// }
// //////

// ////// Kruscal
// int id[MMAX], bel[2 * NMAX];

// bool cmp(const int & a,const int & b) {
//     return W[a] < W[b];
// }

// int find(int u){
//     return u == bel[u] ? u : bel[u] = find(bel[u]);
// }

// void unite(int u, int v){
//     int fu = find(u), fv = find(v);
//     if (fu != fv) bel[fu] = fv;
// }

// void kruscal(){
//     for (int i = 0; i < m; i++) id[i] = i;
//     for (int i = 0; i < 2 * n; i++) bel[i] = i;
//     sort(id, id + m, cmp);//对边排序
//     for (int i = 0; i < m; i++) {
//         if (find(U[id[i]]) != find(V[id[i]])) {
//             unite(U[id[i]], V[id[i]]);
//             add_edge(U[id[i]], n + idx, W[id[i]], true);//新建一个点连边
//             add_edge(n + idx, U[id[i]], W[id[i]], true);
//             add_edge(V[id[i]], n + idx, W[id[i]], true);
//             add_edge(n + idx, V[id[i]], W[id[i]], true);
//             st[n + idx][0] = W[id[i]];
//             idx++;
//         }
//         else {
//             add_edge(U[id[i]], V[id[i]], W[id[i]], false);
//             add_edge(V[id[i]], U[id[i]], W[id[i]], false);
//         }

//         //累加度数
//         deg[V[id[i]]]++;
//         deg[U[id[i]]]++;
//     }
// }
// //////

// ////// h,f,H,F（尽管h,f计算可以合并在建树中，但分开来计算更易于管理）
// int h[2 * NMAX], f[2 * NMAX], H[2 * NMAX], F[2 * NMAX];
// void dfs_fh(int u){
//     f[u] = INF;
//     h[u] = this.val[u][2] ? this.val[u][2] : INF;
//     int v;
//     for (int i = hd[u]; i; i = es[i].nxt) {
//         if (es[i].v == p[u][0]) continue;
//         v = es[i].v;
//         if (es[i].isTree) {
//             dfs_fh(v);
//             f[u] = min(f[u], max(f[v], es[i].w));
//             h[u] = min(h[u], max(h[v], es[i].w));
//         }
//         else {
//             f[u] = min(f[u], es[i].w);
//         }
//     }
// }

// void dfs_FH(int u, int w){
//     F[u] = f[u], H[u] = h[u];
//     if (p[u][0] >= 0) {
//         F[u] = min(F[u], max(w, F[p[u][0]]));
//         H[u] = min(H[u], max(w, H[p[u][0]]));
//     }
//     int v;
//     for (int i = hd[u]; i; i = es[i].nxt) {
//         if (es[i].v == p[u][0]) continue;
//         v = es[i].v;
//         if (es[i].isTree) {
//             dfs_FH(v, es[i].w);
//         }
//     }
// }
// //////


// void init(int N, int M,
//     std:: vector < int > U, std:: vector < int > V, std:: vector < int > W) {
//     n = N, m = M;
//   :: U = U,:: V = V,:: W = W;//全局变量引用

//     kruscal();

//     buildTree(0, -1);
//     doublep();

//     dfs_fh(0);
//     dfs_FH(0, 0);
// }

// int getMinimumFuelCapacity(int X, int Y) {
//     int lxy = lca(X, Y);
//     int ans = max(ST(X, Y), min(F[lxy], H[lxy]));
//     if (ans == INF) return -1;
//     return ans;
// }
// }
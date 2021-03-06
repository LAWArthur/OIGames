let drawer;
let solver;
let problem;
let clickEdge = -1;
let finish;
let savedProblems;

($(() => {
    live2d_settings['modelId'] = 1;
    live2d_settings['modelTexturesId'] = 62;
    initModel('datas/waifu-tips.json');
    getSavedProblems();
    regenerate();
    bindEvents();
}))();

function bindEvents() {
    $("#redraw").click(() => {
        drawer.generatePosition();
        drawer.draw(0, 0);
    })

    $("#game").mousemove((e) => {
        drawer.drag(e.clientX,e.clientY);
        clickEdge = drawer.draw(e.clientX, e.clientY);
    });

    $("#game").mousedown((e)=>{
        drawer.candrag = true;
        drawer.getDragging(e.clientX,e.clientY);
    });

    $("#game").mouseup((e)=>{

    });

    $("#game").click((e) => {

        clickEdge = drawer.draw(e.clientX, e.clientY);
        setFinish(problem.swap(clickEdge));
        clickEdge = drawer.draw(e.clientX, e.clientY);
        $("#answer").text(problem.answer);
        console.log("End dragging");
        drawer.cangrag = false;
        drawer.dragging = -1;
    });

    $("#game").on("dragstart",(e)=>{
        drawer.dragging = true;
    });
     
    $("#game").on("drag",(e)=>{
        drawer.drag(e.clientX,e.clientY);
    })

    $("#game").on("dragend",(e)=>{
        drawer.dragging = false;
    });

    $("#undo").click((e) => {
        setFinish(problem.undo());
        drawer.draw(e.clientX, e.clientY);
        $("#answer").text(problem.answer);
    });

    $("#regenerate").click(() => {
        regenerate();
    });

    $("#submit").click(() => {
        if (solver.answer === problem.answer) {
            $("#ac").show();
            $("#wa").hide();
            $("#comparison").hide();
        }
        else {
            $("#wa").show();
            $("#ac").hide();
            $("#comparison").html(`<b>好像有点问题</b> 你的答案为 <span class="wa">${problem.answer}</span>，Solver 给出的答案为<span class="ac">${solver.answer}</span>。`);
            $("#comparison").show();
        }
        showResult();
    });

    $("#noanswer").click(() => {
        if (solver.answer === -1) {
            $("#ac").show();
            $("#wa").hide();
            $("#comparison").hide();
        }
        else {
            $("#wa").show();
            $("#ac").hide();
            $("#comparison").html(`<b>好像有点问题</b> 你认为此题无解，但 Solver 认为有解，答案为<span class="ac">${solver.answer}</span>。`);
            $("#comparison").show();
        }
        showResult();
    });

    $("#close").click(() => {
        $(".mask").hide();
    });

    $("#car").click(() => {
        $(".mask").hide();
        regenerate();
    });

    $("#save").click(() => {
        let name = getName();
        savedProblems[name] = {n:problem.n,x:problem.x,y:problem.y,edges:problem.edges};
        addSavedOption(name);
    });

    $("#load").click(() => {
        loadSavedProblem();
    });

    $("#post").click(saveToSociety);

    $("#loadfs").click(loadRandomFromSociety);

    window.onunload = () => {
        localStorage.setItem("savedProblems",JSON.stringify(savedProblems));
    };
}

function regenerate() {
    setFinish(false);
    $("#answer").text(0);
    problem = new Problem();
    $("#problemid").text(`#${problem.name}`);
    solver = new Solver(problem);
    drawer = new Drawer($("#game")[0], problem, 750, 750);
    drawer.draw(0, 0);
}

function setFinish(fin) {
    finish = fin;
    if (finish) $("#submit").removeAttr("disabled");
    else $("#submit").attr({ disabled: "disabled" });
}

function getSavedProblems(){
    if(localStorage.getItem("savedProblems") == null)savedProblems = {};
    else savedProblems = JSON.parse(localStorage.getItem("savedProblems"));
    for(let i in savedProblems){
        addSavedOption(i);
    }
}

function getName(){
    return $("#savename").val();
}

function loadSavedProblem(){
    let key = $("#saved").val();
    if(key!=null){
        let p = savedProblems[key];
        loadProblem(p,key);
    }
}

function loadProblem(p,key){
    setFinish(false);
    $("#answer").text(0);
    problem = new Problem(1,p.n,p.x,p.y,p.edges,key);
    solver = new Solver(problem);
    drawer = new Drawer($("#game")[0], problem, 750, 750);
    $("#problemid").text(`#${problem.name}`);
    drawer.draw(0, 0);
}

function addSavedOption(option){
    $("#saved").append($("<option></option>").attr("value",option).text(`#${option}`));
}

function showResult(){
    $(".mask").show();
    $(".result").hide().show("fold");
    $("#savename").val(problem.name);
}

function saveToSociety(){
    let data = {"graphname":getName(),"graphdata":{n:problem.n,x:problem.x,y:problem.y,edges:problem.edges}};
    let xhr = new XMLHttpRequest();
    xhr.open("POST","https://api.bmob.cn/1/classes/swap_storage");
    xhr.setRequestHeader("X-Bmob-Application-Id","4aea56c56c6be13230a4f2bc64138ed0");
    xhr.setRequestHeader("X-Bmob-REST-API-Key","0430973542ba947fd8474cfdb249be81");
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(JSON.stringify(data));
}

function loadRandomFromSociety(){
    //获得题目数量
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://api.bmob.cn/1/classes/swap_storage?sum=m_counter",true);

    xhr.onreadystatechange = (e)=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.response);
            let cnt = JSON.parse(xhr.response)["results"][0]["_sumM_counter"];
            let c = Math.floor(Math.random()*cnt);

            xhr = new XMLHttpRequest();
            xhr.open("GET",encodeURI(`https://api.bmob.cn/1/classes/swap_storage?where={"uid":${c}}`,true));
            
            xhr.onreadystatechange = (e)=>{
                if(xhr.readyState==4&&xhr.status==200){
                    console.log(xhr.response);
                    loadProblem(JSON.parse(xhr.response)["results"][0]["graphdata"],JSON.parse(xhr.response)["results"][0]["graphname"]);
                }
            }

            xhr.setRequestHeader("X-Bmob-Application-Id","4aea56c56c6be13230a4f2bc64138ed0");
            xhr.setRequestHeader("X-Bmob-REST-API-Key","0430973542ba947fd8474cfdb249be81");
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(null);
        }
    }

    xhr.setRequestHeader("X-Bmob-Application-Id","4aea56c56c6be13230a4f2bc64138ed0");
    xhr.setRequestHeader("X-Bmob-REST-API-Key","0430973542ba947fd8474cfdb249be81");
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(null);
}
let drawer;
let solver;
let problem;
let clickEdge = -1;
let finish;

($(()=>{
    live2d_settings['modelId']=1;
    live2d_settings['modelTexturesId']=62;
    initModel('../datas/waifu-tips.json');
    regenerate();
    bindEvents();
}))();

function bindEvents(){
    $("#redraw").click(()=>{
        drawer.generatePosition();
        drawer.draw(0,0);
    })

    $("#game").mousemove((e)=>{
        clickEdge = drawer.draw(e.clientX,e.clientY);
    });

    $("#game").click((e)=>{
        setFinish(problem.swap(clickEdge));
        drawer.draw(e.clientX,e.clientY);
        $("#answer").text(problem.answer);
        clickEdge = -1;
    });

    $("#undo").click((e)=>{
        setFinish(problem.undo());
        drawer.draw(e.clientX,e.clientY);
        $("#answer").text(problem.answer);
    });

    $("#regenerate").click(()=>{
        regenerate();
    });

    $("#submit").click(()=>{
        $(".mask").show();
    });

    $("#close").click(()=>{
        $(".mask").hide();
    });

    $("#car").click(()=>{
        $(".mask").hide();
        regenerate();
    });
}

function regenerate(){
    setFinish(false);
    $("#answer").text(0);
    problem = new Problem();
    drawer = new Drawer($("#game")[0],problem, 750, 750);
    drawer.draw(0,0);
}

function setFinish(fin){
    finish = fin;
    if(finish)$("#submit").removeAttr("disabled");
    else $("#submit").attr({disabled:"disabled"});
}
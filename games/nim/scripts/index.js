let drawer;
let solver;
let problem;
let selectedPile = -1,selectedStoneCount = -1;
let finish;

($(() => {
    live2d_settings['modelId'] = 1;
    live2d_settings['modelTexturesId'] = 62;
    initModel('datas/waifu-tips.json');
    regenerate();
    bindEvents();
}))();

function bindEvents() {
    $("#regenerate").click(()=>{
        regenerate();
    });

    $("#first").click(()=>{
        problem.player = 0;
    });

    $("#second").click(()=>{
        problem.player = 1;
        solver.operate();
    });

    $(".playerselection").click(()=>{
        $(".playrole").hide();
    })

    $("#car").click(()=>{
        $(".mask").hide();
        regenerate();
    });
    $("#close").click(()=>{
        $(".mask").hide();
    })
}

function regenerate() {
    problem = new Problem();
    drawer = new Drawer($("#game"), problem);
    solver = new Solver(problem, drawer);
    $(".playrole").show();
}

function operate(){
    let win = problem.operate(selectedPile, selectedStoneCount);
    if(win != -1){
        $("#ac").show();
        $("#wa").hide();
        $("#comparison").hide();
        $(".mask").show();
        $(".result").hide().show("fold");
    }
    else {
        solver.operate();
        selectedPile = -1;
        selectedStoneCount = -1;
        
    }
}

function lost(){
    $("#wa").show();
    $("#ac").hide();
    $("#comparison").html(`<b>好像有点问题</b> ${problem.player === problem.winner?"选择了正确的出手顺序，无奈何技术不过关。":"已经非常努力了，可惜出手顺序没选好。"}`);
    $("#comparison").show();
    $(".mask").show();
    $(".result").hide().show("fold");
}
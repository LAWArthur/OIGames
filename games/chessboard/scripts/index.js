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
    regenerate();
    bindEvents();
}))();

function bindEvents() {
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

    $("#close").click(() => {
        $(".mask").hide();
    });

    $("#car").click(() => {
        $(".mask").hide();
        regenerate();
    });
}

function regenerate() {
    $("#answer").text(0);
    problem = new Problem();
    solver = new Solver(problem);
    drawer = new Drawer(problem);
}

function showResult(){
    $(".mask").show();
    $(".result").hide().show("fold");
    $("#savename").val(problem.name);
}
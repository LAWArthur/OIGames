let drawer;
let solver;
let problem;
let clickEdge = -1;
let finish;

($(() => {
    live2d_settings['modelId'] = 1;
    live2d_settings['modelTexturesId'] = 62;
    initModel('datas/waifu-tips.json');
    regenerate();
    bindEvents();
}))();

function bindEvents() {
    $("#redraw").click(() => {
        drawer.generatePosition();
        drawer.draw(0, 0);
    })

    $("#game").mousemove((e) => {
        clickEdge = drawer.draw(e.clientX, e.clientY);
    });

    $("#game").click((e) => {
        clickEdge = drawer.draw(e.clientX, e.clientY);
        setFinish(problem.swap(clickEdge));
        clickEdge = drawer.draw(e.clientX, e.clientY);
        $("#answer").text(problem.answer);
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
        $(".mask").show();
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
        $(".mask").show();
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
    setFinish(false);
    $("#answer").text(0);
    problem = new Problem();
    solver = new Solver(problem);
    drawer = new Drawer($("#game")[0], problem, 750, 750);
    drawer.draw(0, 0);
}

function setFinish(fin) {
    finish = fin;
    if (finish) $("#submit").removeAttr("disabled");
    else $("#submit").attr({ disabled: "disabled" });
}
let board = document.getElementById("content");
let next = document.getElementById("current");
let end = document.getElementById("gameover");
let point = document.getElementById("points");

let arr = [];
let arr9 = [];
let row = Math.floor(board.clientWidth / 20);
let col = Math.floor(board.clientHeight / 20);
for (let i = 0; i < 5; i++) {
    arr9[i] = [];
    for (let j = 0; j < 5; j++) {
        arr9[i][j] = document.createElement("span");
        next.appendChild(arr9[i][j]);
        arr9[i][j].style.width = "30px"
        arr9[i][j].style.height = "30px";
    }
}
for (let i = 0; i < 20; i++) {
    arr[i] = [];
    for (let j = 0; j < 20; j++) {
        arr[i][j] = document.createElement("span");
        board.appendChild(arr[i][j]);
        arr[i][j].style.width = row + "px";
        arr[i][j].style.height = col + "px";
        if (i == 19) {
            arr[i][j].style.borderTop = "0.1px solid black"
        }
    }
}
let r = 1;
let c = 9;
let pointvalue = 0;
let rotate;
let itemId;
let downIntervalId;
let id;
let checkBottomarr = [];
const boxcolor = "wheat"
let nextitem = Math.floor(Math.random() * 3) + 1;

function start(){
    if(!downIntervalId){
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                arr[i][j].style.backgroundColor = "inherit";
                if(i<5&&j<5){
                    arr9[i][j].backgroundColor = "inherit"; 
                }
            }
        }
        pointvalue = 0;
        end.innerHTML=""
        end.style.display = "none";
        board.style.opacity = 1;
        point.innerHTML = "Points: " + pointvalue;

      id = makeItem();
    }else{return}
}
function makeItem() {
    r = 2;
    c = 2;
    rotate = 1;
    createremoveitem(nextitem, "inherit", rotate, arr9)
    itemId = nextitem
    nextitem = Math.floor(Math.random() * 3) + 1;
    createremoveitem(nextitem, boxcolor, rotate, arr9);
    r = 1;
    c = 9;
    checkBottomarr = [];
    checkBottomarr = createremoveitem(itemId, boxcolor, rotate, arr);

    document.body.addEventListener("keydown", itemmove);
    document.body.addEventListener("keyup", itemrotate);
    downIntervalId = setInterval(down, 300);
    return itemId;
}

function itemrotate(e) {
    createremoveitem(id, "inherit", rotate, arr);
    if (e.code == "Space") {
        if (c == 19 || c == 0) { return }
        rotate = (rotate == 4) ? 1 : ++rotate;
    }
    checkBottomarr = createremoveitem(id, boxcolor, rotate, arr);
}

function itemmove(e) {
    createremoveitem(id, "inherit", rotate, arr);
    if (e.code == "ArrowRight") {
        c = (c <= 19) ? (checkBottomarr[1].every((item) => ((item != undefined) && (item.style.backgroundColor != boxcolor)))) ? c + 1 : c : c;
    } else if (e.code == "ArrowLeft") {
        c = (c > 0) ? (checkBottomarr[2].every(item => (item != undefined) && (item.style.backgroundColor != boxcolor))) ? c - 1 : c : c;
    } else if (e.code == "ArrowDown") {
    r = ((checkBottomarr[0].every(item => (item.style.backgroundColor != boxcolor) && (!arr[19].includes(item)) ))) ? r+1 : r;
    }

    checkBottomarr = createremoveitem(id, boxcolor, rotate, arr);

}

function down() {

    if ((checkBottomarr[0].every(item => (item.style.backgroundColor != boxcolor) && (!arr[19].includes(item)) ))) {
        createremoveitem(id, "inherit", rotate, arr);
        ++r;
        checkBottomarr = createremoveitem(id, boxcolor, rotate, arr);


    } else {
        document.body.removeEventListener("keydown", itemmove);
        document.body.removeEventListener("keyup", itemrotate);
        clearInterval(downIntervalId);
        if (endgame()) { return }
        r = 1;
        c = 9;
        score();
        id = makeItem(r, c);
    }
}
down.cal

function createremoveitem(itemid = 0, color, rotate, arr) {
    if (itemid == 1) {
        if (rotate == 1) {
            arr[r][c - 1].style.backgroundColor = color;
            arr[r][c].style.backgroundColor = color;
            arr[r][c + 1].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
            return [
                [
                    arr[r + 1][c - 1],
                    arr[r + 1][c + 1],
                    arr[r + 2][c],
                ],
                [
                    arr[r][c + 2],
                    arr[r + 1][c + 1],

                ],
                [
                    arr[r][c - 2],
                    arr[r + 1][c - 1],
                ],
            ]
        } else if (rotate == 2) {
            arr[r][c].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
            arr[r + 2][c].style.backgroundColor = color;
            arr[r + 1][c + 1].style.backgroundColor = color;
            return [
                [
                    arr[r + 3][c],
                    arr[r + 2][c + 1],
                ],
                [
                    arr[r + 1][c + 2],
                    arr[r][c + 1],
                    arr[r + 2][c + 2],
                ],
                [
                    arr[r][c - 1],
                    arr[r + 1][c - 1],
                    arr[r + 2][c - 1],
                ]
            ]
        } else if (rotate == 3) {
            arr[r][c - 1].style.backgroundColor = color;
            arr[r][c].style.backgroundColor = color;
            arr[r][c + 1].style.backgroundColor = color;
            arr[r - 1][c].style.backgroundColor = color;
            return [
                [
                    arr[r + 1][c - 1],
                    arr[r + 1][c],
                    arr[r + 1][c + 1],
                ],
                [
                    arr[r - 1][c + 1],
                    arr[r][c + 2],
                ],
                [
                    arr[r][c - 1],
                    arr[r][c - 2],

                ],
            ]
        } else if (rotate == 4) {
            arr[r][c].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
            arr[r + 2][c].style.backgroundColor = color;
            arr[r + 1][c - 1].style.backgroundColor = color;
            return [
                [
                    arr[r + 3][c],
                    arr[r + 2][c - 1],
                ],
                [
                    arr[r][c + 1],
                    arr[r + 1][c + 1],
                    arr[r + 2][c + 1],
                ],
                [
                    arr[r + 1][c - 2],
                    arr[r][c - 1],
                    arr[r + 2][c - 1],



                ]
            ]
        }


    } else if (itemid == 2) {
        arr[r][c - 1].style.backgroundColor = color;
        arr[r][c].style.backgroundColor = color;
        arr[r + 1][c].style.backgroundColor = color;
        arr[r + 1][c - 1].style.backgroundColor = color;
        return [
            [
                arr[r + 2][c],
                arr[r + 2][c - 1],
            ],
            [
                arr[r][c + 1],
                arr[r + 1][c + 1],
            ],
            [
                arr[r][c - 2],
                arr[r + 1][c - 2],
            ],
        ]


    } else if (itemid == 3) {
        if ((rotate == 1) || (rotate == 3)) {
            arr[r - 1][c].style.backgroundColor = color;
            arr[r][c].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
            return [
                [
                    arr[r + 2][c],
                ],
                [
                    arr[r - 1][c + 1],
                    arr[r][c + 1],
                    arr[r + 1][c + 1],

                ],
                [
                    arr[r][c - 1],
                    arr[r + 1][c - 1],
                    arr[r + 2][c - 1],

                ],
            ]
        } else if ((rotate == 2) || (rotate == 4)) {

            arr[r][c - 1].style.backgroundColor = color;
            arr[r][c].style.backgroundColor = color;
            arr[r][c + 1].style.backgroundColor = color;
            return [
                [
                    arr[r + 1][c - 1],
                    arr[r + 1][c],
                    arr[r + 1][c + 1],
                ],
                [
                    arr[r][c + 2]
                ],
                [
                    arr[r][c - 2]
                ]
            ]
        }
    } else if (itemid == 4) {


        if (rotate == 1) {
            arr[r][c].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
            arr[r + 2][c].style.backgroundColor = color;
            arr[r + 2][c + 1].style.backgroundColor = color;
            return [
                arr[r + 3][c].style.backgroundColor,
                arr[r + 3][c + 1].style.backgroundColor,
            ]
        } else if (rotate == 2) {
            arr[r][c].style.backgroundColor = color;
            arr[r][c + 1].style.backgroundColor = color;
            arr[r][c + 2].style.backgroundColor = color;
            arr[r - 1][c + 2].style.backgroundColor = color;
            return [
                arr[r + 1][c].style.backgroundColor,
                arr[r + 1][c + 1].style.backgroundColor,
                arr[r + 1][c + 2].style.backgroundColor,
            ]
        } else if (rotate == 3) {
            arr[r][c - 1].style.backgroundColor = color;
            arr[r][c].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
            arr[r + 2][c].style.backgroundColor = color;
            return [
                arr[r + 3][c].style.backgroundColor,
                arr[r + 1][c - 1].style.backgroundColor,
            ]
        } else if (rotate == 4) {
            arr[r][c].style.backgroundColor = color;
            arr[r][c + 1].style.backgroundColor = color;
            arr[r][c + 2].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
        }
        return [
            arr[r + 1][c + 1].style.backgroundColor,
            arr[r + 1][c + 2].style.backgroundColor,
            arr[r + 2][c].style.backgroundColor,
        ]

    } else if (itemid == 5) {

        if (rotate == 1) {

            arr[r][c].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
            arr[r + 2][c].style.backgroundColor = color;
            arr[r + 2][c - 1].style.backgroundColor = color;
            return [
                arr[r + 3][c].style.backgroundColor,
                arr[r + 3][c - 1].style.backgroundColor,
            ]
        } else if (rotate == 2) {
            arr[r][c].style.backgroundColor = color;
            arr[r][c + 1].style.backgroundColor = color;
            arr[r][c + 2].style.backgroundColor = color;
            arr[r - 1][c].style.backgroundColor = color;
            return [
                arr[r + 1][c].style.backgroundColor,
                arr[r + 1][c + 1].style.backgroundColor,
                arr[r + 1][c + 2].style.backgroundColor,
            ]

        } else if (rotate == 3) {
            arr[r][c + 1].style.backgroundColor = color;
            arr[r][c].style.backgroundColor = color;
            arr[r + 1][c].style.backgroundColor = color;
            arr[r + 2][c].style.backgroundColor = color;
            return [
                arr[r + 1][c + 1].style.backgroundColor,
                arr[r + 3][c].style.backgroundColor,
            ]
        } else if (rotate == 4) {
            arr[r][c].style.backgroundColor = color;
            arr[r][c + 1].style.backgroundColor = color;
            arr[r][c + 2].style.backgroundColor = color;
            arr[r + 1][c + 2].style.backgroundColor = color;
        }
        return [
            arr[r + 1][c].style.backgroundColor,
            arr[r + 1][c + 1].style.backgroundColor,
            arr[r + 2][c + 2].style.backgroundColor,
        ]

    }

}

function score() {
    let fullrow;

    for (let i = 0; i < 19; i++) {
        if (arr[i].every(item => item.style.backgroundColor == "wheat")) {
            fullrow = i;
            pointvalue += 100;
            point.innerHTML ="Points: " + pointvalue;
            for (let i = 0; i < 20; i++) {
                arr[fullrow][i].style.backgroundColor = "inherit";
            }
            for (let i = fullrow - 1; i > 2; i--) {
                for (let j = 0; j < 20; j++) {
                    if (arr[i][j].style.backgroundColor == "wheat") {
                        arr[i][j].style.backgroundColor = "inherit";
                        arr[i + 1][j].style.backgroundColor = "wheat";
                    }
                }
            }
        }
    }
    
}
function endgame() {
    if (arr[0].some(item => item.style.backgroundColor == "wheat")) {
        clearInterval(downIntervalId);
        downIntervalId = undefined;
        document.body.removeEventListener("keydown", itemmove);
        document.body.removeEventListener("keyup", itemrotate);
        board.style.opacity = 0.2;
        end.style.fontSize = "24px";
        end.style.display = "flex";
        end.innerHTML =  `Game Over Points: ${pointvalue} `;
        document.getElementsByTagName("button")[0].innerHTML = "Restart";

        return true;

    }
    return false;
}

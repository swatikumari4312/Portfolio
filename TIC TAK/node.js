
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")

let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let box1 = document.querySelectorAll(".box");
let reset = document.querySelector(".btn");
let msg = document.querySelector("#msg");

let turno = true;

let winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5], 
    [6,7,8],
];


//function to change the turn

box1.forEach((box) => {
   box.addEventListener("click", () => {
    // console.log("button is clicked");
    if(turno){
        box.innerText ="0";
        turno = false;
        audioTurn.play();
    }
    else{
        audioTurn.play();
        box.innerText = "X";
        turno = true;
    } 
    box.disabled = true;
    checkWinner();
     
   });
});


//function to check for a win
const showWinner = (winner) =>{
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameover.play();
    disableBoxes();
};


const disableBoxes = () =>{
    for(let box of box1){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of box1){
        box.disabled = false;
        box.innerText = "";
    }
};


const resetgame =() =>{
    turno = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};




const checkWinner = () => {
    
    for(let pattern of winPatterns)
    {
        let pos1Val = box1[pattern[0]].innerText;
        let pos2Val = box1[pattern[1]].innerText;
        let pos3Val = box1[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val=== pos3Val)
            {
                // console.log("winner" , pos1Val);
             
                showWinner(pos1Val);
            }
        }

    }
};
 
newGameBtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);


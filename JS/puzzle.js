let puzzleimages = [
    [],
    [],
    ['https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    [],
    [],
    ['https://images.unsplash.com/photo-1597528662465-55ece5734101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&h=1000&q=80'],
    [],
    [],
    ['https://images.unsplash.com/photo-1530638458177-fcc275860f8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
    [],
]
let correct=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let levelnumber = getLevelNumber()-1;
document.getElementById("tranparentpreview").src=puzzleimages[levelnumber]
let pieces = document.getElementsByClassName("pp");
for(let i in pieces){
    pieces[i].innerHTML='<img src="'+puzzleimages[levelnumber]+'" alt="" class="ppimage">'
}

function shuffle(){
    for(let i =0; i<35;i++){
       let piece = pieces[i];
       let row = Math.floor(i/7);
       let column = i%7;
       let randomxoffset = Math.random()*70;
       let randomyoffset = Math.random()*15;
    //    console.log(row+", "+column);
       piece.style.transform = "translate("+((column*(-10))+randomxoffset-5)+"vh,"+((row*(-10))+55+randomyoffset)+"vh)"
    }
}
shuffle();
let curr_selected = 0;
function select(number){
    if(correct[(number-1)]==0){
        if(curr_selected>0){
            document.getElementById("pp"+curr_selected).style.boxShadow="1vh 1vh 1vh black";
            document.getElementById("pp"+curr_selected).style.zIndex="1";
        }
        curr_selected = number;
        let selected = document.getElementById("pp"+number);
        selected.style.zIndex="3";
        selected.style.boxShadow="0.5vh 0.5vh lime, -0.5vh -0.5vh lime, 0.5vh -0.5vh lime, -0.5vh 0.5vh lime";
    }
    
}
function fill(number){
    if(curr_selected>0){
        if(number==100){
            let piece = document.getElementById("pp"+curr_selected);
            let arraypos=curr_selected-1;
            let row = Math.floor(arraypos/7);
            let column = arraypos%7;
            let randomxoffset = Math.random()*70;
            let randomyoffset = Math.random()*15;
         //    console.log(row+", "+column);
            piece.style.transform = "translate("+((column*(-10))+randomxoffset-5)+"vh,"+((row*(-10))+55+randomyoffset)+"vh)"
        }
        else{
            let piece = document.getElementById("pp"+curr_selected);
            let arraypos=curr_selected-1;
            let row_p = Math.floor(arraypos/7);
            let column_p = arraypos%7;
            let row_fill = Math.floor((number-1)/7);
            let column_fill = (number-1)%7;
            piece.style.transform = "translate("+((column_p*(-10))+(column_fill*10))+"vh,"+((row_p*(-10))+(row_fill*10))+"vh)"
            if(number==curr_selected){
                correct[arraypos]=1;
            }
            console.log(correct);
            if(!correct.includes(0)){
                won();
            }
        }
        
    }
}

function won(){
    document.body.innerHTML+='<div id="greenbright"></div>';
    setTimeout(()=>{
      document.getElementById("greenbright").style.opacity="0.5"
      setTimeout(()=>{
        document.getElementById("greenbright").style.opacity="0"
        setTimeout(()=>{
          document.getElementById("greenbright").remove();
          CompletePuzzle();
        },1500)
      },500)
    },500)
}
let questions = [
  [["URL","Question",["Correct","wrong","wrong","wrong"]]],
  [
    ["https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60","Question",["Correct","wrong","wrong","wrong"]],
    ["https://images.unsplash.com/photo-1537033206914-9d3551ff8103?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGlnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60","Question",["Correct","wrong","wrong","wrong"]],
    ["https://images.unsplash.com/photo-1611192711250-892c9df53d61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBpZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60","Question",["Correct","wrong","wrong","wrong"]],
    ["https://images.unsplash.com/photo-1604135972804-24fc2d794185?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBpZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60","Question",["Correct","wrong","wrong","wrong"]],
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
]
let levelnumber = getLevelNumber()-1;
let LevelQuestions = questions[levelnumber];
let questionpointer = 0;
let correctone=0;
function nextQuestion(){
 if(questionpointer<LevelQuestions.length){
  let questiondata = LevelQuestions[questionpointer];
  document.getElementById("quizzimg").src=questiondata[0];
  document.getElementById("question").src=questiondata[1];
  let sortcorrect = false;
  for(let i = 0; i<4; i++){
    questiontopush = Math.floor(Math.random()*(4-i));

    if(questiontopush==0&&!sortcorrect){
      sortcorrect=true;
      correctone = i;
    }
    document.getElementById("a"+(i+1)).innerText=questiondata[2][questiontopush];
    questiondata[2].splice(questiontopush,1);
  }  
}

 else{
  won();
 }
}
nextQuestion();
let speedtrap = false;
function ClickAnswer(num){
  if(!speedtrap){
    speedtrap=true;
    if((num-1)==correctone){
      document.getElementById("a"+(num)).style.background="lightgreen"
      questionpointer++;
      let progressbarvalue = 100*(questionpointer/LevelQuestions.length);
      console.log(progressbarvalue);
      document.querySelector(':root').style.setProperty('--progress', progressbarvalue);
      setTimeout(()=>{
        document.getElementById("a"+(num)).style.background="white";
        nextQuestion();
        speedtrap =false;
      },1000)
    }
    else{
      document.getElementById("a"+(num)).style.background="lightcoral"
      setTimeout(()=>{
        document.getElementById("a"+(num)).style.background="white"
        speedtrap =false;
      },1000)
    }
  }  
}


function won(){
  CompletePuzzle();
}
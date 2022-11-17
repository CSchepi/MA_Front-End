let bodyRect = document.body.getBoundingClientRect();
let frame = document.getElementById("bd1").getBoundingClientRect();
let offsettop   = frame.top - bodyRect.top;
let offsetleft   = frame.left - bodyRect.left;
let offsetright   = frame.right
let offsetbottom   = frame.bottom
console.log(offsetbottom);
console.log(offsettop);
console.log(offsetright);
console.log(offsetleft);

let outcounter = 0;
webgazer.setGazeListener(function(data, elapsedTime) {
  if (data == null) {
      return;
  }
  var xprediction = data.x; //these x coordinates are relative to the viewport
  var yprediction = data.y; //these y coordinates are relative to the viewport


  if(xprediction<offsetleft || xprediction>offsetright||yprediction<offsettop||yprediction>offsetbottom){
    console.log("out");
    outcounter++;
  }
  else{
    console.log("in");
    outcounter--;
  }
  if(outcounter>50){
    console.log("Limit");
    outcounter = 0;
  }
  // console.log(xprediction+"-x"); //elapsed time is based on time since begin was called
  // console.log(yprediction+"- y"); //elapsed time is based on time since begin was called
}).begin();
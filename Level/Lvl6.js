
//APFEL
let Regionabfolge = [[12],[15],[1,2,3,4,5,6],[18],[1,2,3,4,5,6],[18],[10],[1,2,3,4,5,6],[15],[12],[3],[21],[11],[17]];
//CHANGE
let HelpComments = [];
let timesbeforespeaking = 1;
let timesbefore1hint = 2; //including times before speak 
let timesbefore2hint = 3; //including times before speak  & timesbefore 1. hint
let Fortschrittspointer = 0;
let wrongactioncount = 0;
let Stand_CO2 = 0;
let Stand_H2O = 0;
const TankRoot = document.querySelector(':root'); 
let ActionFields = [1,2,3,4,5,6,9,11,12,14,15,17,18,21];
let wrongsentences = ["Das brauche ich vielleicht später einmal.","Hier bin ich falsch.","Das brauche ich gerade nicht.","Probier vielleicht was anderes aus.","Hier gibt's nichts für mich zu tun."]

let TommiWalking = false;
let TommiinAction = false;
let TommiField = 16;
let checkspeed = 200;

let textisdisplayed = true;
let animationinprogress = true;

//CHANGE
function getLevelNumber(){
  return 6;
}

//CHANGE
setTimeout(()=>{
  ShowText("Anfangstext",true);
  setTimeout(()=>{
    // ShowText("Anfangstext 2 (optional)",true);
  },6000)
  animationinprogress = false;
  cards_Start();
},4000)


function MoveTo(position){
  if(position == 17 && Regionabfolge[Fortschrittspointer]!=17){
    position = 16;
  }
  if(position != TommiField && !animationinprogress){
    textisdisplayed = getTextShowing();
    if(!TommiinAction){
      GoTo(position);
    }
    if(!textisdisplayed){
      TommiField = position;
      TommiWalking = true;
      CheckTommiWalking();
    }
  }
}

function CheckEvent(){
  if(Regionabfolge[Fortschrittspointer].includes(TommiField)){
    Fortschrittspointer ++;
    let points = 0; 
    if(wrongactioncount<timesbeforespeaking){
        points = 75 / Regionabfolge.length; 
    }
    else if(wrongactioncount<timesbefore1hint){
        points = 65 / Regionabfolge.length; 
    }
    else if(wrongactioncount<timesbefore2hint){
      points = 53 / Regionabfolge.length; 
    }
    else{
      points = 40 / Regionabfolge.length;
    }
    addpoints(points);
    wrongactioncount =0;
    //Game Logic happening here 
    //CHANGE
    if(Fortschrittspointer == 1){
      let TraktorKlein = document.getElementById("TrK");
      let TraktorL = document.getElementById("TrL");
      let TraktorR = document.getElementById("TrR");
      TraktorKlein.style.display="none";
      animationinprogress = true;
      setTimeout(()=>{
        GoTo(8);
      },500)
      setTimeout(()=>{
        TraktorR.style.left="-60vh";
        TraktorR.style.transition="5s linear";
        TraktorL.style.left="00vh";
        TraktorL.style.transition="5s linear";
        TraktorR.style.display="block";
        setTimeout(()=>{
          TraktorR.style.left="20vh";
          setTimeout(()=>{
            TraktorR.style.display="none";
            TraktorL.style.display="block";
            setTimeout(()=>{
              TraktorL.style.left="-70vh";
              Stand_CO2 +=3;
              // addanimation("c",20,55);
              // UpdateTubes();
              setTimeout(()=>{ 
                document.getElementById("stein").style.display ="none";
                setTimeout(()=>{
                  GoTo(12);
                  setTimeout(()=>{
                    animationinprogress = false;
                    TraktorKlein.style.display="block";
                    },8500)
                },1000)
              },5200)
            },100)
          },5200)
        },100)
        
      },9000)
    }

    if(Fortschrittspointer == 2){
      setTimeout(()=>{
        document.getElementById("samen").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 3){
      setTimeout(()=>{
        document.getElementById("klein").style.display="block";
      },500);
    }
    if(Fortschrittspointer == 4){
      setTimeout(()=>{
        document.getElementById("kanne").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 5){
      setTimeout(()=>{
        document.getElementById("wasser").style.display="block";
        MoveTo(18);
      },500);
    }
    if(Fortschrittspointer == 6){
      animationinprogress=true;
      setTimeout(()=>{
        document.getElementById("kanne").style.display="block";
        NextSeason();
        setTimeout(()=>{
          document.getElementById("mittel").style.display="block";
          document.getElementById("klein").style.display="none";
          document.getElementById("wasser").style.display="none";
          animationinprogress=false;
        },2200)
      },500);
    }

    if(Fortschrittspointer == 7){
      setTimeout(()=>{
        document.getElementById("dünger_sack").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 8){
      setTimeout(()=>{
        document.getElementById("dünger").style.display="block";
        MoveTo(15);
      },500);
    }

    if(Fortschrittspointer == 9){
      animationinprogress=true;
      setTimeout(()=>{
        NextSeason();
        setTimeout(()=>{
          document.getElementById("groß").style.display="block";
          document.getElementById("mittel").style.display="none";
          document.getElementById("dünger").style.display="none";
          document.getElementById("TrK").style.display="none";
          document.getElementById("MäK").style.display="block";
          animationinprogress=false;
        },2200)
      },500);
    }

    if(Fortschrittspointer ==10){
      let TraktorKlein = document.getElementById("MäK");
      let TraktorL = document.getElementById("MäL");
      let TraktorR = document.getElementById("MäR");
      TraktorKlein.style.display="none";
      animationinprogress = true;
      setTimeout(()=>{
        GoTo(8);
      },500)
      setTimeout(()=>{
        TraktorL.style.display="none";
        TraktorR.style.left="-60vh";
        TraktorR.style.transition="5s linear";
        TraktorL.style.left="00vh";
        TraktorL.style.transition="5s linear";
        TraktorR.style.display="block";
        setTimeout(()=>{
          TraktorR.style.left="20vh";
          setTimeout(()=>{
            TraktorR.style.display="none";
            TraktorL.style.display="block";
            setTimeout(()=>{
              TraktorL.style.left="-70vh";
              Stand_CO2 +=3;
              // addanimation("c",20,55);
              // UpdateTubes();
              setTimeout(()=>{ 
                setTimeout(()=>{
                  GoTo(12);
                  document.getElementById("groß").style.display="none";
                  setTimeout(()=>{
                    document.getElementById("kiste").style.display="block";
                    revealpuzzlepiece();
                   },500)
                  setTimeout(()=>{
                    animationinprogress = false;
                    TraktorKlein.style.display="block";
                  },8500)
                },1000)
              },5200)
            },100)
          },5200)
        },100)
      },9000)
    }

    if(Fortschrittspointer ==11){
      setTimeout(()=>{
        document.getElementById("kiste").style.display="none";
      },500);
    }

    if(Fortschrittspointer ==12){
      setTimeout(()=>{
        document.getElementById("mehl").style.display="block";
      },500);
    }

    if(Fortschrittspointer ==13){
      setTimeout(()=>{
        document.getElementById("mehl").style.display="none";
      },500);
    }

    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(31,6); //Enter Product Number and Lvl number //CHANGE
    }

  }
  else{
    if(ActionFields.includes(TommiField)){
      wrongactioncount ++;
      let sprechblasentext = "";
      if(wrongactioncount>timesbeforespeaking){
        sprechblasentext = wrongsentences[Math.floor(Math.random()*wrongsentences.length)];
      }
      if(wrongactioncount>timesbefore2hint){
        sprechblasentext = HelpComments[Fortschrittspointer][Math.floor(Math.random()*HelpComments[Fortschrittspointer].length)];
      }
      if(wrongactioncount>timesbeforespeaking){
        document.getElementById("Sprechblasentext").innerText = sprechblasentext;
        document.getElementById("Sprechblasencontainer").style.opacity="1";
        setTimeout(()=>{
          document.getElementById("Sprechblasencontainer").style.opacity="0";
        },4000)
      }
    }
  }
}

function CheckTommiWalking(){
  if(getTommiWalking()){
    setTimeout(()=>{
      CheckTommiWalking();
    },checkspeed)
  }
  else{
    TommiWalking = false;
    CheckEvent();
  }
}

function UpdateTubes(){
  TankRoot.style.setProperty('--cylinder-co2', Stand_CO2);
  TankRoot.style.setProperty('--cylinder-water', Stand_H2O);
}
UpdateTubes();


let gifcounter = 0;
function addanimation(type,left,top){
  createdgif = gifcounter;
  if(type=="c"){
    document.getElementById("gifwrapper").innerHTML += '<img src="../img/LVL_General/carbon.gif" class="gameelement gif" style="left: '+left+'%; top:'+top+'%;" id="gif'+gifcounter+'">';
    gifcounter++;
  }
  if(type=="w"){
    document.getElementById("gifwrapper").innerHTML += '<img src="../img/LVL_General/water.gif" class="gameelement gif" style="left: '+left+'%; top:'+top+'%;" id="gif'+gifcounter+'">';
    gifcounter++;
  }
  setTimeout(()=>{
    document.getElementById("gif"+createdgif).remove();
  },2500)
}

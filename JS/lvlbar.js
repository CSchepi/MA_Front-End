// Points reach from 0 -100
//1 Star at 35 points, 2 Stars at 60 points, 3 Stars at 79 Points

let points = 0;
let bar = document.getElementById("lbbar");
let star1 = document.getElementById("lbstar1full")
let star2 = document.getElementById("lbstar2full")
let star3 = document.getElementById("lbstar3full")
let stars = 0;

function addpoints(amount){
    points += amount;
    if(points>100){points = 100};
    drawBar();
}
function setpoints(amount){
    points = amount;
    stars = 0;
    drawBar();
}
function getpoints(){
    return points;
}

function drawBar(){
    bar.style.width=points+"%";
}
drawBar();

function outputsize(){
    let maxbarwidth = document.getElementsByClassName("lbbarcontainer")[0].offsetWidth;
    let barpercent = bar.offsetWidth/maxbarwidth;
    if(barpercent>0.34){
        if(stars==0){
            FillStar(1);
        }
        else{
            if(barpercent>0.58){
                if(stars==1){
                    FillStar(2);
                }
                else{
                    if(barpercent>0.77 && stars==2){
                        FillStar(3);
                    }
                }
            }
        }
    }
}

function FillStar(number){
    stars=number;
    let star = document.getElementById("lbstar"+number+"full")
    let sparkel = document.getElementById("lbstarspark"+number);
    star.style.display="block";
    setTimeout(()=>{ 
        star.style.transform="scale(1.3)";
        sparkel.style.display="block";
        setTimeout(()=>{
            star.style.transform="scale(1)";
        },500)
        setTimeout(()=>{
            sparkel.style.display="none";
        },2000)
    },10)
}

new ResizeObserver(outputsize).observe(bar)

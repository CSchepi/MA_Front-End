let cards_req = new XMLHttpRequest();
let allcards = "['{}']";
let fullScreen = false;
function cards_Start(){
    cards_req.open("GET","https://ma-tommi.herokuapp.com/getIngredients",true);
    cards_req.send();
    cards_req.onreadystatechange = ()=>{
        if(cards_req.status==200&&cards_req.readyState==4&&cards_req.responseText){
            allcards = JSON.parse(cards_req.responseText);
            InitiateCards();    
            setTimeout(()=>{
                JsBarcode(".barcode").init();    
            },1000)
        }
    }
}
function InitiateCards(){
    let cards = document.getElementsByClassName("card");
    for(var c = 0; c<cards.length; c++){
        let card = cards[c];
        let id = card.id;
        let cardnum = id.replace('C','');
        if(cardnum.charAt(0)=="R"){
            cardnum = cardnum.replace('R','');
            let recipedata = null;
            let recipe_req = new XMLHttpRequest();
            recipe_req.open("GET","https://ma-tommi.herokuapp.com/getRecipes?filternum="+cardnum,true);
            recipe_req.send();
            recipe_req.onreadystatechange = ()=>{
                if(recipe_req.status==200&&recipe_req.readyState==4&&recipe_req.responseText){
                    recipedata = JSON.parse(recipe_req.responseText)[0];   
                    let fillzeros = ""
                    if(cardnum<100){fillzeros = "0"}
                    if(cardnum<10){fillzeros = "00"}
                    let zutaten = recipedata["ingredientlist"].replaceAll("//","<br>");
                    let cname = recipedata["name"];
                    if(cname.length >20){
                        cname = cname.slice(0,18)+"…";
                    }
                    document.getElementById(id).innerHTML=
                    '<div id="CR'+cardnum+'Front" style="display: block;">'+
                        '<img src="../img/Flip.png" alt="" class="cflip"  onclick="TurnCard(\'R'+cardnum+'\',1)"> '+
                        '<h3 class="cname">'+cname+'</h3>'+
                        '<img src="'+recipedata["imgurl"]+'" alt="" class="cimg">'+
                        '<div class="ccategory">Nr.'+fillzeros+cardnum+': '+recipedata["cardidentifier"]+'   </div>'+
                        '<p class="crsubtitle">Zutaten:</p>'+
                        '<p class="cringredients">'+zutaten+'</p>'+
                        '<hr class="crseperator">'+
                        '<div class="cpoints cpointumwelt crpoints1" style="width: calc(100%/2);">'+
                        '    <img class="cpointimg" src="../img/CO2Points.png" alt="">'+
                        '</div>'+
                        '<div class="cpoints cpointwater crpoints2" style="width: calc(100%/2);">'+
                        '    <img class="cpointimg cpointimgwater" src="../img/H2OPoints.png" alt="">'+
                        '</div>'+
                        '<div class="cshine" id="CshineR'+cardnum+'-1"></div>'+
                        '<div class="cshine cshine2" id="CshineR'+cardnum+'-2"></div>'+
                    '</div>'+
                    '<div id="CR'+cardnum+'Back" style="display: none;">'+
                        '<div class="cbackimg"></div>'+
                        '<img src="../img/Flip.png" alt="" class="cflip"  onclick="TurnCard(\'R'+cardnum+'\',0)">'+
                        '<h3 class="cname cbacktext">'+cname+'</h3>'+
                        '<div class="ctextfield">'+recipedata["backtext"]+'</div>'+
                        '<a href="./index.html">Jetzt Kochen! ➜</a>'+
                        '<svg class="barcode"'+
                            'jsbarcode-value="RezeptR'+cardnum+'"'+
                            'jsbarcode-textmargin="0" '+
                            'jsbarcode-fontoptions="bold"'+
                            'jsbarcode-lineColor= "#077"'+
                            'jsbarcode-displayValue=false>'+
                        '</svg>'+  
                    '</div>';
                }
            }
        }
        else{
            let cardinfos = allcards[(cardnum-1)];
            let numbersting = cardnum;
            if(cardnum<100){numbersting="0"+cardnum}
            if(cardnum<10){numbersting="00"+cardnum}
            let kategorystring = "Nüsse"
            let seasonverb = "haben"
            let dativ_n=""
            if(cardnum<95){kategorystring="Gemüse"}
            if(cardnum<62){kategorystring="Obst"}
            if(cardnum<38){kategorystring="Verarbeitet"; seasonverb ="hat"}
            if(cardnum<31){kategorystring="Tierprodukt"; seasonverb ="hat"}
            if(cardnum<17){kategorystring="Fisch"; seasonverb ="hat"}
            if(cardnum<11){kategorystring="Fleisch"; seasonverb ="hat"}
            if([57, 58, 38, 65, 66, 69, 70, 71, 75, 76, 78, 80, 81, 82, 83, 84, 85, 86, 88, 89, 92].includes(Number(cardnum))){seasonverb="hat";}
            if([39,55,67,95,97,98,99,100].includes(Number(cardnum))){dativ_n="n";}
            document.getElementById(id).classList.add("ckat"+cardinfos["type"]);
            document.getElementById(id).classList.add("cmed"+cardinfos["region"]);
            document.getElementById(id).innerHTML=
            '<div id="C'+cardnum+'Front" style="display: block;">'+
                '<img src="../img/Flip.png" alt="" class="cflip"  onclick="TurnCard('+cardnum+',1)"> '+
                '<h3 class="cname">'+cardinfos["name"]+'</h3>'+
                '<img src="../img/Zutaten/'+cardnum+'.jpg"" alt="" class="cimg">'+
                '<img src="../img/Medallien/M-'+cardinfos["region"]+'-'+cardinfos["type"]+'.png" alt="" class="cstamp">'+
                '<div class="ccategory">Nr.'+numbersting+': '+cardinfos["infobar"]+' / '+kategorystring+'  </div>'+
                '<p class="csubtitle">Saison:</p>'+
                '<div class="cseasontext">❄️ &emsp;&ensp; 🌱 &emsp;&ensp; ☀️ &emsp;&ensp; 🍂 &emsp;&ensp; ❄️</div>'+
                '<div class="cseasonbar  cpointseason">'+
                '    <div class="cseasonspan" style="width: 34%;left:40%;"></div>'+
                '    <div class="cseasonstart" style="left: 40%;"></div>'+
                '    <div class="cseasonend" style="left: 75%;"></div>'+
                '    <div class="cinfo cseasoninfo">'+cardinfos["name"]+' '+seasonverb+' von '+MonthNumberToString(cardinfos["seasonstart"])+' bis '+MonthNumberToString(cardinfos["seasonend"])+' Saison.</div>'+
                '</div>'+
                '<p class="csubtitle">Umwelt:</p>'+
                '<div class="cpoints cpointumwelt" style="width: calc(60%/2);">'+
                '    <img class="cpointimg" src="../img/CO2Points.png" alt="">'+
                '    <div class="cinfo cumweltinfo">Die Produktion von 100g '+cardinfos["name"]+dativ_n+' erzeugt '+cardinfos["carbonpoints"]+'g CO2.</div>'+
                '</div>'+
                '<p class="csubtitle cwatertitle">Wasser:</p>'+
                '<div class="cpoints cpointwater" style="width: calc(30%/2);">'+
                '    <img class="cpointimg cpointimgwater" src="../img/H2OPoints.png" alt="">'+
                '    <div class="cinfo cwaterinfo">Die Produktion von 100g '+cardinfos["name"]+dativ_n+' benötigt '+cardinfos["waterpoints"]+' Lieter Wasser.</div>'+
                '</div>'+
                '<div class="cshine" id="Cshine'+cardnum+'-1"></div>'+
                '<div class="cshine cshine2" id="Cshine'+cardnum+'-2"></div>'+
            '</div>'+
            '<div id="C'+cardnum+'Back" style="display: none;">'+
                '<div class="cbackimg"></div>'+
                '<img src="../img/Flip.png" alt="" class="cflip"  onclick="TurnCard('+cardnum+',0)">'+
                '<h3 class="cname cbacktext">'+cardinfos["name"]+'</h3>'+
                '<div class="ctextfield">'+cardinfos["backtext"]+'</div>'+
                '<svg class="barcode"'+
                    'jsbarcode-value="Zutat'+cardnum+'"'+
                    'jsbarcode-textmargin="0" '+
                    'jsbarcode-fontoptions="bold"'+
                    'jsbarcode-lineColor= "#077"'+
                    'jsbarcode-displayValue=true>'+
                '</svg>'+   
            '</div>';
        }
    }
}

// Manual shine function
function shine(cardnumber){
    let shineelement = document.getElementById("Cshine"+cardnumber+"-1");
    let shineelement2 = document.getElementById("Cshine"+cardnumber+"-2");
    shineelement.style.left="160%";
    shineelement2.style.left="150%";
    setTimeout(()=>{
        shineelement.style.display="none";
        shineelement2.style.display="none";
        shineelement.style.left="-50%";
        shineelement2.style.left="-60%";
        setTimeout(()=>{
            shineelement.style.display="block";
            shineelement2.style.display="block";
        },1000)
    },1000)
}

function MonthNumberToString(number){
    number = Number(number);
    switch(number){
        case 1: return("Januar");
        case 2: return("Februar");
        case 3: return("März");
        case 4: return("April");
        case 5: return("Mai");
        case 6: return("Juni");
        case 7: return("Juli");
        case 8: return("August");
        case 9: return("September");
        case 10: return("Oktober");
        case 11: return("November");
        case 12: return("Dezember");
        default: return("?");
    }
}

let turning = false;
function TurnCard(cardnumber, side){
    turning= true;
    let card = document.getElementById("C"+cardnumber);
    setTimeout(()=>{
        card.style.transform="rotateY(90deg)";
        setTimeout(()=>{
            if(side==0){
                document.getElementById("C"+cardnumber+"Front").style.display="block";
                document.getElementById("C"+cardnumber+"Back").style.display="none";
            }
            if(side==1){
                document.getElementById("C"+cardnumber+"Front").style.display="none";
                document.getElementById("C"+cardnumber+"Back").style.display="block";
            }
            card.style.transform="rotateY(0deg)  scale(1.2)";
            turning = false;
        },500)
    },500)
}
document.getElementById("singlecardwrapper").style.display = "none";

function FullScreen(element,skalingfactor){
    setTimeout(()=>{
        if(!turning && !fullScreen){
            fullScreen=true;
            document.getElementById("singlecardwrapper").innerHTML += element.outerHTML;
            document.getElementById("singlecardwrapper").style.display = "block";
            document.getElementById("singlecardwrapper").lastChild.style.transform = "scale("+skalingfactor+") rotateY(-90deg)";
            setTimeout(()=>{
                document.getElementById("singlecardwrapper").style.opacity = 1;
                setTimeout(()=>{
                    document.getElementById("singlecardwrapper").lastChild.style.transform = "scale("+skalingfactor+") rotateY(0deg)";
                },1000)
            },100)
        }
    },50)
}

function CloseFullscrean(){
    document.getElementById("singlecardwrapper").style.opacity = 0;
    setTimeout(()=>{
        document.getElementById("singlecardwrapper").style.display = "none";
        document.getElementById("singlecardwrapper").innerHTML = '<div class="closefull" onclick="CloseFullscrean()"><p>×</p></div>';
        fullScreen = false;
    },900)
}

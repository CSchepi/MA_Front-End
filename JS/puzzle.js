
let selectedpiece = null;
let svg = document.getElementById("psvg")
let partoffsetX = 0;
let partoffsetY = 0;
let svgBBT = svg.getBoundingClientRect().top;
let svgBBL = svg.getBoundingClientRect().left;
let svgBBB = svg.getBoundingClientRect().bottom;
let svgBBR = svg.getBoundingClientRect().right;


let offsets = [
    [
        903.3570251464844,
        479.7965393066406
    ],
    [
        744.0839233398438,
        479.8999481201172
    ],
    [
        584.2408447265625,
        478.9556884765625
    ],
    [
        895.8895874023438,
        359.82997131347656
    ],
    [
        575.9554748535156,
        245.34210205078125
    ],
    [
        583.4755249023438,
        353.54515075683594
    ],
    [
        743.5300903320312,
        359.5390167236328
    ],
    [
        751.51416015625,
        245.14820098876953
    ],
    [
        904.1102905273438,
        239.4702606201172
    ],
    [
        433.5060729980469,
        597.8393859863281
    ],
    [
        911.628173828125,
        592.2146606445312
    ],
    [
        425.13499450683594,
        478.7172088623047
    ],
    [
        433.4651794433594,
        245.4032745361328
    ],
    [
        433.4150390625,
        359.7923126220703
    ],
    [
        584.181884765625,
        592.2308959960938
    ],
    [
        735.7254638671875,
        597.7821960449219
    ],
    [
        503.4999237060547,
        597.7812805175781
    ],
    [
        503.62908935546875,
        239.15249633789062
    ],
    [
        496.1697998046875,
        478.74481201171875
    ],
    [
        511.80235290527344,
        353.4763641357422
    ],
    [
        663.1962890625,
        485.10887145996094
    ],
    [
        664.1611022949219,
        233.57823181152344
    ],
    [
        664.1126098632812,
        365.32362365722656
    ],
    [
        663.6989135742188,
        592.2442016601562
    ],
    [
        815.8781127929688,
        353.50982666015625
    ],
    [
        824.069580078125,
        592.2110595703125
    ],
    [
        823.3423461914062,
        233.57665252685547
    ],
    [
        831.8276977539062,
        485.3415222167969
    ],
    [
        974.1146240234375,
        485.29505920410156
    ],
    [
        981.615478515625,
        240.6464614868164
    ],
    [
        974.1255187988281,
        353.38934326171875
    ],
    [
        982.0995483398438,
        597.7930603027344
    ],
    [
        735.74072265625,
        186.73858642578125
    ],
    [
        584.1272583007812,
        186.70533752441406
    ],
    [
        433.39418029785156,
        186.59827423095703
    ],
    [
        895.8995971679688,
        180.36132049560547
    ],
    [
        503.2535705566406,
        186.47447204589844
    ],
    [
        663.3621826171875,
        180.35277557373047
    ],
    [
        815.6448059082031,
        180.2491455078125
    ],
    [
        974.1084899902344,
        186.6318130493164
    ],
    [
        591.7859191894531,
        299.11077880859375
    ],
    [
        903.2243041992188,
        298.8568420410156
    ],
    [
        425.25352478027344,
        298.8845520019531
    ],
    [
        735.6647338867188,
        299.0002746582031
    ],
    [
        504.1621856689453,
        293.4945755004883
    ],
    [
        663.4354553222656,
        299.6692810058594
    ],
    [
        824.0553283691406,
        293.3055953979492
    ],
    [
        974.1694946289062,
        293.4133605957031
    ],
    [
        751.5895385742188,
        418.9931335449219
    ],
    [
        433.28993225097656,
        425.32017517089844
    ],
    [
        911.7106323242188,
        419.08265686035156
    ],
    [
        584.148681640625,
        419.7304229736328
    ],
    [
        503.3430480957031,
        419.82884216308594
    ],
    [
        671.8405456542969,
        425.1497344970703
    ],
    [
        831.8948974609375,
        419.9582977294922
    ],
    [
        981.7555541992188,
        419.74620056152344
    ],
    [
        743.9349060058594,
        544.8751678466797
    ],
    [
        903.5265197753906,
        539.1565399169922
    ],
    [
        425.25823974609375,
        539.7933349609375
    ],
    [
        583.4306945800781,
        533.4343719482422
    ],
    [
        504.3724822998047,
        539.7051239013672
    ],
    [
        655.8289489746094,
        539.1591491699219
    ],
    [
        831.6071166992188,
        538.8902587890625
    ],
    [
        974.1324768066406,
        545.3876037597656
    ]
];
let zuordnung = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


function Move(id){
    if(selectedpiece!=null){
        for(let i = 0; i<64;i++){
            let x1 = offsets[i][0];
            let y1 = offsets[i][1];
            let x2 = (selectedpiece.getBoundingClientRect().left+selectedpiece.getBoundingClientRect().right)/2;
            let y2 = (selectedpiece.getBoundingClientRect().top+selectedpiece.getBoundingClientRect().bottom)/2;
            let distance = getDistance(x1,y1,x2,y2);
            if(distance<30){
                console.log("Locked at "+i);
                selectedpiece.style.transform = "translate("+(x1-offsets[id-1][0])+"px, "+(y1-offsets[id-1][1])+"px)";
                zuordnung[id-1]=i+1;
                checkwin();
                break;
            }
        }
        selectedpiece=null;
    }
    else{
        console.log(id);
        selectedpiece=document.getElementById("p"+id);
        svg.insertBefore(selectedpiece, null);
        partoffsetX = offsets[id-1][0];
        partoffsetY = offsets[id-1][1];
    }
}

onmousemove = (event) => {
    if(selectedpiece!=null){
        let xpos = event.clientX;
        let ypos = event.clientY;
        if(xpos>svgBBR-80){ xpos = svgBBR-80};
        if(xpos<svgBBL+50){ xpos = svgBBL+50};
        if(ypos>svgBBB-50){ypos=svgBBB-50};
        if(ypos<svgBBT+50){ypos=svgBBT+50};
        xpos -= (partoffsetX-20);
        ypos -= (partoffsetY-20);
        selectedpiece.style.transform="translate("+xpos+"px, "+ypos+"px)";
    }
};

function getDistance(x1,y1,x2,y2){
    let x = x2-x1;
    let y = y2-y1;
    let distance = Math.sqrt((x*x)+(y*y));
    return distance;
}

function checkwin(){
    for(let i = 0; i<64;i++){
        if(zuordnung[i]!=i+1){return false};
    }
    console.log("Correct");
    return true;
}

function Shuffle(){
    for(let i = 0; i<64;i++){
        let sideselect = Math.random()*2;
        let x = 0; 
        let y = 0; 
        if(sideselect<1){
            x = Math.random()*230+100
            y = Math.random()*400+200
        }
        else{
            x = Math.random()*300+1100
            y = Math.random()*400+200
        }
        document.getElementById("p"+(i+1)).style.transform = "translate("+((offsets[i][0]*(-1))+x)+"px,"+((offsets[i][1]*(-1))+y)+"px)";
    }
}

setTimeout(()=>{
 Shuffle();
},4000)


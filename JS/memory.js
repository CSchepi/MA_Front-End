let firstturned = false;
let opencard = null;
let foundpairs = 0;
let disableclick = false;

let cardorder = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //when filled, each number will appear twice to mark the pairs 
let cardsopen = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,] //saves which cards are image side up
let cardlinks = [null,null,null,null,null,null,null,null,null,null,null,null,]//12 urls for different images

//all img urls hardcoded 
let allurls = [['https://images.unsplash.com/photo-1650161800866-58e30cfa8205?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80','https://images.unsplash.com/photo-1653803224575-2ff779cfca9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80','https://images.unsplash.com/photo-1562016600-ece13e8ba570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80','https://images.unsplash.com/photo-1601286423471-ade6d6139024?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80','https://images.unsplash.com/photo-1608022749628-3251d92cdd79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80','https://images.unsplash.com/photo-1568147719968-c30d75159894?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80','https://images.unsplash.com/photo-1472476443507-c7a5948772fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80','https://images.unsplash.com/photo-1504263716296-ed1a29eca28c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80','https://images.unsplash.com/photo-1528750596806-ff12e21cda04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80','https://images.unsplash.com/photo-1598712584487-36ffaf2fbcc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80','https://images.unsplash.com/photo-1565060299583-08dd3af8e3cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80','https://images.unsplash.com/photo-1612524681749-2f7615663729?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],]

let LvlNumber = getLevelNumber();
console.log(LvlNumber)
let urls = allurls[LvlNumber-1];
function Initialshuffle(){
    for(let i = 1; i<12;i++){
        let placed1 = false;
        let placed2 = false;
        while(!placed1){
            let pos = Math.floor(Math.random() * 24);
            if(cardorder[pos]==0){
                cardorder[pos]=i;
                placed1 = true;
            }
        }
        while(!placed2){
            let pos = Math.floor(Math.random() * 24);
            if(cardorder[pos]==0){
                cardorder[pos]=i;
                placed2 = true;
            }
        }
    }
    console.log(cardorder);
}
Initialshuffle();


function FlipMemoryCard(cnumber){
    //only do something if a card with image side down is clicked and previous turn is over
    if(!cardsopen[cnumber]&&!disableclick){ 
        cardsopen[cnumber]=true;
        Rotate(cnumber, 1);
        if(!firstturned){
            firstturned = true;
            opencard=cnumber;
        }
        else{            
            disableclick=true;
            checkmatch(cnumber);
        }
    }
}

function Rotate(cnumber, sidetoturnto){
    //cnumber marks card to act on and sidetoturnto is 0 for turne to close and 1 for turne to open
    let card = document.getElementById("card"+cnumber);
    card.style.transform="rotateY(90deg)"
    setTimeout(()=>{
        if(sidetoturnto==0){
            card.style.backgroundImage = "url('../img/MemoryBack.png')";
        }
        else{
            console.log()
            card.style.backgroundImage = "url('"+urls[cardorder[cnumber]]+"')";
        }
        card.style.transform="rotateY(0deg)"
    },420)
}


function checkmatch(secondcard){
    let firstcard = opencard;
    if(cardorder[firstcard]==cardorder[secondcard]){
        opencard=null;
        firstturned=false;
        foundpairs++;
        disableclick=false;
        if(foundpairs>=12){
            setTimeout(()=>{
                GameWon();
            },1000)
        }
    }
    else{
        setTimeout(()=>{
            opencard=null;
            firstturned=false;
            cardsopen[firstcard]=false;
            cardsopen[secondcard]=false;
            Rotate(firstcard,0);
            Rotate(secondcard,0);
            disableclick=false;
        },3000)
    }
}

function GameWon(){
    CompletePuzzle();
}

function SetLevel(LvlNumber){
    urls = allurls[LvlNumber];
}
function CheckLogin(){
    let checkloginbyid =sessionStorage.getItem("_id");
    console.log(checkloginbyid);
    if(checkloginbyid =="null"||checkloginbyid ==null){
        window.location.href="./index.html";
    }
}
CheckLogin();

document.body.innerHTML += "<div id='impressum' onclick='window.location.href=\"./impressum.html\"'>impressum</div>";



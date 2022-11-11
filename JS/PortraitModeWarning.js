let ShowAgain = sessionStorage.getItem('PortraitModeShowAgain');

if(ShowAgain==null){
    sessionStorage.setItem('PortraitModeShowAgain',true);
    ShowAgain=true;
}
if(ShowAgain=="false"){
    ShowAgain=false;
}
if(ShowAgain=="true"){
    ShowAgain=true;
}

if(window.innerHeight>window.innerWidth&&ShowAgain)
    {
        ShowOverlay();
    }

window.addEventListener('resize', ()=>{
    if(window.innerHeight>window.innerWidth&&ShowAgain)
    {
        ShowOverlay();
    }
    if(window.innerHeight<window.innerWidth){
        let blockeritem = document.getElementById('PortraitBlock');
        if(blockeritem!=null){
            document.body.style.overflow="visible";
            blockeritem.remove();
        }
    }
});

function ShowOverlay(){
    window.scroll(0,0);
    document.body.style.overflow="hidden";
    let blockeritem = document.getElementById('PortraitBlock')
    if(blockeritem==null){
        document.body.innerHTML += "<div id='PortraitBlock' style='position: absolute;top:0;left:0;z-index:100;width: 100%;height: 100%;background: rgba(255,245,230,0.9);text-align: center;'>\n"+
    "   <div id='PortraitBlockContent' style='position: absolute; border: 2px solid black;border-radius:1vw;width: 50%;height: 50%;top:25%;left:25%'>\n"+
    "       <p>Hi! The following settings are highly recommended:</p>\n"+
    "          <h2>Use in landscape mode</h2>  \n"+
    "           <img src='../img/RotatePhone.gif' width='40%'> \n"+
    "      <a style='position:absolute;left:1vw;bottom:5px;font-size: 2vw;'><input id='PortraitCheckBox' type='checkbox'>Don't show again!</a>\n"+
    "     <a style='position:absolute;right:1vw;bottom:5px;font-size:2vw;cursor: pointer;text-decoration: underline;' onclick='skip()'>skip>></a> \n"+
    " </div>\n"+ 
    "</div>";
    }
    else{
        blockeritem.style.display='inline-block';
    }
}
function skip(){
    document.body.style.overflow="visible";
    let checkbox = document.getElementById('PortraitCheckBox').checked;
    if(checkbox){
        sessionStorage.setItem('PortraitModeShowAgain',!checkbox);
        ShowAgain=false;
    }
    document.getElementById('PortraitBlock').remove();
}
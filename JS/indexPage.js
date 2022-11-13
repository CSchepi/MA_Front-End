let RegisterField = document.getElementById("register");
let ToRegisterField = document.getElementById("toRegister");
let LoginField = document.getElementById("login");
let data=null;


//wake up backend
let wakeupt = new XMLHttpRequest().open("GET","https://ma-tommi.herokuapp.com/getIngredients?filternum=1").send();
ClearSessionStorage();

function Login(){
    let username=document.getElementById("loginName").value;
    let pw= document.getElementById("loginPw").value;
    if(username!=null && pw!=null){
        pw = PWencrypt(pw);
        if(!username.includes('@')){
            let req = new XMLHttpRequest();
            req.open("GET","https://ma-tommi.herokuapp.com/getUser?name="+username+"&pw="+pw);
            req.send();
            req.onreadystatechange = ()=>{
                if (req.readyState == 4 && req.status == 200){
                    console.log(req.responseText.length);
                    if(req.responseText.length<10){
                        window.alert("Bitte überprüfe deine Eingaben nochmal.")
                    }
                    else{
                        data = JSON.parse(req.responseText);
                        gotoHome();
                    }
                }
            }
        }
    }
}

function ToRegister(){
    RegisterField.style.display="inline";
    LoginField.style.display="none";
    ToRegisterField.style.display="none";
}
function Register(){
    username = document.getElementById("Rname").value;
    birthday = document.getElementById("Rday").valueAsNumber;
    if(username=="null"){
        window.alert("Username has already been taken.")
        return;
    }
    if(document.getElementById("Rpw1").value.length<6){
        window.alert("Das Passwort muss aus mindestens 6 Zeichen bestehen");
    }
    else{ pw1 = PWencrypt(document.getElementById("Rpw1").value);
    pw2 = PWencrypt(document.getElementById("Rpw2").value);
    cookies = document.getElementById("Rbox");
    if(username!=""&&birthday!=""&&pw1!=""&&cookies.checked){
        if(pw1!=pw2){
            window.alert("Passwörter stimmen nicht überein.");
        }
        else if(username.includes("@")){
            window.alert("Username darf kein '@' enthalten.");
        }
        else if(calculateAge(birthday)<6){
            window.alert("Das Spiel ist für Kinder unter 6 Jahren nicht geeignet.")
        }
        else{
            requsername = new XMLHttpRequest();
            requsername.open("GET","https://ma-tommi.herokuapp.com/checkUsername?name="+username)
            requsername.send();
            requsername.onreadystatechange = ()=>{
                if (requsername.readyState == 4 && requsername.status == 200){
                    if(requsername.responseText=="1"){
                        window.alert("Username has already been taken.")
                    }
                    else{
                        console.log("All information are valide.");
                        reqaddUser = new XMLHttpRequest();
                        reqaddUser.open("GET","https://ma-tommi.herokuapp.com/addUser?name="+username+"&pw="+pw1+"&bd="+birthday)
                        reqaddUser.send();
                        reqaddUser.onreadystatechange = ()=>{
                        if (reqaddUser.readyState == 4 && reqaddUser.status == 200){
                            data = JSON.parse(reqaddUser.responseText);
                            gotoHome();
                            }
                        }
                    }
                }
            }
        }
    }
    else{
        window.alert("Make sure to enter all information.")
    }

    }

}

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
function RegisterBack(){
    RegisterField.style.display="none";
    LoginField.style.display="inline";
    ToRegisterField.style.display="inline";
}
function gotoHome(){
    RegisterField.style.display="none";
    LoginField.style.display="none";
    ToRegisterField.style.display="none";
    document.getElementById("LoadingAnimation").style.display="inline";
    document.getElementById("h1").style.display="none";
    document.getElementById("h3").style.display="none";
    sessionStorage.setItem("name",data[0]["name"]);
    sessionStorage.setItem("_id",data[0]["_id"]);
    sessionStorage.setItem("lvlprogress",data[0]["lvlprogress"]);
    sessionStorage.setItem("recipes",data[0]["recipes"]);
    sessionStorage.setItem("ingredients",data[0]["ingredients"]);
    setTimeout(()=>{
        window.location.href="./Navigation.html";
    },5000)
}

function PWencrypt(pw){
    pw = String(pw);
    let output="";
    let bridge = "";
    for (var i = 0; i < pw.length-1; i++) {
        bridge += (pw.charCodeAt(i)+3*i)*(pw.charCodeAt(i+1)+7*(i+5));
    }
    bridge+=(pw.charCodeAt(pw.length-1))*(pw.charCodeAt(0)+5);
    if(bridge.length%2!=0){
        bridge+=7;
    }
    for(var i = 0; i<bridge.length;i++){
        let bit = null;
        if(Number(bridge.charAt(i))>5){
        bit = (10-Number(bridge.charAt(i)))+bridge.charAt(i+1);
        }
        else{
        bit = bridge.charAt(i)+bridge.charAt(i+1);
        }
        bit = Number(bit)+48;
        output += String.fromCharCode(bit);
    }
    return output;
}
function ClearSessionStorage(){
    sessionStorage.setItem("name",null)
    sessionStorage.setItem("_id",null)
    sessionStorage.setItem("lvlprogress",null)
    sessionStorage.setItem("recipes",null)
    sessionStorage.setItem("ingredients",null)
}
ClearSessionStorage();

const firebaseConfig = {
apiKey: "AIzaSyC0Q4mtE0Wf_FX274utq2ATbK_nAavyHTo",
authDomain: "shop-bd1.firebaseapp.com",
projectId: "shop-bd1",
storageBucket: "shop-bd1.appspot.com",
messagingSenderId: "121945443951",
appId: "1:121945443951:web:aea4c54923a8b9fa98879a",
  };
  firebase.initializeApp(firebaseConfig);
window.onload = () =>{
    const localStorageUser=localStorage.getItem("user");
    if(!!localStorageUser){
        window.location.href="/html/deshboard-page.html"
    }
} 

const Signinmodalbtn=document.querySelector("#signinbtn");
const Signupmodalbtn=document.querySelector("#signupbtn");
const Signinmodal=document.querySelector("#signinmodal");
const Signupmodal=document.querySelector("#signupmodal");
const Signinbtnclose=document.querySelector("#signinbtnclose");
const Signupbtnclose=document.querySelector("#signupbtnclose");
const signupfullname=document.querySelector("#signup-Fullname");
const signupusername=document.querySelector("#signup-Username");
const signuppassword=document.querySelector("#signup-Password");
const signupconfirmpassword=document.querySelector("#signup-ConfirmPassword");
const signupformbtn=document.querySelector("#Signup-form-btn");
const formmassege=document.querySelector("#signup-message");
const signinformbtn=document.querySelector("#signinformbtn");
const signinusername=document.querySelector("#signin-Username");
const signinpassword=document.querySelector("#signin-Password");
const signinformmassege=document.querySelector("#signinformmassege");

Signinmodalbtn.addEventListener("click" ,() => {
    Signinmodal.classList.remove("d-none");
    Signinmodal.classList.add("d-flex");
})
Signinbtnclose.addEventListener("click",()=>{
   Signinmodal.classList.remove("d-flex"); 
   Signinmodal.classList.add("d-none"); 
})
Signupmodalbtn.addEventListener("click" ,() => {
    Signupmodal.classList.remove("d-none");
    Signupmodal.classList.add("d-flex");
})
Signupbtnclose.addEventListener("click",()=>{
   Signupmodal.classList.remove("d-flex"); 
   Signupmodal.classList.add("d-none"); 
})  
signupformbtn.addEventListener("click",async ()=>{
let signupfullnamevalue=signupfullname.value;
let signupusernamevalue=signupusername.value;
let signuppasswordvalue=signuppassword.value;
let signupconfirmpasswordvalue=signupconfirmpassword.value;

if(!signupfullnamevalue){
    signinformmassege.innerHTML="Please enter fullname.";    
    return;
}
else if(!signupusernamevalue){
    formmassege.innerHTML="Please enter username.";   
    return; 
}
else if(!signuppasswordvalue){
    formmassege.innerHTML="Please enter password."; 
    return;   
}
else if(!signupconfirmpasswordvalue){
    formmassege.innerHTML="Please enter confirm password.";    
    return;
}
else if (signuppasswordvalue!=signupconfirmpasswordvalue){
    formmassege.innerHTML="Password doesn't match password confirmation.";    
    return;
}

signupformbtn.disbled="true";
const firestoreUsers=await firebase.firestore().collection("users").get();
const users =firestoreUsers.docs.map(firestoreUser=>firestoreUser.data());
const potencialuser = users.find(user => user.signupusernamevalue === signupusernamevalue);
signupformbtn.disbled="false";
let localstorageuser = null;

if (!!potencialuser) {
  formmassege.innerHTML = "Username already exists.";
} else {
  const createuser = await firebase.firestore().collection("users").add({
    signupfullnamevalue,
    signupusernamevalue,
    signuppasswordvalue
  });

  localstorageuser = {
    id: createuser.id,
    signupfullnamevalue,
    signupusernamevalue
  };
}

if (localstorageuser) {
  localStorage.setItem("user", JSON.stringify(localstorageuser));
  window.location.href = "/html/deshboard-page.html";
}

})
signinformbtn.addEventListener("click",async ()=>{
  let signinsernamevalue=signinusername.value;
  let signinpasswordvalue=signinpassword.value;
  
  if(!signinsernamevalue){
    signinformmassege.innerHTML="Please enter username.";    
    return;
  }
  else if(!signinpasswordvalue){
    signinformmassege.innerHTML="Please enter password.";    
    return;
  }

  signinformbtn.disbled="true";
  const firestoreUsers=await firebase.firestore().collection("users").get();
  const users =firestoreUsers.docs.map(firestoreUser=> ({
    ...firestoreUser.data(),
    id: firestoreUser.id
  }));
  const potencialuser = users.find(user => user.signupusernamevalue === signinsernamevalue && user.signuppasswordvalue=== signinpasswordvalue);
  signinformbtn.disbled="false";
  let localstorageuser = null;
  
  if (!!potencialuser) {
    potencialuser.signuppasswordvalue==undefined;
    localStorage.setItem("user",JSON.stringify(potencialuser));
    window.location.href="/html/deshboard-page.html";
  } else {
   signinformmassege.innerHTML="Wrong username or password."
  
  }})

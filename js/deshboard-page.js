const firebaseConfig = {
apiKey: "AIzaSyC0Q4mtE0Wf_FX274utq2ATbK_nAavyHTo",
authDomain: "shop-bd1.firebaseapp.com",
projectId: "shop-bd1",
storageBucket: "shop-bd1.appspot.com",
messagingSenderId: "121945443951",
appId: "1:121945443951:web:aea4c54923a8b9fa98879a",
};
firebase.initializeApp(firebaseConfig);

const table=document.querySelector("#table");
const tablebody=document.querySelector("#table-body");



const emptymeesage=document.querySelector("#empty");
let signinUser=null;

window.onload=async ()=>{
    localStorageuser=localStorage.getItem("user");
    if(!localStorageuser){
        window.onload.href="/html/home-page.html";
    }else{
        try{
            signinUser=JSON.parse(localStorageuser);
            hellomessage.innerHTML="Hello"+" "+signinUser.signupfullnamevalue;
            const firestoreInventory= await firebase.firestore().collection("inventory").get();
            const inventory=firestoreInventory.docs.map(item=>({
                ...item.data(),
                id:item.id
            }));
           
        const filteredInventory=inventory.filter(item=>item.userid=== signinUser.id); 
            filteredInventory.forEach(item=>{
                renderinvenory(item);
            });

            if(!firestoreInventory.lenght){
                console.log(table.classList)
                table.classList.remove("d-none");
                emptymeesage.classList.add("d-none");
            }

        }catch(e){
            console.log(e);
        }
    }
}
const hellomessage=document.querySelector("#hello-message");
const inventoryerrormessage=document.querySelector("#inventory-error-message");
const signoutbtn=document.querySelector("#signoutbtn");
const productmodal=document.querySelector("#addproductmodal");
const btnadd=document.querySelector("#btn-add");
const closebtnmodal=document.querySelector("#closeproductmodal");
const productname=document.querySelector("#product-name");
const productdescription=document.querySelector("#product-description");
const productquantity=document.querySelector("#product-quantity");
const productwarehouse=document.querySelector("#product-warehouse");
const paddbtn=document.querySelector("#product-add");
signoutbtn.addEventListener("click",()=>{
    localStorage.removeItem("user");
    window.location.href="/html/home-page.html"
})

btnadd.addEventListener("click", ()=>{
    productmodal.classList.remove("d-none");
    productmodal.classList.add("d-flex");
})
closebtnmodal.addEventListener("click",()=>{
    productmodal.classList.remove("d-flex");
    productmodal.classList.add("d-none");
});
paddbtn.addEventListener("click",async ()=>{
    const title=productname.value;
    const description=productdescription.value;
    const quantity=productquantity.value;
    const warehouse=productwarehouse.value;

    if(!title){
        inventoryerrormessage.innerHTML="Please enter title.";    
        return;
      }
      else if(!description){
        inventoryerrormessage.innerHTML="Please enter description.";    
        return;
    }

      else if(!quantity){
      inventoryerrormessage.innerHTML="Please enter quantity.";    
        return;
    }
      else if (!warehouse){
        inventoryerrormessage.innerHTML="Please enter warehouse.";    
        return;
      }
        
        const inventory = {
            title,
            description,
            quantity,
            warehouse,
            userid: signinUser.id
        };
        const createInventory= await firebase.firestore().collection("inventory").add(inventory);
        inventory.id=createInventory.id;

        renderinvenory(inventory);

        productmodal.classList.remove("d-flex");
        productmodal.classList.add("d-none");

        productname.value="";
        productdescription.value="";
        productquantity.value="";
        productwarehouse.value="";
});

const renderinvenory=(inventory)=>{
    const tr=document.createElement("tr");
    let td= document.createElement("td");
     td.innerHTML=inventory.title;
    tr.append(td);
    
    td=document.createElement("td");
    td.innerHTML=inventory.description;
    tr.append(td);
   
    td=document.createElement("td");
    td.innerHTML=inventory.quantity;
    tr.append(td);
   
    td=document.createElement("td");
    td.innerHTML=inventory.warehouse;
    tr.append(td);

    td=document.createElement("td");
    const btn=document.createElement("button");
    td.style.textAlign="right";
    btn.classList.add("btn");
    btn.classList.add("crveno-dugme");
    btn.innerHTML="Remove";
    btn.addEventListener("click", async()=>{
        const doc = await firebase.firestore().collection('inventory').doc(inventory.id);
        await doc.delete();
        tr.remove();
        
    });
    if(!tablebody.children.length){
        table.classList.remove("d-none");
    }
    td.append(btn);
    tr.append(td);

    tablebody.append(tr);
};
document.querySelector("form").addEventListener("submit",function(event){
    event.preventDefault();

    if(localStorage.getItem('formateur')==null){
        const formateurArray=[{
            bootcamp:'MERN stack',
            username: "Abdelaziz",
            email : "a@a",
           password: "a"
        }, {
            bootcamp:'PHP Laravel',
            username: "Salah",
            email : "s@s",
           password: "s"
        }];
        const formateurString=JSON.stringify(formateurArray);
        localStorage.setItem('formateur',formateurString);
    }




const formateurData=JSON.parse(localStorage.getItem('formateur'));
const mail=document.getElementById("mail").value;
const password=document.getElementById("mdp").value;
if(find(formateurData,mail,password)){
   localStorage.setItem('userConnect',JSON.stringify(find(formateurData,mail,password))); 
    window.location.href="../dashboard/admin.html";
}

else if(localStorage.getItem('listStudent')){
        const std=JSON.parse(localStorage.getItem('listStudent'));
    if(find(std,mail,password)){

        localStorage.setItem('userConnect',JSON.stringify(find(std,mail,password)));
        window.location.href="../dashboard/student.html";
    }
    else{
        alert('Email ou bien mot de passe n\'est pas correct.');
    }
   
}
else{
    alert('Local storage est vide.');
}
console.log(formateurData);
});

function find(arrayObject,mail,password){
    for(let i=0;i<arrayObject.length;i++){
        if(arrayObject[i].email==mail && arrayObject[i].password==password){
            return arrayObject[i];
        }
    }
    return null;
}
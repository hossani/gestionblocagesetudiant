document.querySelector('form').addEventListener('submit',function(event){
    event.preventDefault();
    validation_form(); } )

function validation_form(){
    const user=document.getElementById('user').value;
    const mail=document.getElementById('email').value;
    const mdp=document.getElementById('mdp').value;
if(user=='' || mail == '' || mdp == '')
{
alert("Veuillez remplir tous les champs.");
return ;
}
const dataStudent={
    username: user,
     email : mail,
    password: mdp
};

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

for(let i=0;i<formateurData.length;i++){
    if(formateurData[i].email==mail){
        alert("Vous n\'avez pas le droit d\'utiliser le mail du formateur");
        return ;  }}

let array;
if(localStorage.getItem('listStudent')==null){
array=[];
}
else {
    const validerStudent=JSON.parse(localStorage.getItem('listStudent'));
    const Formateurs=JSON.parse(localStorage.getItem('formateur'));
    for(let i=0;i<validerStudent.length ;i++){
if(validerStudent[i].email==mail){
    alert("Le mail deja existe dans le local storage");
    return ;
}
    }
   

    array=JSON.parse(localStorage.getItem('listStudent'));
}
array.push(dataStudent);
localStorage.setItem('listStudent',JSON.stringify(array));
alert("Données enregistrées avec succès dans le local storage !");
window.location.href="login.html";
}

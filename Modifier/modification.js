document.querySelector(".btn-exit").addEventListener("click",function(){
    window.location.href='../dashboard/student.html';
});


document.querySelector("form").addEventListener("submit",modification);

function modification(event){
    event.preventDefault();
    const formateurs=JSON.parse(localStorage.getItem("formateur"));
    const mod=JSON.parse(localStorage.getItem("mod"));
    const index=JSON.parse(localStorage.getItem("index"));
    const titre=document.getElementById("titre").value;
    const brief=document.getElementById("brief").value;
    const difficulte=document.getElementById("difficulte").value;
   const std=JSON.parse(localStorage.getItem("listStudent"));
   if(titre!='' && brief!='' && difficulte!=''){
    std[index].listBlocages[mod].titre=titre;
    std[index].listBlocages[mod].brief=brief;
    std[index].listBlocages[mod].blocage=difficulte;
    update_listeStudent_formateur(formateurs,std,index);
  
 
localStorage.setItem('listStudent',JSON.stringify(std));
window.location.href='../dashboard/student.html';
   }
   else{
    alert("Vous devez remplir tous les champs");
return ;
   }
}

function update_listeStudent_formateur(formateurs,listeStd,index){
    for(let i=0;i<formateurs.length;i++){
    let stockageBlocages=[];
    if(formateurs[i].listeEtudiants){
    
        for(let x=0;x<listeStd[index].listBlocages.length;x++){
            if(formateurs[i].username==listeStd[index].listBlocages[x].formateur){
                stockageBlocages.push(listeStd[index].listBlocages[x]);
            }
        }
        
        for(let j=0;j<formateurs[i].listeEtudiants.length;j++){
            if(formateurs[i].listeEtudiants[j].email==listeStd[index].email){
                formateurs[i].listeEtudiants[j].listBlocages=stockageBlocages;
                break;
            }
        }
    
    }
    }
    localStorage.setItem('formateur',JSON.stringify(formateurs));
    }
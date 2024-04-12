main ();
function main(){
document.getElementsByClassName("btn-exit")[0].addEventListener("click",change_location);
document.getElementsByClassName("btn-exit")[1].addEventListener("click",display_affichage);
document.getElementsByClassName("btn-exit")[2].addEventListener("click", dispalay_modal);

  const formateurs= JSON.parse(localStorage.getItem('formateur'));
const userConnect=JSON.parse(localStorage.getItem('userConnect'));
  const index=find_formateur_connecter(userConnect,formateurs);
  document.getElementById("nameFormateur").textContent=formateurs[index].username;

  const form=document.querySelector("form");
  affichage_blocage(formateurs,index);
  view_blocage(formateurs,index);
  view_modal(formateurs,index);
  event_button(formateurs,index);
  validation_form_modal(formateurs,index,form);
}

function find_formateur_connecter(userConnect,formateurs){
  let index=0;
  for(let i=0;i<formateurs.length;i++){
      if(userConnect.email==formateurs[i].email && userConnect.password==formateurs[i].password){
          index=i;
          localStorage.setItem("index",JSON.stringify(index));
          break;
      }
  }
  return index;
}

function affichage_blocage(formateurs,index){
  const tbody=document.querySelector('tbody');
  formateurs[index].listeEtudiants.forEach(etudiant => {
    etudiant.listBlocages.forEach(blocage=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`
      <td>${etudiant.username}</td>
      <td>${blocage.difficulte}</td>
      <td>${blocage.statut}</td>
      <td>${blocage.modal}</td>
  `; 
  tbody.appendChild(tr);
    });
  });
}

function afficherContenu(contenu) {
  const containerBig = document.querySelector(".containerBig");
  const paragraph = containerBig.querySelector("p");
  if(!contenu.solution){
    // Mettez à jour le contenu du paragraphe avec les informations souhaitées
    paragraph.innerHTML = `Titre: ${contenu.titre}<br>Brief: ${contenu.brief}<br>Difficulté: ${contenu.blocage}`;
  }
  else {
      paragraph.innerHTML = `Titre: ${contenu.titre}<br>Brief: ${contenu.brief}<br>Difficulté: ${contenu.blocage}<br>Solution choisie:${contenu.solution}`;

  }
  // Afficher le conteneur de contenu
  document.querySelector(".modal-overlay").style.display = "block";
  document.querySelector(".display").style.display = "block";
};

function view_blocage(formateurs,index){
  let k=0;
  for(let i=0;i<formateurs[index].listeEtudiants.length;i++){
    for(let j=0;j<formateurs[index].listeEtudiants[i].listBlocages.length;j++){
      const row=document.querySelectorAll("#tableau tbody tr")[k];
      row.querySelector('td:nth-child(2)').addEventListener("click",function(){
        afficherContenu(formateurs[index].listeEtudiants[i].listBlocages[j]);
      });
      k++;
    }
  }
} 

function view_modal(formateurs,index){
  let k=0;
  for(let i=0;i<formateurs[index].listeEtudiants.length;i++){
    for(let j=0;j<formateurs[index].listeEtudiants[i].listBlocages.length;j++){
      const row=document.querySelectorAll("#tableau tbody tr")[k];
      row.querySelector('td:nth-child(4)').addEventListener("click",function(){
        document.querySelector(".modal-overlay").style.display = "block";
        document.querySelector(".display-modal").style.display = "block";
        const repere=[i,j];
        localStorage.setItem("repere",JSON.stringify(repere));
      });
      k++;
    }
  }
} 

function change_location(){
  window.location.href='../Main page/login.html';
}
function display_affichage(){
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector(".display").style.display = "none";
}
function dispalay_modal(){
  const buttons=document.querySelectorAll('input[type="radio"]');
  const textarea=document.querySelectorAll(".container-textarea textarea");
  for(let j=0;j<buttons.length;j++){
    buttons[j].checked=false;
    textarea[j].value='';
    textarea[j].style.display="none";

}
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector(".display-modal").style.display = "none";
}


function event_button(formateurs,index){
  const buttons=document.querySelectorAll('input[type="radio"]');
  const textarea=document.querySelectorAll(".container-textarea textarea");

  buttons.forEach(function(button,i){
button.addEventListener("click",function(){
    textarea[i].style.display="block";
    let indice=i;
     localStorage.setItem("indiceModal",JSON.stringify(indice));
    // ici je dois recupper l'etudiant et liste etudiant principale je dois faire modification sur statut et apres stocker nouvelle liste etudiant 
    for(let j=0;j<buttons.length;j++){
     if(indice!=j){
       buttons[j].checked=false;
       textarea[j].style.display="none";
     }
    }   
});
  });

}

function validation_form_modal(formateurs,index,form){

form.addEventListener("submit",function(){
  const indice=JSON.parse(localStorage.getItem("indiceModal"));
  const textarea=document.querySelectorAll(".container-textarea textarea");
  const label=document.querySelectorAll(".card-radio-text label")[indice].textContent;

    if(textarea[indice].value!=""){
      let indiceEtudiant;
      let compteur=0;
    const listStudent=JSON.parse(localStorage.getItem('listStudent'));
    const cordonnees=JSON.parse(localStorage.getItem("repere"));
    formateurs[index].listeEtudiants[cordonnees[0]].listBlocages[cordonnees[1]].solution=label+"<br>Reponse:"+textarea[indice].value;
    formateurs[index].listeEtudiants[cordonnees[0]].listBlocages[cordonnees[1]].statut='<img src="statusY.png" alt="">';
    formateurs[index].listeEtudiants[cordonnees[0]].listBlocages[cordonnees[1]].modifier='<img src="modifierNone.png" alt="" class="modifier">';
    formateurs[index].listeEtudiants[cordonnees[0]].listBlocages[cordonnees[1]].supprimer='<img src="deleteNone.png" alt="" class="delete">';

    localStorage.setItem("formateur",JSON.stringify(formateurs));
    for(let i=0;i<listStudent.length;i++){
      if(listStudent[i].email==formateurs[index].listeEtudiants[cordonnees[0]].email){
        indiceEtudiant=i;
        break;
      }
    }
   for(let j=0;j<listStudent[indiceEtudiant].listBlocages.length;j++){
    if(listStudent[indiceEtudiant].listBlocages[j].formateur==formateurs[index].username){
      listStudent[indiceEtudiant].listBlocages[j]=formateurs[index].listeEtudiants[cordonnees[0]].listBlocages[compteur];
      compteur++;
    }
   }
   localStorage.setItem("listStudent",JSON.stringify(listStudent));
    alert("Enregistrer avec succes");
  }
  else {
    alert("Merci de remplir le champs de validation");
  }
});
}


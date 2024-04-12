document.getElementById('ajouterLigne').addEventListener('click',function(){ window.location.href='../Ajouter/ajouter.html';});
const formateurs=JSON.parse(localStorage.getItem('formateur'));
const listeStd=JSON.parse(localStorage.getItem('listStudent'));
const user=JSON.parse(localStorage.getItem('userConnect'));
document.getElementById("myName").textContent= user.username;
const tbody= document.querySelector("tbody");
tbody.innerHTML='';
main_Function(listeStd,user);

document.getElementsByClassName("btn-exit")[0].addEventListener("click", function() {
    console.log("xxxxxxxx");
    window.location.href='../Main page/register.html';  });

    document.getElementsByClassName("btn-exit")[1].addEventListener("click", display_fun);

function main_Function(listeStd,user){
    let index=0;
    for(let i=0;i<listeStd.length;i++){
        if(user.email==listeStd[i].email && user.password==listeStd[i].password){
            index=i;
            localStorage.setItem("index",JSON.stringify(index));
            break;
        }
    }
    if (listeStd[index] && listeStd[index].listBlocages) {
    const size=listeStd[index].listBlocages.length-1;
    trie_afficherSurDashboard(listeStd,index,size);
    addEventColonneBlocage(listeStd,index);
    modification_blocage(size,index);
    delete_item(listeStd,size,index);
    }
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
    
    function trie_afficherSurDashboard(listeStd,index,size){
        for(let a=size;a>=0;a--){
            const row=document.createElement("tr");
            const bloque=listeStd[index].listBlocages[a];
            row.innerHTML = `
            <td>${bloque.date}</td>
            <td>${bloque.difficulte}</td>
            <td>${bloque.statut}</td>
            <td>${bloque.modifier}</td>
            <td>${bloque.supprimer}</td>
        `;
        tbody.appendChild(row); } };

    function addEventColonneBlocage(listeStd,index){
        const rows = document.querySelectorAll("#tableau tbody tr");
        rows.forEach(function(row, j) {
            const bloqueDifficulte = row.querySelector("td:nth-child(2)");
            bloqueDifficulte.addEventListener("click", function() {
                const contenu = listeStd[index].listBlocages[listeStd[index].listBlocages.length-1-j]; // Obtenez le contenu correspondant à l'index de la ligne
                afficherContenu(contenu); // Appelez une fonction pour afficher le contenu
            });
        });  };

function modification_blocage(size,index){
    const rows=document.querySelectorAll("#tableau tbody tr");
    rows.forEach(function(row,j){
        const modif=row.querySelector("td:nth-child(4)").querySelector("img");
        modif.addEventListener("click",function(event){
            const etudiant=JSON.parse(localStorage.getItem('listStudent'));
        const indice= size-j;
        if(event.target.getAttribute('src')=="modifierNone.png" ){
        alert("Le formateur a validé votre blocage");
return ;  }
            localStorage.setItem("mod",JSON.stringify(indice));
            window.location.href='../Modifier/modifier.html';
        });
    });
};

  function display_fun(){
    document.querySelector(".modal-overlay").style.display = "none";
    document.querySelector(".display").style.display = "none";
  };

  function delete_item(listeStd,size,index){

    const rows = document.querySelectorAll("#tableau tbody tr");
    rows.forEach(function(row,j){
        const del=row.querySelector("td:nth-child(5)").querySelector("img");
        del.addEventListener("click",function(){
            const indice = size-j;
            const statusIcon = row.querySelector("td:nth-child(3)").innerHTML;

            console.log(statusIcon);
console.log(j);
if (statusIcon === '<img src="statusY.png" alt="">') {
    alert("Impossible de supprimer une ligne déjà validée !");
    return; // Empêche la suppression si la ligne est déjà validée
}
            console.log('apres la condition if :');

                const newBlocage=listeStd[index].listBlocages.filter(function(bloque,ind){ return ind!=indice; });
                    listeStd[index].listBlocages=newBlocage;
                    localStorage.setItem("listStudent",JSON.stringify(listeStd));
                    update_listeStudent_formateur(formateurs,listeStd,index);
                    location.reload(); 
            } );
        });
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


function displayClient() {
  let nom = document.getElementById('name').value;
  let prenom = document.getElementById('firstname').value;
  let civ = document.getElementById('civility').value;
  let password = document.getElementById('password').value;
  let age = document.getElementById('age').value;
  let status = document.getElementById('status').checked;
  let message;
  document.getElementById('message').style.color = "red";

  // If conditions is ok
  if (nom.length >=5
      && prenom.length >=5 
      && password.length != 0
      && password.length <= 6
      && age != ""
      ) { 
    let newClient = new Client (nom, prenom, password, civ, status, parseInt(age));
    clients.push(newClient);
    message = "Félicitations, l'ajout du client à fonctionner";
    document.getElementById('message').style.color = "green";
    document.getElementById('name').value = "";
    document.getElementById('firstname').value = "";
    document.getElementById('password').value = "";
    document.getElementById('age').value = "";
    document.getElementById('status').checked = true;

  }
  // ELSE
  else {
    message = controles(nom, prenom, age, password);
  }
  document.getElementById('message').innerHTML = message;
}

function controles(nom, prenom, age, password) {
  let message = "Erreurs sur les champs suivants: ";
  if (nom.length < 5) {
    message += "Nom ";
    document.getElementById('name').value = "";
  }
  if (prenom.length < 5) {
    message += "Prenom ";
    document.getElementById('firstname').value = "";
  }
  if (age == "") {
    message += "Age ";
    document.getElementById('age').value = "";
  }
  if (password.length > 5 || password == "") {
    message += "Password ";
    document.getElementById('password').value = "";
  }
  return message;
}

function choiceUser() {
  let action = document.getElementById('info').value;
  let recherche = document.getElementById('text-search').value;

  // IF Search
  if (action == 'search') {
    let found = false;
    for (i=0; i < clients.length; i++) {
      if (recherche == clients[i].nom) {
        found = true;
        document.getElementById('message2').innerHTML = clients[i].civilite + ' ' + clients[i].nom.toUpperCase() + ' ' +
          clients[i].prenom + "(" + clients[i].age + " ans)";
        break;
      }
    }
    if (!found) {
      document.getElementById('message2').innerHTML = "Désolé, le client n'est pas répertorié";
    }
  }


  // IF Avairage
  else if (action == 'avairage') {
    let avairage = 0;
    for (i in clients) {
      avairage += clients[i].age;
    }
    avairage = avairage/clients.length;
    document.getElementById('message2').innerHTML = "Moyenne d'age des clients: " + avairage;
  }
}




class Client {
  constructor(nom, prenom, pass, civilite, status, age) {
    this.nom = nom;
    this.prenom = prenom;
    this.password = pass;
    this.civilite = civilite;
    this.status = status;
    this.age = age;
  }
}

let clients = [
  new Client('TEST', 'Jean', 'ABCD', 'Monsieur', true, 25 ), 
  new Client('TEST2', 'Edouard', 'ABCD', 'Madame', true, 35 )
];

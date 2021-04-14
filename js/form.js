/* Functions ID
  1. addElementsInTabClients
  2. addElementsInTabCommandes
  3. connexion

*/



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
    let newClient = new Client ("", nom, prenom, password, civ, status, age);
    $.ajax({
      url: `http://localhost:3000/clients`,
      type: 'POST',
      dataType: 'JSON',
      contentType: "application/json",
      data: serializeClient(newClient)
    })
    .done(function(data){
      console.log(data);
      message = "Félicitations, l'ajout du client à fonctionner";
      document.getElementById('message').innerHTML = message;
      document.getElementById('message').style.color = "green";
      document.getElementById('name').value = "";
      document.getElementById('firstname').value = "";
      document.getElementById('password').value = "";
      document.getElementById('age').value = "";
      document.getElementById('status').checked = true;
    })


  }
  // ELSE
  else {
    message = controles(nom, prenom, age, password);
    document.getElementById('message').innerHTML = message;
  }
  
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
    $.ajax({
      url: `http://localhost:3000/clients?nom=${recherche}`,
      type: 'GET',
      dataType: 'JSON'
    })
    .done(function(data){
      console.log(data[0])
      let a = new Client().deserialize(data[0]);
      console.log(a)
      if (data[0]) {
        document.getElementById('message2').innerHTML = data[0].civilite + ' ' + data[0].nom.toUpperCase() + ' ' +
          data[0].prenom + "(" + data[0].age + " ans)";
          
      } else {
        document.getElementById('message2').innerHTML = "Désolé, le client n'est pas répertorié";
      }
    })
  }


  // IF Avairage
  else if (action == 'avairage') {
    let avairage = 0;
    $.ajax({
      url: `http://localhost:3000/clients`,
      type: 'GET',
      dataType: 'JSON'
    })
    .done(function(data){
      for (d in data) {
        avairage += parseInt(data[d].age);
      }
      avairage = avairage/data.length;
      document.getElementById('message2').innerHTML = "Moyenne d'age des clients: " + avairage;
    })
  }


  // IF List
  else if (action == 'list') {
    $.ajax({
      url: `http://localhost:3000/clients`,
      type: 'GET',
      dataType: 'JSON'
    })
    .done(function(data){
      document.getElementById('message2').innerHTML = "Les clients sont: ";
      for (d in data) {
        document.getElementById('message2').innerHTML += '<br>' + data[d].nom + ' ' + data[d].prenom;
      }

    })
  }
}


function getAll() {
  requestsJQuery('GET', 'http://localhost:3000/clients', 1);
  requestsJQuery('GET', 'http://localhost:3000/commandes', 2);
  if (localStorage.getItem('username')) {
    document.getElementById('title').innerHTML = 'MyCRM (connecté en tant que ' + localStorage.getItem('username') + ')';
  } else {
    document.getElementById('title').innerHTML = 'MyCRM';
  }
  
}


function requestsJQuery(type, url, idFunction, data) {
  $.ajax({
    url: url,
    type: type,
    dataType: 'JSON',
    contentType: "application/json",
    data: data
  })
  .done(function(data) {
    switch (idFunction) {
      case 1:
        addElementsInTabClients(data);
        break
      case 2:
        addElementsInTabCommandes(data);
        break;
      case 3:
        saveToSession(data);
    }


  })
}


// Function ID 1
function addElementsInTabClients(data) {
  let identifieRowClient = 1;
  let tabClient = document.getElementById('tabClient');
    for (i in data) {
      let client = new Client().deserialize(data[i])
      let row = tabClient.insertRow(identifieRowClient);
      let cell1 = row.insertCell(0);
      cell1.innerHTML = data[i].id;
      row.insertCell(1).innerHTML = client.nom;
      row.insertCell(2).innerHTML = client.prenom;
      row.insertCell(3).innerHTML = client.age;
      row.insertCell(4).innerHTML = client.civilite;
      row.insertCell(5).innerHTML = client.statusToString();
      identifieRowClient++;
    }
}

// Function ID 2
function addElementsInTabCommandes(data) {
  let identifieRow = 1;
  let tabCommande = document.getElementById('tabCommande');
  for (i in data) {
    let cmd = new Commande().deserialize(data[i])
    console.log(cmd)
    let row = tabCommande.insertRow(identifieRow);
    row.insertCell(0).innerHTML = cmd.id;
    row.insertCell(1).innerHTML = cmd.numero;
    row.insertCell(2).innerHTML = cmd.varWithEuro(cmd.prix);
    row.insertCell(3).innerHTML = cmd.varWithEuro(cmd.getPrixTTC());
    row.insertCell(4).innerHTML = cmd.etat;
    row.insertCell(5).innerHTML = cmd.Client.display();
    identifieRow++;
  }
}

// Function ID 3
function saveToSession(data) {
  try {
    let user = new User().deserialize(data[0]);
    console.log(user.username);
    localStorage.setItem('username', user.username);
    console.log(localStorage.getItem('username'));
    window.location.href = 'home.html';
  } catch (err) {
    document.getElementById('error').innerHTML = err;
  }

}


function login() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  requestsJQuery('GET', `http://localhost:3000/users?username=${username}&password=${password}`, 3);
}

function deconnexion() {
  localStorage.clear();
  document.getElementById('title').innerHTML = 'MyCRM';
}

function back() {
  window.history.back();
}


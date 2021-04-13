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
    let newClient = new Client (nom, prenom, password, civ, status, age);
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
      let clients = JSON.stringify(data);
      console.log(data);
      console.log(clients);
      for (d in data) {
        document.getElementById('message2').innerHTML += '<br>' + data[d].nom + ' ' + data[d].prenom;
      }

    })
  }
}




class Client {
  constructor(nom, prenom, pass, civilite, status, age) {
    this.id;
    this.nom = nom;
    this.prenom = prenom;
    this.password = pass;
    this.civilite = civilite;
    this.status = status;
    this.age = age;
  }
}

function serializeClient(client) {
  return JSON.stringify({
    nom: client.nom,
    prenom: client.prenom,
    password: client.pass,
    civilite: client.civilite,
    status: client.status,
    age: parseInt(client.age)
  })
}

let clients = [
  new Client('TEST', 'Jean', 'ABCD', 'Monsieur', true, 25 ), 
  new Client('TEST2', 'Edouard', 'ABCD', 'Madame', true, 35 )
];

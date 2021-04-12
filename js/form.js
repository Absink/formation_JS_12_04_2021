let clients = [];

function displayClient() {
  let nom = document.getElementById('name').value;
  let prenom = document.getElementById('firstname').value;
  let civ = document.getElementById('civility').value;
  let password = document.getElementById('password').value;
  let status = document.getElementById('status').checked;
  let message;
  document.getElementById('message').style.color = "red";

  // If conditions is ok
  if (nom.length >=5 && prenom.length >=5 && password.length != 0) {
    let newClient = new Client (nom, prenom, password, civ, status);
    clients.push(newClient);
    message = 'Bonjour ' + civ + ' ' + nom + ' ' + prenom;
    document.getElementById('message').style.color = "green";
    alert("Nouveau client " + nom + " sur " + clients.length + " clients");
    document.getElementById('name').value = "";
    document.getElementById('firstname').value = "";
    document.getElementById('password').value = "";
    document.getElementById('status').checked = true;


  // ELSE
  } else if (nom.length < 5 && prenom.length < 5) {
    message = 'Le nom et le prenom est trop court';
    document.getElementById('name').value = "";
    document.getElementById('firstname').value = "";
  } else if (nom.length < 5) {
    message = 'Le nom est trop court';
    document.getElementById('name').value = "";
  } else {
    message = 'Le prenom est trop court';
    document.getElementById('firstname').value = "";
  }
  document.getElementById('message').innerHTML = message;
}

class Client {
  constructor(nom, prenom, pass, civilite, status) {
    this.nom = nom;
    this.prenom = prenom;
    this.password = pass;
    this.civilite = civilite;
    this.status = status;
  }
}


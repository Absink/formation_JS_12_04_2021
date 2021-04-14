class Client {
  constructor(id, nom, prenom, pass, civilite, status, age) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.password = pass;
    this.civilite = civilite;
    this.status = status;
    this.age = age;
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      nom: this.nom,
      prenom: this.prenom,
      password: this.pass,
      civilite: this.civilite,
      status: this.status,
      age: parseInt(this.age)
    })
  }

  deserialize(obj) {
    let x = JSON.parse(JSON.stringify(obj));
    return new Client(x['id'],
                      x['nom'],
                      x['prenom'],
                      x['password'],
                      x['civilite'],
                      x['status'],
                      x['age']);
  }

  statusToString() {
    if (this.status) {
       return 'ACTIF';
    } else {
      return 'INACTIF';
    }
  }

  display() {
    return this.nom + ' ' + this.prenom;
  }

}




class Commande {
  constructor(id, numero, prix, etat, idClient, client) {
    this.id = id;
    this.numero = numero;
    this.prix = prix;
    this.etat = etat;
    this.idClient = idClient;
    this.Client = client;
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      numero: this.numero,
      prix: this.prix,
      etat: this.etat,
      idClient: this.idClient
    })
  }

  deserialize(obj) {
    let x = JSON.parse(JSON.stringify(obj));
    return new Commande(x['id'],
                      x['numero'],
                      x['prix'],
                      x['etat'],
                      x['idClient']
    )
  }

  getPrixTTC() {
    return this.prix+(this.prix*0.20);
  }

  varWithEuro(toSend) {
    return toSend + ' €';
  }
}



class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      username: this.username,
      password: this.password,
    })
  }

  deserialize(obj) {
    let x = JSON.parse(JSON.stringify(obj));
    return new User(x['id'],
                      x['username'],
                      x['password'],
    )
  }
}

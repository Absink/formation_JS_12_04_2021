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
}

class Commande {
  constructor(id, numero, prix, etat, idClient) {
    this.id = id;
    this.numero = numero;
    this.prix = prix;
    this.etat = etat;
    this.idClient = idClient;
  }
}

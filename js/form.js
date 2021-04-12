// alert("Bienvenue sur le formulaire");
// let chiffre1 = 10;
// let chiffre2 = 25;
// const result = chiffre1 + chiffre2;
// console.log(chiffre1, chiffre2);
// console.log("Le resultat est", result);


function displayClient() {
  let nom = document.getElementById('name').value;
  let prenom = document.getElementById('firstname').value;
  let civ = document.getElementById('civility').value;
  let message;
  document.getElementById('message').style.color = "red";

  if (nom.length >=5 && prenom.length >=5) {
    message = 'Bonjour ' + civ + ' ' + nom + ' ' + prenom;
    document.getElementById('message').style.color = "green";
  } else if (nom.length < 5 && prenom.length < 5) {
    message = 'Le nom et le prenom est trop court';
  } else if (nom.length < 5) {
    message = 'Le nom est trop court';
  } else {
    message = 'Le prenom est trop court';
  }
  document.getElementById('message').innerHTML = message;
}
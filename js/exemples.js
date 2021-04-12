// c'est un exemple
// let var1 = "test";
// let var2 = 3;
// let var3 = true;

// alert("C'est une alerte !");
// // console.log("C'est un text console");
// // console.log(var2)
// console.log(String(var2), var3);
// console.log(String(var2) + ' ' + var3);


// console.log(typeof(var2))
// console.log(typeof(String(var2)))



// Conditions
// if (!var3) {
//   console.log('condition fausse');
// } else {
//   console.log('condition vraie');
// }

// for (let i=0; i<3; i++) {
//   console.log("Index", i);
// }

// function additioner(param1, pram2) {
//   console.log("Lancement fonction", param1, pram2);
//   return pram2+1;
// }

// // test("bonjour", 6);
// let resultat = additioner(0, 5);
// console.log(resultat);

// // document.write("Test ajout");
// function send() {
//   console.log(document.getElementById('paragraphe'));
//   console.log(document.getElementById('paragraphe').innerHTML);
//   console.log(document.getElementsByTagName('p'));
//   document.getElementById('paragraphe').innerHTML = 'nouvelle chiane';
//   document.getElementById('paragraphe').style.textDecoration = "overline";
//   document.getElementsByTagName('p').item(1).className = "classeTest";
// }


class Info {
  constructor(param1, paramX) {
    this.info1 = param1;
    this.info2 = paramX;
  }
}

let informationA = new Info('Test1', 'Test2');
let informationB = new Info('Testblalala', 'fdsfsfd');
console.log(informationA.info1);

let tableau = [informationA];
tableau.push(informationB);
console.log(tableau.length);
// tableau.pop();
console.log(tableau[1]);
let informationC = new Info('INFO C 1', 'INFO C 2');
tableau.splice(1, 1, informationC);
console.log(tableau[1]);

for (i in tableau) {
  console.log(tableau[i].info2);
}

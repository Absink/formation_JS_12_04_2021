$(document).ready(function(){
  $("p").first().css("color", "blue");
  $("p").eq(1).css("color", "red");

  $("#getTest").click(function(){
    // Implement request
    let testVar = 1;
    $.ajax({
      url: `http://localhost:3000/clients?id=${testVar}&`,
      // url: 'http://localhost:3000/clients?id=1',
      type: 'GET',
      dataType: 'json',
      data: JSON.stringify(client)
    })
    // Request succes
    .done(function(data) {
      console.log(data);
      // console.log(JSON.stringify(data));
      // console.log(data['message']);
      // console.log(data['message']['bulldog'][1]);
    });
  })


});


class Info {
  constructor(param1, paramX) {
    this.info1 = param1;
    this.info2 = paramX;
  }
}

function serializeInfo(info) {
  return JSON.stringify({
    info1: parseFloat(info.info1),

  })
}

function send() {
  let tabHTML = document.getElementById('TestTab');
  let row = tabHTML.insertRow(1)
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = "blablalz 1";
  cell2.innerHTML = "blablalz 2";
}


// let tabHTML = document.getElementById('TestTab');
// let row = tabHTML.insertRow(1)
// let cell1 = row.insertCell(0);
// let cell2 = row.insertCell(1);
// cell1.innerHTML = "blablalz 1";
// cell2.innerHTML = "blablalz 2";

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
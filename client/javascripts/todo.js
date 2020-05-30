//jshint esversion: 6

let controller = function () {
  $.ajax({
    url: "http://localhost:8888/items",
    method: "GET",
  }).done((res) => {
    let pElem;
    //console.log(res.comments[0]._id + " " + res.comments[0].data)
    res.items.forEach((item) => {
      pElem = $("<p>").html(item.data);
      $(".items").append(pElem);
    });
  });

  let addItemFromInputBox = function () {
    //Semmy uses "$" to name variables that will contain jQuery objects
    let $new_item, content;

    if ($(".item-input input").val() !== "") {
      content = $(".item-input input").val();
      $new_item = $("<p>").text(content);
      //$new_item.hide();
      $(".items").append($new_item);
      //$new_item.fadeIn();
      $(".item-input input").val("");

      //add item to db
      $.ajax({
        method: "POST",
        url: "http://localhost:8888/additem",
        data: {
          data: content,
        },
      }).done(function (msg) {
        console.log("Data Saved: " + msg);
      });
    }
  };

  $(".item-input button").on("click", function (event) {
    addItemFromInputBox();
  });

  $(".item-input input").on("keypress", function (event) {
    if (event.keyCode === 13) {
      addItemFromInputBox();
    }
  });
};

let deleteItem = () => {
  //delete an item from db
  let content = $("#deleteOne").val();
  $.ajax({
    method: "POST",
    url: "http://localhost:8888/deleteitem/" + content,
  }).done(function (msg) {
    console.log("Item deleted: " + msg);
  });

  window.location.reload();
};

let getItem = () => {
  //clear outDiv
  $("#outDiv").html("");
  let pElem;
  //retrieve an item from db
  let content = $("#getOne").val();
  $.ajax({
    method: "GET",
    url: "http://localhost:8888/getitem/" + content,
  }).done(function (msg) {
    console.log("Item retrieved: " + msg.message.data);
    pElem = $("<p>").html("Item Retrieved: " + msg.message.data);
    $("#outDiv").append(pElem);
  });

  //window.location.reload();
};

let deleteAll = () => {
  //delete all items from db
  $.ajax({
    method: "DELETE",
    url: "http://localhost:8888/deleteitems",
  }).done(function (msg) {
    console.log("All items deleted");
  });
  window.location.reload();
};

$(document).ready(() => {
  let btn01, btn02, btn03;
  //console.log("ready")
  //select the delete button
  btn03 = document.querySelectorAll("button")[3];
  btn03.addEventListener("click", deleteAll);
  btn02 = document.querySelectorAll("button")[2];
  btn02.addEventListener("click", deleteItem);
  btn01 = document.querySelectorAll("button")[1];
  btn01.addEventListener("click", getItem);
  controller();
});


function createListElement(input) {
  var ul = document.getElementById("listUl");
  //create a li and p
  var li = document.createElement("li");
  var para = document.createElement("P");
  // sets a class of listItem + listPara for each li + p made
  li.setAttribute("class", "listItem row");
  para.setAttribute("class", "listPara");
  // makes the text content of the class userInput the p text
  para.appendChild(document.createTextNode(input.textContent));
  para.innerHTML = para.innerHTML.replace(/([0-9]+[.,][0-9]+|[0-9]+)/g, '<span>$1</span>');
  //puts that p tag in the li tag
  li.appendChild(para);
  // adds the li to ul
  ul.appendChild(li);

  // adds a delete btn to li
  var dbtn = document.createElement("button");
  dbtn.appendChild(document.createTextNode("X"));
  li.appendChild(dbtn);
  dbtn.addEventListener("click", deleteListItem);

  // add class delete li and reclaculates the subtotal
  function deleteListItem(){
    ul.removeChild(ul.childNodes[0]);
    var elems = document.getElementsByTagName('SPAN');
    var sum = 0;
    for (var i = 0;i < elems.length; i++) {
      sum += parseFloat(elems[i].innerHTML, 10);
    }
    document.getElementById("subTotal").innerHTML = sum.toFixed(2);
  }
  // calculates the subtotal
  var elems = document.getElementsByTagName('SPAN');
  var sum = 0;
  for (var i = 0;i < elems.length; i++) {
    sum += parseFloat(elems[i].innerHTML, 10);
  }
  //makes sure that it has 2 demcimal places
  document.getElementById("subTotal").innerHTML = sum.toFixed(2);

  return false;
}
// ends createListElement function
function calculatetip(){
  // Gets all the values need for tip math
  var billamt = parseFloat(document.getElementById("subTotal").textContent);
  var tipamt = document.getElementById("tipamt").value;
  var peopleamt = document.getElementById("peopleamt").value;
  //validate input
  if (billamt == 0) {
    alert("Please pick a menu item");
    return;
  } else if (tipamt === "") {
    alert("Please enter tip amount");
    return;
  } else if (peopleamt === "") {
    alert("Please enter # of people");
    return;
  }
  // makes people amount 1 so you will always be 1 person & display each
  if (peopleamt <= 0 || peopleamt <= 1) {
    peopleamt = 1;
    document.getElementById("each").style.display = "none";
  } else {
    document.getElementById("each").style.display = "block";
  }
  // Calculates the tip
  var total = (billamt * (tipamt / 100)) / peopleamt;
  //Calculates the bill total (bill + tip)
  var billTotal = total + billamt;
  // makes sure 2 digits are always after decimal point
  total = total.toFixed(2);
  billTotal = billTotal.toFixed(2);
  //Makes sure billdiv is now visable
  document.getElementById("billdiv").style.display = "block";
  //Displays the tip then bill total
  document.getElementById("tip").innerHTML = total;
  document.getElementById("totalamt").innerHTML = billTotal;
}

// Hides Tip and Bill Total divs
document.getElementById("billdiv").style.display = "none";
//click to call function
document.getElementById("calculate").onclick = function() {
calculatetip();
};

var menuButton = document.getElementById("menuButton");

var clickCount = 1;

menuButton.addEventListener("click", function(){
  console.log("clicked");
  var chatBody = document.getElementById("chatBody");
  var leftSide = document.getElementById("leftSide");
  var textArea = document.getElementById("textArea");
  var onlineList = document.getElementById("onlineList");

  if (clickCount % 2 === 0) {
    onlineList.style.visibility = "hidden";
    chatBody.appendChild(onlineList);

    textArea.style.visibility = "visible";
    chatBody.appendChild(textArea);


    leftSide.style.visibility = "hidden";
    chatBody.appendChild(leftSide);

  } else {
    onlineList.style.visibility = "visible";
    chatBody.appendChild(onlineList);

    textArea.style.visibility = "hidden";
    chatBody.appendChild(textArea);


    leftSide.style.visibility = "visible";
    chatBody.appendChild(leftSide);
  }
  clickCount++;
})

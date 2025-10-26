const consolee = () => {
  console.log("clicked");

  var elem = document.getElementById("btnId");
  if (elem.value == "Back Visibility On") {
    elem.value = "Back Visibility Off";
  } else {
    elem.value = "Back Visibility On";
  }

  var testarray = document.getElementsByClassName("face");
  for (var i = 0; i < testarray.length; i++) {
    testarray.item(i).classList.toggle("opacityClass");
  }
};

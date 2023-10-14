var executeBtn = document.getElementById("execute");
    removeBtn = document.getElementById("remove");

function addText() {
    var addClass = document.querySelector(".classes-to-add").value;
    var parentDiv = document.querySelector(".father-div");
    var span = document.createElement("span");
    span.textContent = addClass;
    if (addClass) {
        parentDiv.appendChild(span);
    }else{
        alert('Please enter a class name');
    }
}

function removeText() {
    var removeText = document.querySelector(".classes-to-remove").value;
    var parentDiv = document.querySelector(".father-div");
    var spans = parentDiv.getElementsByTagName("span")
    
    for (var i=0; i < spans.length; i++) {
        if(spans[i].textContent === removeText){
            spans[i].parentNode.removeChild(spans[i]);
        }else{
            alert("does not exist!");
        }
    }
}


executeBtn.onclick = addText;
removeBtn.onclick = removeText;
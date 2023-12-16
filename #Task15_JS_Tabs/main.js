let tabs = document.querySelectorAll(".tabs li");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".content div");

// console.log(tabsArray);

tabsArray.forEach((element) => {
	element.addEventListener("click", function(e){
		tabsArray.forEach((element)=>{
			element.classList.remove("active");
		});
		let data_id = e.currentTarget.dataset.id;
		e.currentTarget.classList.add("active");
		divs.forEach((div) => {
			div.style.display = "none";
		});
		document.querySelector(data_id).style.display = "block";
	});
});
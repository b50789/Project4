// Project 4 Web App
// VFW 1309
// Adam Carlton


// Wait until the DOM is ready!
window.addEventListener("DOMContentLoaded", function(){
	
	//getElementsById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Create select field element and populate with options
	/*var saveShow = function (){
		localStorage.setItem("test1", "hello1");
		localStorage.setItem("test2", "hello2");
		localStorage.setItem("test3", "hello3");
		alert(localStorage.key);*/
		
		
		
	//Find value of selected radio buttons
	function getSelectedRadio0(){
		var	radios0 = document.forms[0].repeat;
		for(var i=0; i<radios0.length; i++){
			if(radios0[i].checked){
				recValue = radios0[i].value;
			}
		}	
	}
	function getSelectedRadio1(){
		var	radios1 = document.forms[0].repeat;
		for(var i=0; i<radios1.length; i++){
			if(radios1[i].checked){
				blockValue = radios1[i].value;
			}
		}	
	}

	function toggleControls(n){
		switch(n){
			case "on":
				$('tvForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('tvForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;	
		}
	}
	function saveShow(key){
		//If there is no key, this means this is a brand new item and we need a new key
		if(!key){
			var id		= Math.floor(Math.random()*100000002);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here, into the saveShow function.
			id = key;
		}
		//Gather up all our form values and store in an object
		//Object properties contain array with the form label and input value.
		getSelectedRadio0();
		getSelectedRadio1();
		
		var item 			={};
			item.date 		= ["Date", $('date').value];
			item.showname	= ["Show Name", $('showname').value];
			item.r_yes		= ["Recurring ?", recValue];
			item.networks	= ["Network:", $('networks').value];
			item.important	= ["How Important?", $('important').value];
			item.block_yes	= ["Parental Block Needed?", blockValue];
			item.specialnotes	= ["Notes:", $('specialnotes').value];
		//Save data into local storage: Using Stringify to convert out object to a string
		localStorage.setItem(id, JSON.stringify(item));
		alert("TV Show was Added!");
	}
	
	function getInfo(){
		
		if (localStorage.length === 0){
			alert("There is no Shows in the Local Storage so default data was added.");
			autoFillData();
		}
		//write the info from the Local Storage to the browser.
		toggleControls("on");
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);	
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert the string from local Storage value back to an object by using JSON.parsel
			var star = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			showImg(star.networks[1], makeSubList);
			for(var n in star){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = star[n][0]+" "+star[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi); //holds NAV here
				
			}
			makeItemLinks(localStorage.key(i), linksLi); //Creates our edit and delete bettons/link for each item in local storage.

		}
	}

	//Add TV Network Images
	function showImg(fileName, makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "img/"+ fileName + ".png");
		imageLi.appendChild(newImg);
	}

	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT date required for this to work is coming ftom our json.js which is loaded from our html page.
		//Store the JSON OBJECT into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000002);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}

	}


	//make item links
	//Create the edit and delete links for each stored item when displayed
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Show";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);

		//add delete single item link	
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Show";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	function editItem(){
		//Grab the data from our item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//Show the form
		toggleControls("off");

		//Populate the form fields w/current localStorage values.
		$('date').value = item.date[1];
		$('showname').value = item.showname[1];
		var radios0 = document.forms[0].sex;
		for(var i=0; i<radios0.length; i++) {
			if(radios0[i].value == "Male" && item.sex[1] == "Male"){
				radios0[i].setAttribute("checked", "checked");
			}else if(radios0[i].value == "Female" && item.sex[1] == "Female"){
				radios0[i].setAttribute("checked", "checked");
			}
		}
		$('networks').value = item.networks[1];
		$('important').value = item.important[1];
		$('block_yes').value = item.block_yes[1];
		$('specialnotes').value = item.specialnotes[1];

		//Remove the initial listener from the input 'save show' button.
		saveInfo.removeEventListener("click", saveShow);
		//change Submit button value to Edit Button
		$('submit').value = "Edit Show";
		var editSubmit = $('submit');
		//Save the KEy value est. in this function as property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}

	function deleteItem(){
		var ask = confirm("Are you postive you would like to remove show?");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Show was not removed Jim")
		}

	}

	function clearInfo(){
		if(localStorage.length === 0){
			alert("There is no Data to Clear!!!")
		}else{
			localStorage.clear();
			alert("All TV Show and/or Movies have been Delete Forever!!!");
			window.location.reload();
			return false;
		}
		
	}

	function validate(e){
		// Define the elements we want to check
		var getShowname = $('showname');
		var getNetworks = $('networks');

		//Reset Error Messages
		errMsg.innerHTML = "";
		getShowname.style.border = "1px solid black";
		getNetworks.style.border = "1px solid black";


		//Get Error Messages
		var messageAry = [];
		//Show Name Validation
		if(getShowname.value === ""){
			var showNameError = "Please Add a Show Name.";
			getShowname.style.border = "1px solid red";
			messageAry.push(showNameError);
		}
		//Networks Validation
		if(getNetworks.value === "--Pick One--"){
			var showNetworkError = "Please Add a Network.";
			getNetworks.style.border = "1px solid red";
			messageAry.push(showNetworkError);
		}

		//If there are eror, display them.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);

			}
			e.preventDefault();
			return false;
		}else{
			//If all is ok, save our data! Send the key value (which came from the edit data function).
			//Remember this Key value was passwed through the editSubmit event listener as a property.
			saveShow(this.key);
		}
		

	}
	//Variable defaults
	var tvNetworks = ["--Pick One--", "ABC", "AMC", "AETV", "the WB", "NBC", "CBS", "Netflix", "Hulu", "FOX", "Disney Channel", "Nickelodeon", "Cartoon Network", "the CW", "other"], 
	recValue,
	blockValue = "No",
	errMsg = $('errors');
	;

	
	
	
	//Set Link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getInfo);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearInfo);
	var saveInfo = $('submit');
	saveInfo.addEventListener("click", validate);
	saveInfo.key = this.key;
	
});
// var globalElement ="";
// getElement = function(event){
// 	keyDown(event,)
// }
// keyDown = function(event, element){
// 		console.log(event.key)
// 	  if(event.key == "ArrowRight"){
// 	  	console.log(element)
// 	  	onNext(element)
// 	  }

// 	}
var html = document.documentElement;

onClick = function(event){
	event.stopPropagation();
	var element = event.target;
	// keyDown()
	navigateModal(element)	
	
}

onNext = function(element){
	
	if( element.classList.contains('sxsmodelNextSpan') ){

	       var elem = document.getElementsByClassName(element.classList[1])
	       elem = elem[0].classList[1]
		   elem = elem.match(/\d/g)
		   elem = elem.join("")
		   elem = document.getElementsByClassName('iteration'+(elem))
		   
			
		   if (elem.length){
		   	 for (var i = elem.length - 1; i >= 0; i--) {
	       	    elem[i].style.display = "none"; 
	       	    
	         };
		   }
	       	console.log("iteration"+elem.length + "  " + element.classList[1])
       	    if( "iteration"+elem.length == element.classList[1] ){	

				html.style ="overflow: visible;"
			}  	    		


	    }
}
onBefore = function(element){

		if( element.classList.contains('sxsmodelBeforeSpan')){
	       var elem = document.getElementsByClassName(element.classList[1])
	       elem = elem[0].classList[1]
		   elem = elem.slice(-1)
		   elem = document.getElementsByClassName('iteration'+(elem -1))
		   // globalElement = elem;
		   console.log(elem)
		   if (elem.length){
		   	 for (var i = elem.length - 1; i >= 0; i--) {
	       	    elem[i].style.display = "initial";
	         };
		   }
			      
	       
	    }
}

navigateModal = function(element){
	

	if(element.classList.contains('sxsmodelExitSpan')){
		
	       var elem = document.getElementsByClassName("sxsmodel");
	       var elem2 = document.getElementsByClassName("sxsmodelDialog")


	       for (var i = elem.length - 1; i >= 0; i--) {
	       	elem[i].style.display = "none";
	       };
	       for (var i = elem2.length - 1; i >= 0; i--) {
	       	elem2[i].style.display = "none";
	       };
	       html.style ="overflow: visible;"
	    }
	onNext(element)
	onBefore(element)
}



createModal = function(contents, i){

	wrapperDiv = document.createElement("div");
	wrapperDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");
	wrapperDiv.classList.add("sxsmodel");
	wrapperDiv.classList.add("iteration"+ i);
	
	iframeElement = document.createElement("iframe");
	iframeElement.setAttribute("style","width: 100%; height: 100%;");


	wrapperDiv.appendChild(iframeElement);

	modalDialogParentDiv = document.createElement("div");
	modalDialogParentDiv.setAttribute("style","position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153);background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");
	modalDialogParentDiv.classList.add("sxsmodelDialog");
	modalDialogParentDiv.classList.add("iteration"+ i);

	modalDialogSiblingDiv = document.createElement("div");

	modalDialogTextDiv = document.createElement("div"); 
	modalDialogTextDiv.setAttribute("style" , "text-align:center");

	modalDialogExitSpan = document.createElement("span"); 
	modalDialogExitSpan.setAttribute("style","width:40px;height:20px;background:black;position:absolute;top:0;right:0;");
	modalDialogExitSpan.classList.add("sxsmodelExitSpan");
	modalDialogExitSpan.classList.add("iteration"+ i);

	modalDialogTextSpan = document.createElement("span"); 
	modalDialogText = document.createElement("strong");
	 
	modalDialogText.innerHTML = contents ;

	breakElement = document.createElement("br"); 
	modalDialogBeforeSpan = document.createElement("span"); 
	modalDialogBeforeSpan.setAttribute("style","width:40px;height:20px;background:blue;position:absolute;bottom:0;left:0;");
	modalDialogBeforeSpan.classList.add("sxsmodelBeforeSpan");
	modalDialogBeforeSpan.classList.add("iteration"+ i);

	modalDialogNextSpan = document.createElement("span"); 
	modalDialogNextSpan.setAttribute("style","width:40px;height:20px;background:red;position:absolute;bottom:0;right:0;");
	modalDialogNextSpan.classList.add("sxsmodelNextSpan");
	modalDialogNextSpan.classList.add("iteration"+ i);
	
	modalDialogTextSpan.appendChild(modalDialogExitSpan);
	modalDialogTextSpan.appendChild(modalDialogText);
	modalDialogTextDiv.appendChild(modalDialogTextSpan);
	modalDialogTextDiv.appendChild(breakElement);
	modalDialogTextDiv.appendChild(breakElement);
	modalDialogTextSpan.appendChild(modalDialogNextSpan);
	modalDialogTextSpan.appendChild(modalDialogBeforeSpan);



	modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
	modalDialogParentDiv.appendChild(modalDialogSiblingDiv);

	document.body.appendChild(wrapperDiv);
	document.body.appendChild(modalDialogParentDiv);

	
}

breakUpText = function(request){

	var re = /((\.|\?|\n)(\s)([A-Z]*?))/mg;
	// request.contents.replace(/\\"/mg, '/s') // added no test
	var found = request.contents.replace(re, "$2{!@{{");
  	found = found.split("{!@{{");

	for (var i = found.length - 1; i >= 0; i--) {
		createModal(found[i], i)
	};
	
}





chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {


 	breakUpText(request)
	document.addEventListener("click",onClick)
	// document.addEventListener('keydown', getElement(event));
	// html.style = "overflow: hidden;"
    sendResponse("Hello");

  });




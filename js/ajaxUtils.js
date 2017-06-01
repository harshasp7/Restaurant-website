(function (global){

//Fake namespace for ajaxUtility

var ajaxUtils = {};


// Returns an HTTP request object

function getRequestObject() {

	if(window.XMLHttpRequest) {

		return(new XMLHttpRequest());
	}

	else if(window.ActiveXobject){

		//For very old browsers - optional

		return (new ActiveXobject("Microsoft.XMLHTTP"));
	}
	else{

		global.alert("Ajax is not supported ! ");
		return(null);
	}
}


// Makes an Ajax GET request to 'requestUrl'

ajaxUtils.sendGetRequest = 

	function(requestUrl, responseHandler, isJasonResponse) {

		var request = getRequestObject();

		request.onreadystatechange = 
			function() {

				handleResponse (request,
					responseHandler,
					isJasonResponse);
			};

			request.open("GET", requestUrl, true);
			request.send(null); //for POST only
	};


//Only calls user provided 'responseHandler'
//function if response is ready
// and not an error

function handleResponse(request,
	responseHandler, isJasonResponse) {

	if((request.readyState == 4) && (request.status == 200)){

		if(isJasonResponse == undefined){

			isJasonResponse = true;   //Default
		}

		if(isJasonResponse){

			responseHandler(JSON.parse(request.responseText));

		}
		else {
			responseHandler(request.responseText);
		}
	}
}


global.$ajaxUtils = ajaxUtils;

})(window);
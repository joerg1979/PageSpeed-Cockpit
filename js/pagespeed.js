// Specify your actual API key here:
var API_KEY = 'AIzaSyB5oTE1eqWOXmvgXC5lHB7MlPOlROfufQI';
var API_URL = 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?';
var CHART_API_URL = 'http://chart.apis.google.com/chart?';

// Specify the URL you want PageSpeed results for here:
// var URL_TO_GET_RESULTS_FOR = "http://www.adresse.url"; <!-- Adress set when running setAll(URL) with an URL
 
// Invokes the PageSpeed Insights API. The response will contain
// JavaScript that invokes our callback with the PageSpeed results.


// start requests for desktop and mobile request

// set all Elements with URL, without URl the (innerHTML) of the elements will be cleared
function setAll(URL){
    if(URL != null){
        var domID = document.getElementById("ssURL");
        domID.innerHTML = URL;
        var domID = document.getElementById("dvURL");
        domID.innerHTML = URL;
        var domID = document.getElementById("mvURL");
        domID.innerHTML = URL;
      //  var domID = document.getElementById("utURL");
      //  domID.innerHTML = URL;
        var domID = document.getElementById("pagespeedProgressLeftPanelBodyP");
        domID.innerHTML = "Ihre Anfrage wurde abgesendet.<br />Die Analyse der Seite " + URL+ " läuft...";
        
        var domID = document.getElementById("aggrD");
        domID.innerHTML = "Ergebnisse werden abgerufen und verarbeitet...bitte haben Sie etwas Geduld bis die Anfrage abgeschlossen ist.";
             
    }else{
       resetAll();
        
    }
}
function resetAll(){
	 var domID = document.getElementById("ssURL");
        domID.innerHTML = "";
        var domID = document.getElementById("dvURL");
        domID.innerHTML = "" ;
        var domID = document.getElementById("mvURL");
        domID.innerHTML = "";
  //    var domID = document.getElementById("utURL");
  //  	domID.innerHTML = "" ;
		var domID = document.getElementById("pagespeedProgressLeftPanelBodyP");
        domID.innerHTML = "Starten Sie die Auswertung durch anklicken der gewünschten URL";    
    
        var domID = document.getElementById("aggrD");
        domID.innerHTML = "Bitte wählen Sie eine der oben aufgeführen Adresse zum Testen";
        
        var domID = document.getElementById("pagespeedProgressRightPanelBody");
        domID.innerHTML = "" ;
}
function finished(score){
    showOverallScore(score);
    if(score <= 50){
        showOverallScoreAdvise("alert", score);
    }
    if(score <= 75){
        showOverallScoreAdvise("info", score);
    }else{
        showOverallScoreAdvise("succsess", score);
    }
    $("#aggrR").hide("slow");
    
    var domID = document.getElementById("pagespeedResetRowP");
        domID.innerHTML = "Test abgeschlossen";
        
}

function setTestSite(URL){
	
	URL_TO_GET_RESULTS_FOR = URL;
    if(URL != undefined){
        setAll(URL);
        runPagespeed('desktop');
        runPagespeed('mobile');
    } else {
        setAll();
    }
	
}

var overallScore = 0;
var pagespeedResultDesktop = null;
var pagespeedResultMobile = null;

function showOverallScore(score){
    var domID = document.getElementById("showOverallScore");
    domID.innerHTML = "durchschnitts Score: " + (score/2);
}

function showOverallScoreAdvise(method, score){
   var domID = document.getElementById("showOverallScoreAdvise");
   if(URL == "alert"){
        domID.innerHTML = "<b>" +method + ":</b> Ihre Ergbebnisse sind schlecht.....";
    }
    if(URL == "alert"){
        domID.innerHTML = "<b>" +method + ":</b> Ihre Ergbebnisse sind mittelmäßig.....";
    }else{
        domID.innerHTML = "<b>" +method + ":</b> Ihre Ergbebnisse sind sehr gut.....";
    }
    var domID = document.getElementById("pagespeedDestopScore");
    domID.innerHTML = pagespeedResultDesktop.score;
    var domID = document.getElementById("pagespeedMobileScore");
    domID.innerHTML = pagespeedResultMobile.score;
    
    
}

function runPagespeedDesktop() {
	runPagespeed('desktop');

}

function runPagespeedMobile() {
	runPagespeed('mobile');
}

function runPagespeed(strategy) {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	var query = [
			'url=' + URL_TO_GET_RESULTS_FOR,
			'callback='	+ (strategy == 'mobile' ? 'pagespeedCallback_mobile' : 'pagespeedCallback_desktop'),
			'key=' + API_KEY,
			'strategy=' + strategy, // <- hier die Strategy angeben....also Mobile / Desktop
			'prettyprint=true', 
			'locale=de_DE', ].join('&');
	s.src = API_URL + query;
	document.head.insertBefore(s, null);
}

function pagespeedCallback_desktop(result) {
	if (checkResult(result)) {
		console.log('callback of desktop');
		pagespeedResultDesktop = result;

		pagespeedDisplayScore(pagespeedResultDesktop, 'pagespeedCockpitScoreDesktop');
        addProgressM(40);
		pagespeedCallback_all();
		showSize(pagespeedResultDesktop, 'pagespeedCockpitSizeDesktop');
			
		// TODO document.getElementById('desktop').innerHTML = "desktop result complete";
	}
}

function pagespeedCallback_mobile(result) {
	if (checkResult(result)) {
		console.log('callback of mobile');
		pagespeedResultMobile = result;

		pagespeedDisplayScore(pagespeedResultMobile, 'pagespeedCockpitScoreMobile');
		addProgressM(60);
		
		pagespeedCallback_all();
		showSize(pagespeedResultMobile, 'pagespeedCockpitSizeMobile');
		
		// TODO document.getElementById('mobile').innerHTML = "mobile result complete";
	}
}

function pagespeedCallback_all() {
	if (pagespeedResultDesktop != null && pagespeedResultMobile != null) {
		pagespeedDisplayAggSuggAsTableRows('pagespeedCockpitEmpfehlungen');
		pagespeedDisplaySizeAsTableRows("pagespeedCockpitSizeDetails");
		
		// TODO document.getElementById('summary').innerHTML = "all results complete";
		addProgressM(100);
		addProgressD(100);
	}
}

function checkResult(result) {
	if (result.error) {
		// TODO: Fehlermeldung
		showResultError(result);
		return false;
	} else {
		return true;
	}
}

function showResultError(result) {
	var errors = result.error.errors;
	for (var i = 0; i < errors.length; i++) {
		// NOTE: your real production app should use a better
		// mechanism than alert() to communicate the error to the user.
		//alert(errors[i].message);
		document.getElementById('out_err').innerHTML = '<strong>Error:</strong> ' + errors[i].message + "<br />";
		
	}
	
}

function pagespeedDisplayScore(result, domId) {
	var score = result.score;
	overallScore += score;
	// Construct the query to send to the Google Chart Tools.
	var query = [ 'chs=180x100', 
	    'cht=gom',
			'chd=t:' + score,
			'chxt=x,y', 'chxl=0:|' + score, ].join('&');
	var img = document.createElement('img');
	img.id = "img"+domId;
	img.src = CHART_API_URL + query;
	var container = document.getElementById(domId);
	container.innerHTML = '';
	container.innerHTML = '<p>Score: ' + score + '</p>';
	container.appendChild(img);
	
	
	
};

function pagespeedDisplayAggSuggAsTableRows(domId) {
	var ruleResultsDesktop = pagespeedResultDesktop.formattedResults.ruleResults;
	var ruleResultsMobile = pagespeedResultMobile.formattedResults.ruleResults;

//	console.log(ruleResultsDesktop);
//	console.log(ruleResultsMobile);

	var tBody = document.getElementById(domId);
	if (tBody != null) {
		var resultKeys = [];
		for(var key in ruleResultsDesktop) {
			resultKeys.push(key);
		}
		for(var key in ruleResultsMobile) {
			if (resultKeys.indexOf(key) < 0){
				resultKeys.push(key);
			}
		}
		console.log(resultKeys);
		
		
		var aggResults = [];
		for(var i=0; i<resultKeys.length; i++) {
			var key = resultKeys[i];
			var resultDesktop = ruleResultsDesktop[key];
			var resultMobile = ruleResultsMobile[key];
//			console.log(key);
//			console.log(resultDesktop);
//			console.log(resultMobile);
			
			var name = resultDesktop!=null ? resultDesktop.localizedRuleName : resultMobile.localizedRuleName;
			var desktop = resultDesktop!=null ? resultDesktop.ruleImpact : '-';
			var mobile = resultMobile!=null ? resultMobile.ruleImpact : '-';
			var agg = Math.max((resultDesktop!=null ? resultDesktop.ruleImpact : 0), (resultMobile!=null ? resultMobile.ruleImpact : 0));
			aggResults.push({name: name, desktop: desktop, mobile: mobile, agg: agg});
		}
		
		var results = aggResults;
		
		results.sort(sortByAgg);
		
		for ( var i in results) {
//			console.log(i);
			
			var ruleResult = results[i];
			// Don't display lower-impact suggestions.

			var name = ruleResult.name;
			var desktop = ruleResult.desktop;
			var mobile = ruleResult.mobile;
			var agg = ruleResult.agg;

			var tr = document.createElement('tr');

			var td_rule = document.createElement('td');
			td_rule.innerHTML = name;
			tr.appendChild(td_rule);

			var td_desktop = document.createElement('td');
			console.log(desktop);
			if(desktop != "-"){
			     desktop = desktop.toFixed(2);
	        }
			td_desktop.innerHTML = desktop;
			tr.appendChild(td_desktop);

			var td_mobile = document.createElement('td');
			console.log(mobile);
			if(mobile != "-"){
			     mobile = mobile.toFixed(2);
	        }
			td_mobile.innerHTML = mobile;
			tr.appendChild(td_mobile);

			var td_agg = document.createElement('td');
			if(agg != "-"){
			 agg = agg.toFixed(2);
			}
			td_agg.innerHTML = agg;
			tr.appendChild(td_agg);

			tBody.appendChild(tr);
			showOverallScore();
			$("#pagespeedResetRow").show("slow");

		}
	}
	
}

// helper
function addProgressD(progress){
	var wert = document.getElementById('progD').style.width;
	wert = progress +"%";
	document.getElementById('progD').style.width = wert;
}

function addProgressM(progress){
	var wert = document.getElementById('progM').style.width;
	wert = progress +"%";
	document.getElementById('progM').style.width = wert;
}


function sortByAgg(a, b) {
	return b.agg - a.agg;
}

function showSize(result, domId){
	var stats = result.pageStats;
	var labels = [];
	var data = [];
	var colors = [];
	var totalBytes = 0;
	var largestSingleCategory = 0;
	for (var i = 0, len = RESOURCE_TYPE_INFO.length; i < len; ++i) {
		var label = RESOURCE_TYPE_INFO[i].label;
		var field = RESOURCE_TYPE_INFO[i].field;
		var color = RESOURCE_TYPE_INFO[i].color;
		if (field in stats) {
			var val = Number(stats[field]);
			totalBytes += val;
			if (val > largestSingleCategory)
				largestSingleCategory = val;
			labels.push(label + ' (' + parseInt(val / 1024) + 'KiB)');
			data.push(val);
			colors.push(color);
		}
	}
	var query2 = [ 
	        'chs=180x120', 'cht=p3',
			'chts=' + [ '000000', 16 ].join(','), 
			'chco=' + colors.join('|'),
			'chd=t:' + data.join(','), 
			//'chdl=' + labels.join('|'),
			'chdls=000000,8', 
			'chp=1.6', 
			'chds=0,' + largestSingleCategory, 
		].join('&');

	var img = document.createElement('img');
	img.src = CHART_API_URL + query2;
	var container = document.getElementById(domId);
	container.innerHTML = "";
	// console.log(labels);
	container.appendChild(img);

	
	

}

function pagespeedDisplaySizeAsTableRows(domId){
	var statsD = pagespeedResultDesktop.pageStats;
	var statsM = pagespeedResultMobile.pageStats;
	
	var totalBytesD = 0;
	var totalBytesM = 0;
	
	var tbody = document.getElementById(domId);
	
	for (var i = 0, len = RESOURCE_TYPE_INFO.length; i < len; ++i) {
		var field = RESOURCE_TYPE_INFO[i].field;
		var label = RESOURCE_TYPE_INFO[i].label;
		var color = RESOURCE_TYPE_INFO[i].color;
		
		var tr = document.createElement('tr');
		
		
		var td = document.createElement('td');
		
		td.innerHTML = label + '&nbsp; <div class="btn-group" style="color:#'+color+'; background-color:#'+color+';">_ _</div>&nbsp;';		
		tr.appendChild(td);
		
		
		var td = document.createElement('td');
		if (field in statsD) {
			var val = Number(statsD[field]);
			totalBytesD += val;
			td.innerHTML = parseInt(val / 1024) + 'KiB';
		} else {
			td.innerHTML = '-';
		}
		tr.appendChild(td);
		
		var td = document.createElement('td');
		if (field in statsM) {
			var val = Number(statsM[field]);
			totalBytesM += val;
			td.innerHTML = parseInt(val / 1024) + 'KiB';
		} else {
			td.innerHTML = '-';
		}
		tr.appendChild(td);
		
		var td = document.createElement('td');
		td.innerHTML = "-";
		tr.appendChild(td);
		tbody.appendChild(tr);	
		
	}
	var tr2 = document.createElement('tr');
	var td2 = document.createElement('td');
		td2.innerHTML = "Gesamtgröße der Website";
		tr2.appendChild(td2);
	var td3 = document.createElement('td');
		td3.innerHTML =	parseInt(totalBytesD / 1024) + "KiB";
		tr2.appendChild(td3);
	var td4 = document.createElement('td');
		td4.innerHTML = parseInt(totalBytesM / 1024) + "KiB";
		tr2.appendChild(td4);
	var td5 = document.createElement('td');
		td5.innerHTML = "-";
		tr2.appendChild(td5);
	
		tbody.appendChild(tr2);	
		finished(overallScore);
		
			var deskSize = document.getElementById("pagespeedDestopSize");
			deskSize.innerHTML = parseInt(totalBytesD / 1024) + "KiB";
			
			var mobiSize = document.getElementById("pagespeedMobileSize");
			mobiSize.innerHTML = parseInt(totalBytesM / 1024) + "KiB";
		
}


var RESOURCE_TYPE_INFO = [ {
	label : 'JavaScript',
	field : 'javascriptResponseBytes',
	color : 'e2192c'
}, {
	label : 'Images',
	field : 'imageResponseBytes',
    color : 'f3ed4a'
}, {
	label : 'CSS',
	field : 'cssResponseBytes',
	color : 'ff7008'
}, {
	label : 'HTML',
	field : 'htmlResponseBytes',
	color : '43c121'
}, {
	label : 'Flash',
	field : 'flashResponseBytes',
	color : 'f8ce44'
}, {
	label : 'Text',
	field : 'textResponseBytes',
	color : 'ad6bc5'
}, {
	label : 'Other',
	field : 'otherResponseBytes',
	color : '1051e8'
}];
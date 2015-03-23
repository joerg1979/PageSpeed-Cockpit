$(document).ready(function(){
				$("#progressList").hide("fast");
				$("#pagespeedCockpitDiv").hide("fast");
				$("#pagespeedCockpit").hide("fast");
				$("#table_uptime").hide("fast");
				$("#pagespeedResetRow").hide("fast");
				
				$("#btn00").click(function(event) {
    	   			var urlToGo = prompt("Bitte geben Sie eine Adresse zum testen an:","http://");
    	   			if (urlToGo != "" && urlToGo != "http://"){
    	   				setTestSite(urlToGo);
    	   				go4all();
    	   			}else{
    	   				alert("Bitte geben Sie eine gültige URL ein...");
    	   			}
				}
				);
				
				$("#btn01").click(function(event) {
    	   			setTestSite('http://www.munichRe.com');
    	   			go4all();
					}
				);
				
       			$("#pagespeedResetRowButton").click(function(event) {
       				setAll();
       				hide4All();
       			});                
            });

	function go4all(){
		$("#urlButtonList").hide("slow");
		$("#progressList").show("slow");
		$("#pagespeedCockpitDiv").show("slow");
		$("#pagespeedCockpit").show("slow");
		$("#table_uptime").show("slow");
	}
	
	function hide4All(){
		$("#progressList").hide("slow");
		$("#pagespeedCockpitDiv").hide("slow");
		$("#pagespeedCockpit").hide("slow");
		$("#table_uptime").hide("slow");
		$("#pagespeedResetRow").hide("slow");
		$("#urlButtonList").show("slow");
	}
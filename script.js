// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function(){
   let checkListForm = document.querySelector("form");
   checkListForm.addEventListener("submit", function(e){
      
      let pilotNameEntry = document.querySelector("input[name=pilotName]").value;
      let coPilotNameEntry = document.querySelector("input[name=copilotName]").value;
      let fuelLevelEntry = parseInt(document.querySelector("input[name=fuelLevel]").value);
      let cargoMassEntry = parseInt(document.querySelector("input[name=cargoMass]").value);
      
      
      if(coPilotNameEntry == "" || pilotNameEntry == "" || fuelLevelEntry == "" || cargoMassEntry == ""){
         alert("All fields are required!");
         e.preventDefault();
      }
      else if(isNaN(pilotNameEntry) == false || isNaN(coPilotNameEntry) == false){
            alert("Pilot and CoPilot must be a word");
         } 
      else if( isNaN(fuelLevelEntry) || isNaN(cargoMassEntry)){
            alert("Fuel Level and Cargo mass must be a number");
      } 
      else{
         const pilotStatusName = document.getElementById("pilotStatus");
         pilotStatusName.innerText = `Pilot ${pilotNameEntry} ready`;
         const coPilotStatusName = document.getElementById("copilotStatus");
         coPilotStatusName.innerText = `Co-pilot ${coPilotNameEntry} ready`;

         if(fuelLevelEntry < 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            const fuelStatus = document.getElementById("fuelStatus");
            fuelStatus.innerText = `Fuel level too low for launch`;
            const launchStatus = document.getElementById("launchStatus");
            launchStatus.style.color = "#FF0000";
            launchStatus.innerText = `Shuttle Not Ready for Launch`;
            e.preventDefault();
         }
         else if(cargoMassEntry > 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            const cargoMassStatus = document.getElementById("cargoStatus");
            cargoMassEntry.innerText = `Cargo mass too high for launch`;
            const launchStatus = document.getElementById("launchStatus");
            launchStatus.style.color = "#FF0000";
            launchStatus.innerText = `Shuttle Not Ready for Launch`;
            e.preventDefault();
         }
         else{
            const launchStatus = document.getElementById("launchStatus");
            launchStatus.style.color = "#00FF00";
            launchStatus.innerText = `Shuttle is Ready for Launch`;
            e.preventDefault();
         }

         fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            response.json().then( function(json) {
            const random = Math.floor(Math.random() * 6) + 1;
            const div = document.getElementById("missionTarget");
            div.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[random].name}</li>
                  <li>Diameter: ${json[random].diameter}</li>
                  <li>Star: ${json[random].star}</li>
                  <li>Distance from Earth: ${json[random].distance}</li>
                  <li>Number of Moons: ${json[random].moons}</li>
               </ol>
               <img src="${json[random].image}">
               `;
            });
         });
      }
   });
});

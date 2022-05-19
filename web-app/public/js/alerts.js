/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
$(document).ready(() => {
    // if deployed to a site supporting SSL, use wss://
    var count = 0
    var arr = [];
    var data = [];
 
    function fetchdata(){
    let request = new XMLHttpRequest();
    request.open("GET","http://localhost:3000/getAlerts");
    request.send()
    request.onload = () =>{
      console.log("fetching values");
      data = JSON.parse(request.response);
      for (let i = 0; i<data.length; i++){
        console.log("displaying data");
        var card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id',count); 
        document.getElementById('notifications').appendChild(card);
        document.getElementById(count).style.backgroundColor="orange";
        document.getElementById(count).style.paddingTop="10px";
        document.getElementById(count).style.margin="10px";
            // document.querySelectorAll('.card').forEach((x) => {
            //     var l = document.createElement('p');
            //     l.innerHTML = "Warning: Temperatures too high"+messageData.IotData.humidity;;
            //     x.appendChild(l);
            //   })
        var l = document.createElement('p');
        var f = document.createElement('p');
        l.innerHTML = "Alert Sent to "+data[i].guard_in_charge + " Location :"+data[i].location;
        f.innerHTML ="Time: " +data[i].time + " Alert: " + data[i].alert;
        document.getElementById(count).appendChild(l);
        document.getElementById(count).appendChild(f);
        // var bt = document.createElement('button');
        // bt.className = 'btn-close';
        // bt.setAttribute('id','btn'+count);
        // document.getElementById(count).appendChild(bt);  
        // var button = document.getElementById('btn'+count);
        // window.onload = () => {
        //   document.getElementById('btn'+count).onclick = function() {
        //     this.parentNode.remove()
        //     return false;
        //   };
        // };
        count = count+1;      
}
    }
}

        
      



//   function deleteAlert(Alertid){
//   fetch('https://forestguardapi20220502114450.azurewebsites.net/Alerts', {
//   method: "DELETE",
//   headers: {"Content-type": "application/json;charset=UTF-8"},
//   body: {id : Alertid}
// })
//   .then(response => response.json()) 
//   .then(json => console.log(json))
// }

  //   //Call to method which will send notification
  //   // If you have specific endpoint then call to that endpoint
  fetchdata();
});
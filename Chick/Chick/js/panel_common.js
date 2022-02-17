
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    // name: "init"
  });

backgroundPageConnection.postMessage({
  //  name: 'init',
    cmd:"log",
    tabId: chrome.devtools.inspectedWindow.tabId
});  
  // Listen to messages from the background page
  backgroundPageConnection.onMessage.addListener(function (message) {
      document.querySelector('#insertmessagebutton').innerHTML = message.content;
      // port.postMessage(message);
    });
//
function message_to_service_worker(){
  backgroundPageConnection.postMessage({
    //  name: 'init',
      cmd:"log",
      tabId: chrome.devtools.inspectedWindow.tabId
  });
};
//
document.getElementById("brand_prominence").addEventListener('click',function(){
 // message_to_service_worker();
  makePost();

})
document.getElementById("apple_pay").addEventListener("click",function(){

});
document.getElementById("stock_&_delivery").addEventListener("click",function(){
  
});
function makePost(){
  let data ={
    "title": "dev-tools",
    "author": "kinfe",
    "myKey":"mykey"
    
  }

  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
  }).then(res => {
   // console.log("Request complete! response:", res);
    backgroundPageConnection.postMessage({
      //  name: 'init',
        cmd:"log",
        tabId: chrome.devtools.inspectedWindow.tabId
    });
  
  });
 }

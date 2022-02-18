
   chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
     console.log("inside runtime");
         if(request.cmd=="log"){
           console.log(request.content);
          }
      else {
        console.log("cmd not decoded");
      }
     
     
   });
   ///////////////////////////////////////////////////////////////////////
   console.log("inside content_script");
   $(window).on('load', function() {
    // code here
   
    console.log("fully loaded from contenet");
    
   });
   ///////////////////////////////////////////////////////////
   function makePost(){
    let data ={
      "title": "content_script",
      "author": "kinfe",
      "myKey":"mykey"
      
    }

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(data)
    }).then(response=>response.json()).then(res => {
      console.log("Request complete! response:", res);
      console.log(res.title);
    });
   }
  
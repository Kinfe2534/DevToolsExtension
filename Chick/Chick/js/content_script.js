
   chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
     console.log("inside runtime");
         if(request.cmd=="log"){
           console.log(request.content);}
      else {
        console.log("cmd not decoded");
      }
     
     
   });
   console.log("inside content_script");
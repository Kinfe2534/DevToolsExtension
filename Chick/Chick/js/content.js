function make_settings(){
  return {cmd:"settings", 
  url:`${window.location.href}`,
  Url_name:`${document.title}`,
  Partner_homepage_url:`${window.location.origin}`,
  resolution:`${$(window).width()}x${$(window).height()}` }
}
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  console.log("inside content script runtime");
      if(request.cmd=="onConnect"){          
    console.log("cmd = onConnect..............");
    console.log(`log : ${request.content}`); 
   
      chrome.runtime.sendMessage(make_settings(),function(){});
      
      }
  else if(request.cmd=="log"){
    console.log("cmd = log..............");
    console.log(request);
  }  
  else if(request.cmd=="resize_mobile"){
    // not possible to resize window that is not opened by window.open
    //https://stackoverflow.com/questions/7602078/javascripts-window-resizeto-isnt-working

    window.resizeTo(414,896);
  }
  else if(request.cmd=="resize_desktop"){
    //https://stackoverflow.com/questions/7602078/javascripts-window-resizeto-isnt-working
    window.resizeTo(1280,1024);
  }
});
///////////////////////////////////////////////////////////////////////
console.log("inside content_script");
$(window).resize(function(){
  chrome.runtime.sendMessage({cmd:"window_size_changed", 
  resolution:`${$(window).width()}x${$(window).height()}`})
})
$(window).on('load', function() {
      

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

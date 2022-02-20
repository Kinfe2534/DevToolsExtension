function make_settings(){
  return {cmd:"settings", 
  url:`${window.location.href}`,
  Url_name:`${document.title}`,
  Partner_homepage_url:`${window.location.origin}`,
  resolution:`${$(window).width()}x${$(window).height()}` }
}
function make_content(){
  return {
    "name": "Advert Banner",
    "section_type": "Banner",
    "position": 1,
    "x_position":272,
    "y_position":398,
    "width":976,
    "height":192,
    "screenshot":"https://magpie-images.s3-eu-west-1.amazonaws.com/seeder/bestbuy/Bestbuy-Horizontalbanner-smart_home_security.png",
    "brand":"No Brand",
    "is_in_carousel": false,
    "carousel_total_frames":null,
    "carousel_frame_number":null,
    "carousel_x_position":null,
    "carousel_y_position":null,
    "carousel_width":null,
    "carousel_height":null

  }
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
  document.body.addEventListener("contextmenu",function(e){
    console.log(`context :${e.target}`);
  //  make_content();
  })

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
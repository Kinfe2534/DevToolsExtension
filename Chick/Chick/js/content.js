
var current_target_element=null;

function make_settings(){
  return {
  url:`${window.location.href}`,
  Url_name:`${document.title}`,
  Partner_homepage_url:`${window.location.origin}`,
  resolution:`${$(window).width()}x${$(window).height()}` }
}
function update_slots(target,slots_settings){
  if(slots_settings.is_in_carousel==true){
  let temp_slots=[];
  for(let i=0;i<3;i++){
    temp_slots.push(
    {
      "name": `${slots_settings.name}`,
      "section_type": `${slots_settings.section_type}`,
      "position": `${i}`,
      "x_position":`${target.clientX}`,
      "y_position":`${target.clientY}`,
      "width":976,
      "height":192,
      "screenshot":"https://magpie-images.s3-eu-west-1.amazonaws.com/seeder/bestbuy/Bestbuy-Horizontalbanner-smart_home_security.png",
      "brand":"No Brand",
      "is_in_carousel": true,
      "carousel_total_frames":null,
      "carousel_frame_number":null,
      "carousel_x_position":null,
      "carousel_y_position":null,
      "carousel_width":null,
      "carousel_height":null
  
    });
  }
  
  return temp_slots;
} else {
  let temp_slots=[];
  for(let i=0;i<3;i++){
    temp_slots.push(
    {
      "name": `${slots_settings.name}`,
      "section_type": `${slots_settings.section_type}`,
      "position": `${i}`,
      "x_position":`${e.clientX}`,
      "y_position":`${e.clientY}`,
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
  
    });
  }
  
  return temp_slots;

}
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  console.log("inside content script runtime");
      if(request.cmd=="onConnect"){          
    console.log("cmd = onConnect..............");
    console.log(`log : ${request.content}`); 
   
      chrome.runtime.sendMessage({cmd:"settings",content:`${make_settings()}`},function(){});
      
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
  else if(request.cmd=="make_with_click"){
    chrome.runtime.sendMessage({cmd:"sending_with_click",content: `${update_slots(current_target_element, request)}`},function(){});
  }
  else if(request.cmd=="make_with_class_or_id"){
    chrome.runtime.sendMessage({cmd:"sending_with_class_or_id",content:`${update_slots(request.class_or_id,request)}`},function(){});
  }
});
///////////////////////////////////////////////////////////////////////
$(window).on('resize',function(){
  chrome.runtime.sendMessage({cmd:"window_size_changed", 
  resolution:`${$(window).width()}x${$(window).height()}`})
})
$(window).on('load', function() {
  document.body.addEventListener("contextmenu",function(e){
    console.log(`context :${e.target}`);   
    current_target_element=e.target;
    
  })

});

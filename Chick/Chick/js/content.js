
var current_target_element=null;

function make_settings(){
  return {
  url:`${window.location.href}`,
  Url_name:`${document.title}`,
  Partner_homepage_url:`${window.location.origin}`,
  resolution:`${$(window).width()}x${$(window).height()}` }
}
function update_slots(request,target){
  if(request.content.is_in_carousel=="true"){
  let temp_slots=[];
  for(let i=0;i<3;i++){
    temp_slots.push(
    {
      "name": `${request.content.name}`,
      "section_type": `${request.content.section_type}`,
      "position": `${i}`,
      "x_position":253,
      "y_position":222,
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
  
    }
    );
  }
  
  return {"slot_group_number":`${request.content.slot_group_number}`,"slots_array":temp_slots };
} else if(request.content.is_in_carousel=="false"){
  let temp_slots=[];
  for(let i=0;i<3;i++){
    temp_slots.push(
    {
      "name": `${request.content.name}`,
      "section_type": `${request.content.section_type}`,
      "position": `${i}`,
      "x_position":565,
      "y_position":258,
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
    );
  }
  return {"slot_group_number":`${request.content.slot_group_number}`,"slots_array":temp_slots };

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
    chrome.runtime.sendMessage({cmd:"sending_with_click",content: update_slots(request,null)},function(){});
  }
  else if(request.cmd=="make_with_class_or_id"){
    chrome.runtime.sendMessage({cmd:"sending_with_class_or_id",content:update_slots(request,null)},function(){});
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

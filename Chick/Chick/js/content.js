
var current_context_element=null;

function make_settings(){
  return {
  url:`${window.location.href}`,
  Url_name:`${document.title}`,
  Partner_homepage_url:`${window.location.origin}`,
  resolution:`${$(window).width()}x${$(window).height()}` }
}
function update_slots(request){
  var target=null;
  if(request.cmd=="make_with_click"){
  target=current_context_element;    
  console.log("target with click");
  console.log(target);
  console.log("target with click length");
  console.log(target.length);
  console.log("target with click children");
  console.log(target.children());
  console.log("target with click children length");
  console.log(target.children().length);
  }
  else if(request.cmd=="make_with_class_or_id"){
   target=$(`${request.content.val}`);
   console.log("target with class_or_id");
   console.log(target);   
  console.log("target with class_or_id length");
  console.log(target.length);
  console.log("target with class_or_id children");
  console.log(target.children());
  console.log("target with class_or_id children length");
  console.log(target.children().length);
  }
  if(target!=null && target!=undefined){
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
      "is_in_carousel": "true",
      "carousel_total_frames":"",
      "carousel_frame_number":"",
      "carousel_x_position":"",
      "carousel_y_position":"",
      "carousel_width":"",
      "carousel_height":""
  
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
      "brand":"No Brand"
  
    }
    );
  }
  return {"slot_group_number":`${request.content.slot_group_number}`,"slots_array":temp_slots };

}
}else if(target==null){
  

}else if(target==undefined){

}
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
      if(request.cmd=="onConnect"){        
      console.log("Magpie Hatchery Dev Tools Extension Running............");
      chrome.runtime.sendMessage({cmd:"settings",content:make_settings()},function(){});
      
      }
  else if(request.cmd=="log"){
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
    chrome.runtime.sendMessage({cmd:"sending_with_click",content: update_slots(request)},function(){});
  }
  else if(request.cmd=="make_with_class_or_id"){
    chrome.runtime.sendMessage({cmd:"sending_with_class_or_id",content:update_slots(request)},function(){});
  }
  else if(request.cmd=="save"){
    var k= JSON.stringify(request);
    exportArray(request);
  }
});
///////////////////////////////////////////////////////////////////////
$(window).on('resize',function(){
  chrome.runtime.sendMessage({cmd:"window_size_changed", 
  resolution:`${$(window).width()}x${$(window).height()}`})
})
// return a jquery object
$(window).on('load', function() {
  document.body.addEventListener("contextmenu",function(e){
    current_context_element=$(e.target);
    
  })

});

/////// exports a text content within an array/////////
//https://www.npmjs.com/package/file-saver
// first convert the obj to text or provide an array with a text content
function exportArray(input){
  //https://stackoverflow.com/questions/16591742/is-there-a-function-to-stringify-json-with-whitespace
  var k= JSON.stringify(input,null,'\t');
    var blob= new Blob([k],  {type: "text/plain;charset=utf-8"});
    saveAs(blob,"DevToolsOutput.json");
    ////export array to file logic
}


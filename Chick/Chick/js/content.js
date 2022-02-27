
var current_context_element=null;

function make_settings(){
  return {
  url:`${window.location.href}`,
  Url_name:`${document.title}`,
  Partner_homepage_url:`${window.location.origin}`,
  resolution:`${$(window).width()}x${$(window).height()}` }
}
function update_slots(request){
  // google suggested search items selector div.AJLUJb
  // https://www.javatpoint.com/jquery-offset-vs-jquery-position
  //https://ourcodeworld.com/articles/read/38/how-to-capture-an-image-from-a-dom-element-with-javascript
  var target=null;
  if(request.cmd=="make_with_click"){
  target=current_context_element;    
  }
  else if(request.cmd=="make_with_class_or_id"){
  target=$(`${request.content.val}`);
  }
  if(target!=null && target!=undefined){
  if(request.content.is_in_carousel=="true"){
  let temp_slots=[];
  for(let i=0;i<target.children().length;i++){
    temp_slots.push(
    {
      "name": `${request.content.name}`,
      "section_type": `${request.content.section_type}`,
      "position": `${i}`,
      "x_position":`${target.children().eq(i).offset().left}`,
      "y_position":`${target.children().eq(i).offset().top}`,
      "width":`${target.children().eq(i).width()}`,
      "height":`${target.children().eq(i).height()}`,
      "screenshot":`${Math.floor(Math.random()*90000000) + 10000000}.png`,
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
    var node = document.getElementsByTagName("body")[0];

    domtoimage.toBlob(node).then(function (blob) {
      saveAs(blob, 'screenshot.png');
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }
  
  return {"slot_group_number":`${request.content.slot_group_number}`,"slots_array":temp_slots };
} else if(request.content.is_in_carousel=="false"){
  let temp_slots=[];
  for(let i=0;i<target.children().length;i++){
    temp_slots.push(
    {
      "name": `${request.content.name}`,
      "section_type": `${request.content.section_type}`,
      "position": `${i}`,
      "x_position":`${target.children().eq(i).offset().left}`,
      "y_position":`${target.children().eq(i).offset().top}`,
      "width":`${target.children().eq(i).width()}`,
      "height":`${target.children().eq(i).height()}`,
      "screenshot":`${Math.floor(Math.random()*90000000) + 10000000}.png`,
      "brand":"No Brand"
  
    }
    );
    var node = target.children().eq(i);

    domtoimage.toBlob(node).then(function (blob) {
      window.saveAs(blob, 'screenshot.png');
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
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



var current_context_element=null;
var blob_array=[];
var show_hide_status="false";
var enter_click_status="click";
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
  // https://ourcodeworld.com/articles/read/38/how-to-capture-an-image-from-a-dom-element-with-javascript
  console.log("is in a carousel "+ request.content.is_in_carousel);
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
      // slots for children
  for(let i=0;i<target.children().length;i++){
    let rand_num=Math.floor(Math.random()*90000000) + 10000000;
    temp_slots.push(
    {
      "name": `${request.content.name}`,
      "section_type": `${request.content.section_type}`,
      "position": `${i}`,
      "x_position":"null",
      "y_position":"null",
      "width":"null",
      "height":"null",
      "brand":"No Brand",
      "is_in_carousel": "true",
      "carousel_total_frames":"",
      "carousel_frame_number":"",
      "carousel_x_position":`${target.children().eq(i).offset().left}`,
      "carousel_y_position":`${target.children().eq(i).offset().top}`,
      "carousel_width":`${target.children().eq(i).width()}`,
      "carousel_height":`${target.children().eq(i).height()}`,      
      "screenshot":`${rand_num}.png`,
  
    }
    );
    //var node=document.querySelector("div.AJLUJb").childNodes[i]; 
   var node= target.children().get(i);
   domtoimage.toPng(node,{ quality: 1 }).then(function(blob){
     blob_array.push({unique_id:`${rand_num}.png`,blob:blob})
    // blob_array[rand_num]=blob;
          // saveAs(blob,"screenshot.png");
       }).catch(function (error) {
           console.error('oops, something went wrong!', error);
       });
  }
  // slot for the parent
  let rand_num=Math.floor(Math.random()*90000000) + 10000000;
  temp_slots.push(
    {
      "name": `${request.content.name}`,
      "section_type": `${request.content.section_type}`,
      "position": `${target.children().length}`,
      "x_position":"null",
      "y_position":"null",
      "width":"null",
      "height":"null",
      "brand":"No Brand",
      "is_in_carousel": "true",
      "carousel_total_frames":"",
      "carousel_frame_number":"",
      "carousel_x_position":`${target.offset().left}`,
      "carousel_y_position":`${target.offset().top}`,
      "carousel_width":`${target.width()}`,
      "carousel_height":`${target.height()}`,      
      "screenshot":`${rand_num}.png`,
  
    }
    );
    domtoimage.toPng(target.get(0),{ quality: 1 }).then(function(blob){
     blob_array.push({unique_id:`${rand_num}.png`,blob:blob})
    // blob_array[rand_num]=blob;
          // saveAs(blob,"screenshot.png");
       }).catch(function (error) {
           console.error('oops, something went wrong!', error);
       });
  
  return {"slot_group_number":`${request.content.slot_group_number}`,"slots_array":temp_slots };
} else if(request.content.is_in_carousel=="false"){
  let temp_slots=[];
             // slots for children
  for(let i=0;i<target.children().length;i++){
    let rand_num=Math.floor(Math.random()*90000000) + 10000000;
    temp_slots.push(
    {
      "name": `${request.content.name}`,
      "section_type": `${request.content.section_type}`,
      "position": `${i}`,
      "x_position":`${target.children().eq(i).offset().left}`,
      "y_position":`${target.children().eq(i).offset().top}`,
      "width":`${target.children().eq(i).width()}`,
      "height":`${target.children().eq(i).height()}`,
      "screenshot":`${rand_num}.png`,
      "brand":"No Brand"
  
    }
    );
    //var node=document.querySelector("div.AJLUJb").childNodes[i]; 
   var node= target.children().get(i);
     domtoimage.toPng(node,{ quality: 1 }).then(function(blob){
       blob_array.push({unique_id:`${rand_num}.png`,blob:blob})
      // blob_array[rand_num]=blob;
            // saveAs(blob,"screenshot.png");
         }).catch(function (error) {
             console.error('oops, something went wrong!', error);
         });
  }
  // slot for the parent
  let rand_num=Math.floor(Math.random()*90000000) + 10000000;
  temp_slots.push(
  {
    "name": `${request.content.name}`,
    "section_type": `${request.content.section_type}`,
    "position": `${target.children().length}`,
    "x_position":`${target.offset().left}`,
    "y_position":`${target.offset().top}`,
    "width":`${target.width()}`,
    "height":`${target.height()}`,
    "screenshot":`${rand_num}.png`,
    "brand":"No Brand"

  }
  ); 
   domtoimage.toPng(target.get(0),{ quality: 1 }).then(function(blob){
     blob_array.push({unique_id:`${rand_num}.png`,blob:blob})
       }).catch(function (error) {
           console.error('oops, something went wrong!', error);
       });
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
  else if(request.cmd=="hover"){
    if(show_hide_status=="false" && enter_click_status=="click"){
      show_hide_status="true";
      show_hide_hover();
    }else if(show_hide_status=="true" && enter_click_status=="click"){
      show_hide_status="false";
      $("*").unbind('mouseenter mouseleave');
    }
    
  }  
  else if(request.cmd=="hide_hover"){
    enter_click_status="enter";
      $("*").unbind('mouseenter mouseleave');
  }
  else if(request.cmd=="show_hover"){
    enter_click_status="click";
    if(show_hide_status=="true"){
      show_hide_hover();
    }
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
  }else if(request.cmd=="screenshot"){
       
      for(let i=0;i<blob_array.length;i++){
        for(let j=0;j<request.content.slots.length;j++){
          if(blob_array[i].unique_id==request.content.slots[j].screenshot){
        saveAs(blob_array[i].blob,`${blob_array[i].unique_id}`);
        break;
          }
        }
      }
         } 
});
///////////////////////////////////////////////////////////////////////
$(window).on('resize',function(){
  chrome.runtime.sendMessage({cmd:"window_size_changed", 
  resolution:`${$(window).width()}x${$(window).height()}`})
})
// return a jquery object
$(window).on('load', function() {
   
  chrome.runtime.sendMessage({cmd:"settings",content:make_settings()},function(){});
  document.body.addEventListener("contextmenu",function(e){
    current_context_element=$(e.target);
    
  })
// show_hide_hover();

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

// screeshot
function save_screenshot(){ 
  for(let i=0;i<blob_array.length;i++){
    saveAs(blob_array[i].blob,`${blob_array[i].unique_id}.png`)
  }
      }
  var this_callback_fun=function(e){
    console.log(e.target);
    current_context_element=$(e.target);
  e.stopPropagation();
  chrome.runtime.sendMessage({cmd:"make_with_click",content:""},function(){});
  };
function show_hide_hover (){ 
  $("*").hover(
  // mouse in listener
      function(e){
        
                e.stopPropagation();
                
                $("*").removeClass("hover");
                $("*").removeClass("hover_children");
                $(this).addClass("hover");
                $(this).children().addClass("hover_children");
                chrome.runtime.sendMessage({cmd:"hover_count",content: $(this).children().length+1},function(){});
                $(this).on("click",this_callback_fun);

      }, 
      // mouse leave listener
      function(e){
                  $("*").removeClass("hover");
                  $("*").removeClass("hover_children");
                  $(this).parent().addClass("hover");
                  $(this).parent().children().addClass("hover_children");
                  $(this).off("click",this_callback_fun);
                  chrome.runtime.sendMessage({cmd:"hover_count",content: $(this).parent().children().length+1},function(){});
      }
  )

}
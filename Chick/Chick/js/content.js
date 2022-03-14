
var current_context_element=null;
var show_hide_status="false";
var enter_click_status="click";

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
    make_slot_blob_array(request).then(function(content){
      content.slot_blob_array.sort(function(a,b){return a.slot.position-b.slot.position});
      console.log(content);
      chrome.runtime.sendMessage({cmd:"sending_with_both",content: content},function(){});
})

  
  }
  else if(request.cmd=="make_with_class_or_id"){
    
    make_slot_blob_array(request).then(function(content){
      content.slot_blob_array.sort(function(a,b){return a.slot.position-b.slot.position});
      console.log(content);
      chrome.runtime.sendMessage({cmd:"sending_with_both",content: content},function(){});
})

}
});
///////////////////////////////////////////////////////////////////////
$(window).on('resize',function(){
  chrome.runtime.sendMessage({cmd:"window_size_changed", 
  resolution:`${window.screen.width}x${window.screen.height}`})
})
// return a jquery object
$(window).on('load', function() {
   
  chrome.runtime.sendMessage({cmd:"settings",content:make_settings()},function(){});
  document.body.addEventListener("contextmenu",function(e){
    current_context_element=$(e.target);
    
  })
// show_hide_hover();

});

// screeshot
function save_screenshot(){ 
  for(let i=0;i<blob_array.length;i++){
    saveAs(blob_array[i].blob,`${blob_array[i].unique_id}.png`)
  }
      }
// this call back function
var this_callback_fun=function(e){
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
                $("*").off("click",this_callback_fun);

                $(this).addClass("hover");
                $(this).children().addClass("hover_children");
                $(this).on("click",this_callback_fun);
                chrome.runtime.sendMessage({cmd:"hover_count",content: $(this).children().length},function(){});

      }, 
      // mouse leave listener
      function(e){
                  $("*").removeClass("hover");
                  $("*").removeClass("hover_children");
                  $("*").off("click",this_callback_fun);

                  $(this).parent().addClass("hover");
                  $(this).parent().children().addClass("hover_children");                 
                  $(this).parent().on("click",this_callback_fun);
                  chrome.runtime.sendMessage({cmd:"hover_count",content: $(this).parent().children().length},function(){});
      }
  )

}
function make_settings(){
  return {
  url:`${window.location.href}`,
  Url_name:`${document.title}`,
  Partner_homepage_url:`${window.location.origin}`,
  resolution:`${window.screen.width}x${window.screen.height}` }
}
function make_slot_blob_array(request){
  return new Promise(function(resolve,reject){
    var content={slot_group_number:request.content.slot_group_number, slot_blob_array:[]};
    var resolve_condition_counter=0;
    var target=null;
    if(request.cmd=="make_with_click"){
    target=current_context_element;    
    }
    else if(request.cmd=="make_with_class_or_id"){
    target=$(`${request.content.val}`);
    }    
    var target_length=target.children().length;

    if(target!=null && target!=undefined){
    if(request.content.is_in_carousel=="true"){  
        // slots for children
    for(let i=0;i<target_length;i++){
      
      //var node=document.querySelector("div.AJLUJb").childNodes[i]; 
     var node= target.children().get(i);
     domtoimage.toBlob(node).then(function(blob){
          const reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = function() {
            
          let rand_num=Math.floor(Math.random()*90000000) + 10000000;
          let slot_blob_combo_obj={slot:null,blobAsString:null};    
            slot_blob_combo_obj.blobAsString = reader.result;    
            slot_blob_combo_obj.slot={  "name": `${request.content.name}`,
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
                                    "screenshot":`${rand_num}.png`,        }   
          content.slot_blob_array.push(slot_blob_combo_obj)  ;          
          resolve_condition_counter+=1;
          if(resolve_condition_counter==target_length){
            resolve(content);
          }            
          }
  
  
         }).catch(function (error) {
             console.error('oops, something went wrong!', error);
         });
    }
   
  } else if(request.content.is_in_carousel=="false"){
               // slots for children
    for(let i=0;i<target_length;i++){
      
     var node= target.children().get(i);
       domtoimage.toBlob(node).then(function(blob){
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {          
        let rand_num=Math.floor(Math.random()*90000000) + 10000000;
        let slot_blob_combo_obj={slot:null,blobAsString:null};    
          slot_blob_combo_obj.blobAsString = reader.result; 
          slot_blob_combo_obj.slot={  "name": `${request.content.name}`,
                                  "section_type": `${request.content.section_type}`,
                                  "position": `${i}`,
                                  "x_position":`${target.children().eq(i).offset().left}`,
                                  "y_position":`${target.children().eq(i).offset().top}`,
                                  "width":`${target.children().eq(i).width()}`,
                                  "height":`${target.children().eq(i).height()}`,
                                  "screenshot":`${rand_num}.png`,
                                  "brand":"No Brand"     }
      content.slot_blob_array.push(slot_blob_combo_obj)  ;      
      resolve_condition_counter+=1;
        if(resolve_condition_counter==target_length){
          resolve(content);
        }            
        }
        
           }).catch(function (error) {
               console.error('oops, something went wrong!', error);
           });
    }
      
  }
  }else if(target==null){
    
  
  }else if(target==undefined){
  
  }
  });
  
}

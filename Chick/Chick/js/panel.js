
// Create a connection to the background page
var json_file_obj={
  id:null,
  scrapeType:null,
  url:null,
  Url_name:null,
  Partner_homepage_url:null,
  Partner_name:"Walmart",
  partner_country:"United Kingdom",
  partner_country_id:"UK",
  resolution:null,
  slots:[]

};
function slot_settings_obj(){
  return{
  "name": `${$("#slot_group_name").val()}`,
  "section_type": `${$("#slot_group_type").val()}`,
  "is_in_carousel": `${$("#is_carousel_checkbox").val()}`,
  }

}
var backgroundPageConnection = chrome.runtime.connect({
   name: "init"
  });
  // initially send the tab id
backgroundPageConnection.postMessage({
    cmd:"onConnect",
    content: `${JSON.stringify(json_file_obj)}`,    
    tabId:chrome.devtools.inspectedWindow.tabId,
});  
  // Listen to messages from the background page
  backgroundPageConnection.onMessage.addListener(function (request) {
    if(request.cmd=="settings"){
      json_file_obj["url"]=`${request.content.url}`;
      json_file_obj.Url_name=`${request.content.Url_name}`;
      json_file_obj.Partner_homepage_url=`${request.content.Partner_homepage_url}`;
      json_file_obj.resolution=`${request.content.resolution}`

    }
    else if(request.cmd=="window_size_changed"){
      
      json_file_obj.resolution=`${request.resolution}`
    }else if(request.cmd=="make_with_click"){
      backgroundPageConnection.postMessage({cmd:"make_with_click",content:`${slot_settings_obj()}`})
    }
    else if(request.cmd=="sending_with_click"){
      json_file_obj.slots=request.content;
      $("#slots_identified").text(`${json_file_obj.slots.length}`);
    }else if(request.cmd=="sending_with_class_or_id"){
      json_file_obj.slots=request.content;
      $("#slots_identified").text(`${json_file_obj.slots.length}`);
    }
    });
//
 
 //step_one_post();
 // content tab listenter

 $("#add_another_slot_group_div").on('click',function(){
  //
}
);
$("#enter_class_id_button").on('click',function(){
  var val=$("#enter_class_id_input_id").val();
  backgroundPageConnection.postMessage({cmd:"make_with_class_or_id",content:`${slot_settings_obj()}`,class_or_id:`${val}`})
}
);
  
$("#slot_click").on('click',function(){
  //
}
);
$("#slot_enter").on('click',function(){
  if($("#enter_class_id_div_id").hasClass("active")){
    $("#enter_class_id_div_id").removeClass("active");
    }
    else{$("#enter_class_id_div_id").addClass("active")}
}
);

 
// settings tab listeners

$("#desktop").on('click',function(){
  $(".resolution.active").removeClass("active");
  $(this).addClass("active");
  backgroundPageConnection.postMessage({
    cmd:"resize_desktop",
  })
});
$("#mobile").on('click',function(){
  $(".resolution.active").removeClass("active");
  $(this).addClass("active");
  backgroundPageConnection.postMessage({
    cmd:"resize_mobile",
  })
});
$("#country").on('change',function(){
  json_file_obj.partner_country=$(this).val();
}
);
$("#retailer").on('change',function(){
  json_file_obj.Partner_name=$(this).val();
}
);

// Type tab listeners
$("#brand_prominence").on( "click",function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="brand_prominence";
  backgroundPageConnection.postMessage({
    cmd:"log",
    content: `${JSON.stringify(json_file_obj)}`
});  
});
$("#apple_pay").on( "click",function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="apple_pay";  
  backgroundPageConnection.postMessage({
    cmd:"log",
    content: `${JSON.stringify(json_file_obj)}`
});  
});
$("#stock_delivery").on( "click",function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="stock_delivery";  
  backgroundPageConnection.postMessage({
    cmd:"log",
    content: `${JSON.stringify(json_file_obj)}`
});  
});
// tab change listeners
$("#type").on( "click",function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel1").addClass("active");
});
$("#settings_tab").on( "click",function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel2").addClass("active");    
});
$("#content_tab").on( "click",function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel3").addClass("active");
});
$("#test_tab").on( "click",function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel4").addClass("active");
});
$("#publish_tab").on( "click",function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel5").addClass("active");
});
// previous and next steps listeners
// panel 1
$("#panel1_next_step").on( "click",function(){
  $("#settings_tab").trigger("click");
  });
// panel 2
$("#panel2_previous_step").on( "click",function(){
  $("#type").trigger("click");
  });
$("#panel2_next_step").on( "click",function(){
  $("#content_tab").trigger("click");
});
// panel 3
$("#panel3_previous_step").on( "click",function(){
  $("#settings_tab").trigger("click");
  });
$("#panel3_next_step").on( "click",function(){
  $("#test_tab").trigger("click");
});
// panel 4
$("#panel4_previous_step").on( "click",function(){
  $("#content_tab").trigger("click");
  });
$("#panel4_next_step").on( "click",function(){
  $("#publish_tab").trigger("click");
});
// panel 5
$("#panel5_previous_step").on( "click",function(){
  $("#test_tab").trigger("click");
  })
  // make posts
  
function makePost(){
  let data ={
    "step": "step_one",
    "cmd": "start",
    "tab_id":`${chrome.devtools.inspectedWindow.tabId}`
    
  }
  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
  })
  .then(response=>response.json())
  .then(res => {
    json_file_obj["id"]=res.id;
    backgroundPageConnection.postMessage({
      //  name: 'init',
        cmd:"log",
        tabId: `${json_file_obj.id}`
      // tabId:"this is tab id"
    });  
  });
 }
 function step_one_post(){
  let data ={
    "step": "step_one",
    "cmd": "start",
    "tab_id":`${chrome.devtools.inspectedWindow.tabId}`
    
  }
  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
  })
  .then(response=>response.json())
  .then(res => {
    json_file_obj["id"]=res.id;
    backgroundPageConnection.postMessage({
      //  name: 'init',
        cmd:"first_step",
        content: `${JSON.stringify(json_file_obj)}`
      
    });  
  });
 }
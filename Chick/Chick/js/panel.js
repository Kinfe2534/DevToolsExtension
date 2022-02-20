
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
var temp_slot_obj={
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
};
var start_cmd={cmd:"start",source:"dev",content:`${JSON.stringify(json_file_obj)}`};
var log_cmd={cmd:"log",source:"dev",content:`${JSON.stringify(json_file_obj)}`};

var backgroundPageConnection = chrome.runtime.connect({
   name: "init"
  });
  // initially send the tab id
backgroundPageConnection.postMessage({
    cmd:"onConnect",
    tabId:chrome.devtools.inspectedWindow.tabId,
    content: `${JSON.stringify(json_file_obj)}`
});  
  // Listen to messages from the background page
  backgroundPageConnection.onMessage.addListener(function (request) {
    if(request.cmd=="settings"){
      json_file_obj["url"]=`${JSON.stringify(request.url)}`;
      json_file_obj.Url_name=`${JSON.stringify(request.Url_name)}`;
      json_file_obj.Partner_homepage_url=`${JSON.stringify(request.Partner_homepage_url)}`;
      json_file_obj.resolution=`${JSON.stringify(request.resolution)}`

    }
    else if(request.cmd=="window_size_changed"){
      
      json_file_obj.resolution=`${JSON.stringify(request.resolution)}`
    }
    });
//
 
 //step_one_post();
 // content tab listenter
 
$("#slot_click").click(function(){
  //
}
);
$("#slot_enter").click(function(){
  if($("#enter_class_id_div_id").hasClass("active")){
    $("#enter_class_id_div_id").removeClass("active");
    }
    else{$("#enter_class_id_div_id").addClass("active")}
}
);
$("#slot_group_type").change(function(){
  temp_slot_obj.section_type=$(this).val();
}
);
$("#slot_group_name").change(function(){
  temp_slot_obj.name=$(this).val();
}
);
 
// settings tab listeners

$("#desktop").click(function(){
  $(".resolution.active").removeClass("active");
  $(this).addClass("active");
  backgroundPageConnection.postMessage({
    cmd:"resize_desktop",
  })
});
$("#mobile").click(function(){
  $(".resolution.active").removeClass("active");
  $(this).addClass("active");
  backgroundPageConnection.postMessage({
    cmd:"resize_mobile",
  })
});
$("#country").change(function(){
  json_file_obj.partner_country=$(this).val();
}
);
$("#retailer").change(function(){
  json_file_obj.Partner_name=$(this).val();
}
);

// Type tab listeners
$("#brand_prominence").click(function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="brand_prominence";
  backgroundPageConnection.postMessage({
    cmd:"log",
    content: `${JSON.stringify(json_file_obj)}`
});  
});
$("#apple_pay").click(function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="apple_pay";  
  backgroundPageConnection.postMessage({
    cmd:"log",
    content: `${JSON.stringify(json_file_obj)}`
});  
});
$("#stock_delivery").click(function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="stock_delivery";  
  backgroundPageConnection.postMessage({
    cmd:"log",
    content: `${JSON.stringify(json_file_obj)}`
});  
});
// tab change listeners
$("#type").click(function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel1").addClass("active");
});
$("#settings_tab").click(function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel2").addClass("active");    
});
$("#content_tab").click(function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel3").addClass("active");
});
$("#test_tab").click(function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel4").addClass("active");
});
$("#publish_tab").click(function(){
  $(".tab.active").removeClass("active");
  $(this).addClass("active");
  $(".panel.active").removeClass("active");
  $("#panel5").addClass("active");
});
// previous and next steps listeners
// panel 1
$("#panel1_next_step").click(function(){
  $("#settings_tab").click();
  });
// panel 2
$("#panel2_previous_step").click(function(){
  $("#type").click();
  });
$("#panel2_next_step").click(function(){
  $("#content_tab").click();
});
// panel 3
$("#panel3_previous_step").click(function(){
  $("#settings_tab").click();
  });
$("#panel3_next_step").click(function(){
  $("#test_tab").click();
});
// panel 4
$("#panel4_previous_step").click(function(){
  $("#content_tab").click();
  });
$("#panel4_next_step").click(function(){
  $("#publish_tab").click();
});
// panel 5
$("#panel5_previous_step").click(function(){
  $("#test_tab").click();
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
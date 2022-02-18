
// Create a connection to the background page
var json_file_obj={};

//
var backgroundPageConnection = chrome.runtime.connect({
    // name: "init"
  });

backgroundPageConnection.postMessage({
  //  name: 'init',
    cmd:"log",
    tabId: chrome.devtools.inspectedWindow.tabId
});  
  // Listen to messages from the background page
  backgroundPageConnection.onMessage.addListener(function (message) {
      document.querySelector('#insertmessagebutton').innerHTML = message.content;
      // port.postMessage(message);
    });
//
function message_to_service_worker(){
  backgroundPageConnection.postMessage({
    //  name: 'init',
      cmd:"log",
      tabId: chrome.devtools.inspectedWindow.tabId
  });
};

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
        cmd:"log",
        content: `${JSON.stringify(json_file_obj)}`
      
    });  
  });
 }
 step_one_post();
// choose type of scrape listeners
$("#brand_prominence").click(function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="brand_prominence";
  backgroundPageConnection.postMessage({
    //  name: 'init',
      cmd:"log",
      content: `${JSON.stringify(json_file_obj)}`
    
  }); 
});
$("#apple_pay").click(function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="apple_pay";
  backgroundPageConnection.postMessage({
    //  name: 'init',
      cmd:"log",
      content: `${JSON.stringify(json_file_obj)}`
    
  }); 
});
$("#stock_delivery").click(function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="stock_delivery";
  backgroundPageConnection.postMessage({
    //  name: 'init',
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
  });
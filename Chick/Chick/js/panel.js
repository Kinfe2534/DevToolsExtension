
// Create a connection to the background page

var active_slot_group=0;
var click_or_enter="click";
var next_slot_group_number=1;
var slot_click_settings=make_slot_settings_0();
var slot_groups=[];
var json_file_obj={
  id:"",
  scrapeType:"Brand Prominence",
  url:"",
  Url_name:"",
  Partner_homepage_url:"",
  Partner_name:"Walmart",
  partner_country:"United Kingdom",
  partner_country_id:"UK",
  resolution:"",
  slots:[]

};
function make_slot_groups_for_save(){
  var slots_for_save=[];
  for(let i=0;i<slot_groups.length;i++){
    for(let j=0;j<slot_groups[i].slots_array.length;j++){
      slots_for_save.push(slot_groups[i].slots_array[j]);
    }
  }
  json_file_obj.slots=slots_for_save;
}
var backgroundPageConnection = chrome.runtime.connect({
   name: "init"
  });
  // initially send the tab id
backgroundPageConnection.postMessage({
    cmd:"onConnect",   
    tabId:chrome.devtools.inspectedWindow.tabId,
});  
  // Listen to messages from the background page
  backgroundPageConnection.onMessage.addListener(function (request) {
    if(request.cmd=="settings"){
      json_file_obj["url"]=`${request.content.url}`;
      json_file_obj.Url_name=`${request.content.Url_name}`;
      json_file_obj.Partner_homepage_url=`${request.content.Partner_homepage_url}`;
      json_file_obj.resolution=`${request.content.resolution}`;
      $("#url").val(request.content.url);

    }
    else if(request.cmd=="window_size_changed"){
      
      json_file_obj.resolution=`${request.resolution}`
    }else if(request.cmd=="make_with_click"){
      if(click_or_enter=="click"){
        $(`#slot_click_${active_slot_group}`).click();
      backgroundPageConnection.postMessage({cmd:"make_with_click",content:slot_click_settings});}
    }
    else if(request.cmd=="sending_with_both"){
      if(`${$(`#replace_extend_checkbox_${request.content.slot_group_number}`).is(":checked")}`=="false"){
      let find_status=true;
      for(let i=0;i<slot_groups.length;i++){
        if(request.content.slot_group_number==slot_groups[i].slot_group_number){
          slot_groups.splice(i,1,request.content);
          find_status=false;
          break;
        }
     
    }
    if(find_status){
      slot_groups.push(request.content);
    }
      $(`#slots_identified_${request.content.slot_group_number}`).text(request.content.slots_array.length); 
  }
  else if(`${$(`#replace_extend_checkbox_${request.content.slot_group_number}`).is(":checked")}`=="true"){
   let find_status=true;
    for(let i=0;i<slot_groups.length;i++){
      if(request.content.slot_group_number==slot_groups[i].slot_group_number){
        let len=slot_groups[i].slots_array.length;
        for(let j=0;j<request.content.slots_array.length;j++){
          request.content.slots_array[j].position=`${len+j}`;
          slot_groups[i].slots_array.push(request.content.slots_array[j]);
        }
        find_status=false;
        $(`#slots_identified_${request.content.slot_group_number}`).text(slot_groups[i].slots_array.length); 
        break;
      }
   
  }
 if(find_status){
    slot_groups.push(request.content);
    $(`#slots_identified_${request.content.slot_group_number}`).text(request.content.slots_array.length); 
  }
    
}
    }else if(request.cmd=="hover_count"){
    $(`#slots_hover_${active_slot_group}`).text(request.content); 
  }
    });
//
 
 //step_one_post();
 // content tab listenter

 $("#add_another_slot_group").on('click',function(){
   //https://stackoverflow.com/questions/6636622/create-element-from-template-element
// make another obj with $()
  var slot_group_number=`${next_slot_group_number}`;
  var template = $($('#another_slot_template').html());
  
  // change the ids of the template elements 
        template.find("#slot_group_name_span_template").text(`Slot group name ${slot_group_number}`);
        template.find("#minus_slot_group_template").attr('id',`minus_slot_group_${slot_group_number}`);
        
        template.find("#slot_group_template").attr('id',`slot_group_${slot_group_number}`);
        template.find("#slot_group_name_template").attr('id',`slot_group_name_${slot_group_number}`);
        template.find("#slot_group_type_template").attr('id',`slot_group_type_${slot_group_number}`);
        template.find("#slots_identified_template").attr('id',`slots_identified_${slot_group_number}`);        
        template.find("#slots_hover_template").attr('id',`slots_hover_${slot_group_number}`);
        template.find("#is_carousel_checkbox_template").attr('id',`is_carousel_checkbox_${slot_group_number}`);
        
        template.find("#replace_extend_checkbox_template").attr('id',`replace_extend_checkbox_${slot_group_number}`);
        template.find("#slot_click_template").attr('id',`slot_click_${slot_group_number}`);      
        template.find("#slot_enter_template").attr('id',`slot_enter_${slot_group_number}`); 

        template.find("#enter_class_or_id_div_id_template").attr('id',`enter_class_or_id_div_id_${slot_group_number}`);
        template.find("#enter_class_or_id_input_id_template").attr('id',`enter_class_or_id_input_id_${slot_group_number}`);
        template.find("#enter_class_or_id_find_template").attr('id',`enter_class_or_id_find_${slot_group_number}`);
       //append
       var clone = template.html();
       $("#add_another_slot_group_div").before(clone);
   
      // attach event listenres
      $(`#slot_enter_${slot_group_number}`).on('click',function(){
          $(".enter_class_or_id_div_class.active").removeClass("active");
          $(".slot_enter_class.active").removeClass("active");
          $(".slot_click_class.active").removeClass("active");
          $(this).addClass("active");
          $(`#enter_class_or_id_div_id_${slot_group_number}`).addClass("active");
          click_or_enter="enter";
          active_slot_group=slot_group_number;
          backgroundPageConnection.postMessage({cmd:"hide_hover",content:""});

      }
      );
      $(`#slot_click_${slot_group_number}`).on('click',function(){        
        $(".enter_class_or_id_div_class.active").removeClass("active");
        $(".slot_click_class.active").removeClass("active");
        $(".slot_enter_class.active").removeClass("active");
        $(this).addClass("active");
        click_or_enter="click";
        active_slot_group=slot_group_number;
        slot_click_settings= make_slot_settings();
        backgroundPageConnection.postMessage({cmd:"show_hover",content:""});
      }
      );
      $(`#minus_slot_group_${slot_group_number}`).on("click",function(){
        // remove imput from list
        for(let i=0;i<slot_groups.length;i++){
        if(slot_group_number==slot_groups[i].slot_group_number){
          slot_groups.splice(i,1);
          break;
        }
      }
    //
             if(active_slot_group==slot_group_number){
        $(".enter_class_or_id_div_class.active").removeClass("active");
        $(".slot_click_class.active").removeClass("active");
        $(".slot_enter_class.active").removeClass("active");
        $("#slot_click_0").addClass("active");
        click_or_enter="click";
        active_slot_group=0;
        slot_click_settings=make_slot_settings_0();}
        $(`#slot_group_${slot_group_number}`).remove();

      });
      
      
        function make_slot_settings() {
        var name= $(`#slot_group_name_${slot_group_number}`).val();
        var section_type= $(`#slot_group_type_${slot_group_number}`).val();
        var is_in_carousel= `${$(`#is_carousel_checkbox_${slot_group_number}`).is(":checked")}`;
        var val=$(`#enter_class_or_id_input_id_${slot_group_number}`).val();
            return { slot_group_number:slot_group_number, 
                          "name": name,
                          "section_type": section_type,
                          "is_in_carousel": is_in_carousel,                        
                          "val": val
                        }  
                      
                      };     

      $(`#enter_class_or_id_find_${slot_group_number}`).on("click",function(){
        
        backgroundPageConnection.postMessage({cmd:"make_with_class_or_id",content:make_slot_settings()});
      });
      
     

    // Clone the new row and insert it into the table
    next_slot_group_number+=1;
    

  
}
);
////////////////////end of add remove//////////////

// content tab 0 listeners
function make_slot_settings_0() {
  var name= `${$("#slot_group_name_0").val()}`;
  var section_type= `${$("#slot_group_type_0").val()}`;
  var is_in_carousel= `${$("#is_carousel_checkbox_0").is(":checked")}`;
  var val=`${$("#enter_class_or_id_input_id_0").val()}`;
   
      return  {slot_group_number:"0",
      "name": name,
      "section_type": section_type,
      "is_in_carousel": is_in_carousel,
      "val":val
      }
                }
$("#enter_class_or_id_find_0").on('click',function(){ 
  backgroundPageConnection.postMessage({cmd:"make_with_class_or_id",content:make_slot_settings_0()});
 }
);
/*
$('#minus_slot_group_0').on("click",function(){
  $("#slot_group_0").remove();

});
*/
$("#slot_click_0").on('click',function(){
  $(".enter_class_or_id_div_class.active").removeClass("active");
  $(".slot_click_class.active").removeClass("active");
  $(".slot_enter_class.active").removeClass("active");
  $(this).addClass("active");
  click_or_enter="click";
  active_slot_group=0;
  slot_click_settings=make_slot_settings_0();
  backgroundPageConnection.postMessage({cmd:"show_hover",content:""});
}
);
$("#slot_enter_0").on('click',function(){
  $(".enter_class_or_id_div_class.active").removeClass("active");
  $(".slot_click_class.active").removeClass("active");
  $(".slot_enter_class.active").removeClass("active");
  $(this).addClass("active");    
  $("#enter_class_or_id_div_id_0").addClass("active");
  click_or_enter="enter";
  active_slot_group=0;
  backgroundPageConnection.postMessage({cmd:"hide_hover",content:""});
}
);
// publish tab listeners
$("#save").on('click',function(){ 
 //make_slot_groups_for_save();
  //backgroundPageConnection.postMessage({cmd:"save",content:json_file_obj});
  var k=["abcd..."];
 // var k= JSON.stringify(input,null,'\t');
    var blob= new Blob([k],  {type: "text/plain;charset=utf-8"});
    saveAs(blob,"Output_test.txt");

 }
);
$("#screenshot").on('click',function(){
  make_slot_groups_for_save();
  backgroundPageConnection.postMessage({cmd:"screenshot",content:json_file_obj});
}
);

// Test tab listeners
$("#run_test").on("click",function(){
  make_slot_groups_for_save();
  alert(JSON.stringify(json_file_obj,null,'\t'));
});
 
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
   
});
$("#apple_pay").on( "click",function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="apple_pay"; 
});
$("#stock_delivery").on( "click",function(){
  $(".scrape_type.active").removeClass("active");
  $(this).addClass("active");
  json_file_obj.scrapeType="stock_delivery";  
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
  var hero_length=0;
  var featured_length=0;
  var recommended_length=0;
  for(let i=0;i<slot_groups.length;i++){
    
    for(let j=0;j<slot_groups[i].slots_array.length;j++){
      if(slot_groups[i].slots_array[j].section_type=="Banner"){hero_length+=1;};
      if(slot_groups[i].slots_array[j].section_type=="Product"){featured_length+=1;};
      if(slot_groups[i].slots_array[j].section_type=="Recommended Product"){recommended_length+=1;};
    }
  }
  $("#hero_banner_slots").text(hero_length);
  $("#featured_product_slots").text(featured_length);
  $("#recommended_product_slots").text(recommended_length);
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
 
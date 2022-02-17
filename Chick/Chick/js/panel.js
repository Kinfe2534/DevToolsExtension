// choose type of scrape listeners
$("#brand_prominence").click(function(){
    $(".scrape_type.active").removeClass("active");
    $(this).addClass("active");
});
$("#apple_pay").click(function(){
    $(".scrape_type.active").removeClass("active");
    $(this).addClass("active");
});
$("#stock_delivery").click(function(){
    $(".scrape_type.active").removeClass("active");
    $(this).addClass("active");
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
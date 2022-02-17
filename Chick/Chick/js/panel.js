
document.getElementById("brand_prominence").addEventListener("click",function(){
    if(document.getElementsByClassName("scrape_type active")[0]!=undefined){
        document.getElementsByClassName("scrape_type active")[0].setAttribute('class',"scrape_type");}
    this.setAttribute('class',"scrape_type active");
});
document.getElementById("apple_pay").addEventListener("click",function(){
    if(document.getElementsByClassName("scrape_type active")[0]!=undefined){
    document.getElementsByClassName("scrape_type active")[0].setAttribute('class',"scrape_type");}
    this.setAttribute('class',"scrape_type active");
});
document.getElementById("stock_&_delivery").addEventListener("click",function(){
    if(document.getElementsByClassName("scrape_type active")[0]!=undefined){
    document.getElementsByClassName("scrape_type active")[0].setAttribute('class',"scrape_type");}
    this.setAttribute('class',"scrape_type active");
});
document.getElementById('panel1_next_step').addEventListener("click",function(){
    
    
});
// tab event listeners

document.getElementById("type").addEventListener("click",function(){
    if(document.getElementsByClassName("tab active")[0]!=undefined){
      //  document.getElementsByClassName("tab active")[0].style.display='none';
        document.getElementsByClassName("tab active")[0].setAttribute('class',"tab");
            
    }
        this.setAttribute('class',"tab active");
        document.getElementById("panel1").style.display='block';    
});
document.getElementById("settings_tab").addEventListener("click",function(){    
    if(document.getElementsByClassName("tab active")[0]!=undefined){
     //   document.getElementsByClassName("tab active")[0].style.display='none';
        document.getElementsByClassName("tab active")[0].setAttribute('class',"tab");
                    
    }
        this.setAttribute('class',"tab active");
        document.getElementById("panel2").style.display='block';    
});
document.getElementById("content_tab").addEventListener("click",function(){
    if(document.getElementsByClassName("tab active")[0]!=undefined){
     //   document.getElementsByClassName("tab active")[0].style.display='none';
        document.getElementsByClassName("tab active")[0].setAttribute('class',"tab");
                   
    }
        this.setAttribute('class',"tab active");
        document.getElementById("panel3").style.display='block';    
    
});
document.getElementById("test_tab").addEventListener("click",function(){
    if(document.getElementsByClassName("tab active")[0]!=undefined){
     //   document.getElementsByClassName("tab active")[0].style.display='none';
        document.getElementsByClassName("tab active")[0].setAttribute('class',"tab");
        
    }
        this.setAttribute('class',"tab active");
        document.getElementById("panel4").style.display='block';    
    
});
document.getElementById("publish_tab").addEventListener("click",function(){
    if(document.getElementsByClassName("tab active")[0]!=undefined){
        //document.getElementsByClassName("tab active")[0].style.display='none';
        document.getElementsByClassName("tab active")[0].setAttribute('class',"tab");
              
    }
        this.setAttribute('class',"tab active");
        document.getElementById("panel5").style.display='block';
    
    
});
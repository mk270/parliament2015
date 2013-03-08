$(document).ready(function(){

         $(window).load(function(){
                             setTimeout(function(){
                            
                                $('.theinteractive').slideDown(1000);
                             }, 200);
         });
     //$(.upload_event).click(function () {
               //$(.form).show();
             // return true;
            // });
             
             //$('.box').hover(function(){
                // $('.boxover').fadeIn("slow");
            // },
             //function(){
                 //$('.boxover').fadeOut();
            // });
            
            $('.upload_button').click(
              function () {
                $('#form').slideDown(2000);
                
              
              
                $('.upload_button').slideUp(2000);
              
            
            });                   

});


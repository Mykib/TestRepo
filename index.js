/*jslint devel: true */


var scroll_state = null;

$(document).ready(function(){
    var menu_is_open = false;
    var project_is_open = false;

    $("#button_float").stop().css({right: '-10em'}, 200);
        
    document.onscroll = function(){
        if(!this.project_is_open){
            scroll_check();
        }
    };
    
    $('#button_1').mouseenter(function(){
         if (menu_is_open){
             $('#button_text_1').effect("shake",{distance:3, times:1, direction: "up"},200);
         }
     });
    
    $('#button_2').mouseenter(function(){
         if (menu_is_open){
             $('#button_text_2').effect("shake",{distance:3, times:1, direction: "up"},200);
         }
     });
    
    $('#button_3').mouseenter(function(){
         if (menu_is_open){
             $('#button_text_3').effect("shake",{distance:3, times:1, direction: "up"},200);
         }
     });
    
    $('#button_4').mouseenter(function(){
         if (menu_is_open){
             $('#button_text_4').effect("shake",{distance:3, times:1, direction: "up"},200);
         }
     });
        
    $('#button_float').click(function(){
        if (menu_is_open){
            retract_menu().complete({
                
            });
        } else {
            expand_menu();
        }
    });
    
    $("#pointer").click(function(){
        scrollTo("skills");
    });
    
    $(".menu_button").click(function(){
        var id = $(this).attr('id');
        switch(id){
            case 'button_1':
                scrollTo("header");
                break;
            case 'button_2':
                scrollTo("skills");
                break;
            case 'button_3':
                scrollTo("projects");
                break;
            case 'button_4':
                scrollTo("footer");
                break;
                 };
    })
    
    function scrollTo(element){
        var elemnt = document.getElementById(element);
        elemnt.scrollIntoView({behavior: "smooth"});
        retract_menu();
        $('.button_text').css({visibility:"hidden"}, 100);
    }
    
    function expand_menu(){
        menu_is_open = true;
        $('.button_text').css({visibility:"visible"}, 100);
        $('#button_4').animate({bottom: '6em'}, 100);
        $('#button_3').animate({bottom: '9.5em'}, 150);
        $('#button_2').animate({bottom: '13em'}, 200);
        $('#button_1').animate({bottom: '16.5em'}, 250,);
    }

    function retract_menu(){
        menu_is_open = false;
        $('#button_4').animate({bottom: '2.5em'}, 200);
        $('#button_3').animate({bottom: '2.5em'}, 200);
        $('#button_2').animate({bottom: '2.5em'}, 200);
        $('#button_1').animate({bottom: '2.5em'}, 200);
        $('.button_text').css({visibility:"hidden"}, 100);
    }
});

//=====================================================================

function resize_load_content(id) {
    this.project_is_open = true;
    var content = $("#project_showcase_window"), el = $("#" + id);
    var hlink = "project_html_files/" + id + ".html";
    console.log(hlink);
    menu_top_action();
    content.load(hlink);

    content.css({
        "top": "auto",
        "bottom": "auto",
        "left": "auto",
        "right": "auto"
    });

    content.css({ "height": el.height() });
    content.css({ "width": el.width() });
    content.css({ "left": el.offset().left - $(window).scrollLeft()});
    content.css({ "top": el.offset().top - $(window).scrollTop()});

    content.animate({
        top: '5vh',
        left: '5vw',
        height: '90vh',
        width: '90vw'
    }, 500);
    
        content.css({"visibility": "visible"});
    $('#close-button').css({"visibility": "visible"});
    $('#dim').css({"visibility": "visible"});
    $('#dim').fadeIn(500);
    $("body").css("overflow-y", "hidden");
}

function close_content(){
    this.project_is_open = false;
    scroll_state = null;
    scroll_check();
    var content = $("#project_showcase_window");
    $('#dim').fadeOut(500, function(){
        $('#dim').css({"visibility": "hidden"});
    });
    content.fadeOut(500, function(){
        content.css({"visibility": "hidden"});
        content.show();
    });
    $('#close-button').css({"visibility": "hidden"});
    $("body").css("overflow-y", "scroll");
}


function menu_top_action(){
    $(".menu_button").css({"visibility": "hidden"});  
    $("#button_float").stop().animate({right: '-10em'}, 200);
    $('.button_text').css({"visibility": "hidden"});
    $('.button_text_bottom').css({"visibility": "hidden"});
    $('#button_4').stop().animate({right: '3.5em', bottom: '2.25em'}, 200);
    $('#button_3').stop().animate({right: '3.5em', bottom: '2.25em'}, 200);
    $('#button_2').stop().animate({right: '3.5em', bottom: '2.25em'}, 200);
    $('#button_1').stop().animate({right: '3.5em', bottom: '2.25em'}, 200);
}

function menu_middle_action(){
    $("#button_float").stop().animate({right: '2em'}, 200, function(){
        $(".menu_button").css({"visibility": "visible"});
        $('.button_text_bottom').css({"visibility": "hidden"});
    });
    $('#button_4').stop().animate({right: '3.5em'}, 200);
    $('#button_3').stop().animate({right: '3.5em'}, 200);
    $('#button_2').stop().animate({right: '3.5em'}, 200);
    $('#button_1').stop().animate({right: '3.5em'}, 200);
}

function menu_bottom_action(){
    $(".menu_button").css({"visibility": "visible"});
    $('.button_text_bottom').css({"visibility": "visible"});
    $('.button_text').css({"visibility": "hidden"});
    $("#button_float").stop().animate({right: '-10em'}, 200);
    $('#button_4').stop().animate({right: '20vw', bottom: '2.25em'}, 200);
    $('#button_3').stop().animate({right: '40vw', bottom: '2.25em'}, 200);
    $('#button_2').stop().animate({right: '60vw', bottom: '2.25em'}, 200);
    $('#button_1').stop().animate({right: '80vw', bottom: '2.25em'}, 200);
}

function scroll_check(){
        if(isTop()){
            if(scroll_state !== 'top'){
                menu_top_action();
            }
            scroll_state = 'top';
        } else if(isBottom()){
            if(scroll_state !== 'bottom'){
                menu_bottom_action();
            }
            scroll_state = 'bottom';
        } else{
            if(scroll_state !== 'middle'){
                menu_middle_action();
            }
            scroll_state = 'middle';
        }
}

function isTop(){
    return $(window).scrollTop() === 0;
}

function isBottom(){
    return $(window).scrollTop() + $(window).height() >= $(document).height();
//    return ($(document).height() - $(window).height()) - $(window).scrollTop() < 5;
}

function changeValue(button) {
    button.value = "Thank you!";
}
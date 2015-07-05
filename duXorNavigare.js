/*#
 ### Name: duXorNavigare
 ### Autor: Dusan Perisic
 ### Home: dusanperisic.com
 ###
 ### Napomena: 	
 ### ------------------------------------------------------------------
 ### Uputstvo:
 ###            Sve što je potrebno uraditi je dodati: window.onload = function(){ fullScreen.showModal(); }
 ###            u sastav JavaScript koda. Podaci koji mogu da mijenjaju su promjenjive:
 ###                currentPage         - pozicija na kojoj se trenutno korisnik nalazi
 ###                topScrollHeight     - visina do koje se ne prikazuje scroll to top polje
 ###                fadeAnimationSpeed  - brzina animacije kojom se pojavljuju-nestaju elementi (izražena u milisekundama)
 ###                scrollSpeed         - brzina skrolovanja (izražena u milisekundama)
 ###                pageIds             - ID-jevi pojedinih segmenata (stranica jednostranicnog sajta)
 ### ------------------------------------------------------------------
#*/ 
var duXorNavigare = {
    pageIds:['#licni-podaci','#radno-iskustvo','#strucnost','#edukacija','#licne-osobine'],
    currentPage:0,
    topScrollHeight:'auto',
    fadeAnimationSpeed:400,
    scrollSpeed:750,
    isScrollTop:true,
    isScrollNext:true,
    start:function(){
        $('#scrollToTop').hide();
        if(this.topScrollHeight=='auto') this.topScrollHeight=window.innerHeight;
        if(this.isScrollTop || this.isScrollNext) this.addScrollButtonStyle();
        if(this.isScrollTop) this.addScrollButton();
        if(this.isScrollNext) this.addScrollNext();
        this.scrollAction();
        this.keyNav();
    },
    addScrollButtonStyle:function(){
        $('body').append('<style>.krug{-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;font-size: 60px;color:white;float: left;margin-left: 11px;padding: 10px 0 0 37px;border-color: #46b8da;cursor: pointer;font-weight: bold;}.krug-default{background-color: rgba(238,238,238,0.8); color: #5bc0de; padding: 0px 0px 0px 26px; line-height: 50px; margin:0 auto; float: inherit;}.krug-default:hover{background-color: rgba(221,221,221,0.8);}@media (min-width:0px) and (max-width:990px){.krug{width:50px;height:50px;padding: 0px 0 0 18px;font-size: 40px;line-height: 49px;}.krug-default{padding: 0px 0px 0px 18px; line-height: 50px;}}@media (min-width:990px) and (max-width:1200px){.krug{width:70px;height: 70px;padding: 2px 0 0 25px;font-size: 50px;}.krug-default{padding: 0px 0px 0px 26px; line-height: 68px;}}@media (min-width:1200px){.krug{width:100px;height: 100px;}.krug-default{padding: 20px 0px 0px 36px;} .krug-default i{font-size: 30px;}}</style>');
    },
    addScrollButton:function(){
        $('body').append('<div id="scrollToTop" style="position:fixed;bottom:20px;right:20px;z-index:999;display:none" onclick="duXorNavigare.scrolToTop()"><div class="krug krug-default"><i class="glyphicon glyphicon-chevron-up"></i></div></div>');
    },
    addScrollNext:function(){
        $('body').append('<div style="position:fixed;bottom:5px;width: 100%;z-index:999;"><div id="scrollSledeci" onclick="duXorNavigare.nextPage()" class="krug krug-default _tooltip" title="Sledeća stranica"><i class="glyphicon glyphicon-chevron-down"></i></div></div>');
        $('_tooltip').tooltip();
    },
    scrollAction:function(){
        $(document).scroll(function(){
            duXorNavigare.detectElement();
            if($(document).scrollTop()>duXorNavigare.topScrollHeight){
                if(!$('#scrollToTop').is(':visible')) $('#scrollToTop').stop().fadeIn(duXorNavigare.fadeAnimationSpeed);
                if($('#scrollSledeci').css('left')!='20px')
                    $('#scrollSledeci').stop().fadeOut(duXorNavigare.fadeAnimationSpeed,function(){
                        $('#scrollSledeci').css('position','absolute').css('bottom','20px').css('left','20px');
                        $('#scrollSledeci').fadeIn(duXorNavigare.fadeAnimationSpeed);
                    });
                else 
                    if($(document).scrollTop()>$(document).height()-$(window).height()-duXorNavigare.topScrollHeight*2){
                        if($('#scrollSledeci').is(':visible')) $('#scrollSledeci').stop().fadeOut(duXorNavigare.fadeAnimationSpeed);
                    }else $('#scrollSledeci').stop().fadeIn(duXorNavigare.fadeAnimationSpeed);
            }
            else{
                if($('#scrollToTop').is(':visible')) $('#scrollToTop').fadeOut(duXorNavigare.fadeAnimationSpeed);
                if($('#scrollSledeci').css('left')=='20px')
                    $('#scrollSledeci').stop().fadeOut(duXorNavigare.fadeAnimationSpeed,function(){
                        $('#scrollSledeci').css('position','relative').css('bottom','5px').css('left','auto');
                        $('#scrollSledeci').fadeIn(duXorNavigare.fadeAnimationSpeed);
                    });
            }
        });
    },
    nextPage:function(){
        if(this.currentPage==this.pageIds.length-1){
            if($('#scrollSledeci').is(':visible')) $('#scrollSledeci').stop().fadeOut(this.fadeAnimationSpeed);
        }else this.currentPage++;
        this.scrollToID(this.pageIds[this.currentPage]);
    },
    previewPage:function(){
        if(this.currentPage>0) this.currentPage--;
        this.scrollToID(this.pageIds[this.currentPage]);
    },
    scrolToTop:function(){
        this.currentPage=0;
        this.scrollToID(this.pageIds[0]);
    },
    scrollToID:function(id){
        var offSet = 65;
        var targetOffset = $(id).offset().top - offSet;
        $('html,body').animate({scrollTop:targetOffset}, this.scrollSpeed);
    },
    detectElement:function(){
        var height=$(document).height();
        for(var i=this.pageIds.length-1; i>-1; i--){
            if($(document).scrollTop() >= $(this.pageIds[i]).position().top-$(this.pageIds[i]).height()){
                this.currentPage=i;
                return;
            }
        }
    },
    keyNav:function(){
        $(document).keydown(function(e) {
            switch(e.which) {
                case 39: // right
                case 40: // down
                    duXorNavigare.nextPage();
                break;
                    
                case 37: // left
                case 38: // up
                    duXorNavigare.previewPage();
                break;
                default: return; // other key
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    }
}
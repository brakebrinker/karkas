var phone_format;
$(document).ready(function() {
	timer();
	$("a.fancybox").fancybox({
        scrolling: false,
        beforeShow: function(){
            $("body").css({'overflow-y':'hidden'});
        },
        afterClose: function(){
            $("body").css({'overflow-y':'visible'});
        }
    });

    $('a.fancy').fancybox({
        maxWidth    : 1600,
        scrolling: false,
        beforeShow: function(){
            $("body").css({'overflow':'hidden'});
        },
        afterClose: function(){
            $("body").css({'overflow':'visible'});
        }
    });

    $("input[name=phone]").mask('+7 (999) 999-99-99');
	phone_format = $('.phone_format').val();


    $('.gallery .bxslider').bxSlider({
        nextSelector: '.gc_next, .gc_next2',
        prevSelector: '.gc_prev, .gc_prev2',
        nextText: ' ',
        prevText: ' '
    });

    $('.projects .bxslider').bxSlider({
        nextSelector: '.pj_next, .arrow-next',
        prevSelector: '.pj_prev, .arrow-prev',
        nextText: ' ',
        prevText: ' '
    });

    $(document).on('click', '.full-project .gallery .small a, .full-project .plan a', function(e) {
        e.preventDefault();

        var href = $(this).attr('href');

        $(this).parents('.full-project').find('img.big').attr('src', href);
    });

    $('.gallery_one a.small').click(function(e) {
        e.preventDefault();

        var href = $(this).attr('href');

        $(this).parents('.gallery_one').find('.preloader').animate({opacity: 1}, 300, function() {
            $(this).parents('.gallery_one').find('.big').attr('src', href).load(function() {
                $(this).parents('.gallery_one').find('.preloader').animate({opacity: 0}, 300);
            });
        });


    });

    $('*[data-action=open_tab]').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            return false;
        }

        var prev = $($(this).parents('.gallery_one').find('li.active a').attr('href'));
        var cur = $(this).parents('.gallery_one').find($(this).attr('href'));
        $(this).parents('li').siblings('.active').removeClass('active');
        $(this).parents('li').addClass('active');

        $(prev).removeClass('active');
        $(cur).addClass('active');
    });

    $('#modals').click(function(e) {
        if (e.target.className == 'content') {
            $(e.target).parents('.modal').modal('hide');
        }
    });

    /*var types = {};

    $.getJSON("settings/types.json", function(data) {
        types = data;

        $('*[data-action=type]').click(function() {
            var type = types[$(this).data('type')];
            $.ajax({
                type: "POST",
                url: "ajax/type.php",
                data: type,
                success: function(response) {
                    $('#project-type').html(response);
                    $('#project-type form.sender').cl_sender();
                    $("input[name=phone]").mask('+7 (999) 999-99-99');
                    $('#project-type').modal('show');
                }
            })
        });
    });

    var projects = {};

    $.getJSON('settings/projects.json', function(data) {
        projects = data;

        $('*[data-action=open_project]').click(function() {
            var id = $(this).data('id');
            $.ajax({
                type: "POST",
                url: "ajax/options.php",
                data: projects[id],
                cache: false,
                success: function(response) {
                    $('#project-content').html(response);
                    $('#project-content form.sender').cl_sender();
                    $("input[name=phone]").mask('+7 (999) 999-99-99');
                    $('#project-content').modal('show');
                }
            })
        });
    }); */

    $('.scrollTo').click(function(e) {
        e.preventDefault;
        var target = $(this).data('target');

        $(window).scrollTo($(target).offset().top - 31, 500);

        return false;
    });

	var form_top = $('.menu').offset().top;
	$(window).scroll(function() {
		var scroll_top = $(this).scrollTop();
		if (scroll_top > form_top) {
			$('.menu').addClass('menu_fixed');
		} else {
			$('.menu').removeClass('menu_fixed');
			$('.menu a').removeClass('active');
		}
	});

	$('.pp1').click(function () {
		$('.ppf_img').css('display','none');
		$('.ppf1').css('display', 'block');
	});

	$('.pp2').click(function () {
		$('.ppf_img').css('display','none');
		$('.ppf2').css('display', 'block');
	});

	$('.pp3').click(function () {
		$('.ppf_img').css('display','none');
		$('.ppf3').css('display', 'block');
	});

	$('.pp4').click(function () {
		$('.ppf_img').css('display','none');
		$('.ppf4').css('display', 'block');
	});

	$('.pp5').click(function () {
		$('.ppf_img').css('display','none');
		$('.ppf5').css('display', 'block');
	});

	$('.pp6').click(function () {
		$('.ppf_img').css('display','none');
		$('.ppf6').css('display', 'block');
	});

    $('.projects .project_img').click(function() {
        var button = $(this).siblings('a.bttn');
        button.trigger('click');
    });

	$('.tech').mouseover(function(){
		$('.tech_img',this).css('transform', 'scale(1.0, 1.0)').css('opacity', 1);
	}).mouseout(function(){
		$('.tech_img',this).css('transform', 'scale(0.5, 0.5)').css('opacity', 0.01);
	});


	 $('.reviews .bxslider').bxSlider({
	 	pager: false
	 });

	var mobile = navigator.userAgent.toLowerCase().match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i);
	if(mobile != null) {
		$('html').css('width', window.innerWidth + 'px');
	} else {
		$('head').append('<link rel="stylesheet" href="css/animations.css" />');
		$('head').append('<style>.animation{visibility:hidden}</style>');
		$('.scroll-animate').each(function () {
			var block = $(this);
			$(window).scroll(function() {
				var top = block.offset().top;
				var bottom = block.height()+top;

				top = top - $(window).height() + 100;
				var scroll_top = $(this).scrollTop();
				if ((scroll_top > top) && (scroll_top < bottom)) {
					if (!block.hasClass('animate')) {
						block.addClass('animate');
						block.trigger('animateIn');
					}
				} else {
					block.removeClass('animate');
					block.trigger('animateOut');
				}
			});
		});

		$('.dw1').on('animateIn', function() {
			var inter = 0;
			$(this).find('.animation').each(function() {
				var block = $(this);
				setTimeout(function() {
					block.addClass('fadeInRight');
				}, inter*200);
				inter++;
			});
		}).on('animateOut', function() {
			$(this).find('.animation').each(function() {
				$(this).removeClass('fadeInRight');
			});
		});

		$('.dw2').on('animateIn', function() {
			var inter = 0;
			$(this).find('.animation').each(function() {
				var block = $(this);
				setTimeout(function() {
					block.addClass('fadeInLeft');
				}, inter*200);
				inter++;
			});
		}).on('animateOut', function() {
			$(this).find('.animation').each(function() {
				$(this).removeClass('fadeInLeft');
			});
		});

		$('#projects').on('animateIn', function() {
			$(this).find('.wrap').addClass('fadeInDown');
		}).on('animateOut', function() {
            $(this).find('.wrap').removeClass('fadeInDown');
		});

		$('.techs').on('animateIn', function() {
			var inter = 0;
			$(this).find('.animation').each(function() {
				var block = $(this);
				setTimeout(function() {
					block.addClass('expandOpen');
				}, inter*200);
				inter++;
			});
		}).on('animateOut', function() {
			$(this).find('.animation').each(function() {
				$(this).removeClass('expandOpen');
			});
		});

		$('.period').on('animateIn', function() {
			var inter = 0;
			$(this).find('.animation').each(function() {
				var block = $(this);
				setTimeout(function() {
					block.addClass('fadeInDown');
				}, inter*200);
				inter++;
			});
		}).on('animateOut', function() {
			$(this).find('.animation').each(function() {
				$(this).removeClass('fadeInDown');
			});
		});
	}

    $('form.sender').cl_sender();

	/* Youtube fix */
	$("iframe").each(function() {
		var ifr_source=$(this).attr('src');
		var wmode="wmode=transparent";
		if(ifr_source.indexOf('?')!=-1) {
			var getQString=ifr_source.split('?');
			var oldString=getQString[1];
			var newString=getQString[0];
			$(this).attr('src',newString+'?'+wmode+'&'+oldString)
		} else $(this).attr('src',ifr_source+'?'+wmode)
	});

	if(phone_format == 'three') {
		$('input[name="phone2"]').focus(function() {
			$(this).keydown(function(event){
				if(event.keyCode != 8) {
					if($(this).val().length >= 3 && event.keyCode != 8)
						$(this).parent().siblings().find('input[name="phone3"]').focus();
				}
			});
		});
		$('input[name="phone3"]').focus(function() {
			$(this).keydown(function(event){
				if(event.keyCode == 8 && $(this).val().length == 0) {
					$(this).parent().siblings().find('input[name="phone2"]').focus();
				}
			});
		});
	}
});

function timer() {
	var now = new Date();
	var newDate = new Date((now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" 23:59:59"); //var newDate = new Date("Feb,29,2014 23:59:00");
	var totalRemains = (newDate.getTime()-now.getTime());
	if (totalRemains>1) {
		var Days = (parseInt(parseInt(totalRemains/1000)/(24*3600)));
		var Hours = (parseInt((parseInt(totalRemains/1000) - Days*24*3600)/3600));
		var Min = (parseInt(parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600)/60));
		var Sec = parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600) - Min*60;
		if (Days<10){Days="0"+Days}
		if (Hours<10){Hours="0"+Hours}
		if (Min<10){Min="0"+Min}
		if (Sec<10){Sec="0"+Sec}
		$(".day").each(function() { $(this).text(Days); });
		$(".hour").each(function() { $(this).text(Hours); });
		$(".min").each(function() { $(this).text(Min); });
		$(".sec").each(function() { $(this).text(Sec); });
		setTimeout(timer, 1000);
	}
}

function popup(id, form, h1, h2, btn) { //onClick="popup('callback', '');"
	$('.popup_overlay').show();
	$('#'+id).addClass('activePopup');
	if(id == 'request') {
		var def_h1 = 'Оставить заявку';
		var def_h2 = 'Заполните форму,<br>и&nbsp;мы&nbsp;обязательно свяжемся с&nbsp;вами!';
		var def_btn = 'Оставить заявку';
	}
	if(h1 != '') {$('#'+id).find('.popup_h1').html(h1);} else {$('#'+id).find('.popup_h1').html(def_h1);}
	if(h2 != '') {$('#'+id).find('.popup_h2').html(h2);} else {$('#'+id).find('.popup_h2').html(def_h2);}
	if(btn != '') {$('#'+id).find('.button').html(btn);} else {$('#'+id).find('.button').html(def_btn);}
    $('body').css({overflow: 'hidden'});
	$('.activePopup').show();
	$('.formname').attr("value", form);
}

function popup_out() {
	$('.popup_overlay').hide();
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
    $('body').css({overflow: 'auto'});
	$('body').find('label input').removeClass('red');
}

function formname(name) { //onClick="formname('text');"
	$('.formname').attr("value", name);
}

function thx() {
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
	popup('thx', '');
	if(phone_format == 'one') {
		$('input[type="text"]').each(function(){
			$(this).val('');
		});
	} else if(phone_format == 'three') {
		$('input[type="text"]:not(input[name="phone1"])').each(function(){
			$(this).val('');
		});
	}
	$('textarea').val('');
}

function checkForm(form1) {

	var $form = $(form1);
	var checker = true;
	var name = $("input[name='name']", $form).val();
	if(phone_format == 'one') {
		var phone = $("input[name='phone']", $form).val();
        console.log($("input[name='phone']", $form).val());
	} else if(phone_format == 'three') {
		var phone1 = $("input[name='phone1']", $form).val();
		var phone2 = $("input[name='phone2']", $form).val();
		var phone3 = $("input[name='phone3']", $form).val();
	}
	var email = $("input[name='email']", $form).val();

	if($form.find(".name").hasClass("required")) {
		if(!name) {
			$form.find(".name").addClass("red");
			checker = false;
		} else {
			$form.find(".name").removeClass('red');
		}
	}

	if(phone_format == 'one') {
		if($form.find(".phone").hasClass("required")) {
			if(!phone) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else if(/[^0-9\+ ()\-]/.test(phone)) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else {
				$form.find(".phone").removeClass("red");
			}
		}
	} else if(phone_format == 'three') {
		if($form.find(".phone").hasClass("required")) {
			if(!phone1) {
				$form.find(".phone").children('input[name="phone1"]').parent().addClass("red");
				checker = false;
			} else if(/[^0-9+]/.test(phone1)) {
				$form.find(".phone").children('input[name="phone1"]').parent().addClass("red");
				checker = false;
			} else {
				$form.find(".phone").children('input[name="phone1"]').parent().removeClass("red");
			}

			if(!phone2) {
				$form.find(".phone").children('input[name="phone2"]').parent().addClass("red");
				checker = false;
			} else if(/[^0-9]/.test(phone2)) {
				$form.find(".phone").children('input[name="phone2"]').parent().addClass("red");
				checker = false;
			} else {
				$form.find(".phone").children('input[name="phone2"]').parent().removeClass("red");
			}

			if(!phone3) {
				$form.find(".phone").children('input[name="phone3"]').parent().addClass("red");
				checker = false;
			} else if(/[^0-9 -]/.test(phone3) || phone3.length < 4) {
				$form.find(".phone").children('input[name="phone3"]').parent().addClass("red");
				checker = false;
			} else {
				$form.find(".phone").children('input[name="phone3"]').parent().removeClass("red");
			}
		}
	}

	if($form.find(".email").hasClass("required")) {
		if(!email) {
			$form.find(".email").addClass("red");
			checker = false;
		} else if(!/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
			$form.find(".email").addClass("red");
			checker = false;
		} else {
			$form.find(".email").removeClass("red");
		}
	}

	if(checker != true) { return false; }
}
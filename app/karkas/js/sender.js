$.cl_sender = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;

    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;

    base.$el.data("cl_sender", base);

    base.init = function () {
        base.options = $.extend({},$.cl_sender.defaultOptions, options);
        base.visit();

        $.get("/blacklist.json", function(data) {
            base.options.blacklist = data;
        });

        base.$el.submit(function(e) {
            e.preventDefault();
            return base.submit(this);
        });

        if (base.getParam('utm_source') !== undefined) {
            base.setCookie('cl_utm_source', base.getParam('utm_source'));
            base.setCookie('cl_utm_medium', base.getParam('utm_medium'));
            base.setCookie('cl_utm_term', base.getParam('utm_term'));
            base.setCookie('cl_utm_content', base.getParam('utm_content'));
            base.setCookie('cl_utm_campaign', base.getParam('utm_campaign'));
        }

        base.wCine('resolution', window.screen.width + "x" + window.screen.height, 1);
        base.wCine('browser', base.getBrowser(), 1);
        base.wCine('referrer', document.referrer, 1);

        // Put your initialization code here
    };

    $(document).on('click', '*[data-action=request]', function() {
        $($(this).data('target')).find('input[name=form-type]').val($(this).data('type'));
        $($(this).data('target')).find('input[name=form-name]').val($(this).data('name'));
    });

    base.getParam = function(sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }

    base.showMessage = function (msg) {
        var $el = $('.modal#thx');
        $el.find('.popup_h1').text(msg[0]);
        $el.find('.popup_h2').text(msg[1]);
        $('.modal').modal('hide');
        $el.modal('show');
    };

    base.submit = function(form) {
        var validateError = base.validate(form);

        if (!validateError) {
            if (base.options.blacklist.indexOf($(form).find('input[name=phone]').val()) > -1) {
                base.showMessage(["Ошибка", "Вы уже отправили заявку."]);

                return false;
            }

            //if (base.isCookie('sent')) {
            //    base.showMessage(["Ошибка", "Вы уже отправляли заявку, ожидайте звонка нашего менеджера или позвоните сами."]);
            //
            //    setTimeout(function() {
            //        $('.modal').modal('hide');
            //    }, 30000);
            //
            //    return false;
            //}

            $(form).find('input[type=file]').each(function(index, element) {
                if (element.files[0] !== undefined) {
                    var size = (element.files[0].size / (1024 * 1024)).toFixed(2);

                    if (size > 10) {
                        base.showMessage(["Ошибка", "Максимальный размер файла - 10 MB."])
                        return false;
                    }
                }
            });

            //Успешная валидация
            var data = new FormData(form);

            base.send(data);
            //base.showMessage(["Спасибо за заявку!", "Ожидайте перенаправления."]);
            base.setCookie('roistat_leadHunterCaught', '1', 14*24);

            return false;
        } else {
            return false;
        }

        return false;
    };

    base.send = function(data, files) {
        base.setCookie("sent", true, base.options.cooldown);

        $.ajax({
            url: base.options.url,
            type: "POST",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                $('form').find('input[type=text], input[type=file], input[type=email]').val("");
                window.location = base.options.redirectUrl;
            }
        });
    };

    base.visit = function() {
        var pages = {};

        if (base.isCookie('pages-visited')) {
            pages = JSON.parse(base.getCookie('pages-visited'));
        }

        var url = document.URL;
        var time = new Date();

        if (!(url in pages)) {
            pages[url] = time.getHours() + ":" + time.getMinutes();
            base.setCookie('pages-visited', JSON.stringify(pages), 24);
        }
    };

    base.validate = function (form) {
        var error = false;

        $(form).find('input[type=text][required]').each(function() {
            if (this.pattern !== "") {
                var patt = new RegExp($(this).attr('pattern'));

                if (patt.test($(this).val())) {
                    $(this).removeClass('error');
                } else {
                    $(this).addClass('error');
                    error = true;
                }
            } else {
                if ($(this).val().length > 0) {
                    $(this).removeClass('error');
                } else {
                    $(this).addClass('error');
                    error = true;
                }
            }
        });

        return error;
    };

    base.setCookie = function (name, value, hours) {
        var d = new Date();
        d.setTime(d.getTime() + (hours*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    };

    base.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        return matches ? decodeURIComponent(matches[1]) : "";
    };

    base.isCookie = function (name) {
        return !(base.getCookie(name) == "");
    }

    base.wCine = function (name, value, hours) {// Write cookie if not exists 
        if (!base.isCookie(name)) {
            base.setCookie(name, value, hours);
        }
    }

    base.getBrowser = function() {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName  = navigator.appName;
        var fullVersion  = ''+parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion,10);
        var nameOffset,verOffset,ix;

        // In Opera 15+, the true version is after "OPR/" 
        if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset+4);
        }
        // In older Opera, the true version is after "Opera" or after "Version"
        else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset+6);
            if ((verOffset=nAgt.indexOf("Version"))!=-1)
                fullVersion = nAgt.substring(verOffset+8);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = nAgt.substring(verOffset+5);
        }
        // In Chrome, the true version is after "Chrome" 
        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset+7);
        }
        // In Safari, the true version is after "Safari" or after "Version" 
        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset+7);
            if ((verOffset=nAgt.indexOf("Version"))!=-1)
                fullVersion = nAgt.substring(verOffset+8);
        }
        // In Firefox, the true version is after "Firefox" 
        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset+8);
        }
        // In most other browsers, "name/version" is at the end of userAgent 
        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
            (verOffset=nAgt.lastIndexOf('/')) )
        {
            browserName = nAgt.substring(nameOffset,verOffset);
            fullVersion = nAgt.substring(verOffset+1);
            if (browserName.toLowerCase()==browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix=fullVersion.indexOf(";"))!=-1)
            fullVersion=fullVersion.substring(0,ix);
        if ((ix=fullVersion.indexOf(" "))!=-1)
            fullVersion=fullVersion.substring(0,ix);

        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
            fullVersion  = ''+parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion,10);
        }

        return (browserName+' '+fullVersion);
    };

    // Run initializer
    base.init();
};

$.cl_sender.defaultOptions = {
    timer: 2700,
    url: "/php/send.php",
    cooldown: 1, //1 Hours
    showsCount: 0,
    redirectUrl: "/thanks.html" +
    ""
};

$.fn.cl_sender = function (options) {
    return this.each(function () {
        (new $.cl_sender(this, options));

        // HAVE YOUR PLUGIN DO STUFF HERE


        // END DOING STUFF

    });
};

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
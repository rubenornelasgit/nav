class f5_nav{
    constructor(div,  config) {

        //#region funciones iniciales
        function creaTag(tag, id, cls){
            var $div = $("<"+tag+"/>");

            if(id!="")
                $div.attr("id",id)

            if(cls!="")
                $div.addClass(cls) 

            return $div
        }

        function item_click(obj, data){debugger}

        var nav_hide = () => {
            $("#nav-background").fadeOut(300)
            $("#nav-nav").css("margin-left","-300px")
        }
        var nav_show = () => {
            $("#nav-background").fadeIn(300)
            $("#nav-nav").css("margin-left","0")
        }

        function nav_submenu(obj) {
            var $div = $(obj)
            $div = $($div).parent()
            $div.find("ul").slideToggle(300)
            if ($div.find(".fa-angle-left").hasClass("fa-angle-left")==true){
                $div.find(".fa-angle-left").addClass("fa-angle-down").removeClass("fa-angle-left")
            } else {
                $div.find(".fa-angle-down").addClass("fa-angle-left").removeClass("fa-angle-down")
            }
        }

        //#endregion

        //#region 01 menu
        var $nav_background = creaTag("div","nav-background","")
        var $nav_icon = creaTag("div","nav-icon","")
        var $i = creaTag("i","","fa fa-bars")

        $nav_icon.append($i)
        $(div).append($nav_background).append($nav_icon)
        //#endregion

        //#region 02 template
        var $nav_nav = creaTag("div","nav-nav","")
        
        var $nav_header = creaTag('div','','nav-header position-relative')
        var $nav_photo = creaTag('div','','nav-photo')
        var $nav_photo_img = creaTag('figure','nav-photo-img','')
        var $nav_name = creaTag('div','','btn btn-sm nav-name pb-0')
        var $nav_mail = creaTag('div','','btn-sm nav-mail pt-0')
        var $a_mail = creaTag('a','','text-white')


        var $ul_menu = creaTag('ul','','ul-menu list-group')

        if(config.background != "")
            $nav_header.css("background-image","url("+config.background+")")

        if(config.photo != "")
            $nav_photo_img.css("background-image","url("+config.photo+")")

        $nav_name.text(config.name)
        $a_mail.attr("href","mailto:"+config.mail).text(config.mail)

        $nav_nav.append($nav_header.append($nav_photo.append($nav_photo_img)).append($nav_name).append($nav_mail.append($a_mail))).append($ul_menu)
        $(div).append($nav_nav)
        //#endregion

        //#region 03 acciones        
        $("#nav-background").click(()=>{nav_hide()})
        $("#nav-icon").click(()=>{nav_show()})
        //#endregion

        //#region addItems
        
        this.add = (json) => {
            var $item = creaTag('li','','list-group-item')
            var $list_me = creaTag('div','','list-me list-group-item-action')
            var $i_icon = creaTag('i','','')
            var $span = creaTag('span','','pl-1')
            var $i_subicon = creaTag('i','','')

            $i_icon.addClass(json.icon || 'fa fa-server')
            $span.text(json.text)
            $i_subicon.text(json.badge)

            
            if (typeof json.data == "string" || json.type=="href") {
                var $a1 = creaTag('a','','pl-1 text-body')
                $a1.attr("href",json.data).text(json.text)
                $span = $a1
                $i_subicon.addClass("badge badge-dark pull-right")
            } else if (typeof json.data == "object" || json.type=="json") {
                $item.data(json.data || {})
                $item.click(function(){item_click($(this), $(this).data())})
                $i_subicon.addClass("badge badge-dark pull-right")
            } else if (json.type=="submenu") {
                $i_subicon.addClass("fa fa-angle-left pull-right")
                $list_me.removeClass("list-me").addClass("list-menu").click(function(){nav_submenu(this)})
            }

            $item.append($list_me.append($i_icon).append($span).append($i_subicon))
            $(".ul-menu").append($item)

            return $item
        }

        this.addsubitem = (item, json) => {
            var $item = $(item)
            if ($item.length==0) {
                return void(0)
            }

            var $ul = $item.find("ul")
            if ($ul.length==0) {
                $ul = creaTag('ul','','list-group small')
                $ul.css("display","none")
                $item.append($ul)
            }

            var $li_sublink = creaTag('li','','nav-sublink')
            var $li_sublink_icon = creaTag('i','','')
            var $li_sublink_span = creaTag('span','','')

            $li_sublink_icon.addClass(json.icon || '')
            $li_sublink_span.text(json.text)

            if (typeof json.data == "string" || json.type=="href") {
                var $a1 = creaTag('a','','pl-1 text-body')
                $a1.attr("href",json.data).text(json.text)
                $li_sublink_span = $a1
            } else if (typeof json.data == "object" || json.type=="json") {
                $li_sublink.data(json.data || {})
                $li_sublink.click(function(){item_click($li_sublink, $li_sublink.data())})
            }

            $li_sublink.append($li_sublink_icon).append($li_sublink_span)
            $ul.append($li_sublink)
        }

        

        //#endregion

    }
}


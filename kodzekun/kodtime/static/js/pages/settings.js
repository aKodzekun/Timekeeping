$(function() {
    var box=$('.settings .right_body .leftbar');

    var arrowright = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>',
        arrowcorner = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-right"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>',
        addbttn = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle" style=" margin-left: 10px; "><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>',
        // deletebttnIp='<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
        editbttn='<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
        deletebttnIp='<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
        deletebttn='<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
        timeIcon='<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';

    var csrftoken = getCookie('csrftoken');

    var send_request ={
        send: function(senddata,tsk)  {
            $.ajax({
                url: "/getData/",
                type: "POST",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: senddata,
                success: function(msg) {
                  var datas =JSON.stringify(msg);
                  send_request.success(datas,tsk,senddata);
                },
                error: function(xhr, status, error) {
                  console.log(xhr.responseText);
                }
            });
        },
        success: function(datas,tsk,senddata)  {
            if(tsk=='tree_veiw'){
                var data_row = (('"'+datas.slice(0, -1).split('","')[0]).split(':')[1]).slice(0, -2).slice(2).split(",");
                tree_about_draw(data_row,senddata);
            }
        }
    };

    $('a:first',box).addClass('activity');
    $('a',box).mousedown(function(e)  {
        $('a',box).removeClass('activity');

        if(!$(this).hasClass('activity')){
            $(this).addClass('activity');
        } else {
            $(this).removeClass('activity');
        }
    });

// Tree settings
    var leftbox=$('.settings .left_body .morecontent'),
        tree_all=$('.tree_view .tree',leftbox).attr("tree"),
        root_id=$('.tree_view .com_name span',leftbox).attr("id");

    $('.tree_view .tree',leftbox).removeAttr("tree");
    var tree_arr=[],
        tree_arr=tree_all.slice(2).slice(0, -2).split("', '");

    $('.this_more').on('click', '#popup-tree',function(){
        var itemId=$(this).attr('item'),
            tsk=$(this).attr('tsk');
        if (!$('div:last-child',leftbox).hasClass('popup-container')) {
            $.ajax({
                url: '/treepopup/',
                type: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: {
                    'mid_id':itemId,
                    'tsk':tsk
                },
                success: function(response) {
                    $('.settings .left_body #structure .morecontent').after(response);
                    new treepopup();
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);
                }
            }); 
        }
    });

    $('.this_more').on('click', '#del_tree',function(){
        var itemId=$(this).attr('item'),
            tsk=$(this).attr('tsk');
            $.ajax({
                url: "/tree_back/",
                type: "POST",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: {
                    'id':itemId,
                    'tsk':tsk
                },
                success: function(response) {
                    location.reload();
                    // $('.overlay').html(response);
                    // new treepopup();
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);
                }
            });
    });
    
    $('#structure').on('click', '#close-popup',function(){
        $('#popup-container').remove();
    });

    send_request.send({'tsk':'tree_veiw','tree_id':root_id},'tree_veiw');

    $('.tree_view .tree',leftbox).append(tree(root_id));

    $('.tree').on('click', '.list',function() {
        $('.list').removeClass('choosed');
        $('.list svg').attr('stroke-width',"1");
        var item = $(this).attr('id'),
            datas='';
        if(!$(this).hasClass('arrow')){
            $(this).addClass('arrow');
            $(this).addClass('choosed');
            $('svg',this).attr('stroke-width',"2");
            $('div:nth-child(3)',this).css({'transform': 'rotate(90deg)'});
            send_request.send({'tsk':'tree_veiw','tree_id':item},'tree_veiw');
            datas=tree(item);
            $(this).after('<div class="grouptree" style="padding: 0px 0px 0px 20px;">'+datas+'</div>')
        } else {
            $(this).removeClass('arrow');
            $(this).removeClass('choosed');
            if(!$('.list').hasClass('choosed')){
                // $('.tree_view .tree',leftbox).html(tree(root_id));
                send_request.send({'tsk':'tree_veiw','tree_id':root_id},'tree_veiw');
            }
            $('svg',this).attr('stroke-width',"1");
            $('div:nth-child(3)',this).css({'transform': 'rotate(0deg)'});
            $(this).next().remove();
        }
    });

    function tree(mid) {
        var data='';
        tree_arr.forEach(element => {
            var elements=element.split(",");
            if(elements[1]==mid){
                check = checkChild(elements[0]);
                var folder='appfolder';
                switch (elements[5]) {
                    case '0':
                        folder='comfolder';
                        break;
                    case '1':
                        folder='depfolder';
                        break;
                    case '2':
                        folder='appfolder';
                        break;
                    default:
                        folder='none';
                        break;
                }
                data += '<div class="list" id="'+elements[0]+'"><div>'+arrowcorner+'</div><div class="'+folder+'"></div><div>'+(check=="1"?arrowright:'')+'</div><div>'+elements[3]+'</div></div>';
            }
        });
        return data;
    }

    function checkChild(item) {
        var ret=0;
        tree_arr.forEach(element => {
            var elements=element.split(",");
            if (elements[1]==item) {
                ret=1;
            }
        });
        return ret;
    }

    function tree_about_draw(items,senddata){
        var date = new Date(items[2] * 1000);
        var humanReadableDate = date.toLocaleString();
        $('.tree_add .this_more',leftbox).html(
            '<table>'+
                '<tr class="more_item">'+
                    '<td colspan="2"><div>'+items[0]+'</div></td>'+
                '</tr>'+
                '<tr class="more_item">'+
                    '<td>Нийт орон тоо</td>'+
                    '<td>'+items[1]+'</td>'+
                '</tr>'+
                '<tr class="more_item">'+
                    '<td>Нийт бүртгэлтэй ажилчид</td>'+
                    '<td>'+items[4]+'</td>'+
                '</tr>'+
                '<tr class="more_item">'+
                    '<td>Идэвхтэй ажилчдын тоо</td>'+
                    '<td>'+items[5]+'</td>'+
                '</tr>'+
                '<tr class="more_item">'+
                    '<td>Сул орон тоо</td>'+
                    '<td>'+(items[1]-items[4])+'</td>'+
                '</tr>'+
                '<tr class="more_item">'+
                    '<td>Үүсэн огноо</td>'+
                    '<td>'+humanReadableDate+'</td>'+
                '</tr>'+
            '</table>'+
            '<div class="divbttn">'+
            (items[3]!='2'?'<div class="popup-btn" id="popup-tree" title="'+items[0].replace(' ','&nbsp;')+"&nbsp;дотор&nbsp;бүтэц&nbsp;нэмэх"+'" item="'+senddata['tree_id']+'" tsk="save"><span>'+addbttn+'</span><span>'+"Бүтэц&nbsp;нэмэх"+'</span></div>':'')+
            '<div class="popup-btn" id="popup-tree" title="'+items[0].replace(' ','&nbsp;')+"&nbsp;бүтэц&nbsp;засах"+'" item="'+senddata['tree_id']+'" tsk="edit"><span>'+editbttn+'</span><span>'+"Бүтэц&nbsp;засах"+'</span></div>'+
            (items[3]!='0'?'<div class="popup-btn" id="del_tree" title="'+items[0].replace(' ','&nbsp;')+"&nbsp;бүтэц&nbsp;устгах"+'" item="'+senddata['tree_id']+'" tsk="del"><span>'+deletebttn+'</span><span>'+"Бүтэц&nbsp;устгах"+'</span></div>':'')+
            '</div>'
        );
        // $('.tree_add #popup-tree span:last-child',leftbox).html(items[0].replace(' ', '&nbsp;')+"&nbsp;дотор&nbsp;бүтэц&nbsp;нэмэх");
    }

// Time settings

    var send_time_request ={
        send: function(datas,tsk)  {
            $.ajax({
                url: "/getTime/",
                type: "POST",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: datas,
                success: function(msg) {
                  var data_v =JSON.stringify(msg);
                  send_time_request.success(data_v,tsk,datas);
                },
                error: function(xhr, status, error) {
                  console.log(xhr.responseText);
                }
            });
        },
        success: function(data_v,tsk,datas)  {
            var time_i = (data_v.slice(0, -4).slice(8).replace(/[[]/g, "").replace(/]/g, "")).split('","');
            time_about_draw(time_i,datas);
        }
    };

    var leftbox=$('.settings .left_body .morecontent');

    $('.time_view .time_title span:last-child',leftbox).append(addbttn);
    $('#timesettings .time_view .time_list .list .time_icon').append(timeIcon);

    $('#timesettings .time_view .time_list .list:first-child').addClass("selcttt");
    // $('#timesettings .time_view .time_list .list:first-child .time_icon svg').attr('stroke-width',"1.5");
    time_id = $('#timesettings .time_view .time_list .list.selcttt').attr('id');
    send_time_request.send({'tsk':'time_veiw','direct_id':time_id},'time_veiw');

    $('#timesettings .time_view .time_list').on('click', '.list',function() {
        var direct_id = $(this).attr('id');
        $('#timesettings .time_view .time_list .list').removeClass('selcttt');
        // $('#timesettings .time_view .time_list .list .time_icon').remove(timeIcon);
        // $('#timesettings .time_view .time_list .list .time_icon').append(timeIcon);
        // $('#timesettings .time_view .time_list .list .time_icon svg').attr('stroke-width',"1");
        if(!$(this).hasClass('selcttt')){
            $(this).addClass('selcttt');
            // $('.time_icon',this).remove(svg);
            send_time_request.send({'tsk':'time_veiw','direct_id':direct_id},'time_veiw');
        } else {
            $(this).removeClass('selcttt');
            // $('.time_icon',this).remove('svg');
        }
    });

    $('#timesettings .time_view').on('click', '.time_title',function(){
        var itemId=$('span:first-child',this).attr('id');
        $.ajax({
            url: '/timepopup/',
            type: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                'time_id':itemId,
                'tsk':'add'
            },
            success: function(response) {
                $('.settings .left_body #structure .morecontent').after(response);
                new timepopup();
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });

    $('#timesettings .time_add .this_more').on('click', '#popup-edit',function(){
        var itemId=$(this).attr('item'),
            tsk=$(this).attr('tsk');
        // $.ajax({
        //     url: '/timepopup/',
        //     type: 'POST',
        //     headers: {
        //         'X-CSRFToken': csrftoken
        //     },
        //     data: {
        //         'time_id':itemId,
        //         'tsk':tsk
        //     },
        //     success: function(response) {
        //         $('.settings .left_body #structure .morecontent').after(response);
        //         new timepopup();
        //     },
        //     error: function(xhr, status, error) {
        //         console.log('Error:', error);
        //     }
        // });
    });

    $('#timesettings .this_more').on('click', '#del_time',function(){
        var itemId=$(this).attr('item'),
            tsk=$(this).attr('tsk');
            $.ajax({
                url: "/time_back/",
                type: "POST",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: {
                    'id':itemId,
                    'tsk':tsk
                },
                success: function(response) {
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);
                }
            });
    });

    function time_about_draw(items,senddata){
        var datas='';
        $.each(items, function(index, value_arr) {
            var value=value_arr.split('#'),
                date = new Date(value[7] * 1000),
                humanReadableDate = date.toLocaleString();
            datas+='<tr class="more_item">'+
                        '<td><div style="background:'+days_color(value[0])+';">'+days_Name(value[0])+'</div></td>'+
                        '<td>'+(value[1]=="1"?"Тийм":"Үгүй")+'</td>'+
                        '<td>'+epoch_to_human(value[2])+'</td>'+
                        '<td>'+epoch_to_human(value[3])+'</td>'+
                        '<td>'+epoch_to_human(value[4])+'</td>'+
                        '<td>'+epoch_to_human(value[5])+'</td>'+
                        '<td>'+(value[6]!="0"?value[6]+"төг":'<font color="gray">[Тодорхойгүй]</font>')+'</td>'+
                        // '<td>'+value[7]+'</td>'+
                    '</tr>'
        });
        time_name = $('#timesettings .time_view .time_list .list.selcttt .time_name').text();
        id = $('#timesettings .time_view .time_list .list.selcttt').attr('id');
        $('.time_add .this_more',leftbox).html(
            '<table>'+
                '<tr class="more_item">'+
                    '<td colspan="8"><div>'+time_name+'</div></td>'+
                '</tr>'+
                '<tr class="more_item">'+
                    '<td>Өдөр</td>'+
                    '<td>Уян&nbsp;хатан цаг</td>'+
                    '<td>Эхлэх&nbsp;цаг</td>'+
                    '<td>Эхлэх&nbsp;цаг дуусах</td>'+
                    '<td>Тарах&nbsp;цаг</td>'+
                    '<td>Тарах&nbsp;цаг дуусах</td>'+
                    '<td>Торгууль</td>'+
                    // '<td>Бүртэгсэн хугацаа</td>'+
                '</tr>'+
                datas+
            '</table>'+
            '<div class="divbttn">'+
            // '<div class="popup-btn" id="popup-edit" title="'+time_name.replace(' ','&nbsp;')+"&nbsp;хуваарь&nbsp;засах"+'" item="'+id+'" tsk="edit"><span>'+editbttn+'</span><span>'+"Хуваарь&nbsp;засах"+'</span></div>'+
            '<div class="popup-btn" id="del_time" title="'+time_name.replace(' ','&nbsp;')+"&nbsp;хуваарь&nbsp;устгах"+'" item="'+id+'" tsk="del"><span>'+deletebttn+'</span><span>'+"Хуваарь&nbsp;устгах"+'</span></div>'+
            '</div>'
        );
    }

    
// ip settings
    $('.Ip_view .Ip_title span:last-child',leftbox).append(addbttn);
    $('.Ip_view .Ip_list .list div:last-child',leftbox).append(deletebttnIp);

    $('#ipsettings .Ip_view').on('click', '.Ip_title',function(){
        var itemId=$('span:first-child',this).attr('id');
        $.ajax({
            url: '/ippopup/',
            type: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                'time_id':itemId,
                'tsk':'add'
            },
            success: function(response) {
                $('.settings .left_body #structure .morecontent').after(response);
                new ip_popup();
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });
    $('#ipsettings .Ip_view .list').on('click', '.ipDel',function(){
        var itemId=$(this).attr('id');
        $.ajax({
            url: '/ip_back/',
            type: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                'id':itemId,
                'tsk':'del'
            },
            success: function(response) {
                location.reload();
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });
})
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function epoch(string) {
    var datearr=string.split(":");
        epochres= (datearr[0]*3600)+(datearr[1]*60);
    return epochres;
}
function alert(datas) {
    $('#popup-container').before(
        '<div class="notification " style="z-index: 1; background-color: #ff2d42e6;">'+
            '<p>'+datas.replace(/#/g, "<br>")+'</p>'+
            '<span class="notification_progress"></span>'+
        '</div>'
    );
}
function days_Name(day) {
    var name = '';
    switch (day) {
        case "1":
            name='Даваа';
            break;
        case "2":
            name='Мягмар';
            break;
        case "3":
            name='Лхагва';
            break;
        case "4":
            name='Пүрэв';
            break;
        case "5":
            name='Баасан';
            break;
        case "6":
            name='Бямба';
            break;
        default:
            name='Ням';
            break;
    }
    return name;
}
function days_color(day) {
    var name = '';
    switch (day) {
        case "1":
            name='#58D68D';
            break;
        case "2":
            name='#58D68D';
            break;
        case "3":
            name='#58D68D';
            break;
        case "4":
            name='#58D68D';
            break;
        case "5":
            name='#58D68D';
            break;
        case "6":
            name='#5DADE2';
            break;
        default:
            name='#5DADE2';
            break;
    }
    return name;
}
function epoch_to_human(epoch) {
    if(epoch=="0"){
        return '<font color="gray">[Тодорхойгүй]</font>';
    } else {
        hours=0,min=0;
        hours=parseInt(epoch)/3600;
        min=(parseInt(epoch)%3600)/60;

        return parseInt(hours,10)+"&nbsp;цаг:&nbsp;"+parseInt(min,10)+"&nbsp;минут";
    }
}
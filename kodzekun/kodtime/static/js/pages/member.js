$(function() {
    var arrowright = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>',
        arrowcorner = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-right"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>',
        addbttn = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle" style=" margin-left: 10px; "><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>',
        editbttn = '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
        delbttn = '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
        useredit = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>',
        useredel = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-minus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line></svg>',
        useradd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>',
        print = '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>',
        search = '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
        
    var box_r = $('.member_content .right_body'),
        box_l = $('.member_content .left_body'),
        nulll = '<font color="gray">[Тодорхойгүй]</font>';

    $('.topbar .cmd_member',box_l).append(useradd);
    $('.topbar .cmd_print',box_l).append(print);
    $('.topbar .input-group div:last-child',box_l).html(search);

    $('body').on('click', '#close-popup',function(){
        $('#popup-container').remove();
    });

    var ajax ={
        send: function(url,datas,tsk,app_id)  {
            $.ajax({
                url: url,
                type: "POST",
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                data: datas,
                success: function(msg) {
                    if (tsk=='add_member') {
                        $(box_l).after(msg);
                        new memberpopup(app_id);
                    } else if (tsk=='memberedit'){
                        $(box_l).after(msg);
                        console.log('====================================');
                        console.log("hi");
                        console.log('====================================');
                    } else {
                        var datas =JSON.stringify(msg);
                        ajax.success(datas,tsk);
                    }
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        },
        success: function(datas,tsk)  {
            if(tsk=='member_show'){
                clear_data = (datas.slice(0, -2).slice(9)).replace(/[[\"']/g, "").split(",");
                // console.log(clear_data);
                draw_member(clear_data,tsk);
            } 
            if(tsk=='memberdel'){
                location.reload();
            }
        }
    };
    
    // Member tree
    var tree_i=$('.structure .tree',box_r).attr("tree"),
        com_id=$('.structure .com_name',box_r).attr("id");

    var tree_arr=[],
        tree_arr=tree_i.slice(2).slice(0, -2).split("', '");

    $('.structure .tree',box_r).removeAttr("tree");
    $('.structure .tree',box_r).append(tree(com_id,tree_arr));
    ajax.send("/member_show/",{'tsk':'member_show','tree_id':com_id},'member_show');

    $('.tree',box_r).on('click', '.list',function() {
        $('.list').removeClass('choosed');
        $('.list svg').attr('stroke-width',"1");
        var item = $(this).attr('id');
        if(!$(this).hasClass('arrow')){
            $(this).addClass('arrow');
            $(this).addClass('choosed');
            $('svg',this).attr('stroke-width',"2");
            $('div:nth-child(3)',this).css({'transform': 'rotate(90deg)'});
            $(this).after('<div class="grouptree" style="padding: 0px 0px 0px 20px;">'+tree(item)+'</div>')
            ajax.send("/member_show/",{'tsk':'member_show','tree_id':item},'member_show');
        } else {
            $(this).removeClass('arrow');
            $(this).removeClass('choosed');
            $('svg',this).attr('stroke-width',"1");
            $('div:nth-child(3)',this).css({'transform': 'rotate(0deg)'});
            $(this).next().remove();
            if(!$('.list').hasClass('choosed')){
                ajax.send("/member_show/",{'tsk':'member_show','tree_id':com_id},'member_show');
            }
        }
    });

    // Search
    $('.topbar .input-group input').on('input', function() {
        var inputText = $(this).val(),
            caretIndex = $(this).prop('selectionStart'),
            tree_id=$('.tree .list.choosed',box_r).attr("id");            
        
        var words = inputText.split(/\s/);
        var currentWord = '';
        for (var i = 0; i < words.length; i++) {
            if (caretIndex <= words[i].length) {
                currentWord = words[i];
                break;
            }
            caretIndex -= words[i].length + 1;
        }
        ajax.send("/member_show/",{'tsk':'member_search','tree_id':(tree_id==undefined?0:tree_id),'search':currentWord},'member_show');
    });

    // User add
    $('.topbar',box_l).on('click', '.cmd_member',function() {
        appcheck=$('.tree .list.choosed div:nth-child(2)',box_r).hasClass("appfolder");
        if(appcheck){
            app_id=$('.tree .list.choosed').attr('id');
            // console.log(app_id);
            ajax.send("/add_member/",{'tsk':'add_member','tree_id':app_id},'add_member',app_id);
        }else{
            alert('Албан тушаал сонгоно уу!#');
        }
    });

    // User del pop
    $('.content .content_body',box_l).on('click', '.memberpop',function() {
        var user_id=$(this).attr('item'),
            user=$(this).attr('user');
        $(box_l).after('<div id="popup-container">'+
                            '<div id="popup-content" style=" width: 480px; ">'+
                                '<h1 style=" font-size: 1.9rem; ">Хэрэглэгч устгах</h1>'+
                                '<form action="" method="POST" class="input-box userdelpopup" novalidate="" datas="" style=" width: 100%; ">'+
                                    '<div class="">'+
                                        '<b>'+user+'</b> хэрэглэгчийг устгах гэж байна. </br>Үнэхээр устгах уу?'+
                                    '</div>'+
                                    '<div class="popup-bttn">'+
                                        '<div id="save-popup" item="'+user_id+'">Тийм</div>'+
                                        '<div id="close-popup">Үгүй</div>'+
                                    '</div>'+
                                '</form>'+
                            '</div>'+
                        '</div>');
    });

    // User del bttn
    $('.member_content').on('click', '#save-popup',function() {
        var user_id=$(this).attr('item');
        ajax.send("/memberdel/",{'tsk':'memberdel','user_id':user_id},'memberdel',user_id);
    });

    // User edit pop
    $('.content .content_body',box_l).on('click', '.memberedit',function() {
        var user_id=$(this).attr('item');
        ajax.send("/memberedit/",{'tsk':'memberedit','user_id':user_id},'memberedit',user_id);
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
                data += '<div class="list" id="'+elements[0]+'"><div>'+arrowcorner+'</div><div class="'+folder+'"></div><div style="margin-top: 4px;">'+(check=="1"?arrowright:'')+'</div><div style=" margin-top: 5px; ">'+elements[3]+'</div></div>';
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
    function draw_member(datas,tsk){
        if (tsk=='member_show') {
            var tr_r ='<tr>'+
                        '<td>№</td>'+
                        '<td>Овог</td>'+
                        '<td>Нэр</td>'+
                        '<td>Хүс</td>'+
                        '<td>Утас</td>'+
                        '<td>Имейл</td>'+
                        '<td>Ажилтны&nbsp;төлөв</td>'+
                        '<td>Цагийн&nbsp;төлөв</td>'+
                        '<td>Цалин</td>'+
                        '<td></td>'+
                        '<td></td>'+
                    '</tr>';
            let cnt=0;
            if (datas[0]!='none'){
                datas.forEach(elements => {
                var item = elements.split("#");
                // console.log(item);
                tr_r +='<tr item="'+item[0]+'">'+
                            '<td>'+(++cnt)+'</td>'+
                            '<td>'+item[1]+'</td>'+
                            '<td>'+item[2]+'</td>'+
                            '<td><div>'+(item[3]=='1'?'Эр':'Эм')+'</div></td>'+
                            '<td><div>'+(item[4]==''?nulll:item[4])+'</div></td>'+
                            '<td><div>'+(item[5]=='0'?nulll:item[5])+'</div></td>'+
                            '<td><div>'+(item[6]=='0'?nulll:item[6])+'</div></td>'+
                            '<td><div>'+(item[7]=='1'?'Бүртгүүлнэ':'Бүртгүүлэхгүй')+'</div></td>'+
                            '<td><div>'+(item[8]=='0'?nulll:item[8]+'Төг')+'</div></td>'+
                            '<td class="memberedit" item="'+item[0]+'">'+useredit+'</td>'+
                            '<td class="memberdel" user="'+item[1]+' '+item[2].toUpperCase()+'" item="'+item[0]+'">'+useredel+'</td>'+
                        '</tr>';
                });
            } else {

            }
            $('.content_body table',box_l).html(tr_r)
        }
    }
})

function work_type_name(id) {
    var name='';
    switch (id) {
        case '1':
            name='Идэвхтэй';
            break;
        case '2':
            name='Амралттай';
            break;
        case '3':
            name='Чөлөөтэй';
            break;
        case '4':
            name='Ажлаас&nbsp;гарсан';
            break;
        case '5':
            name='Тэтгэвэрт&nbsp;гарсан';
            break;
        case '6':
            name='Урт хугацааны&nbsp;чөлөөтэй';
            break;
        default:
            name='Бусад';
            break;
    }
}
function alert(datas) {
    $('.member_content .right_body').before(
        '<div class="notification " style="z-index: 1; background-color: #E74C3C;">'+
            '<p>'+datas.replace(/#/g, "<br>")+'</p>'+
            '<span class="notification_progress"></span>'+
        '</div>'
    );
}
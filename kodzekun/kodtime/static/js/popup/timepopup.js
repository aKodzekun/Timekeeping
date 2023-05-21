function timepopup(params) {
    
    var box=$('#popup-container #popup-content #timepopup');
    $('.time_pop_list .read',box).prop("disabled", true);

    $('#1r',box).change(function()  {
        if ($(this).is(":checked")) {
            $('.time_pop_list.1d .is_flixible',box).prop("disabled", false);
            $('.time_pop_list.1d .s1',box).prop("disabled", false);
            $('.time_pop_list.1d .e1',box).prop("disabled", false);
        }else{
            $('.time_pop_list.1d .read',box).prop("disabled", true);
            $('.time_pop_list.1d .is_flixible',box).prop("checked", false);
        }
    });
    $('.time_pop_list.1d .is_flixible',box).change(function()  {
        if ($(this).is(":checked")) {
            // Checkbox is checked
            // console.log("Checkbox is checked");
            $('.time_pop_list.1d .s2',box).prop("disabled", false);
            $('.time_pop_list.1d .e2',box).prop("disabled", false);
            // Perform any desired actions
          } else {
            // Checkbox is unchecked
            // console.log("Checkbox is unchecked");
            $('.time_pop_list.1d .s2',box).prop("disabled", true);
            $('.time_pop_list.1d .e2',box).prop("disabled", true);
            // Perform any desired actions
          }
    });
    
    $('#2r',box).change(function()  {
        if ($(this).is(":checked")) {
            $('.time_pop_list.2d .is_flixible',box).prop("disabled", false);
            $('.time_pop_list.2d .s1',box).prop("disabled", false);
            $('.time_pop_list.2d .e1',box).prop("disabled", false);
        }else{
            $('.time_pop_list.2d .read',box).prop("disabled", true);
            $('.time_pop_list.2d .is_flixible',box).prop("checked", false);
        }
    });
    $('.time_pop_list.2d .is_flixible',box).change(function()  {
        if ($(this).is(":checked")) {
            // Checkbox is checked
            // console.log("Checkbox is checked");
            $('.time_pop_list.2d .s2',box).prop("disabled", false);
            $('.time_pop_list.2d .e2',box).prop("disabled", false);
            // Perform any desired actions
          } else {
            // Checkbox is unchecked
            // console.log("Checkbox is unchecked");
            $('.time_pop_list.2d .s2',box).prop("disabled", true);
            $('.time_pop_list.2d .e2',box).prop("disabled", true);
            // Perform any desired actions
          }
    });
    
    $('#3r',box).change(function()  {
        if ($(this).is(":checked")) {
            $('.time_pop_list.3d .is_flixible',box).prop("disabled", false);
            $('.time_pop_list.3d .s1',box).prop("disabled", false);
            $('.time_pop_list.3d .e1',box).prop("disabled", false);
        }else{
            $('.time_pop_list.3d .read',box).prop("disabled", true);
            $('.time_pop_list.3d .is_flixible',box).prop("checked", false);
        }
    });
    $('.time_pop_list.3d .is_flixible',box).change(function()  {
        if ($(this).is(":checked")) {
            // Checkbox is checked
            // console.log("Checkbox is checked");
            $('.time_pop_list.3d .s2',box).prop("disabled", false);
            $('.time_pop_list.3d .e2',box).prop("disabled", false);
            // Perform any desired actions
          } else {
            // Checkbox is unchecked
            // console.log("Checkbox is unchecked");
            $('.time_pop_list.3d .s2',box).prop("disabled", true);
            $('.time_pop_list.3d .e2',box).prop("disabled", true);
            // Perform any desired actions
          }
    });
    
    $('#4r',box).change(function()  {
        if ($(this).is(":checked")) {
            $('.time_pop_list.4d .is_flixible',box).prop("disabled", false);
            $('.time_pop_list.4d .s1',box).prop("disabled", false);
            $('.time_pop_list.4d .e1',box).prop("disabled", false);
        }else{
            $('.time_pop_list.4d .read',box).prop("disabled", true);
            $('.time_pop_list.4d .is_flixible',box).prop("checked", false);
        }
    });
    $('.time_pop_list.4d .is_flixible',box).change(function()  {
        if ($(this).is(":checked")) {
            // Checkbox is checked
            // console.log("Checkbox is checked");
            $('.time_pop_list.4d .s2',box).prop("disabled", false);
            $('.time_pop_list.4d .e2',box).prop("disabled", false);
            // Perform any desired actions
          } else {
            // Checkbox is unchecked
            // console.log("Checkbox is unchecked");
            $('.time_pop_list.4d .s2',box).prop("disabled", true);
            $('.time_pop_list.4d .e2',box).prop("disabled", true);
            // Perform any desired actions
          }
    });
    
    $('#5r',box).change(function()  {
        if ($(this).is(":checked")) {
            $('.time_pop_list.5d .is_flixible',box).prop("disabled", false);
            $('.time_pop_list.5d .s1',box).prop("disabled", false);
            $('.time_pop_list.5d .e1',box).prop("disabled", false);
        }else{
            $('.time_pop_list.5d .read',box).prop("disabled", true);
            $('.time_pop_list.5d .is_flixible',box).prop("checked", false);
        }
    });
    $('.time_pop_list.5d .is_flixible',box).change(function()  {
        if ($(this).is(":checked")) {
            // Checkbox is checked
            // console.log("Checkbox is checked");
            $('.time_pop_list.5d .s2',box).prop("disabled", false);
            $('.time_pop_list.5d .e2',box).prop("disabled", false);
            // Perform any desired actions
          } else {
            // Checkbox is unchecked
            // console.log("Checkbox is unchecked");
            $('.time_pop_list.5d .s2',box).prop("disabled", true);
            $('.time_pop_list.5d .e2',box).prop("disabled", true);
            // Perform any desired actions
          }
    });
    
    $('#6r',box).change(function()  {
        if ($(this).is(":checked")) {
            $('.time_pop_list.6d .is_flixible',box).prop("disabled", false);
            $('.time_pop_list.6d .s1',box).prop("disabled", false);
            $('.time_pop_list.6d .e1',box).prop("disabled", false);
        }else{
            $('.time_pop_list.6d .read',box).prop("disabled", true);
            $('.time_pop_list.6d .is_flixible',box).prop("checked", false);
        }
    });
    $('.time_pop_list.6d .is_flixible',box).change(function()  {
        if ($(this).is(":checked")) {
            // Checkbox is checked
            // console.log("Checkbox is checked");
            $('.time_pop_list.6d .s2',box).prop("disabled", false);
            $('.time_pop_list.6d .e2',box).prop("disabled", false);
            // Perform any desired actions
          } else {
            // Checkbox is unchecked
            // console.log("Checkbox is unchecked");
            $('.time_pop_list.6d .s2',box).prop("disabled", true);
            $('.time_pop_list.6d .e2',box).prop("disabled", true);
            // Perform any desired actions
          }
    });
    
    $('#7r',box).change(function()  {
        if ($(this).is(":checked")) {
            $('.time_pop_list.7d .is_flixible',box).prop("disabled", false);
            $('.time_pop_list.7d .s1',box).prop("disabled", false);
            $('.time_pop_list.7d .e1',box).prop("disabled", false);
        }else{
            $('.time_pop_list.7d .read',box).prop("disabled", true);
            $('.time_pop_list.7d .is_flixible',box).prop("checked", false);
        }
    });
    $('.time_pop_list.7d .is_flixible',box).change(function()  {
        if ($(this).is(":checked")) {
            // Checkbox is checked
            // console.log("Checkbox is checked");
            $('.time_pop_list.7d .s2',box).prop("disabled", false);
            $('.time_pop_list.7d .e2',box).prop("disabled", false);
            // Perform any desired actions
          } else {
            // Checkbox is unchecked
            // console.log("Checkbox is unchecked");
            $('.time_pop_list.7d .s2',box).prop("disabled", true);
            $('.time_pop_list.7d .e2',box).prop("disabled", true);
            // Perform any desired actions
          }
    });

    $(box).on('click', '#save-popup',function(){
        var arr=[],
            msg='',
            name=$('#name',box).val(),
            desc=$('.description',box).val(),
            penalty=$('#penalty',box).val();

        // [odor,switch,check,s1,s2,e1,e2]
        if($('#1r',box).is(":checked")){
            var s1=$('.time_pop_list.1d .s1').val(),
                e1=$('.time_pop_list.1d .e1').val();
            if(s1=='' ||e1=='' ){
                msg+="1-р өдөр ажил эхлэх, тарах цаг хоосон байна!#";
            }else{
                if($('.time_pop_list.1d .is_flixible',box).is(":checked")){
                    var s2=$('.time_pop_list.1d .s2').val(),
                        e2=$('.time_pop_list.1d .e2').val();
                        
                    if(s2=='' ||e2=='' ){
                        msg+="1-р өдөр ажилд эхлэх, тарах сүүлийн цаг хоосон байна!#";
                    }else{
                        arr.push([1,1,1,epoch(s1),epoch(s2),epoch(e1),epoch(e2)])
                    }
                }else{
                    arr.push([1,1,0,epoch(s1),0,epoch(e1),0])
                }
            }
        }
        if($('#2r',box).is(":checked")){
            var s1=$('.time_pop_list.2d .s1').val(),
                e1=$('.time_pop_list.2d .e1').val();
            if(s1=='' ||e1=='' ){
                msg+="2-р өдөр ажил эхлэх, тарах цаг хоосон байна!#";
            }else{
                if($('.time_pop_list.2d .is_flixible',box).is(":checked")){
                    var s2=$('.time_pop_list.2d .s2').val(),
                        e2=$('.time_pop_list.2d .e2').val();
                        
                    if(s2=='' ||e2=='' ){
                        msg+="2-р өдөр ажилд эхлэх, тарах сүүлийн цаг хоосон байна!#";
                    }else{
                        arr.push([2,1,1,epoch(s1),epoch(s2),epoch(e1),epoch(e2)])
                    }
                }else{
                    arr.push([2,1,0,epoch(s1),0,epoch(e1),0])
                }
            }
        }
        if($('#3r',box).is(":checked")){
            var s1=$('.time_pop_list.3d .s1').val(),
                e1=$('.time_pop_list.3d .e1').val();
            if(s1=='' ||e1=='' ){
                msg+="3-р өдөр ажил эхлэх, тарах цаг хоосон байна!#";
            }else{
                if($('.time_pop_list.3d .is_flixible',box).is(":checked")){
                    var s2=$('.time_pop_list.3d .s2').val(),
                        e2=$('.time_pop_list.3d .e2').val();
                        
                    if(s2=='' ||e2=='' ){
                        msg+="3-р өдөр ажилд эхлэх, тарах сүүлийн цаг хоосон байна!#";
                    }else{
                        arr.push([3,1,1,epoch(s1),epoch(s2),epoch(e1),epoch(e2)])
                    }
                }else{
                    arr.push([3,1,0,epoch(s1),0,epoch(e1),0])
                }
            }
        }        
        if($('#4r',box).is(":checked")){
            var s1=$('.time_pop_list.4d .s1').val(),
                e1=$('.time_pop_list.4d .e1').val();
            if(s1=='' ||e1=='' ){
                msg+="4-р өдөр ажил эхлэх, тарах цаг хоосон байна!#";
            }else{
                if($('.time_pop_list.4d .is_flixible',box).is(":checked")){
                    var s2=$('.time_pop_list.4d .s2').val(),
                        e2=$('.time_pop_list.4d .e2').val();
                        
                    if(s2=='' ||e2=='' ){
                        msg+="4-р өдөр ажилд эхлэх, тарах сүүлийн цаг хоосон байна!#";
                    }else{
                        arr.push([4,1,1,epoch(s1),epoch(s2),epoch(e1),epoch(e2)])
                    }
                }else{
                    arr.push([4,1,0,epoch(s1),0,epoch(e1),0])
                }
            }
        }       
        if($('#5r',box).is(":checked")){
            var s1=$('.time_pop_list.5d .s1').val(),
                e1=$('.time_pop_list.5d .e1').val();
            if(s1=='' ||e1=='' ){
                msg+="5-р өдөр ажил эхлэх, тарах цаг хоосон байна!#";
            }else{
                if($('.time_pop_list.5d .is_flixible',box).is(":checked")){
                    var s2=$('.time_pop_list.5d .s2').val(),
                        e2=$('.time_pop_list.5d .e2').val();
                        
                    if(s2=='' ||e2=='' ){
                        msg+="5-р өдөр ажилд эхлэх, тарах сүүлийн цаг хоосон байна!#";
                    }else{
                        arr.push([5,1,1,epoch(s1),epoch(s2),epoch(e1),epoch(e2)])
                    }
                }else{
                    arr.push([5,1,0,epoch(s1),0,epoch(e1),0])
                }
            }
        }       
        if($('#6r',box).is(":checked")){
            var s1=$('.time_pop_list.6d .s1').val(),
                e1=$('.time_pop_list.6d .e1').val();
            if(s1=='' ||e1=='' ){
                msg+="6-р өдөр ажил эхлэх, тарах цаг хоосон байна!#";
            }else{
                if($('.time_pop_list.6d .is_flixible',box).is(":checked")){
                    var s2=$('.time_pop_list.6d .s2').val(),
                        e2=$('.time_pop_list.6d .e2').val();
                        
                    if(s2=='' ||e2=='' ){
                        msg+="6-р өдөр ажилд эхлэх, тарах сүүлийн цаг хоосон байна!#";
                    }else{
                        arr.push([6,1,1,epoch(s1),epoch(s2),epoch(e1),epoch(e2)])
                    }
                }else{
                    arr.push([6,1,0,epoch(s1),0,epoch(e1),0])
                }
            }
        }    
        if($('#7r',box).is(":checked")){
            var s1=$('.time_pop_list.7d .s1').val(),
                e1=$('.time_pop_list.7d .e1').val();
            if(s1=='' ||e1=='' ){
                msg+="7-р өдөр ажил эхлэх, тарах цаг хоосон байна!#";
            }else{
                if($('.time_pop_list.7d .is_flixible',box).is(":checked")){
                    var s2=$('.time_pop_list.7d .s2').val(),
                        e2=$('.time_pop_list.7d .e2').val();
                        
                    if(s2=='' ||e2=='' ){
                        msg+="7-р өдөр ажилд эхлэх, тарах сүүлийн цаг хоосон байна!#";
                    }else{
                        arr.push([7,1,1,epoch(s1),epoch(s2),epoch(e1),epoch(e2)])
                    }
                }else{
                    arr.push([7,1,0,epoch(s1),0,epoch(e1),0])
                }
            }
        }
        msg+= (arr.length==0?'7 Хоногийн цагийг сонгоно уу!#':'');
        msg+= (name==''?'Нэр тодорхойлно уу!#':'');
        if (msg!='') {
            alert(msg);
        }else{

            datas = {
                'tsk': 'add',
                'name':name,
                'desc':desc,
                'penalty':penalty,
                'days[]':arr
            }
            console.log(datas);
            tree_back.send(datas)
        }
    });

    var csrftoken = getCookie('csrftoken');

    var tree_back ={
        send: function(senddata)  {
            $.ajax({
                url: "/time_back/",
                type: "POST",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: senddata,
                success: function(response) {
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);
                }
            });
        },
        success: function(datas,tsk,senddata)  {
        }
    };
}
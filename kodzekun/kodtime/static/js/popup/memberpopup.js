function memberpopup(datas) {
    var box=$('#popup-container #popup-content #memberpopup');

    console.log(datas);
    $(box).on('click', '#save-popup',function() {
        var msg ='',
            last = $('#last',box).val(),
            phone =  $('#phone',box).val(),
            mail =  $('#mail',box).val(),
            first =  $('#first',box).val(),
            salary =  $('#salary',box).val(),
            direct =  $('.direct option:selected',box).val(),
            age =  $('#age',box).val(),
            gender =  ($('.gender',box).is(":checked")?"1":"0");

        msg += (last==''?'Овог оруулна уу!#':'');
        msg += (first==''?'Нэр оруулна уу!#':'');
        msg += (salary==''?'Цалин оруулна уу!#':'');
        msg += (age==''?'Нас оруулна уу!#':'');
        msg += (phone==''?'Утас оруулна уу!#':'');
        msg += (mail==''?'И-мейл оруулна уу!#':'');
        if(msg!=''){
            $('.member_content .right_body').before(
                '<div class="notification " style="z-index: 1; background-color: #E74C3C;">'+
                    '<p>'+msg.replace(/#/g, "<br>")+'</p>'+
                    '<span class="notification_progress"></span>'+
                '</div>'
            );
        } else {
            dsta = {
                        'last':last,
                        'first':first,
                        'salary':salary,
                        'age':age,
                        'phone':phone,
                        'mail':mail,
                        'direct':direct,
                        'gender':gender,
                        'app_id':datas
                    }
            $.ajax({
                url: "/membersave/",
                type: "POST",
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                data: {
                    'last':last,
                    'first':first,
                    'salary':salary,
                    'age':age,
                    'phone':phone,
                    'mail':mail,
                    'direct':direct,
                    'gender':gender,
                    'app_id':datas
                },
                success: function(msg) {
                    console.log(msg);
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        }
        // if(appcheck){
        //     app_id=$('.tree .list.choosed').attr('id');
        //     ajax.send("/add_member/",{'tsk':'add_member','tree_id':app_id},'add_member');
        // }else{
        //     alert('Албан тушаал сонгоно уу!#');
        // }
    });
}
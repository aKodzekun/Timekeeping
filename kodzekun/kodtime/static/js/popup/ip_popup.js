function ip_popup(params) {
    var box=$('#popup-container #popup-content .ippopup');
    var csrftoken = getCookie('csrftoken');

    $(box).on('click', '#save-popup',function(){
        var ip = $('#ip',box).val().trim(),
            desc = $('#desc',box).val().trim(),
            msg='';

        msg += (ip==''?'IP тодорхойлно уу!#':'');
        msg += (desc==''?'Тэмдэглэл хийнэ уу!#':'');
    
        if (msg!=''){
            alert(msg);
        } else {
            var datas = {
                'tsk': 'add',
                'ip':ip,
                'desc':desc
            };
            console.log("request ip");
            ip_back.send(datas)
        }
    });

    var ip_back ={
        send: function(datas)  {
            $.ajax({
                url: "/ip_back/",
                type: "POST",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: datas,
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

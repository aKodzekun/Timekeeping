function treepopup(params) {
    var box=$('#popup-container #popup-content form'),
        datas = $(box).attr('datas'),
        dataArr= ((datas.replace(/[{}'()!@#[$]/g, "")).replace(/]/g, "")).split(", ");

    console.log(dataArr);
    var csrftoken = getCookie('csrftoken');
    $('#in',box).val(dataArr[3]+" дотор");
    $('#cnt',box).val(dataArr[7]);
    if(dataArr[8]=='edit'){
        $('#name',box).val(dataArr[9]);
        $('#cnt',box).val(dataArr[12]);
        $('#short_name',box).val(dataArr[10]);
        // if(dataArr[0]==0){
        $('#type',box).hide();
        // }else{
        //     console.log(dataArr[11]);
        //     if($('#type option:first-child',box).val()==dataArr[11]){
        //         console.log("qwertyuhgfds");
        //         console.log($('#type option:first-child',box).attr('selected'));
        //         $('#type option:first-child',box).attr('selected');
        //     }else{
        //         $('#type option:last-child',box).prop('selected', true);;
        //     }
        // }
    }

    $(box).on('click', '#save-popup',function(){
        var men_cnt = $('#cnt',box).val().trim(),
            msg='';

        console.log(typeof(parseInt(dataArr[7])));
        console.log(typeof(parseInt(men_cnt)));
        if(parseInt(men_cnt)>0 && parseInt(men_cnt)<=parseInt(dataArr[7])){
            var name = $('#name',box).val().trim(),
                short_name = $('#short_name',box).val().trim(),
                type =(dataArr[8]=='edit'?dataArr[11]:$('#type option:selected',box).val().trim());

            if (name=='') msg+='Нэр тодорхойлно уу !#';
            if (short_name=='') msg+='Товч нэр тодорхойлно уу !#';

            if (msg!=''){
                alert(msg);
            } else {
                var datas = {
                    'name': name,
                    'short_name':short_name,
                    'type':type,
                    'men_cnt':men_cnt,
                    'mid':dataArr[0],
                    'root':dataArr[2],
                    'tsk':dataArr[8],
                    'id':dataArr[13]
                };
                console.log(datas);
                tree_back.send(datas)
            }
        } else {
            alert('Орон тоо хэтэрсэн байна !#');
        }
    });

    var tree_back ={
        send: function(senddata)  {
            $.ajax({
                url: "/tree_back/",
                type: "POST",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: senddata,
                success: function(response) {
                    location.reload();
                    // $('.overlay').html(response);
                    // new treepopup();
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


function alert(datas) {
    $('#popup-container').before(
        '<div class="notification " style="z-index: 1; background-color: #ff2d42e6;">'+
            '<p>'+datas.replace(/#/g, "<br>")+'</p>'+
            '<span class="notification_progress"></span>'+
        '</div>'
    );
}
function treepopup(params) {
    var box=$('#popup-container #popup-content form'),
        datas = $(box).attr('datas'),
        dataArr= ((datas.replace(/[{}'()!@#[$]/g, "")).replace(/]/g, "")).split(", ");

    var csrftoken = getCookie('csrftoken');
    $('#in',box).val(dataArr[3]+" дотор");
    $('#cnt',box).val(dataArr[7]);
    if(dataArr[8]=='edit'){
        $('#name',box).val(dataArr[9]);
        $('#cnt',box).val(dataArr[12]);
        $('#short_name',box).val(dataArr[10]);
        $('#type',box).hide();
    }

    $(box).on('click', '#save-popup',function(){
        var men_cnt = $('#cnt',box).val().trim(),
            msg='';

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
function time_pop(params) {
    var box=$('#popup-container #popup-content .time-pop');
    var csrftoken = getCookie('csrftoken');
    var time = $(".display #time",box);

    if($('.time_type .form-select').val()==1){
        var fdate = $('span:first-child',box).text();
    }
    $('.time_type .form-select').change(function() {
        if($(this).val()==1){
            var fdate = $('.ssss',box).text(),
                arrf=fdate.split("-");
                // checkdate(arrf[1]);
        } else {
            var ldate = $('.eeee',box).text(),
                arrl=ldate.split("-");
                // checkdate(arrl[1]);
        }
    });	

    function checkdate(params) {
        if (params=="[тодорхойгүй]") {
                    
        } else {

        }        
    }
    setInterval(function() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        time.text(hours + ":" + minutes + ":" + seconds);
    }, 1000);

    $(box).on('click', '#save-popup',function(){
        var nowtime=time.text().split(":"),
            epoch = (parseInt(nowtime[0])*3600)+(parseInt(nowtime[1])*60)+parseInt(nowtime[2]);
            console.log('====================================');
            console.log(nowtime);
            console.log('====================================');
        datas = {
            'epoch':epoch,
            'now':Math.floor($.now() / 1000),
            'time_type':$('.time_type .form-select').val(),
            'id':box.attr('datas')
        }
        console.log('====================================');
        console.log(datas);
        console.log('====================================');
        $.ajax({
            url: "/time_req/",
            type: "POST",
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            data: datas,
            success: function(response) {
                location.reload();
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });
}
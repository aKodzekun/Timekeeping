$(function() {

    $('nav .nav-r').on('click', '.time-click',function(){  
        console.log('====================================');
        console.log("sdaadsa");
        console.log('====================================');  
        $.ajax({
            url: "/timeclick/",
            type: "POST",
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            data: {'datas':'pop'},
            success: function(response) {
                $('nav').after(response);
                new time_pop();
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });

    // var ip_back ={
    //     send: function(datas)  {
    //         $.ajax({
    //             url: "/timeclick/",
    //             type: "POST",
    //             headers: {
    //                 'X-CSRFToken': csrftoken
    //             },
    //             data: datas,
    //             success: function(response) {
    //                 location.reload();
    //             },
    //             error: function(xhr, status, error) {
    //                 console.log('Error:', error);
    //             }
    //         });
    //     },
    //     success: function(datas,tsk,senddata)  {
    //     }
    // };
});

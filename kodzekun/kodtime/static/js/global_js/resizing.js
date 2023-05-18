$(document).ready(function() {
    var resizing = false;
    var startOffset, originalWidth, newWidth;

    $("thead th").mousedown(function(event) {
        resizing = true;
        var th = $(this);
        startOffset = event.pageX;
        originalWidth = th.width();
        th.addClass("resizing");
        th.prev().addClass("resizing");
    });

    $(document).mousemove(function(event) {
        if (resizing) {
            var th = $(".resizing");
            var offsetX = event.pageX - startOffset;
            newWidth = originalWidth - offsetX;

            if (newWidth >= 100) {
                th.width(newWidth);
                th.prev().width(newWidth);
            }
        }
    });

    $(document).mouseup(function() {
        if (resizing) {
            $(".resizing").removeClass("resizing");
            resizing = false;
        }
    });
});
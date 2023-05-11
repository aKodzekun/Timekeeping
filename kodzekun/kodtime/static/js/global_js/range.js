$(function() {
// range
    const $range = $(".input-range"),
          $slideValue = $(".slide-value");
    $range.on("input", () => {
          let rangeVal = $range.val();
          $slideValue.text(rangeVal);
    });
})
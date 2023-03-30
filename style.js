$(document).ready(function () {
    $(function () {
        var date1;
        var date2;

        $("#start").datepicker({
            onSelect: function () {
                var a = $.datepicker.formatDate("yy mm dd", $(this).datepicker("getDate"));
                var b = a.split(' ');
                date1 = new Date(b);
            }
        });

        $("#end").datepicker({
            onSelect: function () {
                var c = $.datepicker.formatDate("yy mm dd", $(this).datepicker("getDate"));
                var d = c.split(' ');
                date2 = new Date(d);
            }
        });

        $("#click").on('click', function () {
            var oneDay = 24 * 60 * 60 * 1000;
            var diffDays = (date2 - date1) / oneDay + 1;
            document.getElementById("output").innerHTML = diffDays + " days";
        });

        $("#btn-btn").on('click', function () {
            var numofDates = getBusinessDatesCount(date1, date2);
            document.getElementById("poutput").innerHTML = numofDates + " days";
        });
    });
})

function getBusinessDatesCount(date1, date2) {
    let count = 0;
    const curDate = new Date(date1);
    while (curDate <= date2) {
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}  

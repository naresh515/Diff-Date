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
            const startDate = new Date($('#start').val());
            const endDate = new Date($('#end').val());

            dateValidator(startDate, endDate);
            var oneDay = 24 * 60 * 60 * 1000;
            var diffDays = (endDate - startDate) / oneDay + 1;
            document.getElementById("output").innerHTML = diffDays + " days";

        });

        $("#btn-btn").on('click', function () {
            const startDate = new Date($('#start').val());
            const endDate = new Date($('#end').val());

            dateValidator(startDate, endDate);
            var numofDates = getBusinessDatesCount(startDate, endDate);
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

function dateValidator(startDate, endDate) {
    if (startDate == '' && endDate == '') {
        $("#show_error").html('** Please Choose Date');
        $("#show_error1").html('** Please Choose Date');
    } else if (startDate == '') {
        $("#show_error").html('** Please Choose Date');
    }
    else if (endDate == '') {
        $("#show_error1").html('** Please Choose Date');
    } else {
        $("#show_error").empty()
        $("#show_error1").empty()
    }
}


function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function setStartDate() {
    $('#start').val(getCurrentDate());
}

function setEndDate() {
    $('#end').val(getCurrentDate());
}

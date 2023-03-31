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
        $('#btn-icon').on('click', function () {
            $('#start').focus();
        });

        $('#btn-icon1').on('click', function () {
            $('#end').focus();
        });

        $("#click").on('click', function () {
            calculateDiff()
        });

        $("#checkbox").change(function () {
            calculateDiff()
        });

        $("#btn-btn").on('click', function () {
            var startDate = $('#start').val();
            var endDate = $('#end').val();

            if (startDate != '') {
                startDate = new Date(startDate)
            }

            if (endDate != '') {
                endDate = new Date(endDate)
            }
            dateValidator(startDate, endDate);
            var numofDates = getBusinessDatesCount(startDate, endDate);
            $("#poutput").html(numofDates + " days");

        });
        $("#click").on('click', function () {
            var startDate = $('#start').val();
            var endDate = $('#end').val();
            if (startDate == '' || endDate == '') {
                $("#output").removeClass("opactiy-out", 500)
            }
            else {
                $("#output").addClass("opactiy-out", 500)
            }
        });

        $("#btn-btn").on('click', function () {
            var startDate = $('#start').val();
            var endDate = $('#end').val();
            if (startDate == '' || endDate == '') {
                $("#poutput").removeClass("opactiy-out", 500)
            }
            else {
                $("#poutput").addClass("opactiy-out", 500)
            }
        });
    });
})


function calculateDiff() {
    var startDate = $('#start').val();
    var endDate = $('#end').val();

    if (startDate != '') {
        startDate = new Date(startDate)
    }

    if (endDate != '') {
        endDate = new Date(endDate)
    }
    dateValidator(startDate, endDate);
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = (endDate - startDate) / oneDay;
    if ($("#checkbox").prop("checked")) {
        diffDays++
    }
    $("#output").html(diffDays + " days");
}

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

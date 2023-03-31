$(document).ready(function () {
    $(function () {
        var date1;
        var date2;

        $("#start").datepicker({
            onSelect: function () {
                var a = $.datepicker.formatDate("yy mm dd", $(this).datepicker("getDate"));
                var b = a.split(' ');
                date1 = new Date(b);
                $("#end").datepicker('option', "minDate", new Date(date1));
            }
        });

        $("#end").datepicker({
            onSelect: function () {
                var c = $.datepicker.formatDate("yy mm dd", $(this).datepicker("getDate"));
                var d = c.split(' ');
                date2 = new Date(d);
                $("#start").datepicker('option', "maxDate", new Date(date2));
            }
        });
        $('#btn-icon').on('click', function () {
            $('#start').focus();
        });

        $('#btn-icon1').on('click', function () {
            $('#end').focus();
        });

        $("#click").on('click', function () {
            calculateDiff();
        });

        $("#checkbox").change(function () {
            calculateDiff();
            coutWorkingDays();
        });

        $("#btn-btn").on('click', function () {
            coutWorkingDays();
        });

        $("#click").on('click', function () {
            var startDate = $('#start').val();
            var endDate = $('#end').val();
            if (startDate == '' || endDate == '') {
                $("#output").removeClass("opactiy-out")
            }
            else {
                $("#output").addClass("opactiy-out")
            }
        });

        $("#btn-btn").on('click', function () {
            var startDate = $('#start').val();
            var endDate = $('#end').val();
            if (startDate == '' || endDate == '') {
                $("#poutput").removeClass("opactiy-out")
            }
            else {
                $("#poutput").addClass("opactiy-out")
            }
        });

        $("#reset-btn").click(function () {
            $('#start').val('');
            $('#end').val('');
            $('#checkbox').prop('checked', false);
            $('#output').html('');
            $('#poutput').html('');
            $("#show_error").empty();
            $("#show_error1").empty();
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

function coutWorkingDays() {
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
    if ($("#checkbox").prop("checked")) {
        numofDates++
    }
    $("#poutput").html(numofDates + " days");
}

function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate);
    while (curDate < endDate) {
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

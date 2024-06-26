$(document).ready(function() {
    $('.exercise').hide();
    
    $(".from").datepicker({
        dateFormat: "yy-mm-dd",
        showAnim: "fadeIn",
        changeMonth: true,
        changeYear: true,
    });
    $(".to").datepicker({
        dateFormat: "yy-mm-dd",
        showAnim: "fadeIn",
        changeMonth: true,
        changeYear: true,
    });

    $('.filterButton').click(function() {
        const fromdate = $(".from").datepicker("getDate");
        let fromDate;
        if (fromdate) {
            fromDate = fromdate.toISOString();
        } else {
            fromDate = null;
        }

        const todate = $(".to").datepicker("getDate");
        let toDate;
        if (todate) {
            toDate = todate.toISOString();
        } else {
            toDate = null;
        }
// Check if both "From" and "To" dates are selected
if (!fromDate || !toDate) {
    alert("Please select both 'From' and 'To' dates.");
    return;
}
        const cChecked = $('#cardio').is(':checked');
        const sChecked = $('#strength').is(':checked');
        const data ={};
        if(fromDate !== null){
            data.fromDate = fromDate;
        }
        if(toDate !== null){
            data.toDate = toDate;
        }
        if(cChecked){
            data.cardio = 'cardio';
        }
        if(sChecked){
            data.strength = 'strength';
        }

        // Ajax call to get filtered data
        $.ajax({
            url: '/view_full_report',
            method: 'GET',
            data: data,
            success: function(response) {
                let filteredData = $(response).find('#exerciseList').html();
                renderFilteredData(filteredData);
            }
        });
    });

    // Function to render filtered data
    function renderFilteredData(filteredData) {
        $('#exerciseList').html(filteredData);
        $('.exercise').show();
    }
});


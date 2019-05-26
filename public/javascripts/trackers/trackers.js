$(function(){

    // Button Management
    $('#trackerId').on('change', function() {
        $('button#create').hide();
        $('button#update').show();
        $('button#delete').show();
    });
    $('button#delete').on('click', function(event) {
        data = $('#trackerForm').serializeArray();
        $.ajax({
        url: "/trackers/"+data[0].value,
        type: 'DELETE',
        dataType: "json",
        success: function(data) {
            $(`#trackerMenu a[data-id='${data}']`).remove();
            clearValues();
        }
        });
    });
    $('button#update').on('click', function(event) {
        data = $('#trackerForm').serializeArray();
        $.ajax({
        url: "/trackers/"+data[0].value,
        type: 'PUT',
        dataType: "json",
        data: data
        });
    });
    $('button#create').on('click', function(event) {
        $.ajax({
        url: "/trackers/",
        type: 'POST',
        dataType: "json",
        data: $('#trackerForm').serializeArray(),
        success: function(data) {
            $('#trackerMenu span').append(`
            <p><a class="tracker" data-id="${data.id}" href="#">${data.name}</a></p>
            `);
            $(`#trackerMenu a[data-id='${data.id}']`).bind('click', getTrackerDetails);
        }
        });
    });

    // Tracker Menu Management
    $('a.new-tracker').on('click', function() {
        clearValues();
        $('button#create').show();
        $('button#update').hide();
        $('button#delete').hide();
    });
    $('a.tracker').on('click', getTrackerDetails);

  });
  
  function getTrackerDetails(event) {event.preventDefault();
    $.ajax({
    url: "/trackers/"+$(this).data('id'),
    type: 'GET',
    dataType: "json",
    success: function(data) {
        $('#trackerId').val(data.id).trigger('change');
        $('#trackerName').val(data.name);
        $('#trackerDescription').val(data.description);
        $('#trackerScale').val(data.scale);

        getEntries(data.id);
        }
    });
}

function clearValues() {
    $('#trackerId').val(null);
    $('#trackerName').val('');
    $('#trackerDescription').val('');
    $('#trackerScale').val('');
    $('#entriesTable').hide();
}
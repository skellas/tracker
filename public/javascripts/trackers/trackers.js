$(function(){

    function manageButtonState(trackerSelected) {
        if (trackerSelected) {
            $('button#create').hide();
            $('button#update').show();
            $('button#delete').show();
        }
        else {
            $('button#create').show();
            $('button#update').hide();
            $('button#delete').hide();
        }
    }

    // Button Management
    $('#trackerId').on('change', function() {
        manageButtonState(true);
    });
    $('button#delete').on('click', function(event) {
        data = $('#trackerForm').serializeArray();
        $.ajax({
        url: "/trackers/"+data[0].value,
        type: 'DELETE',
        dataType: "json",
        complete: function(data) {
            $(`#trackerMenu a[data-id='${data.responseJSON.id}']`).remove();
            clearValues();
            manageButtonState(false);
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
        complete: function(data) {
            $('#trackerMenu span').append(`
            <p><a class="tracker" data-id="${data.responseJSON.id}" href="#">${data.responseJSON.name}</a></p>
            `);
            $(`#trackerMenu a[data-id='${data.responseJSON.id}']`).bind('click', getTrackerDetails);
            manageButtonState(true);
        }
        });
    });

    // Tracker Menu Management
    $('a.new-tracker').on('click', function() {
        clearValues();
        manageButtonState(false);
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
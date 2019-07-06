    const fivePointArray = [-2,-1,0,1,2];
    const threePointArray = [-1,0,1];
    const tenPointArray = [0,1,2,3,4,5,6,7,8,9,10];

    function loadDataTable(data) {
        $('#entriesTable').bootstrapTable('load', data).show();
    }

    function hideDataTable() {
        $('#entriesTable').hide();
    }

    function hideEntryModal() {
        $('#entryModal').modal('hide');
    }

    function getEntries(trackerId) {
        $.ajax({
            url: "/entries/"+trackerId,
            type: 'GET',
            dataType: "json",
            success: loadDataTable,
            error: hideDataTable
            });
    }

    $('button#add-entry').on('click', function(event) {
        let weight = $('select#trackerScale').children("option:selected")
                                             .val();
        let gradeSelect = $('select#entry-grade');
        gradeSelect.empty();
        getOptionsByWeight(weight).forEach(option => {
            gradeSelect.append($('<option>', {
                value: option,
                text: option,
                selected: option === 0 ? true : false
            }));
        });
        let trackerId = $('input#trackerId').val();
        $('input#entry-tracker').val(trackerId);
    });
    
    $('button#entry-create').on('click', function(event) {
        $.ajax({
        url: "/entries",
        type: 'POST',
        dataType: "json",
        data: $('#entryForm').serializeArray(),
        complete: function(data) {
            getEntries(data.responseJSON.tracker);
            hideEntryModal();
        }
        });
    });

    function getOptionsByWeight(weight) {
        switch (weight) {
            case '5ptGradient': 
                return fivePointArray;
            case '3ptGradient':
                return threePointArray;
            case '0to10':
                return tenPointArray;
        }

    }
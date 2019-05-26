    function loadDataTable(data) {
        $('#entriesTable').bootstrapTable('load', data).show();
    }

    function getEntries(trackerId) {
        $.ajax({
            url: "/entries/"+trackerId,
            type: 'GET',
            dataType: "json",
            success: loadDataTable
            });
    }
    function loadDataTable(data) {
        $('#entriesTable').bootstrapTable('load', data).show();
    }

    function hideDataTable() {
        $('#entriesTable').hide();
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
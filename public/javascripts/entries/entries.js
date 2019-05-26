    function loadDataTable(data) {
        $('#dataTable').DataTable( {
            data: data,
            retrieve: true,
            columns: [
                { data: 'id' },
                { data: 'date' },
                { data: 'note' },
                { data: 'grade' }                
            ]
        });
    }

    function getEntries(trackerId) {
        $.ajax({
            url: "/entries/"+trackerId,
            type: 'GET',
            dataType: "json",
            success: loadDataTable
            });
    }
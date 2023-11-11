let userID = 0;

$(document).ready(function () {
    Table.FillGrid();
    Buttons.Init();
});
let Table = {
    FillGrid: function () {
        let data = Common.GetData.Get('GetUserList');
        console.log(data);
        let tableID = $("#tableUser");
        // Define an array to store the checked checkbox values
        let columns = [
            { data: 'userName' },
            { data: 'fullName' },
            { data: 'email' },
            { data: 'ktp' },
            { data: 'active' },
            { data: null, visible: false },
            { data: null, visible: false },
            { data: null, visible: false },
        ];
        $(tableID).DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": false,
            "searching": false,
            "responsive": true,
            "data": data,
            "columns": columns,
            "buttons": [],
            "dom": 'lBfrtip',
            "columnDefs": [{ "targets": [0, 1, 2, 3, 4, 5, 6], "className": "text-left" }],
        });
        let tb = tableID.DataTable();
        tableID.find('tbody').unbind();
    },
    FillGridRequested: function () {
        let tableID = $('#tableRequest');
        let canEdit = (tableID.data("can-edit") === "True"); // Convert to boolean
        let data = Common.GetData.Get('GetRequestedList');
        // Define an array to store the checked checkbox values
        let columns = [
            { data: 'user_ID' },
            { data: 'username' },
        ];
        if (canEdit) {
            columns.push(
                {
                    data: null,
                    render: function (data, type, full, meta) {
                        if (type === 'display') {
                            // Render a select element with a specific class
                            return '<select class="roleSelect form-control" data-initialValue=""></select>';
                        }
                        // Return the data for other types (sorting, filtering, etc.)
                        return data;
                    }
                },
                {
                    data: null,
                    render: function () {
                        return '<button class="btn btn-danger form-control reject">Reject</button>'
                    }
                },
            );
        }
        tableID.DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": true,
            "searching": false,
            "responsive": true,
            "data": data.data,
            "columns": columns,
            "dom": 'lBfrtip',
            "columnDefs": [
                { "targets": [0, 1], "className": "text-left" }
            ],
        });
        let table = tableID.DataTable();
        if (canEdit) {
            $('.roleSelect').each(function () {
                let selectElement = $(this);
                Control.RoleTable(selectElement);
            });
            tableID.on('change', '.roleSelect', function () {
                // Get the value of the clicked checkbox and parse it as an integer
                const roleID = parseInt($(this).val(), 10);
                var row = table.row($(this).parents('tr')).data();
                if (isNaN(roleID)) return;
                Swal.fire({
                    title: 'Assign role confirmation',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, assign',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return fetch(`UpdateStatus/?userName=${row.username}&roleID=${roleID}&statusID=${1}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(() => {
                                // Show success message
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Success',
                                    text: "User Role Assigned Successfully",
                                    showConfirmButton: false,
                                    timer: 1500,
                                    allowOutsideClick: false
                                });
                            }).then(() => {
                                Table.FillGrid();
                                Table.FillGridRequested();
                            })
                            .catch(error => {
                                Swal.showValidationMessage(`Request failed: ${error}`);
                            });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isDismissed) { // Check if the user dismissed the dialog (canceled)
                        // Reset the dropdown to the initial selected value
                        $(this).val(""); // Use 'change' here to trigger Select2 change
                    }
                });
            });

            tableID.on('click', '.reject', function (e) {
                let row = table.row($(this).parents('tr')).data();
                Swal.fire({
                    title: 'Reject role confirmation',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, reject',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return fetch(`UpdateStatus/?userName=${row.username}&statusID=${3}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(() => {
                                // Show success message
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Success',
                                    text: "User Rejected Successfully",
                                    showConfirmButton: false,
                                    timer: 1500,
                                    allowOutsideClick: false
                                });
                            }).then(() => {
                                Table.FillGrid();
                                Table.FillGridRequested();
                            })
                            .catch(error => {
                                Swal.showValidationMessage(`Request failed: ${error}`);
                            });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                });
            });
        }
    },
}
let Buttons = {
    Init: function () {
        $('#buttonAddUser').click(function () {
            userID = 0;
        });

    }
}
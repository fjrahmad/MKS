$(document).ready(function () {
    Table.FillGridRole();
    Buttons.Init();
});
let Table = {
    FillGridClaims: function () {
        let data = Common.GetData.Get('FillGridClaims')
        let columns = [
            { data: 'module_Name' },
            { data: 'permission_Name' },

        ];
        let tableID = '#tablePermission';
        $(tableID).DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": true,
            "searching": false,
            "responsive": true,
            "data": data,
            "columns": columns,

        });
    },
    FillGridRole: function () {
        let tableID = $("#tableRole");
        let data = Common.GetData.Get('FillGridRole');
        let columns = [
            { data: 'name' },
            { data: 'description' },
            {
                data: null,
                render: function () {
                    return `
                    <a class="btn btn-warning edit" href="#">
                        <i class="fa fa-pencil"></i> 
                    </a>
                    <span style="margin: 0 5px;"></span>
                    <a class="btn btn-danger delete">
                        <i class="fa fa-trash"></i> 
                    </a>
            `;
                },
                "orderable": false
            },
        ];

        tableID.DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": true,
            "scrollX": true,
            "searching": false,
            "responsive": true,
            "data": data,
            "columns": columns
        });
        let tb = tableID.DataTable();
        tableID.find('tbody').unbind();
        tableID.find('tbody').on('click', '.edit', function (e) {

            let row = tb.row($(this).parents('tr')).data();
            Form.FillForm(row.id);
            $('#roleModal').modal('show');
        });
        tableID.find('tbody').on('click', '.delete', function (e) {
            let row = tb.row($(this).parents('tr')).data();
            // Show a confirmation dialog
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return fetch(`DeleteUser?id=${row.id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        .then(response => {
                            if (response.ok) {
                                // Show success message
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Success',
                                    text: 'User has been deleted',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    allowOutsideClick: false
                                }).then(() => {
                                    Table.FillGrid();
                                });
                            }
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Request failed: ${error}`);
                        });
                },
                allowOutsideClick: () => !Swal.isLoading()
            });
        });
    }

}

let Buttons = {
    Init: function () {
        $('#buttonSaveRole').click(function () {
            Form.Save();
        });
        $('#buttonAddRole').click(function () {
            Form.FillForm(0);
        });
    },
}
var Form = {
    Save: function () {
        // Serialize the form data
        var formData = $('#roleForm').serialize();
        $.ajax({
            url: 'SaveRole',
            type: 'POST',
            data: formData,
            success: function (result) {
                if (result.success) {
                    // Close loading indicator
                    Swal.close();
                    Swal.hideLoading()
                    // Close the modal
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Save Success",
                        showConfirmButton: false,
                        timer: 1500,
                        allowOutsideClick: false
                    }).then(() => {
                        Table.FillGridRole();
                    });
                } else {
                    console.error('Saving failed:', result);
                    // Close loading indicator
                    Swal.close();
                }
            },
            error: function (error) {
                // Show error message
                console.error('Saving failed:', error);
            }
        });
    },
    SaveClaim: function () {
        // Serialize the form data
        var formData = $('#roleForm').serialize();
        $.ajax({
            url: 'SaveRole',
            type: 'POST',
            data: formData,
            success: function (result) {
                if (result.success) {
                    // Close loading indicator
                    Swal.close();
                    Swal.hideLoading()
                    // Close the modal
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Save Success",
                        showConfirmButton: false,
                        timer: 1500,
                        allowOutsideClick: false
                    }).then(() => {
                        Table.FillGridRole();
                    });
                } else {
                    console.error('Saving failed:', result);
                    // Close loading indicator
                    Swal.close();
                }
            },
            error: function (error) {
                // Show error message
                console.error('Saving failed:', error);
            }
        });
    },

    FillForm: function (id) {
        $.ajax({
            url: 'FillFormRole',
            type: 'POST',
            data: { id: id },
            success: function (result) {
                console.log(result);
                $('#bodyModal').html(result);
                // Update the modal body with the retrieved partial view

                // Open the modal
                $('#roleModal').modal('show');
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading role data:', error);
            }
        });
    }

}

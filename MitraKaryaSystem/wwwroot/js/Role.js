$(document).ready(function () {
    Table.FillGridRole();
    Buttons.Init();
});
let Table = {
    FillGridPermission: function () {
        let tableID = '#tablePermission';
        $(tableID).DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": true,
            "searching": false,
            "responsive": true,
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
                    return fetch(`DeleteRole?id=${row.id}`, {
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
                                text: 'Role has been deleted',
                                showConfirmButton: false,
                                timer: 1500,
                                allowOutsideClick: false
                            }).then(() => {
                                Table.FillGridRole();
                            });
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
        $('#buttonSave').click(function () {
            Form.Save();
        });
        $('#buttonAddRole').click(function () {
            Form.FillForm(0);
        });
    },
}
var Form = {
    Save: function () {
        // Serialize the form data for Role
        var formData = $('#roleForm').serializeArray();

        // Collect permission data
        var permissions = [];
        $('input[name^="permission"]').each(function () {
            permissions.push({
                ID: $(this).val(),
                IsSelected: $(this).prop('checked')
            });
        });

        var requestData = {
            Role: {
                ID: formData.find(item => item.name === 'Role.ID').value,
                Name: formData.find(item => item.name === 'Role.Name').value,
                Description: formData.find(item => item.name === 'Role.Description').value
            },
            Permissions: permissions
        };
        $.ajax({
            url: 'SaveRole',
            type: 'POST',
            contentType: 'application/json', // Set content type to JSON
            data: JSON.stringify(requestData),
            success: function (result) {
                if (result.success) {
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
                        $('#roleModal').modal('hide');
                    });
                } else {
                    console.error('Saving failed:', result);
                    // Close loading indicator
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
                $('#bodyModal').html(result);
                // Open the modal
                $('#roleModal').modal('show');
                Table.FillGridPermission();
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading role data:', error);
            }
        });
    }

}

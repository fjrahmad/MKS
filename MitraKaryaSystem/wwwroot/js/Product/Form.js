$(document).ready(function () {
    Buttons.Init();
    Control.Category();
    Control.Unit();
    Control.Supplier();
    //Forms.FillFormProduct(0);
});
let Buttons = {
    Init: function () {
        $('#buttonAddCategory').click(function () {
            Forms.FillFormCategory(0);
        });
        $('#buttonAddUnit').click(function () {
            Forms.FillFormUnit(0);
        });
        $('#buttonSave').click(function () {
            var form = $('#productForm')[0];

            if (form.checkValidity()) {
                // If the form is valid, save the product and reset the form
                event.preventDefault();
                event.stopPropagation();
                Forms.SaveProduct();
                form.classList.remove('was-validated');
            } else {
                // If the form is invalid, add 'was-validated' class to apply Bootstrap validation styling
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
        $('#buttonSaveCategory').click(function (event) {
            let form = $('#formCategory')[0];

            if (form.checkValidity()) {
                // If the form is valid, save the product and reset the form
                event.preventDefault();
                event.stopPropagation();
                Forms.SaveCategory();
                form.classList.remove('was-validated');
            } else {
                // If the form is invalid, add 'was-validated' class to apply Bootstrap validation styling
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
        $('#buttonSaveUnit').click(function (event) {
            let form = $('#formUnit')[0];

            if (form.checkValidity()) {
                // If the form is valid, save the product and reset the form
                event.preventDefault();
                event.stopPropagation();
                Forms.SaveUnit();
                form.classList.remove('was-validated');
            } else {
                // If the form is invalid, add 'was-validated' class to apply Bootstrap validation styling
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
        $('#buttonNewCategory').click(function () {
            Forms.FillFormCategory(0);
        });
    },
}
let Table = {
    FillGridCategory: function () {
        let data = Common.GetData.Get('GetCategoryList');
        let tableID = $("#tableCategory");

        $(tableID).DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": true,
            "searching": false,
            "responsive": true,
            "columns": [
                { "data": "categoryName" },
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
            ],
            "buttons": [],
            "dom": 'lBfrtip',
            "columnDefs": [{ "targets": [0], "className": "text-left" }],

            "data": data.result
        });
        let tb = tableID.DataTable();
        tableID.find('tbody').unbind();
        tableID.find('tbody').on('click', '.edit', function (e) {
            let row = tb.row($(this).parents('tr')).data();
            Forms.FillFormCategory(row.id);
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
                    return fetch(`DeleteCategory?id=${row.id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        .then(response => {
                            toastr.options.onShown = function () {
                                Forms.FillFormCategory(0);
                                Table.FillGridCategory();
                                Control.Category();
                            }
                            response.ok ? toastr.success('Data has been deleted') : toastr.error(result.result.error, 'Data not deleted');
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Request failed: ${error}`);
                        });
                },
                allowOutsideClick: () => !Swal.isLoading()
            });
        });
    },
    FillGridUnit: function () {
        let data = Common.GetData.Get('GetUnitList');
        let tableID = $("#tableUnit");

        $(tableID).DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": true,
            "searching": false,
            "responsive": true,
            "columns": [
                { "data": "unitName" },
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
            ],
            "buttons": [],
            "dom": 'lBfrtip',
            "columnDefs": [{ "targets": [0], "className": "text-left" }],

            "data": data.result
        });
        let tb = tableID.DataTable();
        tableID.find('tbody').unbind();
        tableID.find('tbody').on('click', '.edit', function (e) {

            let row = tb.row($(this).parents('tr')).data();
            Forms.FillFormUnit(row.id);
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
                    return fetch(`DeleteUnit?id=${row.id}`, {
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
                                    text: 'Unit has been deleted',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    allowOutsideClick: false
                                }).then(() => {
                                    Forms.FillFormUnit(0);
                                    Table.FillGridUnit();
                                    Control.Unit();
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
    },
}
let Forms = {
    FillFormCategory: function (id) {
        $.ajax({
            url: 'FillFormCategory',
            type: 'POST',
            data: { id: id },
            success: function (result) {
                $('#categoryBodyModal').html(result);
                Table.FillGridCategory();
                $('#categoryModal').modal('show');

            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    FillFormUnit: function (id) {
        $.ajax({
            url: 'FillFormUnit',
            type: 'POST',
            data: { id: id },
            success: function (result) {
                $('#unitBodyModal').html(result);
                Table.FillGridUnit();
                $('#unitModal').modal('show');
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    FillFormProduct: function (id) {
        $.ajax({
            url: 'FillFormProduct',
            type: 'POST',
            data: { id: id },
            success: function (result) {
                console.log(result);
            },
            error: function (error) {
                console.error('Error loading user data:', error);
            }
        });
    },
    SaveCategory: function () {
        let formData = $('#formCategory').serialize();
        // Show loading indicator
        $('#buttonSaveCategory').prop('disabled', true); // Disable the button
        $('#buttonCloseCategory').prop('disabled', true); // Disable the button

        $('#buttonSaveCategory .spinner-border').show(); // Show the spinner
        $.ajax({
            url: 'SaveCategory',
            type: 'POST',
            data: formData,
            success: function (result) {
                toastr.options.onShown = function () {
                    // Successful response from the server
                    Table.FillGridCategory();
                    Forms.FillFormCategory(0);
                    Control.Category();
                }

                result.result.success ? toastr.success('Data saved') : toastr.error(result.result.error, 'Data not saved');
                // Close loading indicator
                $('#buttonSaveCategory').prop('disabled', false); // Enable the button
                $('#buttonCloseCategory').prop('disabled', false); // Disable the button

                $('#buttonSaveCategory .spinner-border').hide(); // Hide the spinner
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    SaveUnit: function () {
        let formData = $('#formUnit').serialize();
        // Show loading indicator
        $('#buttonSaveCategory').prop('disabled', true); // Disable the button
        $('#buttonCloseCategory').prop('disabled', true); // Disable the button
        $('#buttonSaveCategory .spinner-border').show(); // Show the spinner

        $.ajax({
            url: 'SaveUnit',
            type: 'POST',
            data: formData,
            success: function (result) {
                toastr.options.onShown = function () {
                    // Successful response from the server
                    Table.FillGridUnit();
                    Forms.FillFormUnit(0);
                    Control.Unit();
                }
                result.result.success ? toastr.success('Data saved') : toastr.error(result.result.error, 'Data not saved');
                // Close loading indicator
                $('#buttonSaveCategory').prop('disabled', false); // Enable the button
                $('#buttonCloseCategory').prop('disabled', false); // Disable the button

                $('#buttonSaveCategory .spinner-border').hide(); // Hide the spinner
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    SaveProduct: function () {
        // Serialize the form data
        var formData = $('#productForm').serialize();
        // Show loading indicator
        $('#buttonSave').prop('disabled', true); // Disable the button
        $('#buttonSave .spinner-border').show(); // Show the spinner
        $.ajax({
            url: 'SaveProduct',
            type: 'POST',
            data: formData,
            success: function (result) {
                toastr.options.onShown = function () {
                    Forms.ResetProductForm();
                }
                result.result.success ? toastr.success('Data saved') : toastr.error(result.result.error, 'Data not saved');
                // Close loading indicator
                $('#buttonSave').prop('disabled', false); // Enable the button
                $('#buttonSave .spinner-border').hide(); // Hide the spinner
            },
            error: function (error) {
                Swal.close();
            }
        });
    },
    ResetProductForm: function () {
        $('#productForm :input').each(function () {
            $(this).val(''); // Set the value of each input field to an empty string
        });

        // Remove the validation classes and messages
        $('#productForm').removeClass('was-validated');
        $('.invalid-feedback').hide();
    }
}
let Control = {
    Category: function () {
        let id = '#comboBoxCategory';
        let data = Common.GetData.Get('GetCategoryList');
        $(id).html('');
        $(id).append('<option selected value="">' + 'Select category' + '</option>');
        if (data.result != null && data.result.length > 0) {
            $.each(data.result, function (i, item) {
                if (categoryID == item.id) {
                    $(id).append('<option selected value="' + item.id + '">' + item.categoryName + '</option>');
                }
                else {
                    $(id).append('<option value="' + item.id + '">' + item.categoryName + '</option>');
                }
            });
        }
    },
    Unit: function () {
        let id = '#comboBoxUnit';
        let data = Common.GetData.Get('GetUnitList');
        $(id).html('');
        $(id).append('<option selected value="">' + 'Select unit' + '</option>');
        if (data.result != null && data.result.length > 0) {
            $.each(data.result, function (i, item) {
                if (unitID == item.id) {
                    $(id).append('<option selected value="' + item.id + '">' + item.unitName + '</option>');
                } else {
                    $(id).append('<option value="' + item.id + '">' + item.unitName + '</option>');
                }
            });
        }
    },
    Supplier: function () {
        let id = '#comboBoxSupplier';
        let data = Common.GetData.Get('GetSupplierList');
        $(id).html('');
        $(id).append('<option selected value="">' + 'Select supplier' + '</option>');
        if (data.result != null && data.result.length > 0) {
            $.each(data.result, function (i, item) {
                if (supplierID == item.id) {
                    $(id).append('<option selected value="' + item.id + '">' + item.supplierName + '</option>');
                } else {
                    $(id).append('<option value="' + item.id + '">' + item.supplierName + '</option>');
                }
            });
        }
    },
}
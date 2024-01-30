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
        $('#buttonAddSupplier').click(function () {
            Forms.FillFormSupplier(0);
        });
        $('#buttonSave').click(function () {
            Forms.SaveProduct();
        });
        $('#buttonSaveCategory').click(function () {
            Forms.SaveCategory();
        });
        $('#buttonSaveUnit').click(function () {
            Forms.SaveUnit();
        });
        $('#buttonSaveSupplier').click(function () {
            Forms.SaveSupplier();
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
                            if (response.ok) {
                                // Show success message
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Success',
                                    text: 'Category has been deleted',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    allowOutsideClick: false
                                }).then(() => {
                                    Forms.FillFormCategory(0);
                                    Table.FillGridCategory();
                                    Control.Category();
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
    FillGridSupplier: function () {
        let data = Common.GetData.Get('GetSupplierList');
        let tableID = $("#tableSupplier");

        $(tableID).DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": true,
            "searching": false,
            "responsive": true,
            "columns": [
                { "data": "supplierName" },
                { "data": "contactPerson" },
                { "data": "contactNumber" },
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
            "columnDefs": [{ "targets": [0, 1, 2], "className": "text-left" }],

            "data": data.result
        });
        let tb = tableID.DataTable();
        tableID.find('tbody').unbind();
        tableID.find('tbody').on('click', '.edit', function (e) {

            let row = tb.row($(this).parents('tr')).data();
            Forms.FillFormSupplier(row.id);
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
                    return fetch(`DeleteSupplier?id=${row.id}`, {
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
                                    text: 'Supplier has been deleted',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    allowOutsideClick: false
                                }).then(() => {
                                    Forms.FillFormSupplier(0);
                                    Table.FillGridSupplier();
                                    Control.Supplier();
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
    FillFormSupplier: function (id) {
        $.ajax({
            url: 'FillFormSupplier',
            type: 'POST',
            data: { id: id },
            success: function (result) {
                $('#supplierBodyModal').html(result);
                Table.FillGridSupplier();
                $('#supplierModal').modal('show');
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
        $.ajax({
            url: 'SaveCategory',
            type: 'POST',
            data: formData,
            success: function (result) {
                if (result.success) {
                    // Successful response from the server
                    Table.FillGridCategory();
                    Forms.FillFormCategory(0);
                    Control.Category();
                } else {
                    $('#categoryBodyModal').html(result);
                    Table.FillGridCategory();
                }
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    SaveUnit: function () {
        let formData = $('#formUnit').serialize();
        $.ajax({
            url: 'SaveUnit',
            type: 'POST',
            data: formData,
            success: function (result) {
                if (result.success) {
                    // Successful response from the server
                    Table.FillGridUnit();
                    Forms.FillFormUnit(0);
                    Control.Unit();
                } else {
                    $('#unitBodyModal').html(result);
                    Table.FillGridUnit();
                }

            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    SaveSupplier: function () {
        let formData = $('#supplierForm').serialize();
        $.ajax({
            url: 'SaveSupplier',
            type: 'POST',
            data: formData,
            success: function (result) {
                if (result.success) {
                    // Successful response from the server
                    Table.FillGridSupplier();
                    Forms.FillFormSupplier(0);
                    Control.Supplier();
                } else {
                    $('#supplierBodyModal').html(result);
                    Table.FillGridSupplier();
                }

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
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Please wait',
            text: 'Saving..',
            showConfirmButton: false,
            allowOutsideClick: false,

        });
        Swal.showLoading();
        $.ajax({
            url: 'SaveProduct',
            type: 'POST',
            data: formData,
            success: function (result) {
                console.log(result);
                if (result.success) {
                    // Close loading indicator
                    Swal.close();
                    Swal.hideLoading()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Save Success",
                        showConfirmButton: false,
                        timer: 1500,
                        allowOutsideClick: false
                    }).then(() => {
                        Forms.FillFormProduct(0);
                    });
                } else {
                    $('#productBodyCard').html(result);
                    Control.Category();
                    Control.Unit();
                    Control.Supplier();
                    Buttons.Init();
                    Swal.close();
                }
            },
            error: function (error) {
                Swal.close();
            }
        });
    },
}
let Control = {
    Category: function () {
        let id = '#comboBoxCategory';
        let data = Common.GetData.Get('GetCategoryList');
        $(id).html('');
        $(id).append('<option selected value="' + 0 + '">' + 'Select category' + '</option>');
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
        $(id).append('<option selected value="' + 0 + '">' + 'Select unit' + '</option>');
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
        $(id).append('<option selected value="' + 0 + '">' + 'Select supplier' + '</option>');
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
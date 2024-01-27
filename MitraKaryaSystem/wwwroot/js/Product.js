$(document).ready(function () {
    Buttons.Init();
    Control.Category();
    Control.Unit();
});
let Buttons = {
    Init: function () {
        $('#buttonAddCategory').click(function () {
            Forms.FillFormCategory(0);
            Table.FillGridCategory();
            $('#categoryModal').modal('show');
        });
        $('#buttonAddUnit').click(function () {
            Forms.FillFormUnit(0);
            Table.FillGridUnit();
            $('#unitModal').modal('show');
        });
        $('#buttonAddSupplier').click(function () {
            Forms.FillFormUnit(0);
            Table.FillGridUnit();
            $('#supplierModal').modal('show');
        });
        $('#buttonSaveCategory').click(function () {
            Forms.SaveCategory();
        });
        $('#buttonSaveUnit').click(function () {
            Forms.SaveUnit();
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
                { "data": "name" },
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
                { "data": "name" },
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
            //Forms.FillFormCategory(row.id);
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
                Common.Form.SetValue(result);
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
                Common.Form.SetValue(result);
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    FillForm: function (id) {
        $.ajax({
            url: 'FillForm',
            type: 'POST',
            data: { id: id },
            success: function (result) {
                $('#bodyModal').html(result);
                $('#userModal').modal('show');
            },
            error: function (error) {
                console.error('Error loading user data:', error);
            }
        });
    },
    SaveCategory: function () {
        let data = [
            { name: 'id', value: $('#id').val() },
            { name: 'name', value: $('#categoryName').val() }
        ];
        $.ajax({
            url: 'SaveCategory',
            type: 'POST',
            data: data,
            success: function (result) {
                Table.FillGridCategory();
                Forms.FillFormCategory(0);
                Control.Category();
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    SaveUnit: function () {
        let data = [
            { name: 'id', value: $('#id').val() },
            { name: 'name', value: $('#unitName').val() }
        ];
        $.ajax({
            url: 'SaveUnit',
            type: 'POST',
            data: data,
            success: function (result) {
                Table.FillGridUnit();
                Forms.FillFormUnit(0);
                Control.Unit();
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
}
let Control = {
    Category: function () {
        let id = '#comboBoxCategory';

        let data = Common.GetData.Get('GetCategoryList');
        $(id).html('');

        if (data.result != null && data.result.length > 0) {
            $.each(data.result, function (i, item) {
                $(id).append('<option value="' + item.id + '">' + item.name + '</option>');
            });
        }
    },
    Unit: function () {
        let id = '#comboBoxUnit';

        let data = Common.GetData.Get('GetUnitList');
        $(id).html('');

        if (data.result != null && data.result.length > 0) {
            $.each(data.result, function (i, item) {
                $(id).append('<option value="' + item.id + '">' + item.name + '</option>');
            });
        }
    },
}
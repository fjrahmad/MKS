$(document).ready(function () {
    Table.FillGrid();
    Control.Init();
    Button.Init();
});
let Button = {
    Init: function () {
        $('#buttonAdd').click(function (event) {
            var form = $('#purchaseOrderDetailForm')[0];
            var selectedProduct = $('#selectProduct');
            var quantityInput = $('#quantity');

            // Manually trigger the product selection validation
            if (!selectedProduct.val()) {
                selectedProduct.addClass('is-invalid');
                return;
            } else {
                selectedProduct.removeClass('is-invalid');
            }

            // Manually trigger the quantity input validation
            if (!quantityInput.val()) {
                quantityInput.addClass('is-invalid');
                return;
            } else {
                quantityInput.removeClass('is-invalid');
            }

            // Manually trigger the form validation
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            // If the form is valid, continue with adding a row to the DataTable
            event.preventDefault();
            event.stopPropagation();

            let barcode = selectedProduct.find('option:selected').data('barcode');
            Control.CheckProduct(barcode, false);
            // Remove 'was-validated' class to reset validation styling
            form.classList.remove('was-validated');
            Form.ResetProductForm();
        });
        $('#buttonSave').click(function (event) {


        });
    }
}
let Table = {
    FillGrid: function () {
        let tableID = $("#tableProduct");
        //let data = Common.GetData.Get('FillGridRole');
        let columns = [
            { data: 'productID', visible: false },
            { data: 'product' },
            {
                data: 'quantity',
                render: function (data, type, row) {
                    if (type === 'display') {
                        return `<input type="number" class="form-control" value="${data}" min="1" />`;
                    }
                    return data;
                }
            },
            { data: 'unitPrice' },
            { data: 'supplierID', visible: false },
            { data: 'barcode', visible: false },
            { data: 'supplier' },
            {
                data: null,
                render: function () {
                    return `
                <span style="margin: 0 5px;"></span>
                <a class="btn btn-danger delete">
                    <i class="fa fa-trash"></i> 
                </a>
            `;
                },
                "orderable": false
            },
        ];
        let table = tableID.DataTable({
            "deferRender": true,
            "processing": true,
            "serverSide": false,
            "destroy": true,
            "filter": true,
            "searching": false,
            "responsive": true,
            "columns": columns
        });
        // Event listener for quantity input change
        $('#tableProduct').on('change', 'input[type="number"]', function () {
            let rowIndex = table.cell($(this).closest('td')).index().row;
            let newData = parseInt($(this).val());
            table.cell(rowIndex, 2).data(newData).draw();
        });
    }
}
let Control = {
    Init: function () {
        $('.js-example-basic-single').select2();
        Control.Product();
        Control.ProductSelect();
        Control.Barcode();
    },
    Barcode: function () {
        $('#barcode').keypress(function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                let barcodeValue = $(this).val();
                Control.CheckProduct(barcodeValue, true);
                Form.ResetProductForm();
            }
        });
    },
    CheckProduct: function (result, isScan) {
        let table = $("#tableProduct").DataTable();
        let rows = table.rows().nodes();
        let barcodeFound = false; // Initialize flag variable
        let quantity = parseInt($('#quantity').val());
        $(rows).each(function () {
            let rowData = table.row(this).data();
            if (parseInt(rowData.barcode) == result) {
                let updatedQuantity = 0;
                if (isScan) {
                    // If the product already exists, update the quantity
                    updatedQuantity = rowData.quantity + 1;
                    table.cell(this, 2).data(updatedQuantity).draw();

                } else {

                    updatedQuantity = rowData.quantity + quantity;
                }
                table.cell(this, 2).data(updatedQuantity).draw();
                barcodeFound = true; // Set flag to true if product is found
                return false; // Exit the loop early
            }
        });

        if (!barcodeFound) {
            $.ajax({
                url: '/PurchaseOrder/ScanBarcode',
                type: 'POST',
                data: { barcode: result },
                success: function (result) {

                    if (result == undefined || result == null) {
                        return toastr.error('Data not found', "Cannot add product");
                    }
                    Control.AddRow(result.id, result.name, isScan ? 1 : quantity, result.unitPrice, result.barcode, result.supplierID, result.supplierName);
                },
                error: function (error) {
                    // Handle errors if needed
                    console.error('Error loading user data:', error);
                }
            });
        }
    },
    AddRow: function (productID, productName, quantity, unitPrice, barcode, supplierID, supplier) {
        let table = $("#tableProduct").DataTable();
        table.row.add({
            productID: productID,
            product: productName,
            quantity: quantity,
            unitPrice: unitPrice,
            supplierID: supplierID,
            barcode: barcode,
            supplier: supplier
        }).draw();
    },
    Product: function () {
        let id = '#selectProduct';
        let data = Common.GetData.Get('/Product/GetProductComboList');
        $(id).html('');
        $(id).append('<option selected value="">' + 'Select product' + '</option>');
        if (data.result != null && data.result.length > 0) {
            $.each(data.result, function (i, item) {
                if (productID == item.id) {
                    $(id).append('<option selected value="' + item.id + '" data-barcode="' + item.barcode + '">' + item.name + '</option>');
                } else {
                    $(id).append('<option value="' + item.id + '" data-barcode="' + item.barcode + '">' + item.name + '</option>');
                }
            });
        }
    },
    ProductSelect: function () {
        $('#selectProduct').on('select2:select', function (e) {
            let data = e.params.data;
            Form.FillFormProductBySelect(data);
        });
    },
}
let Form = {
    FillFormProductBySelect: function (product) {
        $.ajax({
            url: '/PurchaseOrder/FillFormProduct',
            type: 'POST',
            data: { id: product.id },
            success: function (result) {
                $('#purchaseOrderDetailForm').html(result);
            },
            error: function (error) {
                // Handle errors if needed
                console.error('Error loading user data:', error);
            }
        });
    },
    ResetProductForm: function () {
        $('#purchaseOrderDetailForm :input').each(function () {
            $(this).val(''); // Set the value of each input field to an empty string
        });
        $('#barcode').val('');
        $('#selectProduct').val('');
        $('#selectProduct').trigger('change');
        // Remove the validation classes and messages
        $('#purchaseOrderDetailForm').removeClass('was-validated');
        $('.invalid-feedback').hide();
    },
    Save: function () {
        // Serialize the form data
        var formData = $('#purchaseOrderDetailForm').serialize();
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


    }
}
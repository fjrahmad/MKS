$(document).ready(function () {
    Table.FillGrid();
    Control.Init();
    Button.Init();

});
let Button = {
    Init: function () {
        $('#buttonAdd').click(function (event) {
            var form = $('#purchaseOrderDetailForm')[0];

            if (form.checkValidity()) {
                // If the form is valid, add a row to the DataTable
                event.preventDefault();
                event.stopPropagation();

                var product = $('#productId').val();
                var quantity = $('#quantity').val();
                var unitPrice = $('#unitPrice').val();
                var supplier = $('#supplierId option:selected').text();
                let supplierID = $('#supplierId').val();
                Control.AddRow(product, quantity, unitPrice, supplierID, supplier);

                // Clear the form
                form.reset();
                $('#supplierId').val('').trigger('change');
                // Remove 'was-validated' class to reset validation styling
                form.classList.remove('was-validated');
            } else {
                // If the form is invalid, perform the usual validation handling
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
    }
}
let Table = {
    FillGrid: function () {
        let tableID = $("#tableProduct");
        //let data = Common.GetData.Get('FillGridRole');
        let columns = [
            { data: 'product' },
            { data: 'quantity' },
            { data: 'unitPrice' },
            { data: 'supplierID', visible: false },
            { data: 'supplier' },
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
            "searching": false,
            "responsive": true,
            "columns": columns
        });
    }
}
let Control = {
    Init: function () {
        $('.js-example-basic-single').select2();
    },
    AddRow: function (product, quantity, unitPrice, supplierID, supplier) {
        let table = $("#tableProduct").DataTable();
        table.row.add({
            product: product,
            quantity: quantity,
            unitPrice: unitPrice,
            supplierID: supplierID,
            supplier: supplier
        }).draw();
    }
}
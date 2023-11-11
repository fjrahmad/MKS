
var Common = {
    MakeCSRFExtendedData: function (data) {
        var extData = $.extend(data, { "_RequestVerificationToken": $('input[name="_RequestVerificationToken"]').val() });
        return extData;
    },
    GetData: {
        Post: function (_url, _data) {
            //$.blockUI({
            //    css: {
            //        padding: '15px',
            //        opacity: 5
            //    },
            //    message: " please wait..."
            //});
            var result = [];
            var csrfToken = $('input[name="_RequestVerificationToken"]').val();

            $.ajax({
                url: _url,
                type: 'POST',
                headers: {
                    "_RequestVerificationToken": csrfToken
                },
                dataType: 'json',
                data: Common.MakeCSRFExtendedData(_data),
                async: false,
                cache: false,
            }).done(function (data, textStatus, jqXHR) {
                result = data;
                /*   $.unblockUI();*/
            }).fail(function (jqXHR, textStatus, errorThrown) {
                result = [];
                /*  $.unblockUI();*/
            });
            return result;
        },
        Get: function (_url) {
            var csrfToken = $('input[name="_RequestVerificationToken"]').val();

            //$.blockUI({
            //    css: {
            //        padding: '15px',
            //        opacity: 5
            //    },
            //    message: " please wait..."
            //});
            var result = [];
            $.ajax({
                url: _url,
                type: "Get",
                headers: {
                    "_RequestVerificationToken": csrfToken
                },
                async: false,
                cache: false,
            }).done(function (data, textStatus, jqXHR) {
                result = data;
                //$.unblockUI();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                result = [];
                //$.unblockUI();
            });
            return result;
        },
        //Get: function (_url, param) {
        //    var csrfToken = $('input[name="_RequestVerificationToken"]').val();
        //    var result = [];
        //    $.ajax({
        //        url: _url,
        //        data: param,
        //        headers: {
        //            "_RequestVerificationToken": csrfToken
        //        },
        //        type: "Get",
        //        async: false,
        //        cache: false,
        //    }).done(function (data, textStatus, jqXHR) {
        //        result = data;
        //    }).fail(function (jqXHR, textStatus, errorThrown) {
        //        result = [];
        //    });
        //    return result;
        //},
    },
    Validation: {
        Number: function (number) {
            var charCode = (number.which) ? number.which : number.keyCode;
            if (charCode != 46 && charCode > 31
                && (charCode < 48 || charCode > 57))
                return false;

            return true;
            //var numbers = /^[0-9]+$/;
            //if (number.match(numbers)) {
            //    return true;
            //} else {
            //    return false;
            //}
        },
        Digit: function (number) {

            var numbers = /^[0-9]+$/;
            if (number.match(numbers)) {
                return true;
            } else {
                return false;
            }
        },
        Decimal: function (number) {

            if (parseInt(number) == 0)
                return true;

            var regex = /((\d+)(\.\d{0,2}))$/;
            if (regex.test(number)) {
                return true;
            } else {
                return false;
            }
        },
    },
    Helper: {
        CommaSeparation: function (yourNumber) {
            var temp = yourNumber + "";
            var value = parseFloat(temp.replace(/,/g, ""));
            if (value != "" && !isNaN(value)) {
                var n = parseFloat(value).toFixed(2).toString().split(".");
                //Comma-fies the first part
                n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Combines the two sections
                return n.join(".");
            } else {
                return "";
            }
        },

        CommaSeparation2: function (yourNumber) {
            var temp = yourNumber + "";
            var value = parseFloat(temp.replace(/,/g, ""));
            if (value != "" && !isNaN(value)) {
                var n = parseFloat(value).toString().split(".");
                if (parseFloat(value) > 1)
                    n = parseFloat(value).toFixed(2).toString().split(".");
                //Comma-fies the first part
                n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Combines the two sections
                return n.join(".");
            } else {
                return "";
            }
        },

        ReplaceComa: function (number) {
            return number.replace(/\s*,\s*|\s+,/g, '');
        },
        Datepicker: function () {
            var dateToday = new Date();
            $('.date-picker').datepicker({
                dateFormat: "dd-M-yy",
                autoclose: true,
                changeMonth: true
            });
        },
    },
    Form: {

        Save: function (_url, _data) {
            return new Promise(function (resolve, reject) {
                var csrfToken = $('input[name="_RequestVerificationToken"]').val();
                $.ajax({
                    url: _url,
                    headers: {
                        "_RequestVerificationToken": csrfToken
                    },
                    type: 'POST',
                    dataType: 'json',
                    data: Common.MakeCSRFExtendedData(_data),
                    async: true, // Set this to true for asynchronous operation
                    cache: false,
                    success: function (data, textStatus, jqXHR) {
                        resolve(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        reject(jqXHR);
                    }
                });
            });
        },
        SaveWithJSON: function (_url, data) {
            var result = [];
            $.ajax({
                url: _url,
                headers: {
                    "_RequestVerificationToken": $('input[name="_RequestVerificationToken"]').val()
                },
                type: "POST",
                datatype: "json",
                contentType: "application/json; charset=utf-8",
                data: Common.MakeCSRFExtendedData(data),
                cache: false
            }).done(function (data, textStatus, jqXHR) {
                result = data;
            }).fail(function (jqXHR, textStatus, errorThrown) {
                result.respon.errorMessage = 'Save data failed!';
                result.respon.errorType = 1;
            });
            return result;

        },
        Delete: function (_url, _data) {
            var result = '';
            $.ajax({
                url: _url,
                headers: {
                    "_RequestVerificationToken": $('input[name="_RequestVerificationToken"]').val()
                },
                type: 'GET',
                data: Common.MakeCSRFExtendedData(_data),
                async: false,
                cache: false,
            }).done(function (data, textStatus, jqXHR) {
                result = data;
            }).fail(function (jqXHR, textStatus, errorThrown) {
                result.respon.errorMessage = 'Delete data failed!'
                result.respon.errorType = 1;

            });
            return result;
        },
        HandleFormSubmit: function (form, constraints) {
            // validate the form aainst the constraints
            var result = false;
            var errors = validate(form, constraints);
            // then we update the form to reflect the results
            Common.Form.ShowErrors(form, errors || {});

            if (errors == undefined) {
                result = true;
            }
            return result;
        },
        ShowErrors: function (form, errors) {

            // We loop through all the inputs and show the errors for that input
            $.each(form.elements, function (input, element) {
                // Since the errors can be null if no errors were found we need to handle
                // that
                Common.Form.ShowErrorsForInput(element, errors && errors[element.id]);
            });
        },
        ShowErrorsForInput: function (input, errors) {
            // This is the root of the input

            var formGroup = Common.Form.ClosestParent(input.parentNode, "form-group");
            var messages = input.parentNode.querySelector(".messages");
            // Find where the error messages will be insert into

            //var messages = ".messages";//formGroup.querySelector(".messages");
            // First we remove any old messages and resets the classes
            Common.Form.ResetFormGroup(formGroup);
            // If we have errors
            if (errors) {
                // we first mark the group has having errors
                formGroup.classList.add("has-error");
                // then we append all the errors
                $.each(errors, function (i, error) {
                    Common.Form.AddError(messages, error, input);
                });
            } else {
                // otherwise we simply mark it as success
                if (formGroup != null)
                    formGroup.classList.add("has-success");
            }
        },
        ResetFormGroup: function (formGroup) {

            // Remove the success and error classes
            //var hasError = formGroup.getElementsByClassName("has-error");
            //while (hasError.length) {
            //    formGroup.classList.remove("has-error");
            //}
            if (formGroup != null) {
                if (formGroup.classList.value.includes("has-error"))
                    formGroup.classList.remove("has-error");


                if (formGroup.classList.value.includes("has-success"))
                    formGroup.classList.remove("has-success");
                // and remove any old messages
                $.each(formGroup.querySelectorAll(".text-danger"), function (i, el) {
                    el.parentNode.removeChild(el);
                });
            }
        },
        AddError: function (messages, error, input) {

            var block = document.createElement("p");
            block.classList.add("text-danger");
            block.classList.add("error");
            block.innerText = error;
            messages.appendChild(block);
            $(input).addClass("input-danger");
        },
        ClosestParent: function (child, className) {
            if (!child || child == document) {
                return null;
            }
            if (child.classList.contains(className)) {
                return child;
            } else {
                return Common.Form.ClosestParent(child.parentNode, className);
            }
        },
        SetValue: function bindObjectToForm(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var element = document.getElementById(prop);
                    if (element) {
                        element.value = obj[prop];
                    }
                }
            }
        }

    },
    Format: {
        Comma: function (yourNumber) {
            var temp = yourNumber + "";
            var value = parseFloat(temp.replace(/,/g, ""));

            if (value != "" && !isNaN(value)) {
                var n = parseFloat(value).toFixed(2).toString().split(".");
                //Comma-fies the first part
                n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Combines the two sections
                value = n.join(".");
            } else {
                value = "";
            }
            return value;
        },
        Comma2: function (yourNumber) {
            var temp = yourNumber + "";
            var value = parseFloat(temp.replace(/,/g, ""));

            if (value != "" && !isNaN(value)) {
                var n = parseFloat(value).toFixed(2).toString().split(".");
                //Comma-fies the first part
                n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Combines the two sections
                value = n.join(".");
            } else {
                value = "0";
            }
            value = value.replace(".00", "");
            value = value.replace(".0", "");
            return value;
        },
        Date: function (value) {
            if (value === null) return "";
            var dt = new Date(value);
            var month = dt.getMonth() + 1;

            return ((parseInt(dt.getDate()) < 10) ? "0" + dt.getDate() : dt.getDate()) + "/" + (month < 10 ? '0' + month : month) + "/" + dt.getFullYear();

        },
        DateByForm: function (value) {
            if (value === null) return "";
            var dt = new Date(value);

            var day = ("0" + dt.getDate()).slice(-2);
            var weekAgo = ("0" + (dt.getDate() - 7)).slice(-2);
            var month = ("0" + (dt.getMonth() + 1)).slice(-2);

            var today = dt.getFullYear() + "-" + (month) + "-" + (day);

            return today;
        },
        Datetime: function (value) {
            if (value === null) return "";
            var dt = new Date(value);
            var month = dt.getMonth() + 1;

            var minutes = dt.getMinutes();
            minutes = (minutes < 10) ? ("0" + minutes) : minutes;

            var seconds = dt.getSeconds();
            seconds = (seconds < 10) ? ("0" + seconds) : seconds;

            return ((parseInt(dt.getDate()) < 10) ? "0" + dt.getDate() : dt.getDate()) + "-" + month + "-" + dt.getFullYear() + " " + dt.getHours() + ":" + minutes + ":" + seconds;

        },
        Money: function (id) {

            $(id).each(function (index, el) {
                var elType = null; // input or other
                var value = null;
                // get value
                if ($(el).is('input') || $(el).is('textarea')) {
                    value = $(el).val().replace(/,/g, '');
                    elType = 'input';
                } else {
                    value = $(el).text().replace(/,/g, '');
                    elType = 'other';
                }
                // if value changes
                $(el).on('paste keyup', function () {
                    value = $(el).val().replace(/,/g, '');
                    Common.Format.MoneyCurrency(el, elType, value); // format element
                });
                Common.Format.MoneyCurrency(el, elType, value); // format element
            });

        },
        MoneyCurrency: function (el, elType, value) {
            var result = '';
            var valueArray = value.split('');
            var resultArray = [];
            var counter = 0;
            var temp = '';
            for (var i = valueArray.length - 1; i >= 0; i--) {
                temp += valueArray[i];
                counter++
                if (counter == 3) {
                    resultArray.push(temp);
                    counter = 0;
                    temp = '';
                }
            };
            if (counter > 0) {
                resultArray.push(temp);
            }
            for (var i = resultArray.length - 1; i >= 0; i--) {
                var resTemp = resultArray[i].split('');
                for (var j = resTemp.length - 1; j >= 0; j--) {
                    result += resTemp[j];
                };
                if (i > 0) {
                    result += ','
                }
            };
            if (elType == 'input') {
                $(el).val(result);
            } else {
                $(el).empty().text(result);
            }


        },
        Currency: function (bilangan) {
            var minus = '';

            bilangan = bilangan.toString().replace(/,/g, "");
            if (bilangan.includes('-')) {
                bilangan = bilangan.replace('-', '');
                minus = '-';
            }
            var number_string = bilangan.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? ',' : '';
                rupiah += separator + ribuan.join(',');
            }
            return minus + rupiah;

        },
    },
    Table: {
        InitClient: function (idTB) {
            $(idTB).DataTable({
                "destroy": true,
                "filter": true,
                "serverSide": false,
                "language": {
                    "emptyTable": "No data available in table"
                },
                "data": [],
                "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                "buttons": [
                    'copyHtml5',
                    'excelHtml5',
                ],
            });
        },
        LoadTableClientWithPaging: function (_idTB, _data, _columns, _lengthMenu, _columnDefs, _tableName, _orderColumn, _sCrollX = false) {
            var ordering = true;
            if (_orderColumn == null || _orderColumn.length == 0)
                ordering = false;

            $(_idTB).DataTable({
                "deferRender": true,
                "proccessing": true,
                "serverSide": false,
                "ordering": ordering,
                "destroy": true,
                "filter": true,
                "language": { "emptyTable": "No data available in table" },
                "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                "buttons": [{ extend: 'copyHtml5', }, { extend: 'excelHtml5', title: _tableName }],
                "data": _data,
                "lengthMenu": _lengthMenu,
                "columns": _columns,
                "columnDefs": _columnDefs,
                "order": _orderColumn,
                //"scrollY": true, /* Enable vertical scroll to allow fixed columns */
                "scrollX": _sCrollX, /* Enable horizontal scroll to allow fixed columns */
            });
        },
        LoadTableClientNoPaging: function (_idTB, _data, _columns, _columnDefs, _tableName, _orderColumn) {
            $(_idTB).DataTable({
                "deferRender": true,
                "proccessing": true,
                "serverSide": false,
                "destroy": true,
                "filter": false,
                "paging": false,
                "language": { "emptyTable": "No data available in table" },
                "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                "buttons": [{ extend: 'copyHtml5', }, { extend: 'excelHtml5', title: _tableName }],
                "data": _data,
                "columns": _columns,
                "columnDefs": _columnDefs,
                "order": _orderColumn,
            });
        },
        LoadTableClient: function (_idTB, _data, _columns, _columnDefs) {
            $(_idTB).DataTable({
                "deferRender": true,
                "proccessing": true,
                "serverSide": false,
                "destroy": true,
                "filter": false,
                "lengthChange": false,
                "paging": false,
                "data": _data,
                "columns": _columns,
                "columnDefs": _columnDefs,
                "order": false,
            });
        },
    },
    Alert: {
        Error: function (message) {
            new swal("Error System!", message, "error");
            //alert(message);
        },
        Success: function (message) {
            new swal("Success!", message, "success");
            //alert("Proses Berhasil");
        },
        Warning: function (message) {
            new swal("Warning!", message, "warning");
            //alert(message);
        },
        AlertType: function (errorType, message) {
            // 0 Success
            // 1 Error System
            // 2 Warning 
            if (errorType == 0) {
                Common.Alert.Success(message);
            }
            else if (errorType == 1) {
                Common.Alert.Error(message);
            }
            else if (errorType == 2) {
                Common.Alert.Warning(message);
            } else {
                Common.Alert.Error(message);
            }
        },
        BolokUi: function () {
            $.blockUI({
                css: {
                    padding: '15px',
                    opacity: 5
                },
                message: "processing encryption your data import...  please wait..."
            });
        },
    },
    CheckError: {
        Object: function (data) {
            var result = true;
            if (result.ErrorType == 0) {
                result = true;
            } else if (result.ErrorType == 1) {
                result = false;
            } else if (result.ErrorType == 2) {
                result = false;
            }
            return result;
        }
    },
    Convert: {
        Base64: function (file) {
            var result = "";
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                result = reader.result;
            };
            reader.onerror = function (error) {
                result = 'Error: ' + error;
            };

            //result=  await toBase64(file)
            return result;
        }

    },
    Chart: {
        SetStepChart: function (maxTop) {

            if (maxTop == null) {
                return { topChartValue: 1, stepSize: 0.1 }

            }

            if (Number.isNaN(maxTop)) {
                return { topChartValue: 1, stepSize: 0.1 }
            }

            if (maxTop > 1) {
                maxTop = Math.ceil(maxTop);
            }



            var stepSize = 0;
            var topChartValue = 0;

            if (maxTop == 0) {
                return { topChartValue: 1, stepSize: 0.1 }
            }
            if (maxTop > 10000000) {
                stepSize = 10000000;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 10000000);
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop > 1000000) {
                stepSize = 1000000;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 1000000)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop > 100000) {
                stepSize = 100000;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 100000)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop > 10000) {
                stepSize = 10000;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 10000)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop > 1000) {
                stepSize = 1000;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 1000)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop > 100) {
                stepSize = 100;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 100)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop > 10) {
                stepSize = 10;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 10)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop > 1) {
                stepSize = 1;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 1)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }

            if (maxTop > 0.1) {
                stepSize = 0.1;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 0.1)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop > 0.01) {
                stepSize = 0.01;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 0.01)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop => 0.010) {
                stepSize = 0.01;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 0.01)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
            if (maxTop => 0.001) {
                stepSize = 0.001;
                topChartValue = Common.Chart.GetMaxValue(maxTop, 0.001)
                return { topChartValue: topChartValue, stepSize: stepSize }
            }
        },
        SetStepChartPercent: function (maxTop) {
            var stepSize = 20;
            var topChartValue = 100;

            if (maxTop == null || Number.isNaN(maxTop) || maxTop == 0) {
                return { topChartValue: topChartValue, stepSize: stepSize }
            }

            if (maxTop > 1) {
                maxTop = Math.ceil(maxTop);
            }

            topChartValue = Common.Chart.GetMaxValue(maxTop, stepSize) + stepSize;
            return { topChartValue: topChartValue, stepSize: stepSize }
        },
        GetMaxValue: function (maxTop, counter) {

            var result = 0;
            for (var i = counter; i < maxTop; i = i + counter) {
                result += counter;
            }
            result = result + counter;
            return result;
        },
        SetYValue: function (value, type) {
            var maxTop = 0;
            if (type == "Daily")
                maxTop = YValueDaily.topChartValue;
            else
                maxTop = YValueCumulative.topChartValue;
            if (value < 1) {
                maxTop = value.toFixed(2);
            }
            if (value > 1) {
                maxTop = Math.ceil(value);
            }


            if (maxTop > 1000) {
                if (value === 50000000) return "50M";
                if (value === 30000000) return "30M";
                if (value === 20000000) return "20M";
                if (value === 10000000) return "10M";
                if (value === 5000000) return "5M";
                if (value === 4000000) return "4M";
                if (value === 3000000) return "3M";
                if (value === 2000000) return "2M";
                if (value === 1000000) return "1M";
                if (value === 900000) return "900K";
                if (value === 800000) return "800K";
                if (value === 700000) return "700K";
                if (value === 600000) return "600K";
                if (value === 500000) return "500K";
                if (value === 400000) return "400K";
                if (value === 300000) return "300K";
                if (value === 200000) return "200K";
                if (value === 100000) return "100K";
                if (value === 50000) return "50K";
                if (value === 40000) return "40K";
                if (value === 30000) return "30K";
                if (value === 20000) return "20K";
                if (value === 10000) return "10K";
                if (value === 9000) return "9K";
                if (value === 8000) return "8K";
                if (value === 7000) return "7K";
                if (value === 6000) return "6K";
                if (value === 5000) return "5K";
                if (value === 4000) return "4K";
                if (value === 3000) return "3K";
                if (value === 2000) return "2K";
                if (value === 1000) return "1K";
            }
            else if (maxTop > 100) {
                if (value === 1000) return "1K";
                if (value === 900) return "0.9K";
                if (value === 800) return "0.8K";
                if (value === 700) return "0.7K";
                if (value === 600) return "0.6K";
                if (value === 500) return "0.5K";
                if (value === 400) return "0.4K";
                if (value === 300) return "0.5K";
                if (value === 200) return "0.2K";
                if (value === 100) return "0.1K";
            }
            else if (maxTop > 10) {
                if (value === 100) return "100";
                if (value === 90) return "90";
                if (value === 80) return "80";
                if (value === 70) return "70";
                if (value === 60) return "60";
                if (value === 50) return "50";
                if (value === 40) return "40";
                if (value === 30) return "30";
                if (value === 20) return "20";
                if (value === 10) return "10";

            }

            else if (maxTop > 1) {
                if (value === 10) return "10";
                if (value === 9) return "9";
                if (value === 8) return "8";
                if (value === 7) return "7";
                if (value === 6) return "6";
                if (value === 5) return "5";
                if (value === 4) return "4";
                if (value === 3) return "3";
                if (value === 2) return "2";
                if (value === 1) return "1";
            }

            else if (maxTop > 0.1) {
                if (value === 1) return "1";
                if (value === 0.9) return "0.9";
                if (value === 0.8) return "0.8";
                if (value === 0.7) return "0.7";
                if (value === 0.6) return "0.6";
                if (value === 0.5) return "0.5";
                if (value === 0.4) return "0.4";
                if (value === 0.3) return "0.3";
                if (value === 0.2) return "0.2";
                if (value === 0.1) return "0.1";
            }
            else {
                if (value === 0.1) return "0.1";
                if (value === 0.09) return "0.09";
                if (value === 0.08) return "0.08";
                if (value === 0.07) return "0.07";
                if (value === 0.06) return "0.06";
                if (value === 0.05) return "0.05";
                if (value === 0.04) return "0.04";
                if (value === 0.03) return "0.03";
                if (value === 0.02) return "0.02";
                if (value === 0.01) return "0.01";
            }
            return null;
        }
    },
    ImageValidate: function (fileType) {
        var result = false;
        if (fileType == "image/png" || fileType == "image/jpeg" || fileType == "image/jpg")
            result = true;

        return result;
    }
}

//const FileSize = {
//    Kb100: (1024),
//    Kb300: (3 * 1024),
//    Kb500: (5 * 1024),
//    Kb700: (7 * 1024),
//    Mb1: (10 * 1024),
//    Mb2: (2 * 10 * 1024),


//}

//const toBase64 = file => new Promise((resolve, reject) => {
//    const reader = new FileReader();
//    reader.readAsDataURL(file);
//    reader.onload = () => resolve(reader.result);
//    reader.onerror = error => reject(error);
//});

//async function Main() {
//    const file = document.querySelector('#myfile').files[0];
//    console.log(await toBase64(file));
//}
$(document).ready(function () {
    Buttons.Init();
});
let Form = {
    Send: function () {
        // Show loading indicator
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Please wait',
            text: 'Sending request..',
            showConfirmButton: false,
            allowOutsideClick: false,

        });
        Swal.showLoading();
        Common.Form.Save('SendRequest')
            .then(function (result) {
                // Close loading indicator
                Swal.close();
                Swal.hideLoading()
                if (result.errorType === 2) {
                    // Show error message
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Cannot send request',
                        text: result.errorMessage,
                        allowOutsideClick: false
                    });
                } else {

                    // Check for success
                    // Show success message
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: result.errorMessage,
                        text: 'Please wait for update or contact ITS Admin',
                        showConfirmButton: false,
                        timer: 1500,
                        allowOutsideClick: false
                    });
                }
            })
            .catch(function (error) {
                Swal.close();
                // Show error message
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Send failed',
                    text: 'Please contact ITS Admin',
                    allowOutsideClick: false
                });
            });
    }
}
let Buttons = {
    Init: function () {
        $('#buttonRequest').click(function () {
            Form.Send();
        });
    }
}
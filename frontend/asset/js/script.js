$(document).ready(function () {

    $("#but_upload").click(function (e) {
        e.preventDefault();

        var fd = new FormData();
        var files = $('#file')[0].files;

        // Check file selected or not
        if (files.length > 0) {
            $("#but_upload .btn-sppiner").show();
            $("#but_upload .btn-text").text("UpScaling...");
            $("#img-processed").removeAttr("src")
            let file = files[0];
            fd.append('file', file);
            if (file) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    console.log(event.target.result);
                    $('#img-preview').attr('src', event.target.result);
                }
                reader.readAsDataURL(file);
            }

            $.ajax({
                url: 'http://localhost:8000/upscale',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function (response) {
                    $("#but_upload .btn-sppiner").hide();
                    $("#but_upload .btn-text").text("UpScale");
                    if (response) {
                        $("#img-processed").attr("src", "data:image/png;base64, " + response.base64);
                    } else {
                        alert('file not uploaded');
                    }
                },
            });
        } else {
            $("#but_upload .btn-text").text("UpScale");
            $("#but_upload .btn-sppiner").hide();
            alert("Please select a file.");
        }
    });
});
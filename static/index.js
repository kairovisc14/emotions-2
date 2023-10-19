var date = new Date()
var data = date.toLocaleDateString("pt-br")
let display_date= "Data:" + date.toLocaleDateString("pt-br")

$(document).ready(function () {
    $("#display_date").html(display_date)
    $('#save_button').prop('disabled', true);
})

let predicted_emotion;
$(function () {
    $("#predict_button").click(function () {
        let input_data = {
            "text": $("#text").val()
        }
        $.ajax({
            type: 'POST',
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {
                $("#prediction").html(result.data.predicted_emotion)
                $("#emo_img_url").attr('src', result.data.predicted_emotion_img_url);
                $('#prediction').css("display", "");
                $('#emo_img_url').css("display", "");
                predicted_emotion = result.data.predicted_emotion
                $('#save_button').prop('disabled', false);
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    });
    $('#save_button').click(function (){
        saves = {
            "date":data,
            "text":$("#text").val(),
            "emotion":predicted_emotion
        }

        $.ajax({
            type: 'POST',
            url: "/saves",
            data: JSON.stringify(saves),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {
                alert("Diário atualizado")
                window.location.reload()
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    })
})
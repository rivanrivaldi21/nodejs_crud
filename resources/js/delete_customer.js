$(document).ready(function(){
    let customerId = 0;
    let customerName = '';

    $(document).on("click", "#div_customer_table table button.btn_delete", function() {
        console.log(event);
        let btn_id = (event.srcElement.id);
        customerId = btn_id.split("_")[2];

        if (customerId) {
            $.ajax({
                url: '/api/customer/findone/' + customerId,
                type : 'GET',
                success : function(response) {
                    customerName = response.customer.firstname;
                    $("div.modal-body")
                        .text(`Do you want to delete ${response.customer.firstname} from the list ?`);
                    },
                error : function(error){
                    $("div.modal-body")
                        .text(`The data that you tryisssng to access is not available in the database !`);
                }
            });
        }
    });

    $(document).on("click", "#model-delete-btn", function() {
        $.ajax({
            url: '/api/customer/deletebyid/' + customerId,
            type: 'DELETE',
            success: function(response) {
                $("div.modal-body")
                    .text("Delete successfully a Customer with name = " + customerName + "!");

                $("#model-delete-btn").remove();
                $("button.btn.btn-secondary").text("Close");

                // delete the customer row on html page
                let row_id = "tr_" + customerId;
                $("#" + row_id).remove();
                $("#div_customer_updating").css({"display": "none"});
            },
            error: function(error){
                console.log(error);
                $("#div_customer_updating").css({"display": "none"});
                alert("Error -> " + error);
            }
        });
    });
});

$(document).ready(function () {
    let path = $(location).attr("pathname");

    if (path.toLowerCase() === '/auction/registration') {
        CheckSession();
    }
});

function AuctionRegistration() {
    let isValidData = ValidateAuctionData();
    
    if (!isValidData) {
        return;
    }
    
    BlockScreen();

    let user = RetriverUserFromSession();

    let auctionDate = $("#txtAuctionDate").val();
    let auctionName = $("#txtAuctionName").val();
    let auctionDescription = $("#txtAuctionDescription").val();
    let auctionAddress = $("#txtAuctionAddress").val();
    
    let request = {
        Token: user.data.token,
        AuctionDate: auctionDate,
        AuctionName: auctionName,
        AuctionDescription: auctionDescription,
        AuctionAddress: auctionAddress
    }
    
    
    AsyncRequest("POST", "../Auction/RegisterAuctionServiceApi", request, successRegisterAuction, ErrorAsyncRequest);
}

function ValidateAuctionData() {
    let auctionName = $("#txtAuctionName").val();
    let auctionDescription = $("#txtAuctionDescription").val();
    let auctionAddress = $("#txtAuctionAddress").val();

    if (txtAuctionName === "" || CheckFieldNull(auctionName)) {
        $("#txtAuctionName").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'É necessário informar o nome do leilão!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return false;
    }

    if (auctionDescription === "" || CheckFieldNull(auctionDescription)) {
        $("#txtAuctionDescription").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'É necessário informar a descrição do leilão!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return false;
    }

    if (auctionAddress === "" || CheckFieldNull(auctionAddress)) {
        $("#txtAuctionAddress").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'É necessário informar o código de barras do produto!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return false;
    }

    return true;
}

function successRegisterAuction(json) {
    let retorno = json.retorno;

    if (retorno.success == true) {
        swal({
            title: "Leilão cadastrado com sucesso!",
            text: "",
            confirmButtonColor: "#66BB6A",
            confirmButtonText: "Fechar",
            type: "success"
        }, function (isConfirmed) {
            if (isConfirmed) {
                window.location.assign("../Auction/Registration");
                $.blockUI({ timeout: 10 });
                setTimeout(function () {
                    $("#txtAuctionDate").focus()
                }, 12);
            }
        });
    }
    else if (retorno.success == false) {
        let erros = retorno.errors;
        let erroFormatado = erros.join('<br />');

        swal({
            title: "Oops...",
            text: `${erroFormatado}`,
            confirmButtonColor: "#EF5350",
            type: "error",
            html: true
        });

        $.blockUI({ timeout: 10 });
        setTimeout(function () {
            $("#txtAuctionDate").focus()
        }, 12);
        }
        else {
            swal({
                title: "Oops...",
                text: `Algo deu errado, por favor, tente novamente!`,
                confirmButtonColor: "#EF5350",
                type: "error"
            }, function (isConfirmed) {
                if (isConfirmed) {
                    $.blockUI({ timeout: 10 });
                }
            });
        }
}
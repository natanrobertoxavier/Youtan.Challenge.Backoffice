$(document).ready(function () {
    let path = $(location).attr("pathname");

    if (path.toLowerCase() === '/auction/list') {
        CheckSession();
        LoadAuctionList();
    }
});

function LoadAuctionList() {
    let user = RetriverUserFromSession();

    AsyncRequest("POST", "../Auction/RecoverAllServiceApi", user.data.token, SuccessLoadAuctionList, ErrorAsyncRequest);
}

function SuccessLoadAuctionList(json) {
    let result = json.result.data;

    if (result != undefined) {
        let table = document.getElementById("tbAuctionsList");
        let bodyTable = table.getElementsByTagName("tbody")[0];
        bodyTable.innerHTML = '';


        result.forEach(item => {
            let formattedDate = FormatDate(item.auctionDate);
            let name = item.auctionName;
            let formattedName = name.length > 28 ? name.substring(0, 28) + "..." : name;

            let newLine = bodyTable.insertRow();
            let auctionDate = newLine.insertCell(0);
            let auctionName = newLine.insertCell(1);
            let celulaAcoes = newLine.insertCell(2);

            auctionDate.innerHTML = formattedDate;
            auctionName.innerHTML = `<span style="white-space: nowrap;">${formattedName}</span>`;

            celulaAcoes.innerHTML = `
                <div style="text-align: right; white-space: nowrap; width: 100%;">
                    <a id="btnEditAuction" onclick="EditAuction('${item.auctionId}')">
                        <i class="icon-pencil7 text-primary"></i>
                    </a>
                    <a id="btnDeleteAuction" onclick="DeleteAuction('${item.auctionId}', '${formattedName}')">
                        <i class="icon-trash text-danger-600"></i>
                    </a>
                </div>
            `;

            bodyTable.insertRow(newLine, bodyTable.firstChild);
        });
    }
}

function FormatDate(parseDate) {
    const date = new Date(parseDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function EditAuction(id) {
    CheckSession();
    let user = RetriverUserFromSession();

    let request = {
        Token: user.data.token,
        AuctionId: id,
    }

    AsyncRequest("POST", "../Auction/GetAuctionById", request, SuccessRecoverById, ErrorAsyncRequest);
}

function DeleteAuction(id, auctionName) {
    BlockScreen();

    swal({
        title: `Deseja realmente excluir o leilão: ${auctionName}?`,
        text: "Todas as informações serão perdidas!",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Não excluir",
        confirmButtonColor: "#FF7043",
        confirmButtonText: "Sim, excluir!"
    },
        function (result) {
            if (result) {

                let user = RetriverUserFromSession();

                let requestDeleteAuction = {
                    Token: user.data.token,
                    AuctionId: id,
                }

                AsyncRequest("POST", "../Auction/DeleteServiceApi", requestDeleteAuction, SucessoExcluirProduto, ErrorAsyncRequest);
                $.blockUI({ timeout: 10 });
            } else {
                $.blockUI({ timeout: 10 });
            };
        }
    )
}

function SucessoExcluirProduto(json) {
    let result = json.result;

    if (result.success == true) {
        LoadAuctionList();

        return;
    }

    let erros = retorno.mensagens;
    let erroFormatado = erros.join('<br />');

    swal({
        title: "Oops...",
        text: `${erroFormatado}!`,
        confirmButtonColor: "#EF5350",
        type: "error"
    },
        function (result) {
            if (result) {
            }
        });
}

function SuccessRecoverById(json) {
    let result = json.result;

    sessionStorage.removeItem("AUCTION");
    sessionStorage.setItem("AUCTION", JSON.stringify(result))

    window.location.assign("../Auction/Edit");
}

function FiltrarTabela() {
    let inputText = $('#txtPesquisarListagemProdutos').val().toLowerCase();
    let selectedOption = parseInt($('#txtTipoDePesquisaListagemProdutos').val());
    let columnIndex = 1;

    switch (selectedOption) {
        case 0:
            columnIndex = 1;
            break;
        case 1:
            columnIndex = 2;
            break;
        case 2:
            columnIndex = 0;
            break;
        default:
            columnIndex = 1;
            break;
    }


    $('#tableProdutosListagem tbody tr').filter(function () {

        let cellText = $(this).find('td').eq(columnIndex).text().toLowerCase();

        if (cellText.indexOf(inputText) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function colunaIndex(nomeColuna) {
    return $('#tableProdutosListagem thead th').filter(function () {
        return $(this).text().toLowerCase() === nomeColuna;
    }).index();
}
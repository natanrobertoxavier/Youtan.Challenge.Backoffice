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
    swal({
        title: "Oops...",
        text: `A tela de edição de leilões não está implementada!`,
        confirmButtonColor: "#EF5350",
        type: "error"
    }, function (isConfirmed) {
        if (isConfirmed) {
            $.blockUI({ timeout: 10 });
        }
    });
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

                AsyncRequest("POST", "../Auction/DeleteServiceApi", requestDeleteAuction, SuccessDeleteAuction, ErrorAsyncRequest);
                $.blockUI({ timeout: 10 });
            } else {
                $.blockUI({ timeout: 10 });
            };
        }
    )
}

function SuccessDeleteAuction(json) {
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
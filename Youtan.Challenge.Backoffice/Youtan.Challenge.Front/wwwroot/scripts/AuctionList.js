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
            let formattedName = name.length > 32 ? name.substring(0, 32) + "..." : name;

            let newLine = bodyTable.insertRow();
            let auctionDate = newLine.insertCell(0);
            let auctionName = newLine.insertCell(1);
            let celulaAcoes = newLine.insertCell(2);

            auctionDate.innerHTML = formattedDate;
            auctionName.innerHTML = formattedName;
            celulaAcoes.innerHTML = `<a id="btnEditAuction" onclick="EditAuction(${item.auctionId})"><i class="icon-pencil7 text-primary"></i></a> <a id="btnDeleteAuction" onclick="DeleteAuction(${item.AuctionId}, '${auctionName}')"><i class="icon-trash text-danger-600"></i></a>`;

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
        ProdutoId: id,
    }

    //AsyncRequest("POST", "../Produtos/GetProdutoPorId", request, SucessoCarregarProduto, ErroRequisicaoAjax);
}

function DeleteAuction(id, nomeProduto) {
    //BloqueioTela();

    //swal({
    //    title: `Deseja realmente excluir o produto: ${nomeProduto}?`,
    //    text: "Todas as informações deste produto serão perdidas!",
    //    type: "warning",
    //    showCancelButton: true,
    //    cancelButtonText: "Não excluir",
    //    confirmButtonColor: "#FF7043",
    //    confirmButtonText: "Sim, excluir!"
    //},
    //    function (result) {
    //        if (result) {

    //            let usuario = RetornaSessao();
    //            let tokenUsuario = usuario.token;

    //            let RequestDeletarProduto = {
    //                Token: tokenUsuario,
    //                ProdutoId: id,
    //            }

    //            //AsyncRequest("POST", "../Produtos/Delete", RequestDeletarProduto, SucessoExcluirProduto, ErroRequisicaoAjax);
    //            $.blockUI({ timeout: 10 });
    //        } else {
    //            $.blockUI({ timeout: 10 });
    //        };
    //    }
    //)
}

function SucessoExcluirProduto(json) {
    let retorno = json.retorno;

    if (retorno.mensagens === null) {
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

function SucessoCarregarProduto(json) {
    let retorno = json.retorno;

    sessionStorage.removeItem("PRODUTO");
    sessionStorage.setItem("PRODUTO", JSON.stringify(retorno))

    window.location.assign("../Produtos/Editar");

    //sessionStorage.removeItem("PRODUTO");

    LoadAuctionList();
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
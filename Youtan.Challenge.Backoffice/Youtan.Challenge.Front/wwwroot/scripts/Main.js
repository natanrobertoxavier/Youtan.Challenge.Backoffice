$(document).ready(function () {
    let path = $(location).attr("pathname");

    if (path.toLowerCase() === '/home/index') {
        CheckSession();
    }
});

function CallAuctionRegistration() {
    window.location.assign("../Auction/Registration");
}
function CallAuctionList() {
    window.location.assign("../Auction/List");
}

function ChamaCadastroClientes() {
    window.location.assign("../Clientes/Cadastro");
}

function ChamaListarClientes() {
    window.location.assign("../Clientes/Listar");
}

function ChamaCadastroUsuarios() {
    window.location.assign("../Usuarios/Cadastro");
}

function GoToHome() {
    window.location.assign("../Home/Index");
}

function ChamaRegistrarPedido() {
    window.location.assign("../Pedidos/Registrar");
}

function SairDoSistema() {
    sessionStorage.clear();
    window.location.assign("../");
}
function AsyncRequest(requestType, path, parameters, successMethod, errorMethod) {

    $.ajax({
        type: requestType,
        url: path,
        async: true,
        data: JSON.stringify(parameters),
        contentType: "application/json;",
        dataType: "json",
        success: function (Json) {
            successMethod(Json);
        },
        error: function (Json) {
            errorMethod(Json);
        }
    });
}

function BlockScreen() {
    $.blockUI({
        message: '<i class="icon-spinner4 spinner"></i>',
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}

function ErrorAsyncRequest(json) {
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

function Logout() {
    sessionStorage.clear();
    window.location.assign("../");
}

function CheckSession() {
    let varSessao = sessionStorage.getItem("USER");
    const sessao = JSON.parse(varSessao);

    if (sessao == null || sessao == undefined || sessao.data.token == "" || sessao.data.token == undefined) {
        window.location.assign("../");
    } else {
        document.getElementById("txtNameTopLayout").textContent = sessao.data.name
        document.getElementById("txtNomeMenuLayout").textContent = sessao.data.name
    }
}

function RetriverUserFromSession() {
    let varSessao = sessionStorage.getItem("USER");
    const sessao = JSON.parse(varSessao);

    return sessao;
}

function CheckFieldNull(str) {
    return str.trim() === '';
}
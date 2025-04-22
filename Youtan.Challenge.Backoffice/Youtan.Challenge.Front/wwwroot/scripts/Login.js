$(document).ready(function () {
});

function Login() {
    let loginEmail = $("#txtEmailLogin").val();
    let loginPassword = $("#txtPasswordLogin").val();

    if (loginEmail === "" || CheckFieldNull(loginEmail)) {
        $("#txtEmailLogin").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'É necessário informar o e-mail!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return;
    }

    if (loginPassword === "" || CheckFieldNull(loginPassword)) {
        $("#txtPasswordLogin").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'É necessário informar a senha!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return;
    }

    let user = {
        Password: loginPassword,
        Email: loginEmail,
    }

    BlockScreen();

    AsyncRequest("POST", "../User/LoginServiceApi", user, SuccessLogin, ErrorAsyncRequest);
}

function ValidateRegisterUser() {
    let name = $("#txtNameRegisterUser").val();
    let password = $("#txtPasswordRegisterUser").val();
    let email = $("#txtEmailRegisterLogin").val();

    if (name === "" || CheckFieldNull(name)) {
        $("#txtNameRegisterUser").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'É necessário informar o nome!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return;
    }

    if (password === "" || CheckFieldNull(password)) {
        $("#txtPasswordRegisterUser").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'É necessário informar a senha!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return;
    }

    if (password.length < 6) {
        $("#txtPasswordRegisterUser").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'A senha deve conter ao menos seis caracteres!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return;
    }

    if (email === "" || CheckFieldNull(email)) {
        $("#txtEmailRegisterLogin").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'É necessário informar o e-mail!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return;
    }

    if (!(ValidateEmail(email))) {
        $("#txtEmailRegisterLogin").focus()

        new PNotify({
            title: 'ATENÇÃO!',
            text: 'Informe um e-mail válido!',
            addclass: 'alert alert-warning alert-styled-right',
            type: 'error'
        });

        return;
    }

    BlockScreen();

    let user = {
        Name: name,
        Password: password,
        Email: email,
    }

    AsyncRequest("POST", "../User/RegisterServiceApi", user, SucessRegisterUser, ErrorAsyncRequest);
}

function ValidateEmail(email) {
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
}

function SucessRegisterUser(json) {
    let retorno = json.retorno;

    if (retorno.success == true) {

        swal({
            title: "Cadastro realizado com sucesso!",
            text: "Faça login para continuar",
            confirmButtonColor: "#66BB6A",
            type: "success"
        },
            function (result) {
                if (result) {
                    $.blockUI({ timeout: 10 });
                    sessionStorage.clear();
                    sessionStorage.setItem("USER", JSON.stringify(retorno))
                    window.location.assign("../User/Index");
                }
                else {
                    $.blockUI({ timeout: 10 });
                };
            });
    }
    else if (retorno.success == false) {
        let erros = retorno.errors;
        let erroFormatado = erros.join('<br />');

        swal({
            title: "Oops...",
            text: `${erroFormatado}!`,
            confirmButtonColor: "#EF5350",
            type: "error",
            html: true,
        });
        0
        $.blockUI({ timeout: 10 });
        $("#txtNameRegisterUser").focus()
        }

    $.blockUI({ timeout: 10 });
}

function SuccessLogin(json) {
    let retorno = json.retorno;

    if (retorno.success == true) {
        $.blockUI({ timeout: 10 });

        sessionStorage.clear();
        sessionStorage.setItem("USER", JSON.stringify(retorno))

        window.location.assign("../Home/Index");;
    }
    else if (retorno.success == false) {
        swal({
            title: "Oops...",
            text: `Usuário ou senha inválidos!`,
            confirmButtonColor: "#EF5350",
            type: "error",
            html: true,
        });

        $.blockUI({ timeout: 10 });
        $("#txtEmailLogin").focus()
        }
    else {
        $.blockUI({ timeout: 10 });
    }
}
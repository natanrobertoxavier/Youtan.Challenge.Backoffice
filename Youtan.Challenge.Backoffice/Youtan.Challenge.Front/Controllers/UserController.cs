using Microsoft.AspNetCore.Mvc;
using Youtan.Challenge.Front.Models.Request;
using Youtan.Challenge.Front.Services.Login;

namespace Youtan.Challenge.Front.Controllers;

public class UserController : YoutanController
{
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> LoginServiceApi(
        [FromServices] IYoutanServiceApi loginApiService,
        [FromBody] RequestLogin user)
    {
        var retorno = await loginApiService.LoginUserAsync(user);

        return Json(new
        {
            retorno
        });
    }

    [HttpPost]
    public async Task<IActionResult> RegisterServiceApi(
        [FromServices] IYoutanServiceApi loginApiService,
        [FromBody] RequestRegisterUser request)
    {
        var retorno = await loginApiService.RegisterUserAsync(request);

        return Json(new
        {
            retorno
        });
    }
}
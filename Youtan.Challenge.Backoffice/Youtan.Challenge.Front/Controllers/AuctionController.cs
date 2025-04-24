using Microsoft.AspNetCore.Mvc;
using Youtan.Challenge.Front.Models.Request;
using Youtan.Challenge.Front.Services.Login;

namespace Youtan.Challenge.Front.Controllers;

public class AuctionController : YoutanController
{
    public IActionResult Registration()
    {
        return View();
    }

    public IActionResult List()
    {
        return View();
    }

    public IActionResult Edit()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> RegisterAuctionServiceApi(
        [FromServices] IYoutanServiceApi serviceApi,
        [FromBody] RequestRegisterAuction request)
    {
        var retorno = await serviceApi.RegisterAuctionAsync(request);

        return Json(new
        {
            retorno
        });
    }

    [HttpPost]
    public async Task<IActionResult> RecoverAllServiceApi(
        [FromServices] IYoutanServiceApi serviceApi,
        [FromBody] string token)
    {
        var result = await serviceApi.RecoverAllAuctionsAsync(token);

        return Json(new
        {
            result
        });
    }

    [HttpPost]
    public async Task<IActionResult> DeleteServiceApi(
        [FromServices] IYoutanServiceApi serviceApi,
        [FromBody] RequestDeleteAuction request)
    {
        var result = await serviceApi.DeleteAuctionAsync(request);

        return Json(new
        {
            result
        });
    }

    [HttpPost]
    public async Task<IActionResult> GetAuctionById(
        [FromServices] IYoutanServiceApi serviceApi,
        [FromBody] RequestGetAuctionById request)
    {
        var result = await serviceApi.RecoverByAuctionIdAsync(request);

        return Json(new
        {
            result
        });
    }
}

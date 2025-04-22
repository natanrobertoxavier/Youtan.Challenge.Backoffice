using Youtan.Challenge.Front.Models.Request;
using Youtan.Challenge.Front.Models.Response;

namespace Youtan.Challenge.Front.Services.Login;

public interface IYoutanServiceApi
{
    Task<Result<ResponseLogin>> LoginUserAsync(RequestLogin request);
    Task<Result<MessageResult>> RegisterUserAsync(RequestRegisterUser request);
}

namespace Youtan.Challenge.Front.Models.Request;

public class RequestToken
{
    public RequestToken(string token)
    {
        Token = token;
    }

    public RequestToken()
    {
    }

    public string Token { get; set; }
}

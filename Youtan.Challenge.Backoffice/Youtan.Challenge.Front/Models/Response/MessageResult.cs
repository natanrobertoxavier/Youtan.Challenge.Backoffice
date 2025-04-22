namespace Youtan.Challenge.Front.Models.Response;

public class MessageResult
{
    public MessageResult(string message)
    {
        Message = message;
    }

    public MessageResult()
    {
    }

    public string Message { get; set; }
}

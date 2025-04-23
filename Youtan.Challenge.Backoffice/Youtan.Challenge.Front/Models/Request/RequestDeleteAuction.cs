namespace Youtan.Challenge.Front.Models.Request;

public class RequestDeleteAuction : RequestToken
{
    public RequestDeleteAuction(
        string token,
        string auctionId) : base(token)
    {
        AuctionId = auctionId;
    }

    public RequestDeleteAuction(string auctionId)
    {
        AuctionId = auctionId;
    }

    public RequestDeleteAuction()
    {
    }

    public string AuctionId { get; set; }
}

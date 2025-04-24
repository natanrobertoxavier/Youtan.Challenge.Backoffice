namespace Youtan.Challenge.Front.Models.Request;

public class RequestGetAuctionById : RequestToken
{
    public RequestGetAuctionById(
        string token,
        string auctionId) : base(token)
    {
        AuctionId = auctionId;
    }

    public RequestGetAuctionById(string auctionId)
    {
        AuctionId = auctionId;
    }

    public RequestGetAuctionById()
    {
    }

    public string AuctionId { get; set; }
}

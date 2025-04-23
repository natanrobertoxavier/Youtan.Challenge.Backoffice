namespace Youtan.Challenge.Front.Models.Request;

public class RequestRegisterAuction(
    string token,
    DateTime auctionDate,
    string auctionName,
    string auctionDescription,
    string auctionAddress) : RequestToken(token)
{
    public DateTime AuctionDate { get; set; } = auctionDate;
    public string AuctionName { get; set; } = auctionName;
    public string AuctionDescription { get; set; } = auctionDescription;
    public string AuctionAddress { get; set; } = auctionAddress;
}

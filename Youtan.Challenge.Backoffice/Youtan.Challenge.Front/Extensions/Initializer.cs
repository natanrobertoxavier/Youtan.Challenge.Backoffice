using Serilog;
using Youtan.Challenge.Front.Services.Login;

namespace Youtan.Challenge.Front.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddScoped<IYoutanServiceApi, YoutanApiService>();

        services.AddHttpClient("YoutanApi", client =>
        {
            client.BaseAddress = new Uri(configuration.GetSection("Services:YoutanApi").Value);
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        });

        return services;
    }

    public static IServiceCollection AddSerilog(this IServiceCollection services)
    {
        Log.Logger = new LoggerConfiguration()
            .WriteTo.Console()
            .CreateLogger();

        services.AddSingleton(Log.Logger);

        return services;
    }
}
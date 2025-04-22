using System.Text.Json.Serialization;
using System.Text.Json;

namespace Youtan.Challenge.Front.Services;

public abstract class Base
{
    protected T DeserializeResponseObject<T>(string json)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        };

        options.Converters.Add(new JsonStringEnumConverter());
        return JsonSerializer.Deserialize<T>(json, options);
    }
}

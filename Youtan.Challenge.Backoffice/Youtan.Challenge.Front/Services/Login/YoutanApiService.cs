using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Text;
using Youtan.Challenge.Front.Models.Request;
using Youtan.Challenge.Front.Models.Response;
using ILogger = Serilog.ILogger;

namespace Youtan.Challenge.Front.Services.Login;

public class YoutanApiService(
    IHttpClientFactory httpClientFactory,
    ILogger logger) : Base, IYoutanServiceApi
{
    private readonly IHttpClientFactory _httpClientFactory = httpClientFactory;
    private readonly ILogger _logger = logger;

    public async Task<Result<ResponseLogin>> LoginUserAsync(RequestLogin request)
    {
        _logger.Information($"{nameof(LoginUserAsync)} - Iniciando a chamada para endpoint de login usuário.");

        var output = new Result<ResponseLogin>();

        try
        {
            var client = _httpClientFactory.CreateClient("YoutanApi");

            var uri = string.Format("/api/v1/user/login");

            var contentRequest = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(uri, contentRequest);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                var responseApi = JsonConvert.DeserializeObject<Result<ResponseLogin>>(content);

                _logger.Information($"{nameof(LoginUserAsync)} - Encerrando chamada para endpoint de login usuário.");

                return responseApi;
            }

            var failMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. StatusCode: {response.StatusCode}";

            _logger.Error(failMessage);

            return output.Failure(new List<string>() { failMessage });
        }
        catch (Exception ex)
        {
            var errorMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. Erro: {ex.Message}";

            _logger.Error(errorMessage);

            return output.Failure(new List<string>() { errorMessage });
        }
    }

    public async Task<Result<MessageResult>> RegisterUserAsync(RequestRegisterUser request)
    {
        _logger.Information($"{nameof(LoginUserAsync)} - Iniciando a chamada para cadastro de usuário.");

        var output = new Result<MessageResult>();

        try
        {
            var client = _httpClientFactory.CreateClient("YoutanApi");

            var uri = string.Format("/api/v1/user");

            var contentRequest = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(uri, contentRequest);

            var content = await response.Content.ReadAsStringAsync();

            var responseApi = JsonConvert.DeserializeObject<Result<MessageResult>>(content);

            if (responseApi.IsSuccess())
            {
                _logger.Information($"{nameof(LoginUserAsync)} - Encerrando chamada para cadastro de usuário.");

                return responseApi;
            }

            var apiErrors = string.Join(" - ", responseApi?.Errors);

            var failMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. StatusCode: {response.StatusCode} - {apiErrors}";

            _logger.Error(failMessage);

            return output.Failure(responseApi?.Errors.ToList());
        }
        catch (Exception ex)
        {
            var errorMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. Erro: {ex.Message}";

            _logger.Error(errorMessage);

            return output.Failure(new List<string>() { errorMessage });
        }
    }

    public async Task<Result<MessageResult>> RegisterAuctionAsync(RequestRegisterAuction request)
    {
        _logger.Information($"{nameof(LoginUserAsync)} - Iniciando a chamada para cadastro de usuário.");

        var output = new Result<MessageResult>();

        try
        {
            var client = _httpClientFactory.CreateClient("YoutanApi");

            var uri = string.Format("/api/v1/auction");

            var contentRequest = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", request.Token);

            var response = await client.PostAsync(uri, contentRequest);

            var content = await response.Content.ReadAsStringAsync();

            var responseApi = JsonConvert.DeserializeObject<Result<MessageResult>>(content);

            if (responseApi.IsSuccess())
            {
                _logger.Information($"{nameof(LoginUserAsync)} - Encerrando chamada para cadastro de usuário.");

                return responseApi;
            }

            var apiErrors = string.Join(" - ", responseApi?.Errors);

            var failMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. StatusCode: {response.StatusCode} - {apiErrors}";

            _logger.Error(failMessage);

            return output.Failure(responseApi?.Errors.ToList());
        }
        catch (Exception ex)
        {
            var errorMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. Erro: {ex.Message}";

            _logger.Error(errorMessage);

            return output.Failure(new List<string>() { errorMessage });
        }
    }

    public async Task<Result<IEnumerable<ResponseAuction>>> RecoverAllAuctionsAsync(string token)
    {
        _logger.Information($"{nameof(LoginUserAsync)} - Iniciando a chamada para cadastro de usuário.");

        var output = new Result<IEnumerable<ResponseAuction>>();

        try
        {
            var client = _httpClientFactory.CreateClient("YoutanApi");

            var uri = string.Format("/api/v1/auction");

            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var response = await client.GetAsync(uri);

            var content = await response.Content.ReadAsStringAsync();

            var responseApi = JsonConvert.DeserializeObject<Result<IEnumerable<ResponseAuction>>>(content);

            if (responseApi.IsSuccess())
            {
                _logger.Information($"{nameof(LoginUserAsync)} - Encerrando chamada para cadastro de usuário.");

                return responseApi;
            }

            var apiErrors = string.Join(" - ", responseApi?.Errors);

            var failMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. StatusCode: {response.StatusCode} - {apiErrors}";

            _logger.Error(failMessage);

            return output.Failure(responseApi?.Errors.ToList());
        }
        catch (Exception ex)
        {
            var errorMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. Erro: {ex.Message}";

            _logger.Error(errorMessage);

            return output.Failure(new List<string>() { errorMessage });
        }
    }

    public async Task<Result<MessageResult>> DeleteAuctionAsync(RequestDeleteAuction request)
    {
        _logger.Information($"{nameof(LoginUserAsync)} - Iniciando a chamada para cadastro de usuário.");

        var output = new Result<MessageResult>();

        try
        {
            var client = _httpClientFactory.CreateClient("YoutanApi");

            var uri = string.Format("/api/v1/auction/{0}", request.AuctionId);

            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", request.Token);

            var response = await client.DeleteAsync(uri);

            var content = await response.Content.ReadAsStringAsync();

            var responseApi = JsonConvert.DeserializeObject<Result<MessageResult>>(content);

            if (responseApi.IsSuccess())
            {
                _logger.Information($"{nameof(LoginUserAsync)} - Encerrando chamada para cadastro de usuário.");

                return responseApi;
            }

            var apiErrors = string.Join(" - ", responseApi?.Errors);

            var failMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. StatusCode: {response.StatusCode} - {apiErrors}";

            _logger.Error(failMessage);

            return output.Failure(responseApi?.Errors.ToList());
        }
        catch (Exception ex)
        {
            var errorMessage = $"{nameof(LoginUserAsync)} - Ocorreu um erro ao chamar a API. Erro: {ex.Message}";

            _logger.Error(errorMessage);

            return output.Failure(new List<string>() { errorMessage });
        }
    }
}

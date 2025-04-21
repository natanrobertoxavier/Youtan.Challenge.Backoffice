using Newtonsoft.Json;

namespace Youtan.Challenge.Front.Models.Response;

public class Result<T>
{
    public Result(
        T data,
        bool isSuccess,
        IEnumerable<string> errors)
    {
        Data = data;
        Success = isSuccess;
        Errors = errors;
    }

    public Result() 
    {
    }

    public T Data { get; set; }

    public bool Success { get; set; }

    public IEnumerable<string> Errors { get; set; }

    public bool IsSuccess() => Success;

    public T GetData() => Data;

    public Result<T> Succeeded(T data) => new Result<T>(data, true, Enumerable.Empty<string>());

    public new Result<T> Failure(List<string> errors) => new Result<T>(default, false, errors);
}

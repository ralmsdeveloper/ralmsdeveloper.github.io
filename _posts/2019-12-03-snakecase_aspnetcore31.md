---
title: "System.Text.JSON - ASPNET Core 3.1"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
---

![01]({{site.url}}{{site.baseurl}}/assets/images/JsonNamePolicy.png)

<center><strong>Fala pessoal, tudo bem?! 💚</strong></center>
<hr> 
## Porque estamos aqui?
Eu acredito que você já sabe, e se não sabendo, ficará agora, que a Microsoft escreveu seu proprio Serializador JSON que está no namespace <a href="https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/" target="_BLANK" alt="">
System.Text.Json 
</a>.
FYI: Se seu projeto é em .NET Core, você já vai ter acesso ao namespace/pacote que informei acima, caso você esteja usando 
.NETStandard ou .NET Framework, você irá precisar instalar o pacote <a href="https://www.nuget.org/packages/System.Text.Json" target="_BLANK" alt="">System.Text.Json</a>.

## E a dúvida?
Sei que assim como eu, muitos de vocês ficaram se perguntando sobre usar ou não usar o 
<a href="https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/" target="_BLANK" alt="">
System.Text.Json 
</a> no lugar do <a href="https://www.newtonsoft.com/json" target="_BLANK" alt="">Newtonsoft</a>, pois bem, tivemos algumas limitações, e quero tratar nesse artigo sobre uma delas especialmente 
que é sobre a serialização dos objetos aplicando a nomenclatura SnakeCase, isso era simplesmente fácil usando o <a href="https://www.newtonsoft.com/json" target="_BLANK" alt="">Newtonsoft</a>, pois ele fornecia uma implementação para usarmos essa estratégia.

```csharp
public IServiceProvider ConfigureServices(IServiceCollection services)
{
  services
    .AddJsonOptions(options => options
      .SerializerSettings.ContractResolver = new DefaultContractResolver
    {
      NamingStrategy = new SnakeCaseNamingStrategy()
    })
}
```
<br>
A Microsoft lançou hoje(03/12/2019) a versão do <a href="https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-core-3-1" target="_BLANK" alt="">ASPNET Core 3.1</a> então resolvi unir o útil ao agradavel, escrevendo 
este artigo e testando já a nova versão, olha que legal, isso pra mim será uma diversão!


## Alterando o comportamento da serialização
Então dado um cenário onde a empresa ou você, deseja padronizar a entrega de seus dados usando a nomenclatura SnakeCase ou qualquer outro padrão, como podemos alterar esse comportamento já que só existe a implementação para CamelCase.
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.IgnoreNullValues = true;
        options.JsonSerializerOptions.WriteIndented = false;
        options.JsonSerializerOptions.AllowTrailingCommas = false;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
}
```
<br>
Observe que agora temos uma propriedade <b>PortertyNamingPolicy</b> que substitui o antigo <b>NamingStrategy</b> do Newtonsoft, aqui é onde iremos começar a brincadeira, lembrando que esse assunto pode ir muito mais além, porém o foco é como resolver o cénario onde quero entregar os dados aplicando a nomenclatura SnakeCase.
<br>
Vamos lá então, irei criar uma classe onde iremos sobrescrever 1(um) método da classe <b>JsonNamingPolicy</b>.

```csharp
public class CustomPropertyNamingPolicy : JsonNamingPolicy
{
    public override string ConvertName(string name) => ToSnakeCase(name);

    private static string ToSnakeCase(string name)
    {
        return string.IsNullOrWhiteSpace(name)
            ? name
            : Regex.Replace(
                name,
                @"([a-z0-9])([A-Z])",
                "$1_$2",
                RegexOptions.Compiled,
                TimeSpan.FromSeconds(0.2)).ToLower();
    }
}
```
## Veja como ficou o ConfigureServices 
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = new CustomPropertyNamingPolicy();
        options.JsonSerializerOptions.IgnoreNullValues = true;
        options.JsonSerializerOptions.WriteIndented = false;
        options.JsonSerializerOptions.AllowTrailingCommas = false;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
}
```

## Output
```json
[
  {
    "birtday_date": "2019-12-05T00:21:37.7799448-03:00",
    "full_name": "Heloysa",
    "email": "ralms@ralms.net"
  },
  {
    "birtday_date": "2019-12-06T00:21:37.7817476-03:00",
    "full_name": "Thysbe",
    "email": "ralms@ralms.net"
  },
  {
    "birtday_date": "2019-12-07T00:21:37.781753-03:00",
    "full_name": "Rafael",
    "email": "ralms@ralms.net"
  },
  {
    "birtday_date": "2019-12-08T00:21:37.7817534-03:00",
    "full_name": "Eduarda",
    "email": "ralms@ralms.net"
  },
  {
    "birtday_date": "2019-12-09T00:21:37.7817536-03:00",
    "full_name": "Heloysa",
    "email": "ralms@ralms.net"
  }
]
```
<br>
Os fontes do exemplo usado está aqui:<br>
<a href="https://github.com/ralmsdeveloper/AspNet31JsonNamePolicy" target="_BLANK" alt="">
https://github.com/ralmsdeveloper/AspNet31JsonNamePolicy
</a>

<div class="notice--success">
<strong>
 Pessoal fico por aqui e um forte abraço! 😄 
 </strong>
</div> 


 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #postgresql #efcore31 #netcore31<br><br>

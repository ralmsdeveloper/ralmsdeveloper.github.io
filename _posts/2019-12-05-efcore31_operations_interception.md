---
title: "Interceptando comandos - EF Core 3.1"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
  - "Entity Framework Core"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcoreinterception.png)

<center><strong>Fala pessoal, tudo bem?!</strong></center>
<hr> 
## Sonho realizado
<div style="text-align: justify;">
Você nem imagina o quanto de pessoas esperando por isso, sim, estou falando de uma forma de interceptar toda operação de banco de dados, já que isso era possível no EF6, mas um dos engenheiros do 
time do EF Core tornou isso possível para EFCore, Thanks <b>Arthur Vickers</b>, dito isso agora você pode alterar/otimizar a query que vai ser executada 
no banco dados, sobrescrevendo os métodos da classe <b>DbCommandInterceptor</b>. Veja alguns dos métodos que você pode sobrescrever 
e ser útil pra você.
</div> 
- NonQueryExecuted
- ScalarExecuting
- ReaderExecuting

## Vamos ver como isso funciona
<div style="text-align: justify;">
A implementação é bem simples, basta criar uma classe que herde de <b>DbCommandInterceptor</b>, por exemplo:
</div> 
```csharp
public class RalmsInterceptor : DbCommandInterceptor
{
}
```
Vamos sobrescrever o método <b>ReaderExecuting</b>, isso significa que mesmo antes de enviar o comando para o banco de dados, 
podemos interceptar e fazer os ajustes que assim for necessário.
```csharp
public class RalmsInterceptor : DbCommandInterceptor
{
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command, 
        CommandEventData eventData, 
        InterceptionResult<DbDataReader> result)
    {
        //command.CommandText = ...
        return result;
    }
}
```
## Como usar nosso pequeno Interceptador?
1 - Você pode adicionar diretamente em seu DbContext.
```csharp
public class RalmsContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=EFCORE31;Trusted_Connection=True;")
            .AddInterceptors(new RalmsInterceptor());
    }
}
```
2 - Ou/Em seu Services que basicamente é a mesma coisa
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services
        .AddDbContext<RalmsContext>(p=>p
            .UseSqlServer(@"Server=...")
            .AddInterceptors(new RalmsInterceptor()));
}
```
## Montando um cenário de uso
Sabendo como criar nosso interceptador e como usar, agora vamos pensar em um cenário onde você gostaria de usar o <a href="https://docs.microsoft.com/pt-br/sql/t-sql/queries/hints-transact-sql-table?view=sql-server-ver15" target="_BLANK" alt="">HINT NOLOCK</a> 
já que isso ainda não é suportado nativamente pelo EF Core, pois bem aqui agente pode fazer um workaround.
```csharp
public class RalmsInterceptor : DbCommandInterceptor
{
    private static readonly Regex _tableAliasRegex =
        new Regex(@"(?<tableAlias>FROM +(\[.*\]\.)?(\[.*\]) AS (\[.*\])(?! WITH \(NOLOCK\)))",
            RegexOptions.Multiline | 
            RegexOptions.IgnoreCase | 
            RegexOptions.Compiled);

    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result)
    {
        if (!command.CommandText.Contains("WITH (NOLOCK)"))
        {
            command.CommandText =
                _tableAliasRegex.Replace(command.CommandText,
                "${tableAlias} WITH (NOLOCK)");
        }

        return result;
    }
}
```
## Vamos testar?
```csharp
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Interceptador.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly RalmsContext _db;

        public TestController(RalmsContext sampleContext)
        {
            _db = sampleContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _ = _db.People.Count();
            _ = _db.People.ToList();

            return Ok();
        }
    }
}
```

## Agora veja nossa query
```sql
-- _db.People.Count();
SELECT COUNT(*)
FROM [People] AS [p] WITH (NOLOCK)

-- _db.People.ToList();
SELECT [p].[Id], [p].[City], [p].[FirstName], [p].[LastName]
FROM [People] AS [p] WITH (NOLOCK)
```
<br>
Os fontes do exemplo usado está aqui:<br>
<a href="https://github.com/ralmsdeveloper/EFCoreInterceptador" target="_BLANK" alt="">
https://github.com/ralmsdeveloper/EFCoreInterceptador
</a>

<div class="notice--success">
<strong>
 Eu fico por aqui e um forte abraço! 😄 
</strong>
</div> 


 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #sqlserver #efcore31 #netcore31 #aspnetcore<br><br>

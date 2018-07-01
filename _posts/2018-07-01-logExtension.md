---
title: "Logs e Projeções SQL"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
toc: true
toc_label: "Começando"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcoretopo.jpg)

<center><strong>Fala pessoal, tudo bem?! 💚</strong></center>
<hr>

## Introdução
<div style="text-align: justify;">
Bom para começarmos nosso pequeno artigo, vamos falar um pouco sobre o <strong>"EU TER"</strong>, é fundamental e que todo desenvolvedor, ou integrador de software tenha 
um controle de tudo ou quase tudo que acontece no banco. é imprescindível que não tenhamos esse controle. Como objetivo maior de nosso artigo é mostrar como visualizar os comandos enviados para o banco, nada mais justo que utilizarmos o <strong>EntityFramework Core</strong> para isso 😊.
<br><br>
O EF Core fornece já um conjunto de opções para que possamos verificar as saídas SQL, vale a pena ressaltar que para o SQL Server temos o magnífico <strong>SQL Server Profiler</strong>, monitor de instruções SQL em tempo real, ótimo para saber quais querys por exemplo consumiram mais tempo.
<br><br>
Enfim, iremos apresentar aqui 2 opções de Logs e criaremos uma extensão para projetar o SQL de uma consulta LINQ.
</div>
<br>
## Estrutura de nosso projeto
**Class Blog**
```csharp
public class Blog
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; } 
}
```

**Nosso DbContext**
```csharp
public class SampleContext : DbContext
{ 
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var sqlConnectionStringBuilder = "Server=(localdb)\\mssqllocaldb;Database=ExemploArtigo;Integrated Security=True;"; 
        optionsBuilder.UseSqlServer(sqlConnectionStringBuilder); 
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>();
    }
}
```
Até aqui tudo bem, temos já o principal para continuar com nosso artigo.
## Registro de Logs:
<div class="notice--success">
<strong>Considerações:</strong><br>
Para usar alguma das opções acima, tem que instalar, são pacotes seperados, então requer uma instalação.<br>
Alguns dos principais registros de Logs são:
</div>
<br> 
<strong>Microsoft.Extensions.Logging.Console</strong><br> Um agente de log de console simples.<br><br>
<strong>Microsoft.Extensions.Logging.AzureAppServices:</strong><br>Serviços de aplicativo do Azure oferece suporte a 'Logs de diagnóstico' e recursos de fluxo de Log.<br><br>
<strong>Microsoft.Extensions.Logging.Debug</strong><br>Logs de um monitor de depuração usando System.Diagnostics.Debug.WriteLine().<br><br>
<strong>Microsoft.Extensions.Logging.EventLog</strong><br>Registros de log de eventos do Windows.<br><br>
<strong>Microsoft.Extensions.Logging.EventSource</strong><br>Dá suporte a EventSource/EventListener.<br><br>
<strong>Microsoft.Extensions.Logging.TraceSource</strong><br>Logs para um ouvinte de rastreamento usando System.Diagnostics.TraceSource.TraceEvent().<br><br>

<div class="notice--success"> 
Você pode ver mais informações sobre as opções apresentadas aqui:<br>
<a href="https://docs.microsoft.com/pt-br/ef/core/miscellaneous/logging" target="_BLACK">https://docs.microsoft.com/pt-br/ef/core/miscellaneous/logging</a> <br>
que por sinal é uma excelente documentação.<br>
</div>
## Mão na massa
Vamos agora ver como utilizar alguns deles.<br>
*Primeiramento o Console*<br>
O que o <i>Microsoft.Extensions.Logging.Console</i> faz é jogar todas instruções SQL no console do aplicativo, é bem simples, após a instalação do pacote basta apenas referenciar, veja o exemplo:
```csharp
optionsBuilder.UseLoggerFactory(new LoggerFactory().AddConsole());
```
<strong>Completo:</strong>
```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    var strConexao = "..."; 
    optionsBuilder.UseSqlServer(strConexao); 
    optionsBuilder.UseLoggerFactory(new LoggerFactory().AddConsole()); // <----------
}
```
<br>
<strong>Output SQL:</strong>
<br>
```sql
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 2.1.1-rtm-30846 initialized 'SampleContext' using provider 'Microsoft.EntityFrameworkCore.SqlServer' with options: None
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (146ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE') SELECT 1 ELSE SELECT 0
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (62ms) [Parameters=[@p0='?' (DbType = DateTime2), @p1='?' (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      INSERT INTO [Blogs] ([Date], [Name])
      VALUES (@p0, @p1);
      SELECT [Id]
      FROM [Blogs]
      WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT [p].[Id], [p].[Date], [p].[Name]
      FROM [Blogs] AS [p]
      WHERE [p].[Id] > 0
``` 

## Usando o DATEDIFF
```csharp
var list = _db
    .Blogs
    .Where(p => EFCore.DateDiff(DatePart.day, DateTimeOffset.Now, p.Date) < 50) 
    .ToList();
```
<br>
<strong>Output SQL:</strong>
```sql
SELECT [p].[Id], [p].[Date], [p].[Name]
FROM [Blogs] AS [p]
WHERE DATEDIFF(day, GETDATE(), [p].[Date]) < 50
```   
<br><br>
Pessoal, fico por aqui <strong>#efcore</strong>

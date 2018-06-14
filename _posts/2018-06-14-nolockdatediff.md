---
title: "Fluent API ou Annotation, Quem tem mais moral?"
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

## Dica EF Core

<div style="text-align: justify;">
Exatamente dia 02/06/2018 02:00 AM, em um quarto de hotel de São Paulo, surge uma conversa bem legal sobre e como implementar o WITH NOLOCK(um hint bem usado para consultas)
juntamente com um amigo discutimos o porquê?! Então comecei a codificar algumas coisas, e foi onde surgiu a extensão para o EntityFramework Core “WITH (NOLOCK)”.
<br><br>
Juntamente com a extensão do WithNoLock, também temos outras como a tradução do DATEDIFF para SQL Server.

</div>
<br>
 
## Vejamos como habilitar utilizar o WithNoLock:
```csharp
public class SampleContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=SampleExtension;Integrated Security=True;")
            .RalmsExtendFunctions();
    }

    protected override void OnModelCreating(ModelBuilder modelo)
    {
        modelo.EnableSqlServerDateDIFF();
    }
}
```
<strong>Como Utilizar:</strong>
```csharp
var query = _db
    .Blogs
    .WithNoLock() // Anotação do With (NoLock)
    .ToList();  
```
<br>
<strong>Output SQL:</strong>
<br>
```sql
SELECT [p].[Id], [p].[Date], [p].[Name]
FROM [Blogs] AS [p] WITH (NOLOCK)  
``` 

## Usando o DATEDIFF
```csharp
var list = _db
    .Blogs
    .Where(p => EFCore.DateDiff(DatePart.day, DateTimeOffset.Now, p.Date) < 50) 
    .ToList();
```

```sql
SELECT [p].[Id], [p].[Date], [p].[Name]
FROM [Blogs] AS [p]
WHERE DATEDIFF(day, GETDATE(), [p].[Date]) < 50
``` 

<br> 
## Links
Nuget: <a href="https://www.nuget.org/packages/Ralms.EntityFrameworkCore.Extensions/1.0.3">@Nuget-Ralms.EntityFrameworkCore.Extensions</a><br>
Github: <a href="https://github.com/ralmsdeveloper/Ralms.EntityFrameworkCore.Extensions">@Github-Ralms.EntityFrameworkCore.Extensions</a><br>
<br><br>
Pessoal, fico por aqui <strong>#dica!</strong>

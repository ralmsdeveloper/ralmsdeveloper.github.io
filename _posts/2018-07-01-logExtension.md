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
Bom para começarmos nosso pequeno artigo, vamos falar um pouco sobre o "EU TER", é fundamental e que todo desenvolvedor, ou integrador de software tenha 
um controle de tudo ou quase tudo que acontece no banco. é imprescindível que não tenhamos esse controle. Como objetivo maior de nosso artigo é mostrar como visualizar os comandos enviados para o banco, nada mais justo que utilizarmos o EntityFramework Core para isso 😊.
<br><br>
O EF Core fornece já um conjunto de opções para que possamos verificar as saídas SQL, vale a pena ressaltar que para o SQL Server temos o Magnifico SQL Server Profile, monitor de instruções SQL em tempo real, ótimo para saber quais querys por exemplo consumiram mais tempo.
<br><br>
Enfim, iremos apresentar aqui 2 opções de Logs e criaremos uma extensão para projetar o SQL de uma Entidade.
 
</div>
<br>
## Os bits estão disponíveis em:
Nuget: <a href="https://www.nuget.org/packages/Ralms.EntityFrameworkCore.Extensions/1.0.3">@Nuget-Ralms.EntityFrameworkCore.Extensions</a><br>
Github: <a href="https://github.com/ralmsdeveloper/Ralms.EntityFrameworkCore.Extensions">@Github-Ralms.EntityFrameworkCore.Extensions</a><br>

## Vejamos como habilitar & utilizar o WithNoLock:
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
<br>
<strong>Output SQL:</strong>
```sql
SELECT [p].[Id], [p].[Date], [p].[Name]
FROM [Blogs] AS [p]
WHERE DATEDIFF(day, GETDATE(), [p].[Date]) < 50
```   
<br><br>
Pessoal, fico por aqui <strong>#efcore</strong>

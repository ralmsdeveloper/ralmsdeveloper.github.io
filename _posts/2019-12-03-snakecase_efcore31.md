---
title: "Breaking changes - EF Core 3.1"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
  - "Entity Framework Core"
header:
  teaser: /assets/images/efcorecsharp.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcorecsharp.png)

<center><strong>Fala pessoal, tudo bem?! 💚</strong></center>
<hr> 
Veja como fazer convenções de nomenclatura <strong>SnakeCase</strong> de forma fácil para o <strong>Entity Framework Core 3.1</strong><br />
<br>
![01]({{site.url}}{{site.baseurl}}/assets/images/camelsnakecase.jpg)
<div class="notice--warning">
<strong>FYI:</strong><br>
Este artigo é uma versão atualizada de:
<a href="http://ralms.net/dica/snakecase/" target="_BLANK" alt="">
http://ralms.net/dica/snakecase/
</a>
<br>
O objetivo maior deste artigo é mostrar as alterações na API de metadados do Entity Framework Core 3.x.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/tipocase.png) 
 

# Veja esse artigo! 
Quer ver um resumidão sobre <b>Naming Conventions</b>?<br>
acesse esse link:
<a href="http://ralms.net/dica/snakecase/" target="_BLANK" alt="">
http://ralms.net/dica/snakecase/
</a>

 
 
# O que me levou a escrever esse artigo? 
Não quero me prolongar aqui, dado que já escrevi um artigo falando sobre minha real necessidade de utilizar conversões de nomenclaturas, então para não ser redundante acessem o link acima e leiam o primeiro artigo que escrevi. 

# O que mudou, Oops, aliás o que quebrou?
<div style="text-align: justify;">
Se observarmos <a href="https://semver.org/" target="_BLANK" alt="">semver</a> e olhar para o significado de <b>MAJOR</b>, podemos dizer
quer foi bem aplicado aqui, mas não pode existir uma quebra sem um concerto, néh verdade!
<br>
<br>
Os métodos de extensão específicos do provedor sofreram alterações, nas versões anteriores ao <b>EF 3.0</b>, acessavamos diretamente as propriedades, agora os acessos para algumas dessas propriedades são por métodos,
para alguns pode até parecer que ficou mais complicado, mas eu defendo esse tipo de abordagem, em não expor suas propriedades onde as mesmas devem ser acessadas apenas por métodos ou por um construtor, que não é o caso aqui.
<br />
<br>
Então fiz um <b>DE-PARA</b> aqui do artigo anterior e o que mudou.
</div>
<br />
# Até o EF 2.2 (old)
Tinhamos o seguinte comportamento para acessar e alterar os metadados.

```csharp
public static void ToSnakeNames(this ModelBuilder modelBuilder)
{
    foreach (var entity in modelBuilder.Model.GetEntityTypes())
    {
        entity.Relational().TableName = entity.Relational().TableName.ToSnakeCase();

        foreach (var property in entity.GetProperties())
        {
            property.Relational().ColumnName = property
                .Relational()
                .ColumnName
                .ToSnakeCase();
        }

        foreach (var key in entity.GetKeys())
        {
            key.Relational().Name = key.Relational().Name.ToSnakeCase(); 
        }

        foreach (var key in entity.GetForeignKeys())
        {
            key.Relational().Name = key.Relational().Name.ToSnakeCase();
        }

        foreach (var index in entity.GetIndexes())
        {
            index.Relational().Name = index.Relational().Name.ToSnakeCase();
        }
    }
}

private static string ToSnakeCase(this string name)
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
```
# Usando o EF 3.X (new)
Agora o comportamento para acessar os metadados foram alterados.
```csharp
public static void ToSnakeNames(this ModelBuilder modelBuilder)
{
    foreach (var entity in modelBuilder.Model.GetEntityTypes())
    {
        var tableName = entity.GetTableName().ToSnakeCase();
        entity.SetTableName(tableName);

        foreach (var property in entity.GetProperties())
        {
            var columnName = property.GetColumnName().ToSnakeCase();
            property.SetColumnName(columnName);
        }

        foreach (var key in entity.GetKeys())
        {
            var keyName = key.GetName().ToSnakeCase();
            key.SetName(keyName);
        }

        foreach (var key in entity.GetForeignKeys())
        {
            var foreignKeyName = key.GetConstraintName().ToSnakeCase();
            key.SetConstraintName(foreignKeyName);
        }

        foreach (var index in entity.GetIndexes())
        {
            var indexName = index.GetName().ToSnakeCase();
            index.SetName(indexName);
        }
    }
}

private static string ToSnakeCase(this string name)
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
```

<div class="notice--success">
<strong>
 Observe que não acessamos mais as propriedades diretamente, pois para alterar os metadados usamos: SetTableName, SetConstraintName, SetName.  😄 
 </strong>
</div> 

## Veja como ficou nosso SampleContext

```csharp
public sealed class SampleContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql(
                "Host=127.0.0.1;Username=postgres;Password=XXX;Database=TestSnake", 
                _ => _.EnableRetryOnFailure());
        }
    }

    protected override void OnModelCreating(ModelBuilder modelo)
    {
        modelo.Entity<TestSnakeCase>();

        // Aqui está nossa mágica!
        modelo.ToSnakeNames();
        //..
    }
}
```

## Nossa saída SQL
```sql
CREATE TABLE test_snake_case (
    id serial NOT NULL,
    codigo_ibge integer NOT NULL,
    nome_completo text NULL,
    ano_nascimento integer NOT NULL,
    data_cadastro timestamp without time zone NOT NULL,
    CONSTRAINT pk_test_snake_case PRIMARY KEY (id)
);
```
<br />
# Veja as alterações na API de metadados
<table>
  <thead>
    <tr>
      <th>Antes</th>
      <th>Depois</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>IEntityType.QueryFilter</td>
      <td>GetQueryFilter()</td>
    </tr>
     <tr>
      <td>IEntityType.DefiningQuery</td>
      <td>GetDefiningQuery()</td>
    </tr>
     <tr>
      <td>IProperty.IsShadowProperty</td>
      <td>IsShadowProperty()</td>
    </tr>
     <tr>
      <td>IProperty.BeforeSaveBehavior</td>
      <td>GetBeforeSaveBehavior()</td>
    </tr>
     <tr>
      <td>IProperty.AfterSaveBehavior</td>
      <td>GetAfterSaveBehavior()</td>
    </tr>
     <tr>
      <td>IEntityType.Relational().TableName</td>
      <td>IEntityType.GetTableName()</td>
    </tr>

    <tr>
      <td>IProperty.Relational().ColumnName</td>
      <td>IProperty.GetColumnName()</td>
    </tr>
    <tr>
      <td>IKey.Relational().Name</td>
      <td>IKey.GetName() </td>
    </tr>
    <tr>
      <td>IForeignKey.Relational().Name</td>
      <td>IForeignKey.GetConstraintName()</td>
    </tr>
    <tr>
      <td>IIndex.Relational().Name</td>
      <td>IIndex.GetName()</td>
    </tr>
  </tbody>
</table>

## Performance
1 - Em vez de usar Task<T> agora se usa <a href="https://docs.microsoft.com/pt-br/dotnet/api/system.threading.tasks.valuetask-1?view=netstandard-2.1" target="_BLANK" alt="">ValueTask</a> o que reduz o número de alocações de memória na pilha.
<br>
2 - Você poderia até não saber disso, mas quando acessavamos o método Entry() era disparado um DetectChanges() para todos objetos daquele contexto específico, agora isso não é mais uma verdade :) ualll!


## Código Completo!
```csharp
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.RegularExpressions;

namespace SnakeCase
{
    class Program
    {
        static void Main(string[] args)
        {
            using var db = new SampleContext();
            var script = db.Database.GenerateCreateScript();
            Console.WriteLine(script);
        }
    }

    public sealed class SampleContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(
                    "Host=127.0.0.1;Username=postgres;Password=XXX;Database=TestSnake", 
                    _ => _.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelo)
        {
            modelo.Entity<TestSnakeCase>();

            // Aqui está nossa mágica!
            modelo.ToSnakeNames();
        }
    }

    public static class SnakeCase
    {
        public static void ToSnakeNames(this ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                var tableName = entity.GetTableName().ToSnakeCase();
                entity.SetTableName(tableName);

                foreach (var property in entity.GetProperties())
                {
                    var columnName = property.GetColumnName().ToSnakeCase();
                    property.SetColumnName(columnName);
                }

                foreach (var key in entity.GetKeys())
                {
                    var keyName = key.GetName().ToSnakeCase();
                    key.SetName(keyName);
                }

                foreach (var key in entity.GetForeignKeys())
                {
                    var foreignKeyName = key.GetConstraintName().ToSnakeCase();
                    key.SetConstraintName(foreignKeyName);
                }

                foreach (var index in entity.GetIndexes())
                {
                    var indexName = index.GetName().ToSnakeCase();
                    index.SetName(indexName);
                }
            }
        }

        private static string ToSnakeCase(this string name)
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

    public class TestSnakeCase
    {
        public int Id { get; set; }
        public int CodigoIBGE { get; set; }
        public string NomeCompleto { get; set; } 
        public int AnoNascimento { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}
```


<br>
Os fontes do exemplo usado está aqui:<br>
<a href="https://github.com/ralmsdeveloper/samplesnakecase" target="_BLANK" alt="">
https://github.com/ralmsdeveloper/samplesnakecase
</a>

<div class="notice--success">
<strong>
 Pessoal fico por aqui e um forte abraço! 😄 
 </strong>
</div> 


 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #postgresql #efcore31 #netcore31<br><br>

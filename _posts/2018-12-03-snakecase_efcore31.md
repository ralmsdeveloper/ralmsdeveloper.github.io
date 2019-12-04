---
title: "SnakeCase - EF Core 3.1"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcorecsharp.png)

<center><strong>Fala pessoal, tudo bem?! 💚</strong></center>
<hr> 
Veja como fazer convenções de nomenclatura <strong>SnakeCase</strong> para o <strong>EF Core 3.1;</strong><br />
<br>
![01]({{site.url}}{{site.baseurl}}/assets/images/camelsnakecase.jpg)
<div class="notice--warning">
<strong>FYI:</strong><br>
Nosso <strong>objetivo</strong> aqui é mostrar uma solução para o <strong>EntityFramework Core + PostgreSQL.</strong><br />
Basicamente existem 4 tipos de nomenclaturas que usamos para escrever nossos códigos: <strong>PascalCase, CamelCase, SnakeCase e SpinalCase</strong>, já que iremos abordar um assunto que se trata de um dos casos citados, nada mais justo do que resumir cada um deles.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/tipocase.png) 
 

# Veja esse artigo! 
Quer ver um resumidão sobre <b>Naming Conventions</b>? acesse esse link:
<a href="http://ralms.net/dica/snakecase/" target="_BLANK" alt="">
http://ralms.net/dica/snakecase/
</a>

 
 
# O que me levou a escrever esse artigo? 
<div style="text-align: justify;">
Não quero me prolongar aqui, dado que escrevi um artigo falando sobre minha real necessidade de 
utilizar conversões de nomeclaturas, então para não ser redundante acessem o link acima e leiam o primeiro artigo que escrevi. 
# O que mudou, Oops, aliás o que quebrou?
Se observarmos <a href="https://semver.org/" target="_BLANK" alt="">semver</a> e olhar para o significado de <b>MAJOR</b>, podemos dizer
quer foi bem aplicado aqui, mas não pode existir uma quebra sem um concerto, néh verdade!
<br>
<br>
Os métodos de extensão específicos do provedor sofreram alterações, o que eram propriedades agora são métodos.
<br />
<br>
Então fiz um <b>DE-PARA</b> aqui do artigo anterior e o que mudou.
</div>
<br />
# Até o EF 2.2 (old)
```csharp
public static class LinqSnakeCase
{ 
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
                TimeSpan.FromSeconds(1)).ToLower(); 
    }
}
```
# Usando o EF 3.X (new)
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
            TimeSpan.FromSeconds(1)).ToLower();
}
```


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
                    TimeSpan.FromSeconds(1)).ToLower();
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

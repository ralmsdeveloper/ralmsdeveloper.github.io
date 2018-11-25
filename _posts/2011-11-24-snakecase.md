---
title: "EF Core - SnakeCase"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcorecsharp.png)

<center><strong>Fala pessoal, tudo bem?! 💚</strong></center>
<hr> 
Veja como fazer convenções de nomenclatura <strong>SnakeCase</strong> para o <strong>EntityFramework Core!</strong><br />
<br>
![01]({{site.url}}{{site.baseurl}}/assets/images/camelsnakecase.jpg)
<div class="notice--warning">
<strong>FYI:</strong><br>
Nosso <strong>objetivo</strong> aqui é mostrar uma solução para o <strong>EntityFramework Core + PostgreSQL.</strong><br />
Basicamente existem 4 tipos de nomenclaturas que usamos para escrever nossos códigos: <strong>PascalCase, CamelCase, SnakeCase e SpinalCase</strong>, já que iremos abordar um assunto que se trata de um dos casos citados, nada mais justo do que resumir cada um deles.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/tipocase.png) 
 
# ResumidÃO! 

## PascalCase 
<div style="text-align: justify;">
Usando Pascal Case em nosso código significa que a primeira letra de cada palavra para o identificador deverá ser maiúscula.<br />
<strong style="color: green">Exemplo:</strong> 
</div>
```csharp
BlogRafael = "www.ralms.net";
``` 
## CamelCase 
<div style="text-align: justify;">
É o mesmo que o caso do Pascal Case, porém a primeira letra da primeira palavra é minúscula.<br />
<strong  style="color: green">Exemplo:</strong> 
</div>
```csharp
blogRafael = "www.ralms.net";
```  
## SnakeCase 
<div style="text-align: justify;">
Bom esse termo é bem legal e foi estabelecido por <strong>Jack Dahlgren</strong>, em 2002 quando trabalhava na Intel,
esse caso em especial, não tem uma definição especifica quando se trata em deixar as letras do identificador <strong>maiúsculo</strong> ou <strong>minúsculo</strong>, basicamente a regra pra ele é colocar um "_" entre as palavras do identificador.<br />
<strong style="color: green">Exemplo:</strong>
</div> 
```csharp
blog_rafael = "www.ralms.net";
Blog_Rafael = "www.ralms.net";
```

## SpinalCase 
<div style="text-align: justify;">
Mesma regra do <strong>SnakeCase</strong>, única diferença é em vez de usar "_", passaremos a utilizar "-" como separador de palavras.<br />
<strong style="color: green">Exemplo:</strong>
</div> 
```csharp
blog-rafael = "www.ralms.net";
Blog-Rafael = "www.ralms.net";
```
 
# Vamos codar?! 
<strong>O que me levou a escrever esse artigo?</strong>
<div style="text-align: justify;">
Foi a necessidade que eu tive e a improdutividade de ficar digitando aspas em torno dos campos e tabelas em minhas consultas <strong>PostgreSQL</strong>, isso mesmo
sempre escrevi toda estrutura do meu banco com um <strong>DDL</strong> bem esquematizado, mas eu quero usar todo recurso que o <strong>EntityFramwork Core</strong> me proporciona, o EFCore por Design
cria os o nomes de tabelas e campos por reflection, isso significa que se tiver uma propriedade <strong>PascalCase</strong>, da mesma forma será atribuido o nome a este,
existe a possibilidade de usarmos propriedades de sombras(ou Fluent API), mas esse é o trabalho que eu não gostaria de fazer e nem me procupar. <br>
<br>
E foi por isso que escrevi essa pequena extensão para nosso <strong>ModelBuilder</strong>, tudo isso por que o <strong>SQL Server</strong> não importa maiúsculas e minúsculas para nomes de colunas e tabelas, coisa muito diferente do <strong>PostgreSQL</strong> que faz distinção entre maiúsculas e minúsculas,
mas aqui está a solução para isso, e <strong>VIVA REGEX</strong>!
</div>
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
 
## Veja como ficou nosso SampleContext
```csharp
using Microsoft.EntityFrameworkCore;
using System;

namespace SnakeCase
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new SampleContext())
            {
                // Nossa saída SQL
                var script = db.Database.GenerateCreateScript();
            }  
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
<div class="notice--success">
<strong>
 Pessoal fico por aqui e um forte abraço! 😄 
 </strong>
</div> 


 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #postgresql #linqsolucoes<br><br>

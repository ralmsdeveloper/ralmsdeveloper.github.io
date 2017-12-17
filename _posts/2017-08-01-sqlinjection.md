---
title: "SQL Injection EntityFrameworkCore"
comments: false
excerpt_separator: "Ler mais"
categories:
  - CSharp
tags:
  - CSharp
  - EntityFrameworkCore
---

Olá pessoal!

Isso não é um ARTIGO, é uma dica.

Hoje quero falar sobre um assunto bastante pertinente a segurança que é o SQL Injection.

Muitos sites e sistemas sofrem ataques diariamente em seus banco de dados por falha de segurança.

Estarei mostrando um exemplo prático e o mais utilizado por hackers que é a injeção de SQL via URL em sites vulneráveis.

Em meu exemplo estou usando o EntityFramework Core 2.0 (The best!)

Nesse primeiro exemplo o método de consulta está “INCORRETO” vulnerável a ataques/falhas!

Saiba a forma correta de usar o FromSql no EFCore!

```csharp
namespace SQLInjectionEFCore
{
    class Program
    {
        static void Main(string[] args)
        {
            var cx = new Context();
            cx.Database.EnsureCreated();
            Console.WriteLine("Inserindo registros!");
            cx.Author.Add(new Author
            {
                 FirstName = "Rafael",
                 LastName = "Almeida",
                 Date = DateTime.Now
            });
            cx.SaveChanges();

            //Consulta Normal
            var criterioConsulta = "Rafael";
            var consultaNormal = cx.Author
				.AsNoTracking()
                .FromSql("select * from author where firstname='" + criterioConsulta + "'").ToList();

            if (consultaNormal.Any())
                Console.WriteLine($"Nome: {consultaNormal.First().FirstName}");

            //Consultar com SQL Injection
            //Aqui consigo apagar todos dados de minha tabela
            var criterioConsultaSqlInjection = "Rafael';delete from author;--";
            var consultaNormalSqlInjection = cx.Author
				.AsNoTracking()
                .FromSql("select * from author " +
                         //Método incorreto! vulnerável
                         "where firstname='" + criterioConsultaSqlInjection + "'").ToList();

            if (consultaNormalSqlInjection.Any())
                Console.WriteLine($"Nome: {consultaNormalSqlInjection.First().FirstName}");

            Console.ReadKey();
        }
    }
}
```

Observe que nesse segundo exemplo eu passo o critério de consulta por parâmetro, dessa forma eu asseguro a integridade de minhas informações e da consulta.

```csharp
namespace SQLInjectionEFCore
{
    class Program
    {
        static void Main(string[] args)
        {
            var cx = new Context();
            cx.Database.EnsureCreated();
            Console.WriteLine("Inserindo registros!");
            cx.Author.Add(new Author
            {
                 FirstName = "Rafael",
                 LastName = "Almeida",
                 Date = DateTime.Now
            });
            cx.SaveChanges();

            //Consulta Normal
            var criterioConsulta = "Rafael";
            var consultaNormal = cx.Author
				.AsNoTracking()
                .FromSql("select * from author where firstname='" + criterioConsulta + "'").ToList();

            if (consultaNormal.Any())
                Console.WriteLine($"Nome: {consultaNormal.First().FirstName}");

            //Consultar com SQL Injection
            var criterioConsultaSqlInjection = "Rafael';delete from author;--";
            var consultaNormalSqlInjection = cx.Author
				.AsNoTracking()
                .FromSql("select * from author " +
                         //Método Correto! (Faz o tratamento do SQL Injection)
                         "where firstname=@p0", criterioConsultaSqlInjection).ToList();

            if (consultaNormalSqlInjection.Any())
                Console.WriteLine($"Nome: {consultaNormalSqlInjection.First().FirstName}");

            Console.ReadKey();
        }
    }
}
```
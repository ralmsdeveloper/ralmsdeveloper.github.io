---
title: "Popular Dados (EF Core 2.1)"
comments: false
excerpt_separator: "Ler mais"
categories:
  - CSharp
tags:
  - CSharp
  - EntityFrameworkCore
---

![01]({{ site.url }}{{ site.baseurl }}/assets/images/efcore.png)

Fala pessoal tudo bem?!
Estou fazendo mais esse pequeno post para mostrar mais um novo recurso que será disponibilizado na versão 2.1 do EntityframeworkCore, que é o rescurso SeedData, para que serve esse novo recurso?

Imaginemos que sua aplicação necessite que algumas tabelas sejam populadas automaticamente pelo sistema. Agora poderemos então fazer esse processo de forma simples e com controle de versionamento(uauuu) para futuras alterações.

Vamos usar a seguinte classe para nosso exemplo:

```csharp
public class Pessoa
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public int Idade { get; set; } 
}
```

Aqui está meu contexto de exemplo:

```csharp
using Microsoft.EntityFrameworkCore;
namespace SeedData
{
    public class SeedContext : DbContext
    {
        public DbSet<Pessoa> Pessoas { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost,1433;Database=EFCore_SeedData;Integrated Security=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelo)
        {
            modelo.Entity<Pessoa>().SeedData(
                new Pessoa { Id = 1, Nome = "Rafael", Idade = 28},
                new Pessoa { Id = 2, Nome = "Jose", Idade = 29},
                new Pessoa { Id = 3, Nome = "Maria", Idade = 30},
                new Pessoa { Id = 4, Nome = "Pedro", Idade = 31},
                new Pessoa { Id = 5, Nome = "Joao", Idade = 32});
            base.OnModelCreating(modelo); 
        }
    }
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; } 
    }
}
```
O segredo está dentro do **OnModelCreating**
A forma de usar o SeedData é a seguinte:

```csharp
 modelo.Entity<Pessoa>().SeedData(
    new Pessoa { Id = 1, Nome = "Rafael", Idade = 28},
    new Pessoa { Id = 2, Nome = "Jose", Idade = 29},
    new Pessoa { Id = 3, Nome = "Maria", Idade = 30},
    new Pessoa { Id = 4, Nome = "Pedro", Idade = 31},
    new Pessoa { Id = 5, Nome = "Joao", Idade = 32});
```

Gere a migração com o comando:

```
PM> Add-Migration MigracaoTeste
To undo this action, use Remove-Migration. <- Isso exibirá caso ocorra tudo bem!
``` 
Feito isso teremos a seguinte classe:

```csharp
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
namespace SeedData.Migrations
{
    public partial class MigracaoTeste : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pessoas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(nullable: true),
                    Idade = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoas", x => x.Id);
                });
            migrationBuilder.InsertData(
                table: "Pessoas",
                columns: new[] { "Id", "Idade", "Nome" },
                values: new object[] { 1, 28, "Rafael" });
            migrationBuilder.InsertData(
                table: "Pessoas",
                columns: new[] { "Id", "Idade", "Nome" },
                values: new object[] { 2, 29, "Jose" });
            migrationBuilder.InsertData(
                table: "Pessoas",
                columns: new[] { "Id", "Idade", "Nome" },
                values: new object[] { 3, 30, "Maria" });
            migrationBuilder.InsertData(
                table: "Pessoas",
                columns: new[] { "Id", "Idade", "Nome" },
                values: new object[] { 4, 31, "Pedro" });
            migrationBuilder.InsertData(
                table: "Pessoas",
                columns: new[] { "Id", "Idade", "Nome" },
                values: new object[] { 5, 32, "Joao" });
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pessoas");
        }
    }
}
```

Observe que no exemplo acima que postei ele cria os objetos para persistir no banco de dados, o mais legal é que teremos como controlar isso pelo OnModelCreating, caso remova algum registro no OnModelCreating e gerar uma nova migração o sistema irá ajustar as informações do banco de dados pelas alterações que está em seu arquivo de migração sendo uma nova inserção, atualização ou exclusão.

O SQL de Saída teremos algo assim, para os que quiserem analisar.

```sql
IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO
CREATE TABLE [Pessoas] (
    [Id] int NOT NULL IDENTITY,
    [Nome] nvarchar(max) NULL,
    [Idade] int NOT NULL,
    CONSTRAINT [PK_Pessoas] PRIMARY KEY ([Id])
);
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] ON;
INSERT INTO [Pessoas] ([Id], [Idade], [Nome])
VALUES (1, 28, N'Rafael');
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] OFF;
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] ON;
INSERT INTO [Pessoas] ([Id], [Idade], [Nome])
VALUES (2, 29, N'Jose');
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] OFF;
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] ON;
INSERT INTO [Pessoas] ([Id], [Idade], [Nome])
VALUES (3, 30, N'Maria');
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] OFF;
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] ON;
INSERT INTO [Pessoas] ([Id], [Idade], [Nome])
VALUES (4, 31, N'Pedro');
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] OFF;
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] ON;
INSERT INTO [Pessoas] ([Id], [Idade], [Nome])
VALUES (5, 32, N'Joao');
GO
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [object_id] = OBJECT_ID(N'Pessoas'))
    SET IDENTITY_INSERT [Pessoas] OFF;
GO
INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20171030222316_SampleSeed', N'2.1.0-preview1');
GO
```
Não me aprofundei mais por que estou preparando um conteúdo mais detalhado sobre o assunto, Aguardem…

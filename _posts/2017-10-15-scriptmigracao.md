---
title: "Script Migração – EF Core"
comments: false
excerpt_separator: "Ler mais"
categories:
  - CSharp
tags:
  - CSharp
  - EntityFrameworkCore
---

![01]({{ site.url }}{{ site.baseurl }}/assets/images/efcore.png)

Fala pessoal esse final de semana resolvi fazer esse pequeno post, pois bem, aqui quero mostrar como gerar um script das migrações que fazemos no fabuloso Entity Framework Core, Ué? se ele já gera o controle de versionamento, por que eu gravar?!
Bom quando o EF Core gera as migrações as mesmas ficam embutidas na aplicação, então para os que quiserem ter mais esse controle é bem simples!

Vamos imaginar o seguinte cenário.

Temos essas duas classes que se transformaram em tabelas:
```csharp
public class Pessoa
{
    [Key]
    public long Id { get; set; }
    public string Nome { get; set; }
    public string SobreNome { get; set; }
    public DateTime DataNascimento { get; set; }
    public virtual ICollection<Endereco> Enderecos { get; set; }
}
public class Endereco
{
    [Key]
    public long Id { get; set; }
    public string Cidade { get; set; }
    public string Estado { get; set; }
    public long PessoaId { get; set; }
    public virtual Pessoa Pessoa { get; set; }
} 
```

Abra o Console de pacotes e gere sua migração:
```Add-Migration -name MigracaoInicial```

Vale lembrar que precisamos do pacote: **Microsoft.EntityFrameworkCore.Tools**
Feito isso em meu exemplo eu terei essa migração:

```csharp
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
namespace ScriptMigracao.Migrations
{
    public partial class MigracaoInicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pessoas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SobreNome = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoas", x => x.Id);
                });
            migrationBuilder.CreateTable(
                name: "Enderecos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Cidade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PessoaId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enderecos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Enderecos_Pessoas_PessoaId",
                        column: x => x.PessoaId,
                        principalTable: "Pessoas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
            migrationBuilder.CreateIndex(
                name: "IX_Enderecos_PessoaId",
                table: "Enderecos",
                column: "PessoaId");
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Enderecos");
            migrationBuilder.DropTable(
                name: "Pessoas");
        }
    }
}
```

Agora vem a mágica… como transformar isso em SQL?!
Simples…
A interface IMigrator faz esse milagre pra gente!

```csharp
using (var db = new TestContext())
{
    var scriptMigracao = db.GetService<IMigrator>().GenerateScript();
    // Agora é só gravar o retorno em algum arquivo ou em um banco
    // use a imaginação ou sua necessidade.
}
```

Meu arquivo gerado foi esse como base nas informações acima:

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
    [Id] bigint NOT NULL IDENTITY,
    [DataNascimento] datetime2 NOT NULL,
    [Nome] nvarchar(max) NULL,
    [SobreNome] nvarchar(max) NULL,
    CONSTRAINT [PK_Pessoas] PRIMARY KEY ([Id])
);
GO
CREATE TABLE [Enderecos] (
    [Id] bigint NOT NULL IDENTITY,
    [Cidade] nvarchar(max) NULL,
    [Estado] nvarchar(max) NULL,
    [PessoaId] bigint NOT NULL,
    CONSTRAINT [PK_Enderecos] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Enderecos_Pessoas_PessoaId] FOREIGN KEY ([PessoaId]) REFERENCES [Pessoas] ([Id]) ON DELETE CASCADE
);
GO
CREATE INDEX [IX_Enderecos_PessoaId] ON [Enderecos] ([PessoaId]);
GO
INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20171015213303_MigracaoInicial', N'2.0.0-rtm-26452');
GO
``` 
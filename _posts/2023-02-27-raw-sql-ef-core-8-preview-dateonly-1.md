---
title: "EF Core 8 Preview 1 - DateOnly"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - dotnet
  - Entity Framework Core
  - Entity Framework Core 8
header:
  teaser: /assets/images/2023/ef_core_8_preview_1_dateonly.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/2023/ef_core_8_preview_1_dateonly.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Esse é meu lugar especial onde adoro compartilhar novidades e pensamentos sobre .NET, Performance e Acesso a Dados com a comunidade.
</div> 

## Introdução
<div style="text-align: justify;">
Quando a Microsoft lançou o Entity Framework Core 8 além de tantas outras funcionalidades, ganhamos também mais um recurso interessante, o qual não precisamos ficar criando conversores, falo isso porque o EF Core fornece essa possibilidade.
<br><br>
Bom, a novidade é o DateOnly e TimeOnly, que são tipos que foram lançados lá na versão do .NET 6 e que inclusive vários outro provedores de acesso a dados já tinham implementado, como por exemplo o de acesso ao PostgreSQL, e aí fica a pergunta porque o EF Core levou mais tempo para implementar esse recurso, bom a resposta é simples, como o EF Core para SQL Server tem uma forte dependência com o driver de acesso ao SQL Server, primeiramente seria necessário aguardar que o time de desenvolvimento do driver adicionasse esses novos tipos no driver.
<br><br>
Então agora é possível utilizar esses novos tipos com o EF Core 8, veja um exemplo simples.
</div>

```csharp
public class Alarme
{
    public int Id { get; set; }
    public string Descricao { get; set; };
    public DateOnly Data { get; set; }
    public TimeOnly Hora { get; set; }
}
``` 
<div style="text-align: justify;">
Ao fazer o mapeamento desse entidade, quando o EF Core gerar o script para criar a tabela no banco de dados basicamente teremos o seguinte script:
</div>

```sql
CREATE TABLE [Alarmes] (
    [Id] int NOT NULL IDENTITY,
    [Descricao] nvarchar(max) NOT NULL,
    [Data] date NOT NULL,
    [Hora] time  NOT NULL,
    CONSTRAINT [PK_Alarmes] PRIMARY KEY ([Id]));
``` 
```csharp
DateOnly data = DateOnly.Parse("2023-01-01");
TimeOnly hora = TimeOnly.Parse("01:01:01");

var alarme = context
    .Alarmes
    .FirstOrDefault(p=> p.Data == data && p.Hora == hora); 

``` 
<div style="text-align: justify;">
Pra quem utiliza o SQL Server e armazena dados do tipo date ou time, essa é uma funcionalidade bem interessante!
</div>
## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

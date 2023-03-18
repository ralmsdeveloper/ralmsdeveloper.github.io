---
title: "Melhorar legibilidade do código (AND & OR)"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - dotnet
  - Dicas
header:
  teaser: /assets/images/2023/ef_core_8_preview_1_raw.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/2022/legibilidade_and_or.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Esse é meu lugar especial para compartilhar novidades e pensamentos sobre tecnologia com a comunidade.
</div> 

## Introdução
<div style="text-align: justify;">
A Microsoft tem feito muito pela comunidade de desenvolvedores com projetos open source, o qual sinto orgulho de participar contribuindo em alguns deles como o Entity Framework Core, ele tem se tornado um projeto muito interessante por meio da dedicação dos engenheiros da Microsoft e por inúmeras contribuições da comunidade de forma global.
<br><br>
Nesse último preview lançado do produto podemos agora escrever consultas sem necessidade de criar um modelo de dados e configurar no bom e velho DbContext. Sim, é possível agora escrever consultas da mesma “forma” como fazemos utilizando o Dapper.
<br><br>
Para comunidade isso é muito importante, dado que em muitos casos queremos utilizar todos recursos do EF Core, mas escrevendo consultas independentes, vamos ver como isso ficou.
<br>
</div>

<div style="text-align: justify;">
Para executar comandos no banco de dados como por exemplo atualizar um registro ou criar tabela já tinhamos essa funcionalidade que era o <b>ExecuteSql</b>:
</div>
```csharp
var context = new MeuContexto();
context.Database.ExecuteSql(@$"CREATE TABLE ....");
context.Database.ExecuteSql(@$"UPDATE TABLE ....");
``` 
<div style="text-align: justify;">
Até aqui tudo bem certo?! Vamos agora para a parte da consulta, pra ver como podemos fazer consultas sem necessidade de fazer um mapeamento no EF Core, basicamente iremos utilizar o novo método chamado <b>SqlQuery</b>, vamos para o exemplo:
</div>

```csharp
public class Artigo
{
    public int Id { get; set; }
    public string Titulo { get; set; }
}

var artigos =
    await context.Database
        .SqlQuery<Artigo>($"SELECT TOP 12 * FROM Artigos ORDER BY id DESC")
        .ToListAsync();
``` 
<div style="text-align: justify;">
 Bom de forma bem simples é isso, basta você ter uma classe com os campos que corresponde a seus campos no banco de dados e executar sua consulta,
 o EF Core irá fazer o discovery das propriedades e mapear para você.
</div>
## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

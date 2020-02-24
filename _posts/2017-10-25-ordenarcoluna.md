---
title: "Ordem das colunas no EF Core 2.1"
comments: false
excerpt_separator: "Ler mais"
categories:
  - Provider
tags:
  - "C#"
  - NetStandard
  - EntityFrameworkCore
---

![01]({{ site.url }}{{ site.baseurl }}/assets/images/efcore.png)

Hoje tenho uma ótima noticia para você usuário do EFCore. 
Acabei de compilar os fontes do EFCore e já se encontra com o que muitos desejavam.
Vale lembrar que a versão ainda não foi lançada estou apenas antecipando o que teremos na nova versão.

É sabido que todos que usam o Entity Framework Core, tínhamos percebido que quando ele criava nossas tabelas, os campos não ficavam na mesma ordem que estavam em nossas classes, as vezes gerando uma grande confusão ao visualizar a estrutura da tabela por exemplo no Microsoft SQL Server Management, era uma verdadeira bagunça.

Mais como sabemos o time do EFCore está trabalhando o tempo todo em torná-lo melhor. Pois bem ontem dia *24/10/2017* um dos membros o **@bricelam** (Good Job!) tornou isso mais fácil, implementando a ordenação por **Reflection** isso mesmo, bem diferente da versão EF6 que tinhamos que criar uma anotação com o Column(Order=X).

A criação do campos seguirá a ordenação que está em sua classe.

Vamos ver um exemplo para seguinte classe:
```csharp
public class Author
{
    [Key]
    public long AuthorId { get; set; }
    [StringLength(100)]
    public string FirstName { get; set; }
    [StringLength(100)]
    public string LastName { get; set; }
    public DateTime Date { get; set; }
    public Guid Identification { get; set; }
    public ICollection<Book> Books { get; set; } = new List<Book>();
}
```

com a classe acima até a versão atual Entity Framework Core 2.0, nós temos a ordenação indesejável que é:

![01]({{ site.url }}{{ site.baseurl }}/assets/images/order01.png)

Mais com a versão do **Entity Framework Core 2.1** aí teremos o que desejamos.

![01]({{ site.url }}{{ site.baseurl }}/assets/images/order02.png)

Teremos vários recursos novos nessa nova versão, um deles é o EF Core para Oracle(Por enquanto apenas compativel com .Net Framework). 

Que inclusive faço minhas humildes colaborações com o projeto, o pessoal do time do EFCore é show de bola, estão abertos a sugestões que venham contribuir com o crescimento do projeto.

Por hoje é só, té mais, em breve mais novidades sobre a nova versão.
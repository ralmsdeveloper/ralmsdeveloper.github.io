---
title: "Workaround para System.Text.Json"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - Workaround
  - Json
  - AspNetCore
---

![01]({{site.url}}{{site.baseurl}}/assets/images/SystemTextJson.png)

<center><strong>Fala pessoal, tudo bem?!</strong></center>
<hr /> 
<div class="notice--warning">
Nesse arquito iremos descobrir como resolver um pequeno GAP que temos ao usar o System.Text.Json como nosso serializador.
</div> 

## Introdução
Acredito que todos sabem que System.Text.Json é uma nova opção para serializar objetos, escrita pela Microsoft e pelo próprio criador do Newtonsoft.Json, seu objetivo principal é performance e alocar menos dados na memória, pois bem, maravilha isso!

## GAP
Como nem tudo é mil maravilhas, ontem(20/03/2020) juntamente com meus amigos de trabalho estavamos tentando deserializar um JSON para uma classe que tinha construtores parametrizados e as propriedades eram <b>readonly</b> (Immutable), então fui analisar melhor o que estava acontecendo, e o que descobri(ou não me lembrava) não foi nada agradável, 
simplesmente não temos suporte, e o backlog de pendências é enorme! Veja <a target="_BLANK" href="https://docs.microsoft.com/pt-br/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to#table-of-differences-between-newtonsoftjson-and-systemtextjson" alt="">aqui</a>

## Cenário
Vamos montar um cenário para ver como podemos resolver

## Classe
Vamos ter como base a seguinte <b>class</b>
```csharp
public class Pessoa
{
    public string Nome { get; }
    public DateTime DataNascimento { get;} 

    public Pessoa(string nome, DateTime dataNascimento)
    {
        Nome = nome;
        DataNascimento = dataNascimento;
    }
}
```

## Serializar
Vamos tentar serializar 
```csharp
public class Pessoa
{
    public string Nome { get; }
    public DateTime DataNascimento { get;} 

    public Pessoa(string nome, DateTime dataNascimento)
    {
        Nome = nome;
        DataNascimento = dataNascimento;
    }
}
```
Showww, serialização perfeita!
![01]({{site.url}}{{site.baseurl}}/assets/images/serializacaook.PNG)

## Deserializar
Vamos tentar deserializar 
![01]({{site.url}}{{site.baseurl}}/assets/images/problemajsondeserialize.PNG)
 

## Twitter
<div class="notice--info">
 Fico por aqui e um forte abraço! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 Dúvidas, quer bater um papo? Entre em contato comigo: ralms@ralms.net
</div> 

<br>

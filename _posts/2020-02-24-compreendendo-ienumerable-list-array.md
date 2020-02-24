---
title: "IList<T>, ICollection<T> e IEnumerable<T>"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - Collections
  - Linq
  - NETCore
---

![01]({{site.url}}{{site.baseurl}}/assets/images/IEnumarableList.png)

<center><strong>Fala pessoal, tudo bem?!</strong></center>
<hr /> 
<div class="notice--warning">
Esse artigo é uma pequena introdução a coleções no .NET, em uma segunda oportunidade estarei escrevendo a versão 2 deste artigo.
</div> 

## Introdução
 
Gostaria de falar um pouco com você sobre algumas implementações genéricas como `IList<T>`, `ICollection<T>` e `IEnumerable<T>` e algumas coisas sobre coleções, 
é um assunto interessante de falar, e toda vez que falo sobre coleções, eu me sinto feliz, pela possibilidade de utilizar Linq, que para mim foi a implmentação mais importante no ecosistema .NET, dado que é um assunto que eu particularmente gosto.
No .NET basicamente podemso converter qualquer coisa pra uma <b>coleção</b> de dados, mas existe algumas coisas que você precisa saber, quando usar por exemplo um:
`IList<T>`, `ICollection<T>` ou `IEnumerable<T>`, então deixa eu te explicar um pouco sobre cada um deles.
 
## Anatomia das coleções
Esse é um exemplo simples, observe que estarei me referindo as interfaces genéricas `IList<T>`, `ICollection<T>` e `IEnumerable<T>` já que temos outras interfaces `IList`, `ICollection` e `IEnumerable` não genéricas para implementar comportamentos diferentes.

![01]({{site.url}}{{site.baseurl}}/assets/images/anatomiacolecao.png)

## Interface IEnumerable<T>
```csharp
public interface IEnumerable<T> : IEnumerable
{
    IEnumerator<T> GetEnumerator();
}
```
<div class="notice--warning">
<strong>
 Quando usar?<br />
</strong>
Quando você precisar apenas ler objetos de uma coleção.
</div> 

## Interface ICollection<T>
```csharp
public interface ICollection<T> : IEnumerable<T>, IEnumerable
{
    int Count { get; }
    bool IsReadOnly { get; }
    void Add(T item);
    void Clear();
    bool Contains(T item);
    void CopyTo(T[] array, int arrayIndex);
    bool Remove(T item);
}
```
<div class="notice--warning">
<strong>
 Quando usar?<br />
</strong>
Quando você precisar ler objetos de uma coleção, saber o tamanho de sua coleção e até mesmo modificar determinados objetos em sua coleção.
</div> 

## Interface IList<T>
```csharp
public interface IList<T> : ICollection<T>, IEnumerable<T>, IEnumerable
{
    T this[int index] { get; set; }
    int IndexOf(T item);
    void Insert(int index, T item);
    void RemoveAt(int index);
}
```

<div class="notice--warning">
<strong>
 Quando usar?<br />
</strong>
Quando precisar de tudo que existe no IColletion<`T`> e tiver a necessidade de acessar diratamento um objeto de sua coleção por meio de um índice.<br />
</div> 

```csharp
var list = new List<string>{"A","B","C"};
var item = list[2];
``` 
O classe concreta `List<T>` sempre terá todos objetos em memória, dado esse cenário já podemos observar que seu comportamento é diferente do `IEnumerable<T>` que não tem seus objetos em memória, ixi ficou confuso, calma vamos entender essa confusão.
## IEnumerable<'T'> vs List<'T'>  
Vamos pensar em um cenário onde temos um lista de tags e precisaremos fazer uma consulta.
```csharp
var tagsList = new List<string>
{
  "CORE",
  "AZURE",
  "EFCORE",
  "SCYLLADB"
  "ASPNETCORE",
};
``` 
Agora vamos efetuar uma consulta:
```csharp
var tags = tagsList.Where(t => t.Length >= 8);
tagsList[0] = "SQLSERVER";

foreach (var tag in tags)
{
    Console.WriteLine(tag);
}
``` 
Vamos analisar aqui, fizemos uma consulta que esperariamos o seguinte resultado:
 - SCYLLADB
 - ASPNETCORE

que são maior ou igual a 8 caracteres.

OK? ...errado!<br>
Observe que logo após fazer meu `where`(minha consulta) eu modifiquei o item `0` de
minha lista de tags.<br />
O que quero dizer aqui é, quando você executa uma consulta que seu retorno é um `IEnumerable<T>`, na verdade ele não está trazendo os objetos para memória 
como falei um pouco acima, essa consulta é retardada, essa tarefa é adiada para o compilador, e você só vai ter acesso ao objeto no momento de sua iteiração.
Isso significa que a resposta para nossa pergunta acima seria:
 - SQLSERVER
 - SCYLLADB
 - ASPNETCORE

o compilador preservou o estado de minha consulta, executando-a de fato, quando fiz a iteiração com a consulta.
<br><br>
Agora vamos fazer a mesma consulta com `ToList()`:
```csharp
var tags = tagsList.Where(t => t.Length >= 8).ToList();
tagsList[0] = "SQLSERVER";

foreach (var tag in tags)
{
    Console.WriteLine(tag);
}
``` 
Agora sim o retorno será exatamente:
 - SCYLLADB
 - ASPNETCORE

Isso porque quando executo o `ToList()` ele imediatamente carrega os objetos para memória 
e deixa disponível para o consumidor, então qualquer alteração em minha lista após executar o metódo `ToList()` não terá mais nenhum efeito sobre a mesma.
<div class="notice--success">
<strong>
 Fico por aqui e um forte abraço! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a>
</strong>
</div> 


 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #ienumrable #netcore #ilist #icollection<br><br>

---
title: "Novidade C# 7.3, o que vem por ai?"
comments: false
excerpt_separator: "Ler mais"
categories:
  - CSharp
tags:
  - CSharp
---

Apesar da minha vontade ser compartilhar mais conteúdos relacionados às tecnologias EntityFramework Core e AspNet Core, sendo programador e amante do C#, estarei algumas vezes falando algo sobre o mesmo.
Pois bem, esses dias estava fazendo algo e por curiosidade fui consultar nos fontes do Roslyn como aquilo tinha sido projetado. Foi então que me deparei com algo inusitado, olhando a documentação das novas features, encontrei o “Range”, algo bem semelhante ao que existe em Pascal.

Isso mesmo, está sendo implementado essa nova funcionalidade no C#. O que me chama mais atenção, é que a Microsoft como a mantenedora do projeto, está simplesmente ouvindo, aceitando sugestões e evoluindo nesse mundo open source.

Muitas mentes ao redor do mundo estão voltadas para ver esse projeto crescer, e quem ganha com isso somos nós, que utilizamos essa tecnologia. Sou programador C# há anos e venho acompanhando o crescimento benéfico dele. É muito bom ver isso.

Sem muitas delongas, vamos ao foco!

Em Pascal temos a estrutura Range em um Array representada assim:
  

```pascal
type meuArray = array[0..100] of integer;
```

A partir da nova feature do C# 7.3, passaremos a ter essa nova funcionalidade, que estará disponível no namespace “System.Range”, e teremos algo assim em comparação ao Pascal:

```csharp
var meuArray = array[0..100];
```

Os intervalos poderão ser para nós termos uma resolução mais simplificada de uma validação. Por exemplo, usando um switch-case, poderemos fazer validações utilizando o Range muito mais simplificado que antes, da seguinte forma:

```csharp
switch (r)
{
    case 0..10:
        break;
    case 11..20:
        break;
    case 21..30:
        break;
}
```

Por padrão, a escala do Range faz implementação da interface IEnumerable, de forma que, ao utilizarmos um Range por escala, é a mesma coisa de fazermos algo assim já disponível em Linq:

```csharp
IEnumerable<int> numeros = Enumerable.Range(0,10);
```

Dessa forma poderemos fazer interações com a nova implementação da seguinte forma:

```csharp
foreach (var r in 0..10)
{
    Console.WriteLine(string.Join(",", (0..r).Select(x => r * x)));
}
```

Minha intenção nesse artigo foi apenas mostrar essa pequena e útil implementação, que será de muita utilidade em várias situações.

Desde o lançamento do C# 7, temos várias coisas legais, como:

Tuplas:
[https://docs.microsoft.com/pt-br/dotnet/csharp/whats-new/csharp-7#tuples](https://docs.microsoft.com/pt-br/dotnet/csharp/whats-new/csharp-7#tuples)

Funções Locais:
[https://docs.microsoft.com/pt-br/dotnet/csharp/whats-new/csharp-7#local-functions](https://docs.microsoft.com/pt-br/dotnet/csharp/whats-new/csharp-7#local-functions)

Exceções em Expressão:
[https://docs.microsoft.com/pt-br/dotnet/csharp/whats-new/csharp-7#throw-expressions](https://docs.microsoft.com/pt-br/dotnet/csharp/whats-new/csharp-7#throw-expressions)

Main Async:
[https://docs.microsoft.com/pt-br/dotnet/csharp/whats-new/csharp-7-1](https://docs.microsoft.com/pt-br/dotnet/csharp/whats-new/csharp-7-1)

Este artigo é um post original de [IMasters](https://imasters.com.br/linguagens/c-sharp/novidades-no-c-7-3/?trace=1519021197&source=single) publicado por mim.
Abraços!
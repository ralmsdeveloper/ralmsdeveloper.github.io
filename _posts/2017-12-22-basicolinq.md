---
title: "O básico do LINQ"
comments: false
excerpt_separator: "Ler mais"
categories:
  - LINQ
tags:
  - LINQ
---


## Nesse pequeno post iremos conhecer um pouco de LINQ

- Um pouco de história
- Introdução ao LINQ
- Conhecendo métodos do LINQ
- Expressões

## Um pouco de história

O LINQ (consulta integrada à linguagem), é uma das implementações mais extraordinária que poderíamos ter no .NET, o LINQ foi introduzido inicialmente na versão do .NET Framework 3.5, como diz a própria documentação ele veio para preencher os buracos que existiam entre o mundo dos objetos e o mundo dos dados. 
Uma das facilidades ao usar LINQ é a extensibilidade dos métodos, ou seja, podemos manipular qualquer objeto, podemos escrever consultas em qualquer coleção de objetos que tenha suporte a **IEnumerable**, ou a uma interface genérica IEnumerable<<T>>.
Existe um programinha bem legal que gosto muito chamado LinqPad que inclusive uso muito para testes, geralmente ele é muito utilizado por quem pretende tirar uma certificação, e necessita testar seus conhecimento sem utilizar o IntelliSense do Visual Studio 😉

## Introdução ao LINQ
Vamos entender um pouco como realmente o LINQ funciona, criaremos agora nosso primeiro exemplo básico, manipulando informações de uma string.

```csharp
//  String com palavras
var palavras = "Microsoft NET Framework Linq Consulta Linq NET";

//  Array de palavras da string quebrada pelos espaços
var listPalavras = palavras.Split(' ');

Console.WriteLine("Palavras:");
foreach (var palavra in listPalavras)
{
    Console.WriteLine($"\t {palavra}");
}

// Resultado da Lista:
//      Microsoft
//      NET
//      Framework
//      Linq
//      Consulta
//      Linq
//      NET


// Consulta simples escrita em Linq
// essa é uma forma mais simples de escrever uma
// consulta com LINQ.
var consultaLinq = from c in listPalavras where c != "Linq" select c;

foreach (var palavra in consultaLinq)
{
    Console.WriteLine($"\t {palavra}");
}
// Resultado de consultaLinq:
//      Microsoft
//      NET
//      Framework
//      Consulta
//      NET

// Agrupar as palavras
// Vejamos como é simples agrupar dados com LINQ
var agruparLinq = from c
                    in listPalavras
                    group c by c into agrupar
                    select agrupar;

// Ordenar as palavras
// A opção de ordenação não há muito segredo é bem simples
var ordenarLinq = from c
                    in listPalavras
                    group c by c into agrupar
                    orderby agrupar.Key
                    select agrupar;
```

Bem simples, não é?! 
Agora iremos trabalhar com uma classe para que possamos ver o comportamento utilizado com as propriedades de uma classe, para assegurar que entendemos a lógica de uma consulta básica em LINQ.

## Dica Free

Essa é uma dica pessoal, muitas pessoas costumam chamar as propriedades de “**atributos**”, eu discordo totalmente, isso é um termo errado!

Podemos atribuir o termo atributo por exemplo em um XML ou HTML, mais não em uma classe.

Fiz algumas pesquisas e encontrei algo interessante, escrita por uma empresa que tem propriedade e segurança sobre isso que é a ORACLE, em um documentação ela explica algo sobre esse termo. [Acesse aqui](https://docs.oracle.com/javase/tutorial/information/glossary.html)

Bom mais isso é apenas uma dica, para que possamos pronunciar de forma correta.

Sendo assim vamos criar um exemplo que contenha uma classe Pessoa, com algumas propriedades.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace Linq
{
    class Pessoa
    {
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool Ativo { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var listadePessoas = new List<Pessoa>
            {
                new Pessoa
                {
                    Codigo =1,
                    Nome ="Rafael Almeida",
                    DataNascimento = DateTime.Now,
                    Ativo = true
                },
                new Pessoa
                {
                    Codigo =2,
                    Nome ="Fulano de Tal",
                    DataNascimento = DateTime.Now.AddYears(2),
                    Ativo = false
                },
                new Pessoa
                {
                    Codigo =3,
                    Nome ="Pessoa Conhecida",
                    DataNascimento = DateTime.Now,
                    Ativo = true
                },
            };

            // Consultar pessoas com o código > 0
            // e que não estão ativas
            var consultaLinq = from p
                               in listadePessoas
                               where p.Codigo > 0 && !p.Ativo
                               select p;

            Console.WriteLine("------- Consultar ---------");
            foreach (var pessoa in consultaLinq)
            {
                Console.WriteLine($"{pessoa.Codigo}-{pessoa.Nome}");
            }

            // Agrupar Infomrações
            var agruparLinq = from p
                              in listadePessoas
                              group p.Nome by p.Nome into agrupar
                              select agrupar.Key;

            Console.WriteLine("------- Agrupar ---------");
            foreach (var nome in agruparLinq)
            {
                Console.WriteLine(nome);
            }

            Console.ReadKey();
        }
    }
}
```
Até aqui tudo bem certo?! 

Voltaremos a abordar sobre isso mais abaixo, sabendo o conceito básico do LINQ, vamos conhecer alguns métodos de extensões que são mais utilizados no LINQ.

## Métodos de Extensão do LINQ

**O que são métodos de extensões?**

**Resposta:** Um método de extensão é uma forma de permitir adicionar uma função, sem necessidade de criar um novo método derivado de uma classe ou interface, métodos de extensão são estáticos e automaticamente são chamados como instância, no IntelliSense do Visual Studio eles aparecem com uma setinha, então essa é uma forma boa para saber se o método é derivado de uma classe ou ele é uma extensão.

Bem isso é um resumo básico do que seria um método de extensão, vamos ver alguns deles que estão presentes no LINQ.

```csharp
//  String com plavras
var palavras = "Microsoft NET Framework Linq Consulta Linq NET";

//  Array de palavras da string quebrada
//  pelos espaços – Split “Não é extensão LINQ”
// está aqui para demonstrar a utilização das extensões.
var listPalavras = palavras.Split(' ');

// Retornar o primeiro item da lista
var primeiro = listPalavras.First();

// Retornar o último item da lista
var ultimo = listPalavras.Last();

// Retornar os 2 primeiros itens da lista
var primeiros = listPalavras.Take(2);
// Concatenar dados, é necessário ser o mesmo tipo. 
var concatenar = primeiros.Concat(listPalavras);

// Método de ordenação ascendente
var ordemAscendente = listPalavras.OrderBy(o => o);

// Método de ordenação descendente
var ordemDescendente = listPalavras.OrderByDescending(o => o);

// O Count pode ser usado para retornar à quantidade
// de objetos de um array ou a quantidade de retorno de
// uma consulta efetuada por expressão
var count = listPalavras.Count(o => o.Equals("NET"));

```

Aqui abaixo está um link com todos o métodos da classe **System.Linq.Enumerable**

[https://msdn.microsoft.com/en-us/library/system.linq.enumerable_methods(v=vs.110).aspx](https://msdn.microsoft.com/en-us/library/system.linq.enumerable_methods(v=vs.110).aspx)


Bem já que conhecemos alguns métodos básicos vamos para a parte que eu particularmente mais amo! 

## Criar Expressões

O C# e LINQ nos dá a autonomia de simplesmente seguir nossa imaginação e criarmos nossas próprias expressões que desejarmos em LINQ. 

Show!!!, as 2 coisas mais maravilhosas que o .NET tem é "LINQ e Reflection", isso é o que escolhi para mim como uma das maravilhas do .NET  ... 😉

Agora vamos começar a sair de um básico para um nível de conhecimento melhor, que é criar uma expressão e uma função lambda, What’s? Yep!

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Linq
{
    class Pessoa
    {
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool Ativo { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var listadePessoas = new List<Pessoa>
            {
                new Pessoa
                {
                    Codigo =1,
                    Nome ="Rafael Almeida",
                    DataNascimento = DateTime.Now,
                    Ativo = true
                },
                new Pessoa
                {
                    Codigo =2,
                    Nome ="Fulano de Tal",
                    DataNascimento = DateTime.Now.AddYears(2),
                    Ativo = false
                },
                new Pessoa
                {
                    Codigo =3,
                    Nome ="Pessoa Conhecida",
                    DataNascimento = DateTime.Now,
                    Ativo = true
                },
            };

            // Aqui é a forma mais simples de usar expressões lambda
            // em um método.
            var pessoas1 = listadePessoas.Where(p => p.Codigo > 1);

		    // Vejamos como criar uma função Lambda, para ser utilizada em método, essa função de exemplo 
			// será declarada explicitamente o tipo, mais podemos criar também usando de forma genérica.
           
            // Função básica em lambda
			Func<Pessoa, bool> pessoaFunc = p => p.Codigo > 1;
     
			// Utilizando a função criada acima
            var pessoas2 = listadePessoas.Where(pessoaFunc);

			// Vejamos como criar também uma expressão para ser usada em método de extensão do LINQ.

            // Expressão básica
            Expression<Func<Pessoa, bool>> pessoaExpression = p => p.Codigo > 1;

			 // Compilando a expressão e utilizando.
            var pessoas3 = listadePessoas.Where(pessoaExpression.Compile());

            Console.ReadKey();
        }
    }
} 
```

Pessoal como eu falei sobre Lambda também aqui no post, quero deixar um link de referência caso queiram dar uma olhada, acesse [Aqui](https://docs.microsoft.com/pt-br/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions)

Até o próxima!

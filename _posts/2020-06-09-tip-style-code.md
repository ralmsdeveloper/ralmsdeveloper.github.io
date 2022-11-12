﻿---
title: "String vs string"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - Dicas
  - Tips
  - C#
  - .NET
header:
  teaser: /assets/images/StringVSstring.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/StringVSstring.png)

<center><strong>Olá tudo bem?!</strong></center>
<hr /> 
<div class="notice--warning">
Durante alguns anos tenho visto muitas pessoas discutindo sobre o uso de <b>String</b> com letra maiúscula ou <b>string</b> com letra minúscula, talvez você que está 
lendo este artigo já saiba a sua diferença, mas irei deixar meus 50 centavos e pensamentos que tenho sobre esse assunto, para contribuir também com aqueles não sabem a real diferença.
<br><br>
<b>FYI:</b> Esses são meus pensamentos com base em anos de experiência com .NET, mas Rafael isso é básico? nem tanto, e irei te mostrar o porque!
<br><br>
Isso não é um Deep-Dive sobre tipos em .NET!
</div> 

## Preferência
<div style="text-align: justify;">
Bom, eu particularmente uso palavras-chave para meus identificadores e existe uma razão para isso, primeiramente gostaria que ficasse muito claro para
você, que isso tem muito mais a ver com semântica e não com apenas uma simples escolha de estilo de código, deixa te mostrar algumas coisas.
</div>
```csharp
using System;

namespace Exemplo
{
    class Program
    {
        static void Main(string[] args)
        {
            String str1 = "Exemplo";
            string str2 = "Exemplo";

            Console.WriteLine(str1);
            Console.WriteLine(str2);

            // Output:
            //        Exemplo
            //        Exemplo 
        }
    }
}
```
Para o exemplo acima, ambos produzem os mesmos valores, alguma diferença? 
a resposta é Não, até eu remover o Namespace <b>System</b>.
![01]({{site.url}}{{site.baseurl}}/assets/images/tipsstring/errorNamespace.PNG)
<div style="text-align: justify;">
Veja que agora o compilador já reclama por não encontrar o identificador <b>String</b>, mas a variável que faz uso de palavras-chave (<b>string</b>) permanece
sem nenhum tipo de impacto, isso é porque <b>string</b> é uma palavra-chave da linguagem C#, logo o compilador sabe a quem pertence (<i>System.String</i>). <br><br>
Essa já é basicamente uma das vantagens em utilizar palavras-chave, háaa, mas eu posso escolher o que eu quiser, claro, quem vai dar manuntenção em seu projeto
sem dúvidas é você, os problemas de segurança também são de sua responsabilidade, só não fale que isso é apenas uma simples interpretação de <b>code style</b>(estilo de código/perfumaria), 
isso está muito mais para semâtica de código, como falei a segurança é de sua responsabilidade, para não ficar em poucas palavras vamos imaginar o seguinte cenário:
</div>
```csharp
using System;

namespace Exemplo
{
    class String
    {
        public static implicit operator String(string str) => null;
    }

    class Program
    {
        static void Main(string[] args)
        {
            String str1 = "Exemplo"; // Classe que escrevi
            string str2 = "Exemplo";

            Console.WriteLine(str1 is System.String); // False
            Console.WriteLine(str2 is System.String); // True
            Console.WriteLine(str1); // NULL
            Console.WriteLine(str2); // Exemplo
        }
    }
}
```

Observe no código acima que eu adicionei o namespace <b>System</b> e escrevi uma simples classe <b>String</b>:
```csharp
class String
{
  public static implicit operator String(string str) => null;
}
```
<div style="text-align: justify;">
Isso não causou nenhum erro no momento do desenvolvimento, mesmo já existindo uma classe(<b>String</b>) no namespace <b>System</b>, pelo contrário, o compilador reconheceu minha classe e agora passou a usar a classe que eu escrevi em vez de <b>System.String</b>.<br><br>
Bom, talvez isso poderá lhe causar algumas dores de cabeça, implementamos diariamente inúmeras bibliotecas de terceiros e na maioria das vezes não conhecemos de forma mais aprofundada sua implementação, então basicamente podemos cair em armadilhas.<br>
Também não estou dizendo que deverá conhecer... mas sem dúvidas pode nos custar algum tempo para analisar o problema até encontrar o motivo.
</div>
## O problema
Basicamente o que fiz acima foi simular um problema que aparentemente era inofensivo, com poucas linhas de código produzimos uma classe que implicitamente recebe uma string de forma idêntica ao System.String.

## Meu conselho
Eu já falei que a decisão é sua, mas se quiser seguir um conselho, use palavras-chave quando puder, e evite surpresas!
<br><br>
Palavras chaves C#, clique <a alt="" target="_BLANK" href="https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/">aqui</a>!
<br>
<div class="notice--warning">
Não sabe o que é palavras-chave? <br>
De uma forma resumida são palavras que você não poderá usar como nome de variáveis em nenhuma parte de seu código, a não ser que use <b>@</b> antes do nome da variável, veja um exemplo abaixo.
</div> 

![01]({{site.url}}{{site.baseurl}}/assets/images/tipsstring/errorPalavrasChave.PNG)

## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
</div> 

<br>

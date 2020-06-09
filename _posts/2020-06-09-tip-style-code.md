---
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
---

![01]({{site.url}}{{site.baseurl}}/assets/images/StringVSstring.png)

<center><strong>Olá tudo bem?!</strong></center>
<hr /> 
<div class="notice--warning">
Durante alguns anos tenho visto muita pessoas se perguntando sobre o uso de <b>String</b> com letra maiúscula ou <b>string</b> em com letra minúscula, talvez você que está 
lendo este artigo já saiba a sua real diferença, mas irei deixar meus 50 centavos e pensamentos que tenho sobre esse assunto para contribuir também com aqueles não saiba a real diferença.
<br><br>
<b>FYI:</b> Esses são meus pensamentos com base em anos de experiência com .NET, mas Rafael isso é básico? nem tanto, e, irei te mostrar o porque!
</div> 

## Preferência
Bom, eu particularmente uso palavras chaves como identificadores e existe uma razão para isso, primeiramente quero que fique claro para
você que isso tem muito mais haver com semântica e não com apenas uma simples escolha de estilo de código, deixa te mostrar algumas coisas.

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
            Console.WriteLine(str1);

            // Output:
            //        Exemplo
            //        Exemplo 
        }
    }
}
```
Para o exemplo acima ambos produzem o mesmo valor, alguma diferença? 
Resposta: Não, até eu remover o Namespace System.
![01]({{site.url}}{{site.baseurl}}/assets/images/tipsstring/erroNamespace.PNG)
 
Veja que agora o compilador já reclama por não encontrar o identificador <b>String</b>, mas o a palavra-chave <b>string</b> permanece
sem nenhum tipo de impacto, isso é porque <b>string</string> é uma palavra-chave da linguagem C#, logo o compilador sabe a quem pertence. 
Essa já uma das vantagens em utilizar palavras-chaves, háaa, mas eu posso escolher o que eu quiser, claro quem vai dar manuntenção em seu projeto
sem dúvidas é você, os problemas de segurança também são de sua responsabilidade, só não fale que isso é apenas, <b>code style</b>(estilo de código/perfumaria), 
por que isso está muito mais para semâtica de código, como falei a segurança é de sua responsabilidade, vamos imaginar o seguinte cenário:

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
            String str1 = "Exemplo";
            string str2 = "Exemplo";

            Console.WriteLine(str1 is System.String); // False
            Console.WriteLine(str2 is System.String); // True
            Console.WriteLine(str1); // NULL
            Console.WriteLine(str2); // Exemplo
        }
    }
}
```
Observe que eu adicionei o namespace <b>System</b> e criei uma simples classe <b>String</b> isso não causou nenhum erro no momento do desenvolvimento, 
mas isso poderá lhe causas realmente dores de cabeça, implementamos diariamente inúmeras bibliotecas de terceiros e na maioria das vezes não conhecemos de forma mais aprofundada sua implementação, então basicamente podemos cair em armadilhas.
## Meu conselho
Eu já falei que a decisão é sua, mas se quiser seguir um conselho simples, use palavras reservadas quando puder!!!

## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 Dúvidas, quer bater um papo? Entre em contato comigo: ralms@ralms.net
</div> 

<br>

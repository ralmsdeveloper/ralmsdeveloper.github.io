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
 

## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 Dúvidas, quer bater um papo? Entre em contato comigo: ralms@ralms.net
</div> 

<br>

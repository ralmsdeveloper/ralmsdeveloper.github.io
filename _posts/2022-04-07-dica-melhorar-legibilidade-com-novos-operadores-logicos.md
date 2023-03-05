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
  teaser: /assets/images/2022/legibilidade_and_or.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/2022/legibilidade_and_or.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Durante o processo de desenvolvimento de um sistema sempre nos esforçamos para escrever código melhores, e, na dica de hoje irei apresentar um recurso do C# 9 fantástico.
</div> 

## Introdução
<div style="text-align: justify;">
Sabemos que a linguagem C#/.NET está em um processo contínuo de evolução, a cada versão recursos novos surgem e são bastante agregadores para o ciclo de desenvolvimento de nossas aplicações, na dica de hoje irei apresentar operador lógico que podemos combinar com expressões para validar uma determinada entrada de dados, vamos pegar como exemplo hipotético a validação de uma cadeia de caracteres e verificar se existe letras maiúsculas ou números, veja o exemplo abaixo:
<br>
</div>
```csharp
bool Exists(char letter) => (letter >= '0' && letter <= '9') || (letter >= 'A' && letter <= 'Z');
```
Bom me parece que isso é bem simples concorda?<br />
Como podemos melhorar isso?
## Novo recurso do C# 9.0
<div style="text-align: justify;">
Vamos agora simplificar o que já esta simplificado, usando os operadores <b>AND</b> e <b>OR</b>.
</div>
```csharp
bool Exists(char letter) => letter is (>= '0' and <= '9') or (>= 'A' and <= 'Z');
```
<div style="text-align: justify;">
A mudança foi muito simples, porém conseguimos simplificar ainda mais nosso código!
</div> 
## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

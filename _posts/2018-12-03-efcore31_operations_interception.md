---
title: "Operations Interception - EF Core 3.1"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcoreinterception.png)

<center><strong>Fala pessoal, tudo bem?! 💚</strong></center>
<hr> 
## Sonho realizado
<div style="text-align: justify;">
Você nem imagina o quanto de pessoas esperando por isso, sim, estou falando de uma forma de interceptar toda operação de banco de dados. Um do engenheiros do 
time do EF Core tornou isso possível, Thanks <b>Arthir Vickers</b>, você pode alterar/otimizar a query que vai ser executada 
no banco dados, sobrescrevendo os métodos da classe `DbCommandInterceptor` veja alguns dos métodos que você pode sobrescrever 
e ser útil pra você.
</div> 
- NonQueryExecuted
- ScalarExecuting
- ReaderExecuting


<br>
Os fontes do exemplo usado está aqui:<br>
<a href="https://github.com/ralmsdeveloper/EFCoreInterceptador" target="_BLANK" alt="">
https://github.com/ralmsdeveloper/EFCoreInterceptador
</a>

<div class="notice--success">
<strong>
 Eu fico por aqui e um forte abraço! 😄 
</strong>
</div> 


 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #postgresql #efcore31 #netcore31 #aspnetcore<br><br>

---
title: "Perform Identity Resolution"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - EF5
  - EntityFrameworkCore
---

![01]({{site.url}}{{site.baseurl}}/assets/images/ef5identityresolution/EF5_PerformIdentityResolution.png)

<center><strong>Olá tudo bem?!</strong></center>
<hr /> 
<div class="notice--warning">
O novo recurso que irei apresentar está em preview ainda, e será lançada de oficialmente em Novembro deste ano!
<br><br>
<b>Entity Framework Core 5</b> será umas das versões mais esperadas até o momento e está recheada de várias novidades, hoje irei apresentar um recurso muito interessante e extremamente importante.
</div> 

## AsNoTracking
<div style="text-align: justify;">
AsNoTracking é um recurso muito utilizado para fazer consultas com Entity Framework Core, é uma consulta 
somente leitura, isso significa que os dados retornados pela consulta não será rastreado e existe situações que 
se torna muito mais rápido, por não ter essa responsabilidade de gerenciar o objeto.
<br>
Veja uma exemplo de uma consulta utilizando <b>AsNoTracking</b>:
</div>
```csharp
using var db = new ExemploContext();

var itens = db.Itens.Include(p => p.Pedido).ToList()
```
 

## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
</div> 

<br>

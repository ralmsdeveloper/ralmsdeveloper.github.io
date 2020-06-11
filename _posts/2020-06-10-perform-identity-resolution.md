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
O novo recurso que irei apresentar está em preview ainda, e será lançada de oficialmente em Novembro deste ano, como parte do <b>Entity Framework Core 5</b>.
<br><br>
É muito bom lembrar também que o <b>EF Core 5</b> é uma das versões mais esperadas e está recheada de várias novidades, hoje irei apresentar um recurso muito interessante e extremamente importante.
</div> 

## AsNoTracking
<div style="text-align: justify;">
AsNoTracking é um dos recursos mais utilizados por usuários do <b>Entity Framework Core</b> para efetuar consultas em um 
banco de dados, costumamos dizer que é uma consulta somente leitura, por que os dados retornados pelo banco de dados não 
serão rastreados e pode existir situações que essa abordagem se torna muito mais rápida, por não ter a necessidade de 
gerenciar o estado dos objetos.
<br />
Veja um exemplo de uma consulta utilizando <b>AsNoTracking</b>:
</div>
```csharp
using var db = new ExemploContext();

var itens = db
    .Itens
    .AsNoTracking()
    .Include(p => p.Pedido)
    .Where(p => p.PedidoId == "EXEF001")
    .ToList()
```
<div style="text-align: justify;">
Basicamente esse é o comportamento que todos conhecem, mas existe algo que você precisa saber, na consulta acima
para cada <b>Item</b> será criada uma nova instância de <b>Pedido</b>.<br><br>
Vamos pegar o seguinte cenário onde eu tenho:<br>
<pre>
1    (um)  - Pedido (Código do pedido = <b>EXEF001</b>)
1000 (mil) - Itens (Esses itens são do pedido -> <b>EXEF001</b>)
</pre>
<hr />
Se sua consulta retornou 1.000 (mil itens) e todos fazem parte de um único <b>Pedido</b>, teremos 2.000 (duas mil) instâncias de objetos agora, 
isso pode ser um problema de uso de <b>memória</b>, e pode causar lentidão em sua aplicação, o team do <b>Entity Framework Core</b> 
vem fazendo um ótimo trabalho e fazendo com que o <b>ORM</b> a cada versão seja mais produtivo e performático, mas aqui
neste ponto específico temos um problema, que alocamento de objetos em memória, o qual poderia ser resolvido de maneira mais inteligente.<br><br>
</div>
## Perform Identity Resolution
<div style="text-align: justify;">
Certo temos um problema e qual é a solução? <br />
Existe uma nova feature, que é um método de extensão, extremamente inteligente e capaz de resolver esse problema de alocação de objetos em memória,
assim em vez de ter 1.000(mil) instâncias de <b>Pedido</b>, passa agora ter uma única instância e a lista de <b>Itens</b> agora passa a usar esta única referência, 
além de deixar aplicação mais performática, veja como ficou simples de resolver isso na nova versão do <b>EF Core 5</b>:
</div>
```csharp
using var db = new ExemploContext();

var itens = db
    .Itens
    .AsNoTracking()
    .PerformIdentityResolution() // Aqui está a solução
    .Include(p => p.Pedido)
    .Where(p => p.PedidoId == "EXEF001")
    .ToList()
```
Observe que agora usamos o seguinte metódo (<b>PerformIdentityResolution</b>) ele é o responsável por resolver esse pequeno problema de alocação de objetos em memória.

<div class="notice--warning">
<b>FYI:</b> Esse novo recurso aplica-se apenas para consultas quando usado o <b>AsNoTracking</b>.
</div> 

## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
</div> 

<br>

---
title: "EF Core 7 chega a ser 44x mais rápido!"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - dotnet
  - performance
header:
  teaser: /assets/images/channel/channel-top.png
  caption: "www.ralms.net"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcore7/topo.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Este pequeno post é pra comemorar o lançamento do Entity Framework Core 7 e algumas observações pessoais.
</div> 

## Introdução
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;O Team do <b>EF Core</b> tem se dedicado bastante a melhorar o produto desde sua reescrita e lançamento oficial em 2016, todos ou quase todos sabem que o ORM foi <b>reescrito 100% do zero</b>, dado que a arquitetura anterior já impedia grandes evoluções no produto.
<br><br>
A cada versão do produto geralmente costumamos ver diversas features sendo implementadas no produto, sendo que na versão EF Core 6 e agora o EF Core 7 não contém tantas features como costumávamos a ver, isso tem um motivo, o produto está ficando cada vez mais maduro e estável, além disso foco tem sido em melhorias de performance e features já existentes.
<br>
<br>
A versão do <b>EF Core 7</b> foi lançada oficialmente no 8 de novembro de 2022, ela não trouxe diversas novidades, mas trouxe algumas extremantes valiosas que são:
</div>
- Suporte JSON nativo
- Insert mais rápido
- Suporte atualização em massa
- Suporte exclusão em massa

## Atualização em massa
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;Estarei focando aqui na atualização e exclusão em massa, dado que temos um ganho significativo de performance, vale lembrar que existem outras formas de atingir praticamente o mesmo objetivo que será apresentado, porém era workaround nada nativo do ORM.
<br />
&nbsp;&nbsp;&nbsp;&nbsp;A atualização e exclusão em massa foi um dos tópicos mais comentados e solicitados no github do projeto, inclusive o próprio team do EF Core fez uma apresentação onde disponibilizou um gráfico de performance e os ganhos que tivemos desde o EF 6, chegado a ser 44x mais rápido com as novas features implementadas.
</div>
 ![01]({{site.url}}{{site.baseurl}}/assets/images/efcore7/image01.png)
 <br />
 ![01]({{site.url}}{{site.baseurl}}/assets/images/efcore7/image02.png)
 
## Entendendo o problema
<div style="text-align: justify;">
Quando a gente precisava excluir ou atualizar uma massa de registros e existia a necessidade de aplicar um filtro para que as modificações fosse restrita apenas a um conjunto de dados, tínhamos que executar uma instrução bruta fora do capô do ORM ou consultar os dados via ORM para que os objetos fossem traqueados, executar a lógica desejada exclusão ou atualização do objeto e depois chamar o método SaveChanges, vamos pegar exemplo hipotético aqui atualização de desconto para todos clientes do estado de São Paulo, a gente usava algo assim:
</div>
 ```csharp
public string ToSnakeCaseUsingRegex()
{
var customers = db.Customers.Where(p => p.State == "SP");
foreach (var customer in customers)
{
    customer.Discount = 10m;
}
db.SaveChanges();
}
```
Mas isso tinha um custo alto de CPU e memória.
<div style="text-align: justify;">
Quando a gente precisava excluir ou atualizar uma massa de registros e existia a necessidade de aplicar um filtro para que as modificações fosse restrita apenas a um conjunto de dados, tínhamos que executar uma instrução bruta fora do capô do ORM ou consultar os dados via ORM para que os objetos fossem traqueados, executar a lógica desejada exclusão ou atualização do objeto e depois chamar o método SaveChanges, vamos pegar exemplo hipotético aqui atualização de desconto para todos clientes do estado de São Paulo, a gente usava algo assim:
</div>
## Resolvendo o problema

## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

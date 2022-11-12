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
Neste artigo abordaremos um dos recursos do .NET que nos fornece a capacidade de distribuir o processamento de dados em nossas aplicações por meio de um canal, iremos usar o padrão arquitetural <b>producer-consumer</b>, o qual abordaremos logo mais.
</div> 

## Introdução
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;O Team do EF Core tem se dedicado bastante a melhorar o produto desde sua reescrita e lançamento oficial em 2016, todos ou quase todos sabem que o ORM foi reescrito 100% do zero, dado que a arquitetura anterior já impedia grandes evoluções no produto.

A cada versão do produto geralmente costumamos ver diversas features sendo implementadas no produto, sendo que na versão EF Core 6 e agora o EF Core 7 não contém tantas features como costumávamos a ver, isso tem um motivo, o produto está ficando cada vez mais maduro e estável, além disso foco tem sido em melhorias de performance e features já existentes.

A versão do EF Core 7 foi lançada oficialmente no 8 de novembro de 2022, ela não trouxe diversas novidades, mas trouxe algumas extremantes valiosas que são:
</div>
- Suporte JSON nativo
- Insert mais rápido
- Suporte atualização em massa
- Suporte exclusão em massa

## Atualização em massa
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;Estarei focando aqui na atualização e exclusão em massa, dado que temos um ganho significativo de performance, vale lembrar que existem outras formas de atingir praticamente o mesmo objetivo que será apresentado, porém era workaround nada nativo do ORM.
<br />
&nbsp;&nbsp;&nbsp;&nbsp;A atualização e exclusão em massa foi um dos tópicos mais comentados e solicitados no github do projeto, inclusive o próprio team fez uma apresentação onde disponibilizou um gráfico de performance e os ganhos que tivemos desde o EF 6.
</div>
 ![01]({{site.url}}{{site.baseurl}}/assets/images/efcore7/image01.png)
 <br />
 ![01]({{site.url}}{{site.baseurl}}/assets/images/efcore7/image02.png)
 
## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

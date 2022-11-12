---
title: "EF Core 7 chega a ser 44x mais rápido!"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - dotnet
  - performance
  - Entity Framework Core
  - Entity Framework Core 7
header:
  teaser: /assets/images/efcore7/topo.png
  caption: "www.ralms.io"
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
 <br /> <br />
 ![01]({{site.url}}{{site.baseurl}}/assets/images/efcore7/image02.png)
 
## Entendendo o problema
<div style="text-align: justify;">
Quando a gente precisava excluir ou atualizar uma massa de registros e existia a necessidade de aplicar um filtro para que as modificações fosse restrita apenas a um conjunto de dados, tínhamos que executar uma instrução bruta fora do capô do ORM ou consultar os dados via ORM para que os objetos fossem traqueados, executar a lógica desejada exclusão ou atualização do objeto e depois chamar o método <b>SaveChanges</b>, vamos pegar exemplo hipotético aqui atualização de desconto para todos clientes do estado de São Paulo, a gente usava algo assim:
</div>
 ```csharp
var customers = db.Customers.Where(p => p.State == "SP");
foreach (var customer in customers)
{
    customer.Discount = 10m;
}
db.SaveChanges();
```
Isso era o que a gente tinha para o momento, mas o custo de CPU e memória era muito alto, a instrução para atualização em massa era muito ruim dado que era gerado uma comando para cada objeto afetado pela aplicação, veja um exemplo:
 ```csharp
 [Parameters=[@p1='967', @p0='10' (Precision = 18) (Scale = 2), @p3='968', @p2='10' (Precision = 18) (Scale = 2), @p5='969', @p4='10' (Precision = 18) (Scale = 2), @p7='970', @p6='10' (Precision = 18) (Scale = 2), @p9='971', @p8='10' (Precision = 18) (Scale = 2), @p11='972', @p10='10' (Precision = 18) (Scale = 2), @p13='973', @p12='10' (Precision = 18) (Scale = 2), @p15='974', @p14='10' (Precision = 18) (Scale = 2), @p17='975', @p16='10' (Precision = 18) (Scale = 2), @p19='976', @p18='10' (Precision = 18) (Scale = 2), @p21='977', @p20='10' (Precision = 18) (Scale = 2), @p23='978', @p22='10' (Precision = 18) (Scale = 2), @p25='979', @p24='10' (Precision = 18) (Scale = 2), @p27='980', @p26='10' (Precision = 18) (Scale = 2), @p29='981', @p28='10' (Precision = 18) (Scale = 2), @p31='982', @p30='10' (Precision = 18) (Scale = 2), @p33='983', @p32='10' (Precision = 18) (Scale = 2), @p35='984', @p34='10' (Precision = 18) (Scale = 2), @p37='985', @p36='10' (Precision = 18) (Scale = 2), @p39='986', @p38='10' (Precision = 18) (Scale = 2), @p41='987', @p40='10' (Precision = 18) (Scale = 2), @p43='988', @p42='10' (Precision = 18) (Scale = 2), @p45='989', @p44='10' (Precision = 18) (Scale = 2), @p47='990', @p46='10' (Precision = 18) (Scale = 2), @p49='991', @p48='10' (Precision = 18) (Scale = 2), @p51='992', @p50='10' (Precision = 18) (Scale = 2), @p53='993', @p52='10' (Precision = 18) (Scale = 2), @p55='994', @p54='10' (Precision = 18) (Scale = 2), @p57='995', @p56='10' (Precision = 18) (Scale = 2), @p59='996', @p58='10' (Precision = 18) (Scale = 2), @p61='997', @p60='10' (Precision = 18) (Scale = 2), @p63='998', @p62='10' (Precision = 18) (Scale = 2), @p65='999', @p64='10' (Precision = 18) (Scale = 2), @p67='1000', @p66='10' (Precision = 18) (Scale = 2)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      UPDATE [People] SET [Discount] = @p0
      OUTPUT 1
      WHERE [Id] = @p1;
      UPDATE [People] SET [Discount] = @p2
      OUTPUT 1
      WHERE [Id] = @p3;
      UPDATE [People] SET [Discount] = @p4
      OUTPUT 1
      WHERE [Id] = @p5;
      UPDATE [People] SET [Discount] = @p6
      OUTPUT 1
      WHERE [Id] = @p7;
      UPDATE [People] SET [Discount] = @p8
      OUTPUT 1
      WHERE [Id] = @p9;
      UPDATE [People] SET [Discount] = @p10
      OUTPUT 1
      WHERE [Id] = @p11;
      UPDATE [People] SET [Discount] = @p12
      OUTPUT 1
      WHERE [Id] = @p13;
      UPDATE [People] SET [Discount] = @p14
      OUTPUT 1
      WHERE [Id] = @p15;
      UPDATE [People] SET [Discount] = @p16
      OUTPUT 1
      WHERE [Id] = @p17;
      UPDATE [People] SET [Discount] = @p18
      OUTPUT 1
      WHERE [Id] = @p19;
      UPDATE [People] SET [Discount] = @p20
      OUTPUT 1
      WHERE [Id] = @p21;
      UPDATE [People] SET [Discount] = @p22
      OUTPUT 1
      WHERE [Id] = @p23;
      UPDATE [People] SET [Discount] = @p24
      OUTPUT 1
      WHERE [Id] = @p25;
      UPDATE [People] SET [Discount] = @p26
      OUTPUT 1
      WHERE [Id] = @p27;
      UPDATE [People] SET [Discount] = @p28
      OUTPUT 1
      WHERE [Id] = @p29;
      UPDATE [People] SET [Discount] = @p30
      OUTPUT 1
      WHERE [Id] = @p31;
      UPDATE [People] SET [Discount] = @p32
      OUTPUT 1
      WHERE [Id] = @p33;
      UPDATE [People] SET [Discount] = @p34
      OUTPUT 1
      WHERE [Id] = @p35;
      UPDATE [People] SET [Discount] = @p36
      OUTPUT 1
      WHERE [Id] = @p37;
      UPDATE [People] SET [Discount] = @p38
      OUTPUT 1
      WHERE [Id] = @p39;
      UPDATE [People] SET [Discount] = @p40
      OUTPUT 1
      WHERE [Id] = @p41;
      UPDATE [People] SET [Discount] = @p42
      OUTPUT 1
      WHERE [Id] = @p43;
      UPDATE [People] SET [Discount] = @p44
      OUTPUT 1
      WHERE [Id] = @p45;
      UPDATE [People] SET [Discount] = @p46
      OUTPUT 1
      WHERE [Id] = @p47;
      UPDATE [People] SET [Discount] = @p48
      OUTPUT 1
      WHERE [Id] = @p49;
      UPDATE [People] SET [Discount] = @p50
      OUTPUT 1
      WHERE [Id] = @p51;
      UPDATE [People] SET [Discount] = @p52
      OUTPUT 1
      WHERE [Id] = @p53;
      UPDATE [People] SET [Discount] = @p54
      OUTPUT 1
      WHERE [Id] = @p55;
      UPDATE [People] SET [Discount] = @p56
      OUTPUT 1
      WHERE [Id] = @p57;
      UPDATE [People] SET [Discount] = @p58
      OUTPUT 1
      WHERE [Id] = @p59;
      UPDATE [People] SET [Discount] = @p60
      OUTPUT 1
      WHERE [Id] = @p61;
      UPDATE [People] SET [Discount] = @p62
      OUTPUT 1
      WHERE [Id] = @p63;
      UPDATE [People] SET [Discount] = @p64
      OUTPUT 1
      WHERE [Id] = @p65;
      UPDATE [People] SET [Discount] = @p66
      OUTPUT 1
      WHERE [Id] = @p67;
 ```

## Resolvendo o problema
<div style="text-align: justify;">
O <b>EF Core 7</b> trouxe novos métodos de extensão que ajudam a resolver o problema apresentado anteriormente, ficou muito mais simples e extremamente rápido atualizar uma massa de registros, veja um exemplo:
</div>
 ```csharp
var rowsAffected = await db
    .Customers
    .Where(p => p.State == "SP")
    .ExecuteUpdateAsync(p => p.SetProperty(x => x.Discount, 11m));
```   
A instrução SQL ficou muito mais simplificada além de não rastrear os objetos mais na memória, em alguns testes não tão científicos que fiz 
em minha maquina enquanto testava outras coisas como Minimal API vs MVC, eu obitve uma performance em mais 500%, isso é fantástico!
 ```sql
 UPDATE [p]
      SET [p].[Discount] = 11.0
      FROM [Customers] AS [p]
      WHERE [p].[State] = N'SP'
```  
<br />
## Métodos de extensão novos
- ExecuteUpdate
- ExecuteUpdateAsync
- ExecuteDelete
- ExecuteDeleteAsync

Para excluir registros em massa você pode executar o seguinte comando:
 ```csharp
var rowsAffected = await db
    .Customers
    .Where(p => p.State == "SP")
    .ExecuteDeleteAsync();
```
Todos os métodos novos de extensão devolve a quantidade de registros que foram afetados na base de dados.
## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

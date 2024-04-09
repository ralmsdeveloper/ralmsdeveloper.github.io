---
title: "Atualização em Massa"
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
  teaser: /assets/images/dicasefcore.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/dicasefcore.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Nesse post apresento melhorias de mais novidades do EF Core 7
</div> 


## EF CORE 7 Atualização e Exclusão em Massa com Eficiência
O EF Core 7 introduziu novos métodos, ExecuteDelete e ExecuteUpdate, para otimizar a atualização e exclusão de grandes volumes de dados no banco de dados. Estes métodos oferecem uma alternativa mais eficiente ao uso tradicional do SaveChanges para grandes conjuntos de dados.

## ExecuteDelete

O método ExecuteDelete remove um conjunto de entidades de acordo com um predicado especificado. Esse predicado define quais entidades devem ser excluídas, similarmente à cláusula WHERE em uma consulta SQL.

Exemplo de uso:

```csharp
using (var context = new RalmsContext())
{
    var ordersToDelete = context.Orders.Where(o => o.OrderDate < new DateTime(2023, 1, 1));
    context.Database.ExecuteDelete(ordersToDelete);
}
```

## ExecuteUpdate

O método ExecuteUpdate atualiza as propriedades de um conjunto de entidades de acordo com os valores especificados. Similarmente ao ExecuteDelete, utiliza-se um predicado para definir quais entidades serão atualizadas.

Exemplo de uso:

```csharp
using (var context = new RalmsContext())
{
    var ordersToUpdate = context.Orders.Where(o => o.OrderStatus == OrderStatus.Pending);
    context.Database.ExecuteUpdate(ordersToUpdate, o => new { o.OrderStatus = OrderStatus.Shipped });
}
```

## Vantagens

Eficiência: ExecuteDelete e ExecuteUpdate executam comandos SQL únicos e otimizados, resultando em um desempenho significativamente melhor para grandes conjuntos de dados.
Flexibilidade: Os predicados permitem definir com precisão quais entidades devem ser atualizadas ou excluídas.
Transações: A utilização de transações é compatível com os métodos, garantindo a integridade dos dados em caso de falhas.

## Considerações

Rastreamento de entidades que ao contrário do SaveChanges, os métodos não rastreiam o estado das entidades no contexto.

Consultas Subsequentas: As alterações realizadas com ExecuteDelete e ExecuteUpdate não são automaticamente refletidas no contexto, portanto, consultas subsequentes podem precisar ser recarregadas.

Segurança: O predicado deve ser cuidadosamente escrito para evitar exclusões ou atualizações indesejadas.
 

## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

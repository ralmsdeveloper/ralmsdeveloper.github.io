---
title: "EntityFrameworkCore.FirebirdSQL  2.0.9"
comments: false
excerpt_separator: "Ler mais"
categories:
  - Provider
tags:
  - "C#"
  - NetStandard
  - EntityFrameworkCore
---

![01]({{ site.url }}{{ site.baseurl }}/assets/images/firebird.png)

**EntityFrameworkCore For FirebirdSQL**

Fala pessoal, acabei de disponibilizar para vocês a versão 2.0.9 “quentinha” do EntityFrameworkCore.FirebirdSql, o Framework de acesso a dados ao FirebirdSQL, escrito 100% em .Net Core para vocês amantes do EF Core assim como EU!!!

Nessa versão disponibilizo a compatibilidade para os que usam o Firebird 3.x, de ter o auto incremento por trigger como era nas versões anteriores!

Como faço para usar esse recurso com Firebird 3.x?
Simples, vamos lá!

**Para usar o auto incremento por trigger:**
```csharp
protected override void OnModelCreating(ModelBuilder modelo)
{
    modelo.Entity<Author>()
        .Property(x => x.AuthorId)
        .UseFirebirdIdentityColumn();
    modelo.Entity<Book>()
        .Property(x => x.BookId)
        .UseFirebirdSequenceTrigger();
}
```
**Para usar o auto-incremento automático:**

```csharp
protected override void OnModelCreating(ModelBuilder modelo)
{
    modelo.Entity<Author>()
        .Property(x => x.AuthorId)
        .UseFirebirdIdentityColumn();
    modelo.Entity<Book>()
        .Property(x => x.BookId)
        .UseFirebirdIdentityColumn();
}
```
Nuget: [https://www.nuget.org/packages?q=EntityFrameworkCore.FirebirdSQL](https://www.nuget.org/packages?q=EntityFrameworkCore.FirebirdSQL)

Ou se preferir instale pelo console em seu projeto!

`Install-Package EntityFrameworkCore.FirebirdSQL -Version 2.0.9`

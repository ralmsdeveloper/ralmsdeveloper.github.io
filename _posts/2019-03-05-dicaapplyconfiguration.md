---
title: "Dica ApplyConfiguration EFCore >=2.2"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
  - "Entity Framework Core"
toc: true
toc_label: "Começando"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/dicas/dicaapplyconfiguration.png)

<center><strong>Fala pessoALL, tudo bem?! 👊</strong></center>
<hr>


Bom essa dica pode lhe ajudar a eliminar uma boa parte de código de sua aplicação, em especial de seu **Context**
<br>
<div class="notice--warning">
<strong>FYI:</strong><br>
Esta nova funcionalidade que irei apresentar foi uma das features implementadas e que saiu na versão do EntityFramework Core 2.2.
</div>
Sem mais delongas vamos ao que interessa, antes do EntityFramework Core 2.2 sair do forno, uma das opções de aplicar as configurações de nossas entidades era da seguinte forma:
```csharp
public class SampleDbContext : DbContext
{
    public SampleDbContext(DbContextOptions<SampleDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new LoginConfiguration());
        modelBuilder.ApplyConfiguration(new ClienteConfiguration());
        modelBuilder.ApplyConfiguration(new EnderecoConfiguration());
        modelBuilder.ApplyConfiguration(new CidadeConfiguration());
        modelBuilder.ApplyConfiguration(new ProdutoConfiguration());
        modelBuilder.ApplyConfiguration(new EstoqueConfiguration());
        modelBuilder.ApplyConfiguration(new ...);
    }
}
```
## What's

Pois é, isso é muito doloroso, imagine um sistema complexo, onde existe inúmeras entidades, toda vez que criar uma ter que aplicar manualmente no <strong>onModelCreating</strong>,.., é bastante chato, e podemos esquecer rss 😏!!!<br>

Pois bem, existe uma forma de burlar isso, então teríamos que escrever um pouco de código, mas isso seria uma única vez.
```csharp
public class SampleDbContext : DbContext
{
    public SampleDbContext(DbContextOptions<SampleDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ApplyAllConfiguration(
            modelBuilder, 
            typeof(SampleDbContext).Assembly);
    }

    private void ApplyAllConfiguration(ModelBuilder modelBuilder, Assembly assembly)
    {
        var mappingTypes = assembly
            .GetTypes()
            .Where(x =>
                !x.IsAbstract
                && x.GetInterfaces()
                    .Any(y =>
                        y.GetTypeInfo().IsGenericType
                        && y.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>)));


        var entityMethod = typeof(ModelBuilder).GetMethods()
            .Single(x => x.Name == "Entity" &&
                    x.IsGenericMethod &&
                    x.ReturnType.Name == "EntityTypeBuilder`1");

        foreach (var mappingType in mappingTypes)
        {
            var genericTypeArg = mappingType.GetInterfaces().Single().GenericTypeArguments.Single();
            var genericEntityMethod = entityMethod.MakeGenericMethod(genericTypeArg);
            var entityBuilder = genericEntityMethod.Invoke(modelBuilder, null);
            var mapper = Activator.CreateInstance(mappingType);
            mapper.GetType().GetMethod("Configure").Invoke(mapper, new[] { entityBuilder });
        }
    }
}
```
## Então isso foi resolvido
Como falei anteriormente, na versão EFCore 2.2 saiu uma nova feature que resolve tudo isso, ficou mais clean, 
pouco código e tudo resolvido, veja que agora tudo faz mais sentido, graças ao <strong>ApplyConfigurationsFromAssembly</strong>.<br>
Exemplo:
```csharp
public class SampleDbContext : DbContext
{
    public SampleDbContext(DbContextOptions<SampleDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var assembly = typeof(SampleDbContext).Assembly;
        modelBuilder.ApplyConfigurationsFromAssembly(assembly);
    }
}
```
<div class="notice--warning">
<strong>FYI:</strong><br>
O método <strong>ApplyConfigurationsFromAssembly</strong> aceita 2 parâmetros, o primeiro é um <strong>Assembly</strong>, a partir dele o método fará a varredura das interfaces de configuração via <strong>Reflection</strong>, o segundo é um predicado onde você pode dizer quais configurações serão aplicadas.
</div>
<br><br> 
Pessoal, fico por aqui <strong>#mvp #mvpbr #mvpbuzz #efcore</strong>

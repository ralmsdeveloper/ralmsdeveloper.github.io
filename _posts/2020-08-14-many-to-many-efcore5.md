---
title: "Many To Many"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - EF5
  - Entity Framework Core
header:
  teaser: /assets/images/manytomanyef5.png
  caption: "www.ralms.net"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/manytomanyef5.png)
<h1>WIP</h1>
<hr /> 
<div class="notice--warning">
Nesse post irei falar sobre um dos recursos mais solicitados do <b>Entity Framework Core</b>, e que estará disponível na versão 5 do EF Core.
<br />
<strong>FYI:</strong>
Para o exemplo que será apresentado aqui estou utilizando build noturno veja <a href="https://github.com/dotnet/aspnetcore/blob/master/docs/DailyBuilds.md"  target="_BLANK">aqui</a>
o que você precisa fazer.
</div> 

## EF Core 3.1
<div style="text-align: justify;">
Até a versão EF Core 3.1, era necessário criar uma terceira classe para que o ORM conseguisse fazer o mapeado do modelo de dados corretamente, isso funcionava bem, mais os desenvolvedores não gostaram da ideia de conviver com essa nova abordagem, além de poluir seu domínio.
<br /><br />
</div>
## Cenário
<div style="text-align: justify;">
Vamos pensar em um cenário onde precisamos cadastrar alunos e cursos, logo um aluno poderá ter vários cursos, da mesma
forma um curso pode ter vários alunos, esse tipo de cardinalidade é utilizado para o relacionamento entre duas tabelas, 
geralmente você irá ver de forma <b>N:N</b> é como abreviamos.
</div>
## Como funcionava no EF Core 3.1?
Para o cenário que falei logo acima, temos as seguintes classes para representar nossas entidades, até aqui tudo bem, basicamente 
no mundo da programação orientada a objetos é assim que criamos nossas classes, bom até aqui nada de anormal, certo?!

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }

    public IList<CourseStudent> CourseStudents { get; } = new List<CourseStudent>();
}

public class Course
{
    public int Id { get; set; }
    public string Description { get; set; }

    public IList<CourseStudent> CourseStudents { get; } = new List<CourseStudent>();
}

public class CourseStudent
{
    public int CourseId { get; set; }
    public Course Course { get; set; }
    public int StudentId { get; set; }
    public Student Student { get; set; }
}
``` 
## Workaround
<div style="text-align: justify;">
O problema é que para que esse relacionamento realmente seja interpretado pelo EF Core até a versão 3.1, é necessário criar uma terceira classe "<b>CourseStudent</b>", e 
isso realmente é o que muitos não concordam em fazer, e concordo, pois a complexidade deveria ser de responsabilidade do </b>EF Core</b> resolver, também era necessário a 
configuração explícita com <b>Fluent API</b> para fazer o mapeamento correto de seu modelo de dados, já que o <b>EF Core</b> não era capaz de resolver, então era necessário fazer algo assim:
</div>
```csharp
public class SampleManyToManyContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Course { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CourseStudent>()
            .HasKey(p => new { p.CourseId, p.StudentId });

        modelBuilder.Entity<CourseStudent>()
            .HasOne(p => p.Student)
            .WithMany(p => p.CourseStudents)
            .HasForeignKey(p => p.StudentId);

        modelBuilder.Entity<CourseStudent>()
            .HasOne(p => p.Course)
            .WithMany(p => p.CourseStudents)
            .HasForeignKey(p => p.CourseId);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .UseSqlServer("Data source=(localdb)\\mssqllocaldb;Initial Catalog=SampleManyToMany31;Integrated Security=true");
}
``` 
Detalhe, mesmo que você tente expor sua entidade na propriedade <b>DbSet</b> de seu contexto, já que EF Core é capaz de
configurar seu modelo de dados com base nessas propriedades expostas em seu contexto, ele não era capaz de resolver 
esse mapeamento de forma automática para você, sendo assim necessário fazer a configuração acima, caso contrário você receberá o seguinte erro:
```csharp
System.InvalidOperationException: 'The entity type 'CourseStudent' requires a primary key to be defined. 
If you intended to use a keyless entity type call 'HasNoKey()'.'
```

## Equipe
A equipe do <b>Entity Framework Core</b> vem fazendo um excelente trabalho, sempre focado na qualidade e melhoria do ORM, para entregar para você uma ferramenta poderosa e performática, então tendo implementado outras diversas features ao produto, chegou a vez do Many-To-Many, e com um suporte e mapeamento mais adequado que anteriormente mostrado.
Inclusive você pode acompanhar a discussão sobre a feature <a href="https://github.com/dotnet/efcore/issues/1368" target="_BLANK">clicando aqui</a>.
## E agora como ficou?
O suporte many-to-many basicamente pode dizer que está finalizado, e será lançado oficialmente em novembro, mas como citei no topo desse post, você pode já experimentar usando builds noturnos,
nossas classes agora ficaram muito mais simples, com base nas classes apresentadas acima, fazendo pequenas alterações agora temos o seguinte:
```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }

    public IList<Course> Courses { get; } = new List<Course>();
}

public class Course
{
    public int Id { get; set; }
    public string Description { get; set; }

    public IList<Student> Students { get; } = new List<Student>();
}
```
E em nosso contexto basta apenas expor sua entitdade em uma propriedade DbSet da seguinte forma:
```csharp
public class SampleManyToManyContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Course { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .UseSqlServer("Data source=(localdb)\\mssqllocaldb;Initial Catalog=SampleManyToMany5;Integrated Security=true");
}
```
Ficou muito simples não é?!<br>
O <b>Entity Framework Core</b> agora é capaz de fazer o mapeamento correto apenas expondo nossas entidades em nosso contexto!


## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
</div> 

<br>

---
title: "Many-To-Many"
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
<hr /> 
<div class="notice--warning">
Nesse post irei falar sobre um dos recursos mais solicitados do <b>Entity Framework Core</b>, e que estará disponível na versão 5 do EF Core o Many-To-Many, ou, muitos-para-muitos.
<br /><br />
<strong>FYI:</strong>
Para o exemplo que será apresentado aqui estou utilizando build noturno
e você pode também instalar esses pacotes em seu projeto, assim você sempre terá a ultima compilação do projeto, para testar
todas funcionalidades novas que estão sendo implementadas, veja <a href="https://github.com/dotnet/aspnetcore/blob/master/docs/DailyBuilds.md"  target="_BLANK">aqui</a>
o que você precisa fazer.
</div> 

## EF Core 3.1
<div style="text-align: justify;">
Até a versão <b>EF Core 3.1</b>, era necessário criar uma terceira classe para que o ORM conseguisse fazer o mapeamento do modelo de dados corretamente, 
isso funcionava bem, mas os desenvolvedores não gostaram da ideia de conviver com essa nova abordagem, além de não ser a melhor abordagem para o que realmente é proposto,
dado que um dos objetivos ao usar um ORM é que ele fique com essa complexidade, assim ajudando manter um código mais limpo.
<br />
</div>
## Cenário
<div style="text-align: justify;">
Vamos pensar em um cenário onde precisamos cadastrar alunos e cursos, logo um aluno poderá ter vários cursos, da mesma
forma um curso pode ter vários alunos, esse tipo de cardinalidade é utilizado para o relacionamento entre duas entidades, 
geralmente você irá ver muitos exemplos assim "<b>N:N</b>", é como abreviamos.
</div>
## Como funcionava no EF Core 3.1?
<div style="text-align: justify;">
Para o cenário que falei logo acima, com o <b>EFCore 3.1</b> temos as seguintes classes para representar nossas entidades, e montar 
nosso relacionamento <b>N:N</b>, sendo assim classes abaixo são necessárias para configurar nosso modelo de dados.
</div>
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
## Work around
<div style="text-align: justify;">
O problema é que para que esse relacionamento realmente seja interpretado pelo EF Core 3.1 e seja capaz fazer o mapeamento correto do seu modelo de dados, é necessário criar uma terceira classe "<b>CourseStudent</b>", e 
isso realmente é o que muitos não concordam em fazer, e eu concordo plenamente com isso, pois essa complexidade o <b>Entity Framework Core</b> deveria ser capaz abstrair, também você era forçado a fazer uma
configuração explícita usando <b>Fluent API</b> para que o mapeamento correto do seu modelo de dados funcionasse, então já que o <b>Entity Framework Core</b> não era capaz de fazer esse mapeamento de forma mais 
inteligente, então era necessário fazer algo assim:
</div>
```csharp
public class SampleManyToManyContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Course { get; set; }

    // Configure Explicit
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
<div style="text-align: justify;">
Eu já falei em algumas palestras minhas, que se você apenas expor suas entidades em propriedades DbSet em seu contexto o <b>EF Core</b>
irá tentar fazer o mapeamento do seu modelo de dados automaticamente, mas, mesmo que você tente expor sua entidade na propriedade <b>DbSet</b> de seu contexto, 
já que <b>EF Core</b> é capaz de configurar seu modelo de dados com base nessas propriedades, ele irá tentar e falhará, ele não é capaz de resolver 
esse mapeamento <b>N:N</b> de forma automática para você, sendo assim necessário fazer a configuração acima, caso contrário você receberá o seguinte erro:
</div>
```csharp
System.InvalidOperationException: 'The entity type 'CourseStudent' requires a primary key to be defined. 
If you intended to use a keyless entity type call 'HasNoKey()'.'
```

## Equipe
<div style="text-align: justify;">
A equipe do <b>Entity Framework Core</b> vem fazendo um excelente trabalho, sempre focado na qualidade e melhoria do ORM, para entregar para você uma ferramenta poderosa e performática, então 
tendo implementado outras diversas features ao produto, chegou a vez do <b>Many-To-Many</b>, com um suporte e mapeamento mais adequado que anteriormente mostrado.
Inclusive você pode acompanhar a discussão sobre a feature <a href="https://github.com/dotnet/efcore/issues/1368" target="_BLANK">clicando aqui</a>, essa nova feature
está em boas mãos e está sendo desenvolvida e liderada por <b>Andriy Svyryd</b> e <b>Smit Patel</b>.
</div> 
## E agora como ficou?
<div style="text-align: justify;">
O suporte <b>N:N</b> basicamente posso dizer que está finalizado, dado que está em fase de <b>Release Candidate</b>, e será lançado oficialmente em novembro, mas como citei no topo 
desse post, você pode já experimentar usando builds noturnos, sendo assim nossas classes agora ficaram muito mais simples, com base nas classes apresentadas acima, 
fiz pequenas alterações, observe que para o contexto do que é realmente proposto fica muito mais legível, então nossas classes ficaram assim:
</div>
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
<b>Student</b> agora tem a lista de <b>Courses</b> e não mais a lista de uma terceira classe, da mesma forma <b>Course</b> agora tem a lista de <b>Students</b>, isso
faz muito mais sentido.<br>
Veja também como nosso contexto ficou muito mais simples, basta apenas expor as entitdades em uma propriedade DbSet da seguinte forma:
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
O <b>Entity Framework Core</b> agora é capaz de fazer o mapeamento correto apenas expondo nossas entidades em nosso contexto, observe que não precisei configurar nada 
no exemplo acima, isso porque o <b>Entity Framework Core</b> por conversão já faz todo mapemento pra gente de forma automatizada.
## Mepeamento Explícito
Eu sou capaz de fazer essa junção de tabelas explicitamente?<br>
A resposta é sim, e é muito simples de fazer isso, Veja um exemplo completo, onde eu criei mais uma classe <b>CourseStudent</b> que contém algumas 
propriedades adicionais como <b>Protocol</b> e <b>CreatedAt</b> e usando <b>Fluent API</b> você pode fazer o mapeamento explicitamente,
observe que agora eu tenho um novo método de extensão para fazer isso que é o <b>UsingEntity</b> vejo o exemplo:
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

public class CourseStudent
{
    public int CourseId { get; set; }
    public int StudentId { get; set; }
    public string Protocol { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class SampleManyToManyContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure Explicit
        modelBuilder
            .Entity<Student>()
            .HasMany(p => p.Courses)
            .WithMany(p => p.Students)
            .UsingEntity<CourseStudent>(
                p => p.HasOne<Course>().WithMany(),
                p => p.HasOne<Student>().WithMany());

        modelBuilder
            .Entity<CourseStudent>(p =>
            {
                p.Property(e => e.Protocol).HasColumnType("VARCHAR(32)");
                p.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            });              
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .EnableSensitiveDataLogging() // Show Data
            .LogTo(Console.WriteLine, new[] { RelationalEventId.CommandExecuted })
            .UseSqlServer("Data source=(localdb)\\mssqllocaldb;Initial Catalog=SampleManyToManyExplicit5;Integrated Security=true");
}

static void Main(string[] args)
{
    using var db = new SampleManyToManyContext();
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();

    var students = db.Students.Include(p => p.Courses).ToList();
    var courses = db.Courses.Include(p => p.Students).ToList();
    var courseStudent = db.Set<CourseStudent>().FirstOrDefault();

    var protocol = courseStudent.Protocol;
    var createdAt = courseStudent.CreatedAt;
}
```
## Links
Many-To-Many está sendo rastreado em:<br>
<a alt="" href="https://github.com/dotnet/efcore/issues/10508">Issue-10508</a><br />
<a alt="" href="https://github.com/dotnet/efcore/issues/1368">Issue-1368</a><br /><br />
Build noturno clique <a href="https://github.com/dotnet/aspnetcore/blob/master/docs/DailyBuilds.md"  target="_BLANK">aqui</a>

## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
</div> 

<br>

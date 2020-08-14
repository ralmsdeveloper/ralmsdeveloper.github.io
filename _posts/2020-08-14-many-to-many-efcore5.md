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
<div class="notice--success">
Nesse post irei falar sobre um dos recursos mais solicitados do <b>Entity Framework Core</b>, e que estará disponível na versão 5 do EF Core.
Para o exemplo que será apresentado aqui estou utilizando build noturno veja <a href="https://github.com/dotnet/aspnetcore/blob/master/docs/DailyBuilds.md">aqui</a>
o que você precisa fazer.
</div> 

## Versão anterior
<div style="text-align: justify;">
Até a versão EF Core 3.1, era necessário criar uma terceira class para que o ORM conseguisse fazer o mapeado do modelo de dados corretamente, isso funcionava bem, mais os desenvolvedores
não gostaram da ideia de conviver com essa nova abordagem, além de poluir seu dominio.
<br /><br />
</div>
## Cenário
Vamos pensar em um cenário onde precisamos cadastrar alunos e cursos, logo um aluno poderá ter varios cursos, da mesma
forma um curso pode ter vários alunos, esse tipo de cardinalidade é utilizado para o relacionamento entre duas tabelas, 
geralmente você irá ver de forma <b>N:N</b> é como abreviamos.


## Como funcionava no EF Core 3.1?
 Para o cenário que falei logo acima, temos as seguintes classes para representar nossas entidades, até aqui tudo bem, basicamente 
 no mundo da programação orienta a objetos é assim que criamos nossas classes, bom até aqui nada de anormal, certo?!
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
O problema é que para que esse relacionamento realmente seja interpretado pelo EF Core até a versão 3.1, é necessário criar uma terceira classe, basicamente da seguinte forma:
```csharp
public class CourseStudent
{
    public int CourseId { get; set; }
    public Course Course { get; set; }
    public int StudentId { get; set; }
    public Student Student { get; set; }
} 
``` 
E isso realmente é o que muitos não concordam em fazer, também era necessário a configuração explicita com Fluent API para fazer o mapeamento correto de seu modelo de dados.
## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
</div> 

<br>

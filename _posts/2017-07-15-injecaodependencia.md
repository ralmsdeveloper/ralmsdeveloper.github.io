---
title: "Injeção de Dependência Asp.Net Core 2 (Razor)"
comments: false
excerpt_separator: "Ler mais"
categories:
  - Razor
tags:
  - Razor
  - .Net Core
---

![01]({{ site.url }}{{ site.baseurl }}/assets/images/aspnetcore.png)

Fala Pessoal, Tudo Bem?!

Nesse pequeno post irei mostrar como utilizar injeção de dependência em uma página.

Para isso antes de tudo vamos criar uma Interface e uma Classe.
Eu criei um arquivo ExemploService.cs para exemplo.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace ExemploInjecaoDeDependencia
{
    public interface IExemploService
    {
        List<SelectListItem> Estados { get; }
    }
    public class ExemploService : IExemploService
    {
        public List<SelectListItem> Estados
        {
            get => new List<SelectListItem>
            {
                new SelectListItem {Value = "12", Text = "Acre"},
                new SelectListItem {Value = "27", Text = "Alagoas"},
                new SelectListItem {Value = "13", Text = "Amazonas"},
                new SelectListItem {Value = "16", Text = "Amapá"},
                new SelectListItem {Value = "29", Text = "Bahia"},
                new SelectListItem {Value = "23", Text = "Ceará"},
                new SelectListItem {Value = "53", Text = "Distrito Federal"},
                new SelectListItem {Value = "32", Text = "Espírito Santo"},
                new SelectListItem {Value = "52", Text = "Goiás"},
                new SelectListItem {Value = "21", Text = "Maranhão"},
                new SelectListItem {Value = "31", Text = "Minas Gerais"},
                new SelectListItem {Value = "50", Text = "Mato Grosso do Sul"},
                new SelectListItem {Value = "51", Text = "Mato Grosso"},
                new SelectListItem {Value = "15", Text = "Pará"},
                new SelectListItem {Value = "25", Text = "Paraíba"},
                new SelectListItem {Value = "26", Text = "Pernambuco"},
                new SelectListItem {Value = "22", Text = "Piauí"},
                new SelectListItem {Value = "41", Text = "Paraná"},
                new SelectListItem {Value = "33", Text = "Rio de Janeiro"},
                new SelectListItem {Value = "24", Text = "Rio Grande do Norte"},
                new SelectListItem {Value = "11", Text = "Rondônia"},
                new SelectListItem {Value = "14", Text = "Roraima"},
                new SelectListItem {Value = "43", Text = "Rio Grande do Sul"},
                new SelectListItem {Value = "42", Text = "Santa Catarina"},
                new SelectListItem {Value = "28", Text = "Sergipe"},
                new SelectListItem {Value = "35", Text = "São Paulo"},
                new SelectListItem {Value = "17", Text = "Tocantis"}
            };
        }
    }
}
```

Agora iremos precisar adicionar o serviço em nosso **Startup.cs** no método ConfigureServices, O meu ficou assim!

```csharp
 public void ConfigureServices(IServiceCollection services)
 {
     services.AddMvc();
     services.AddScoped<IExemploService, ExemploService>();
 }
```

Vamos agora injetar o serviço em nossa página, veja um pequeno Exemplo:

```html
@page
@model IndexModel
@inject IExemploService Exemplo
@{
    ViewData["Title"] = "Home page";
}
<h3>Estados</h3>
<select name="estados">
    @foreach (var item in Exemplo.Estados)
    {
        <option value="@item.Value">@item.Text</option>
    }
</select> 
```

**O resultado é esse:**

![01]({{ site.url }}{{ site.baseurl }}/assets/images/exemploselect.png)

Dica:
Razor Pages é uma nova implementação do ASP.NET Core MVC, mais leve, Em minha opinião se tornou muito mais produtivo o desenvolvimento em muitos cenários além de ser mais limpo.
Caso queira usar uma função dentro de sua página Razor, é simples:

```csharp
@page
@model IndexModel 
@functions {
    public string OlaMundo()
    {
        return "Olá Pessoal";
    }
}
<div>:) @OlaMundo()</div>
```

Espero que goste 🙂 até a próxima…
---
title: "Razor + EntityFramework Core 2.0"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Razor
tags:
  - Razor, Asp.NET
---


![01](http://blog.ralms.net/wp-content/uploads/2017/09/razorpage.png)

## Básico Razor  + EntityFramworkCore 2.0

Olá pessoal tudo bem?!

Resolvi escrever esse pequeno post sobre **Razor** para os iniciantes no mundo Asp.Net CORE!!!

**ESTE É UM ARTIGO BÁSICO, DESTINADO A INICIANTES**

**Razor Page** é uma nova engine do **ASP.NET Core MVC** que torna a codificação de em alguns cenários focados em páginas web, mais fácil e mais produtiva.

Nesse nosso exemplo estou utilizando o **Asp.Net Core 2.0**, e a versão do Visual Studio 2017 mais atualizada.

Estaremos usando também o **FirebirdSQL** como Banco de dados principal, e para conectar usaremos o
provedor que desenvolvi para o **EntityFramework Core** que é o <a href="https://github.com/ralmsdeveloper/EntityFrameworkCore.FirebirdSQL">EntityFrameworkCore.FirebirdSql</a>.

Além disso, quero dizer que o projeto é open source, e está disponivel no [Github](https://github.com/ralmsdeveloper/EntityFrameworkCore.FirebirdSQL)


Sem mais delongas vamos por a mão na massa.

Neste tutotial resolvi fazer passo-a-passo usando imagens como ilustração.

**"É simples, porém util!"**

Sendo assim com seu Visual Studio aberto, siga os passos abaixo!

![01](http://blog.ralms.net/wp-content/uploads/2017/09/01.png)

![01](http://blog.ralms.net/wp-content/uploads/2017/09/02.png)

![01](http://blog.ralms.net/wp-content/uploads/2017/09/03.png)

![01](http://blog.ralms.net/wp-content/uploads/2017/09/04.png)


**Para ver o projeto rodando execute: CTRL + F5**


![01](http://blog.ralms.net/wp-content/uploads/2017/09/05.png)

**Precisamos adicionar os seguintes Pacotes:**

 - Microsoft.EntityFrameworkCore
 - EntityFrameworkCore.FirebirdSql


Estarei mostrando como fazer isso aqui no exemplo abaixo.

![01](http://blog.ralms.net/wp-content/uploads/2017/09/06.png)


![01](http://blog.ralms.net/wp-content/uploads/2017/09/07.png)


Vamos começar a criar os arquivos necessários para o funcionamento de nosso pequeno sistema.

Crie uma pasta chamada **Models** com dois arquivos .cs **"Grupo.cs e Produto.cs"**

![01](http://blog.ralms.net/wp-content/uploads/2017/09/11_PASTA_MODELS.png)

Vamos criar as classes que iremos utilizar e que servirão como nossas tabelas posteriormente: **Grupo e Produto**

```csharp
using System.ComponentModel;

namespace CadastroDeProduto.Models
{
    public class Grupo
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
    }
}
```

```csharp
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CadastroDeProduto.Models
{
    public class Produto
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string DescricaoProduto { get; set; }

        public decimal Valor { get; set; }
        public int Quantidade { get; set; }

        public int GrupoId { get; set; }
        public virtual Grupo Grupo { get; set; }
    }
}
```

Vamos criar nossas **Razor Pages**?!

Pois bem crie duas pastas dentro da pasta **Pages**, uma com o nome **Grupo** e outra **Produto**.

![01](http://blog.ralms.net/wp-content/uploads/2017/09/10_DIRETORIO_PAGES_GRUPO_PRODUTO.png)

Dentro de cada pasta iremos criar nossos arquivos **Razor Page**

Para criar o arquivo clique com o direto do mouse sobre a pasta **Grupo** depois Adicionar->Novo Item.

![01](http://blog.ralms.net/wp-content/uploads/2017/09/09_CREATE_NEW_RAZOR.png)

Nosso primeiro arquivo será o **Index.cshtml** como a imagem ilustrada abaixo.

![01](http://blog.ralms.net/wp-content/uploads/2017/09/12_PAGINA_INDEX_EXEMPLO.png)

Criada a primeira página repita o mesmo procedimento para as seguintes.

<em>Create,Delete,Details,Edit</em> feito isso crie os mesmos arquivos dentro da
pasta **Produto**.

No final deveremos ter algo assim:

![01](http://blog.ralms.net/wp-content/uploads/2017/09/08-1.png)

Esses são os códigos de cada arquivos:

**ARQUIVOS GRUPO**

Index.cshtml/Index.cshtml.cs:
```html
@page
@model CadastroDeProduto.Pages.Grupo.IndexModel
@{
    ViewData["Title"] = "Grupos Cadastrados";
}
<h2>Grupos Cadastrados</h2>
<p>
    <a asp-page="Create">Novo Grupo</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(modelItem => modelItem.Grupo[0].Descricao)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model.Grupo)
        {
            <tr>
                <td>
                    @Html.DisplayFor(modelItem => item.Descricao)
                </td>
                <td>
                    <a asp-page="./Edit" asp-route-id="@item.Id">Editar</a> |
                    <a asp-page="./Details" asp-route-id="@item.Id">Visualizar</a> |
                    <a asp-page="./Delete" asp-route-id="@item.Id">Deletar</a>
                </td>
            </tr>
}
    </tbody>
</table>
```

```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using CadastroDeProdutos;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore; 

namespace CadastroDeProduto.Pages.Grupo
{
    public class IndexModel : PageModel
    {
        private readonly ExemploContext _context;

        public IndexModel(ExemploContext context)
        {
            _context = context;
        }

        public IList<Models.Grupo> Grupo { get;set; }

        public async Task OnGetAsync()
        {
            Grupo = await _context.Grupo.ToListAsync();
        }
    }
}
```

Create.cshtml/Create.cshtml.cs:
```html
@page
@model CadastroDeProduto.Pages.Grupo.CreateModel

@{
    ViewData["Title"] = "Cadastro";
}

<h2>Página Cadastro</h2> 
<h4>Grupo</h4>
<hr />

<div class="row">
    <div class="col-md-4">
        <form method="post"> 
            <div class="form-group">
                <label asp-for="Grupo.Descricao" class="control-label"></label>
                <input asp-for="Grupo.Descricao" class="form-control" /> 
            </div>
            <div class="form-group">
                <input type="submit" value="Gravar" class="btn btn-default" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-page="Index">Voltar para Lista</a>
</div>
```

```csharp
using System.Threading.Tasks;
using CadastroDeProdutos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CadastroDeProduto.Pages.Grupo
{
    public class CreateModel : PageModel
    {
        private readonly ExemploContext _context;

        public CreateModel(ExemploContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Models.Grupo Grupo { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Grupo.Add(Grupo);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
```

Delete.cshtml/Delete.cshtml.cs:
```html
@page
@model CadastroDeProduto.Pages.Grupo.DeleteModel

@{
    ViewData["Title"] = "Delete";
}

<h2>Página Exclusão</h2>

<h3>Deseja Realmente Excluir Este Registro?</h3>
<div>
    <h4>Grupo</h4>
    <hr />
    <dl class="dl-horizontal">
        <dt>
            @Html.DisplayNameFor(model => model.Grupo.Descricao)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Grupo.Descricao)
        </dd>
    </dl>

    <form method="post">
        <input type="hidden" asp-for="Grupo.Id" />
        <input type="submit" value="Excluir" class="btn btn-default" /> |
        <a asp-page="./Index">Voltar para Lista</a>
    </form>
</div>
```

```csharp
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CadastroDeProdutos;

namespace CadastroDeProduto.Pages.Grupo
{
    public class DeleteModel : PageModel
    {
        private readonly ExemploContext _context;

        public DeleteModel(ExemploContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Models.Grupo Grupo { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Grupo = await _context.Grupo.SingleOrDefaultAsync(m => m.Id == id);

            if (Grupo == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Grupo = await _context.Grupo.FindAsync(id);

            if (Grupo != null)
            {
                _context.Grupo.Remove(Grupo);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
```

Details.cshtml/Details.cshtml.cs:
```html
@page
@model CadastroDeProduto.Pages.Grupo.DetailsModel

@{
    ViewData["Title"] = "Detalhe";
}

<h2>Detalhe</h2> 
<div>
    <h4>Grupo</h4>
    <hr />
    <dl class="dl-horizontal">
        <dt>
            @Html.DisplayNameFor(model => model.Grupo.Descricao)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Grupo.Descricao)
        </dd>
    </dl>
</div>
<div>
    <a asp-page="./Edit" asp-route-id="@Model.Grupo.Id">Editar</a> |
    <a asp-page="./Index">Voltar para Lista</a>
</div>

```

```csharp
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CadastroDeProdutos;

namespace CadastroDeProduto.Pages.Grupo
{
    public class DetailsModel : PageModel
    {
        private readonly ExemploContext _context;

        public DetailsModel(ExemploContext context)
        {
            _context = context;
        }

        public Models.Grupo Grupo { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Grupo = await _context.Grupo.SingleOrDefaultAsync(m => m.Id == id);

            if (Grupo == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}


```

Edit.cshtml/Edit.cshtml.cs:
```html
@page
@model CadastroDeProduto.Pages.Grupo.EditModel

@{
    ViewData["Title"] = "Editar";
}

<h2>Editar</h2> 
<h4>Grupo</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post"> 
            <input type="hidden" asp-for="Grupo.Id" />
            <div class="form-group">
                <label asp-for="Grupo.Descricao" class="control-label"></label>
                <input asp-for="Grupo.Descricao" class="form-control" /> 
            </div>
            <div class="form-group">
                <input type="submit" value="Gravar" class="btn btn-default" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-page="./Index">Voltar para Lista</a>
</div> 

```

```csharp
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CadastroDeProdutos;

namespace CadastroDeProduto.Pages.Grupo
{
    public class EditModel : PageModel
    {
        private readonly ExemploContext _context;

        public EditModel(ExemploContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Models.Grupo Grupo { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Grupo = await _context.Grupo.SingleOrDefaultAsync(m => m.Id == id);

            if (Grupo == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(Grupo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

            }

            return RedirectToPage("./Index");
        }
    }
}


```

<br>


**ARQUIVOS PRODUTOS**

Index.cshtml/Index.cshtml.cs:
```html
@page
@model CadastroDeProduto.Pages.Produto.IndexModel
@{
    ViewData["Title"] = "Produtos Cadastrados";
}
<h2>Grupos Cadastrados</h2>
<p>
    <a asp-page="Create">Novo Produto</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.Produto[0].DescricaoProduto)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Produto[0].Valor)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Produto[0].Quantidade)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Produto[0].Grupo)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model.Produto)
        {
            <tr>
                <td>
                    @Html.DisplayFor(modelItem => item.DescricaoProduto)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Valor)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Quantidade)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Grupo.Descricao)
                </td>
                <td>
                    <a asp-page="./Edit" asp-route-id="@item.Id">Editar</a> |
                    <a asp-page="./Details" asp-route-id="@item.Id">Visualizar</a> |
                    <a asp-page="./Delete" asp-route-id="@item.Id">Deletar</a>
                </td>
            </tr>
}
    </tbody>
</table>

```

```csharp 
using System.Collections.Generic;
using System.Threading.Tasks;
using CadastroDeProdutos;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace CadastroDeProduto.Pages.Produto
{
    public class IndexModel : PageModel
    {
        private readonly ExemploContext _context;

        public IndexModel(ExemploContext context)
        {
            _context = context;
        }

        public IList<Models.Produto> Produto { get;set; }

        public async Task OnGetAsync()
        {
            Produto = await _context.Produto.Include(p => p.Grupo).ToListAsync();
        }
    }
}
 
```

Create.cshtml/Create.cshtml.cs:
```html 
@page
@model CadastroDeProduto.Pages.Produto.CreateModel

@{
    ViewData["Title"] = "Create";
}

<h2>Página Cadastro</h2>

<h4>Produto</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post"> 
            <div class="form-group">
                <label asp-for="Produto.DescricaoProduto" class="control-label"></label>
                <input asp-for="Produto.DescricaoProduto" class="form-control" /> 
            </div>
            <div class="form-group">
                <label asp-for="Produto.Valor" class="control-label"></label>
                <input asp-for="Produto.Valor" class="form-control" /> 
            </div>
            <div class="form-group">
                <label asp-for="Produto.Quantidade" class="control-label"></label>
                <input asp-for="Produto.Quantidade" class="form-control" /> 
            </div>
            <div class="form-group">
                <label asp-for="Produto.GrupoId" class="control-label"></label>
                <select asp-for="Produto.GrupoId" class ="form-control" asp-items="ViewBag.GrupoId"></select>
            </div>
            <div class="form-group">
                <input type="submit" value="Gravar" class="btn btn-default" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-page="./Index">Voltar para Lista</a>
</div>
```

```csharp
using System.Threading.Tasks;
using CadastroDeProdutos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CadastroDeProduto.Pages.Produto
{
    public class CreateModel : PageModel
    {
        private readonly ExemploContext _context;

        public CreateModel(ExemploContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
        ViewData["GrupoId"] = new SelectList(_context.Grupo, "Id", "Descricao");
            return Page();
        }

        [BindProperty]
        public Models.Produto Produto { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Produto.Add(Produto);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
```

Delete.cshtml/Delete.cshtml.cs:
```html 
@page
@model CadastroDeProduto.Pages.Produto.DeleteModel

@{
    ViewData["Title"] = "Delete";
}

<h2>Página Exclusão</h2>
<h3>Deseja Realmente Excluir Este Registro?</h3>
<div>
    <h4>Produto</h4>
    <hr />
    <dl class="dl-horizontal">
        <dt>
            @Html.DisplayNameFor(model => model.Produto.DescricaoProduto)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Produto.DescricaoProduto)
        </dd>
        <dt>
            @Html.DisplayNameFor(model => model.Produto.Valor)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Produto.Valor)
        </dd>
        <dt>
            @Html.DisplayNameFor(model => model.Produto.Quantidade)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Produto.Quantidade)
        </dd>
        <dt>
            @Html.DisplayNameFor(model => model.Produto.Grupo)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Produto.Grupo.Id)
        </dd>
    </dl>
    
    <form method="post">
        <input type="hidden" asp-for="Produto.Id" />
        <input type="submit" value="Delete" class="btn btn-default" /> |
        <a asp-page="./Index">Voltar para Lista</a>
    </form>
</div>

```

```csharp 
using System.Threading.Tasks;
using CadastroDeProdutos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore; 

namespace CadastroDeProduto.Pages.Produto
{
    public class DeleteModel : PageModel
    {
        private readonly ExemploContext _context;

        public DeleteModel(ExemploContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Models.Produto Produto { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Produto = await _context.Produto
                .Include(p => p.Grupo).SingleOrDefaultAsync(m => m.Id == id);

            if (Produto == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Produto = await _context.Produto.FindAsync(id);

            if (Produto != null)
            {
                _context.Produto.Remove(Produto);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}

```

Details.cshtml/Details.cshtml.cs:
```html 
@page
@model CadastroDeProduto.Pages.Produto.DetailsModel

@{
    ViewData["Title"] = "Details";
}

<h2>Detalhe</h2>

<div>
    <h4>Produto</h4>
    <hr />
    <dl class="dl-horizontal">
        <dt>
            @Html.DisplayNameFor(model => model.Produto.DescricaoProduto)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Produto.DescricaoProduto)
        </dd>
        <dt>
            @Html.DisplayNameFor(model => model.Produto.Valor)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Produto.Valor)
        </dd>
        <dt>
            @Html.DisplayNameFor(model => model.Produto.Quantidade)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Produto.Quantidade)
        </dd>
        <dt>
            @Html.DisplayNameFor(model => model.Produto.Grupo)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Produto.Grupo.Descricao)
        </dd>
    </dl>
</div>
<div>
    <a asp-page="./Edit" asp-route-id="@Model.Produto.Id">Editar</a> |
    <a asp-page="./Index">Voltar para Lista</a>
</div>

```

```csharp 
using System.Threading.Tasks;
using CadastroDeProdutos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace CadastroDeProduto.Pages.Produto
{
    public class DetailsModel : PageModel
    {
        private readonly ExemploContext _context;

        public DetailsModel(ExemploContext context)
        {
            _context = context;
        }

        public Models.Produto Produto { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Produto = await _context.Produto .Include(p => p.Grupo).SingleOrDefaultAsync(m => m.Id == id);

            if (Produto == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}

```

Edit.cshtml/Edit.cshtml.cs:
```html 
@page
@model CadastroDeProduto.Pages.Produto.EditModel

@{
    ViewData["Title"] = "Editar";
}

<h2>Editar</h2>

<h4>Produto</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post"> 
            <input type="hidden" asp-for="Produto.Id" />
            <div class="form-group">
                <label asp-for="Produto.DescricaoProduto" class="control-label"></label>
                <input asp-for="Produto.DescricaoProduto" class="form-control" /> 
            </div>
            <div class="form-group">
                <label asp-for="Produto.Valor" class="control-label"></label>
                <input asp-for="Produto.Valor" class="form-control" /> 
            </div>
            <div class="form-group">
                <label asp-for="Produto.Quantidade" class="control-label"></label>
                <input asp-for="Produto.Quantidade" class="form-control" /> 
            </div>
            <div class="form-group">
                <label asp-for="Produto.GrupoId" class="control-label"></label>
                <select asp-for="Produto.GrupoId" class="form-control" asp-items="ViewBag.GrupoId"></select> 
            </div>
            <div class="form-group">
                <input type="submit" value="Gravar" class="btn btn-default" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-page="./Index">Voltar para Lista</a>
</div>

```

```csharp 
using System.Threading.Tasks;
using CadastroDeProdutos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CadastroDeProduto.Pages.Produto
{
    public class EditModel : PageModel
    {
        private readonly ExemploContext _context;

        public EditModel(ExemploContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Models.Produto Produto { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Produto = await _context.Produto
                .Include(p => p.Grupo).SingleOrDefaultAsync(m => m.Id == id);

            if (Produto == null)
            {
                return NotFound();
            }
           ViewData["GrupoId"] = new SelectList(_context.Grupo, "Id", "Descricao");
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(Produto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

            }

            return RedirectToPage("./Index");
        }
    }
}

```

<br>


<strong><em>Arquivo Startup.cs</em></strong><br>
```csharp
using CadastroDeProdutos;
using EntityFrameworkCore.FirebirdSql.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CadastroDeProduto
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; } 

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString =  $"User=SYSDBA;Password=masterkey;Database=localhost:{System.IO.Directory.GetCurrentDirectory()}\\CadastroProduto.fdb;" +
                                    "DataSource=localhost;Port=3050;Dialect=3;ServerType=0";

            services.AddEntityFrameworkFirebird()
                    .AddDbContext<ExemploContext>(options => options.UseFirebird(connectionString));

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}

```

**Arquivo ExemploContext.cs**

```csharp

using CadastroDeProduto.Models;
using Microsoft.EntityFrameworkCore;

namespace CadastroDeProdutos
{
    public sealed class ExemploContext : DbContext
    {
        public ExemploContext(DbContextOptions<ExemploContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Produto> Produto { get; set; }
        public DbSet<Grupo> Grupo { get; set; }
    }
}


```


**Estrutura de Diretórios do Projeto**

<img src="http://blog.ralms.net/wp-content/uploads/2017/09/EstruturaGeral.png" alt="" width="682" class="alignnone size-full wp-image-147" />

Obrigado pela leitura, e um forte abraço!


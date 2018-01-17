---
title: "Maratona de Bots"
comments: true
excerpt_separator: "Ler mais"
categories:
  - News
tags:
  - News
---

## Básico Razor


Olá Pessoal Resolvi escrever esse post sobre Razor para iniciantes no mundo .Net Core, Razor Page é uma nova engine do ASP.NET Core MVC que torna a codificação de cenários focados em páginas web mais fácil e mais produtiva.

Nesse exemplo estou utilizando o .NET Core 2.0.0, e a versão do Visual Studio 2017 mais atualizada.

Nesse exemplo estaremos usando Firebird como Banco de dados, e para conectar usaremos um
conector que desenvolvi para o EntityFrameworkCore que é o <a href="https://github.com/ralmsdeveloper/EntityFrameworkCore.FirebirdSQL">EntityFrameworkCore.FirebirdSql</a>.


Sem mais delongas vamos por a mão na massa. "É SIMPLES, MAIS DIRETO!!!"

![01](http://blog.ralms.net/wp-content/uploads/2017/09/01.png)

![01](http://blog.ralms.net/wp-content/uploads/2017/09/02.png)

![01](http://blog.ralms.net/wp-content/uploads/2017/09/03.png)

![01](http://blog.ralms.net/wp-content/uploads/2017/09/04.png)

<strong>Para ver o projeto rodando execute:</strong> <em>CTRL + F5</em>

<img class="alignnone wp-image-135" src="http://blog.ralms.net/wp-content/uploads/2017/09/05.png" alt="" width="687" height="496" />

&nbsp;

<strong>Precisamos adicionar os seguintes Pacotes:</strong>
<em> (Microsoft.EntityFrameworkCore e o EntityFrameworkCore.FirebirdSql)</em>

Como mostro no exemplo abaixo.

<img class="alignnone wp-image-136" src="http://blog.ralms.net/wp-content/uploads/2017/09/06.png" alt="" width="686" height="545" />

<img class="alignnone wp-image-137" src="http://blog.ralms.net/wp-content/uploads/2017/09/07.png" alt="" width="681" height="542" />

<strong>Vamos começar a criar os arquivos necessários para o funcionamento de nosso pequeno sistema.</strong>

Crie uma pasta chamada <em><strong>Models</strong></em> com dois arquivos .cs <em><strong>"Grupo.cs e Produto.cs"</strong></em>

<img class="alignnone  wp-image-141" src="http://blog.ralms.net/wp-content/uploads/2017/09/11_PASTA_MODELS.png" alt="" width="691" height="526" />

Vamos criar as Classes que iremos utilizar: <em><strong>Grupo e Produto</strong></em>.

[csharp]
using System.ComponentModel;

namespace CadastroDeProduto.Models
{
    public class Grupo
    {
	    public int Id { get; set; }
		 
	    public string Descricao { get; set; }
	}
}


[/csharp]

[csharp]
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


[/csharp]

Vamos criar nossas "<em><strong>Razor Pages</strong></em>", crie duas Pasta dentro da pasta "<em><strong>Pages</strong></em>", uma
com o nome <strong><em>Grupo</em></strong> e outra <em><strong>Produto</strong></em>.

<img class="alignnone  wp-image-142" src="http://blog.ralms.net/wp-content/uploads/2017/09/10_DIRETORIO_PAGES_GRUPO_PRODUTO.png" alt="" width="674" height="514" />

Dentro de cada pasta iremos criar nossos arquivos "<em><strong>Razor  Page</strong></em>"

Para criar o arquivo clique com o Direto do Mouse Sobre a <em>Pasta Grupo/Adicionar/Novo Item.</em>

<img class="alignnone  wp-image-143" src="http://blog.ralms.net/wp-content/uploads/2017/09/09_CREATE_NEW_RAZOR.png" alt="" width="677" height="521" />

Nosso primeiro arquivo Será o <em><strong>Index.cshtml</strong></em> como a imagem ilustrada abaixo.

<img class="alignnone  wp-image-144" src="http://blog.ralms.net/wp-content/uploads/2017/09/12_PAGINA_INDEX_EXEMPLO.png" alt="" width="682" height="473" />

Criada a primeira página repita o mesmo procedimento para as seguintes.

<em>Create,Delete,Details,Edit</em> feito isso crie os mesmos arquivos dentro da
pasta <strong>Produto</strong>.

No final deveremos ter algo assim:

<img class="alignnone  wp-image-145" src="http://blog.ralms.net/wp-content/uploads/2017/09/08-1.png" alt="" width="686" height="535" />

Esses são os códigos de cada arquivos:

<strong>ARQUIVOS GRUPO</strong>

Index.cshtml/Index.cshtml.cs:
[html]
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

[/html]

[csharp]
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


[/csharp]

Create.cshtml/Create.cshtml.cs:
[html]
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
 


[/html]

[csharp]
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
[/csharp]

Delete.cshtml/Delete.cshtml.cs:
[html]
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

[/html]

[csharp]
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


[/csharp]

Details.cshtml/Details.cshtml.cs:
[html]
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

[/html]

[csharp]
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


[/csharp]

Edit.cshtml/Edit.cshtml.cs:
[html]
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

[/html]

[csharp]
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


[/csharp]

&nbsp;<br>


<strong>ARQUIVOS PRODUTO</strong>

Index.cshtml/Index.cshtml.cs:
[html]  
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

[/html]

[csharp] 
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
 
[/csharp]

Create.cshtml/Create.cshtml.cs:
[html] 
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
[/html]

[csharp] 
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
[/csharp]

Delete.cshtml/Delete.cshtml.cs:
[html] 
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

[/html]

[csharp] 
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

[/csharp]

Details.cshtml/Details.cshtml.cs:
[html] 
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

[/html]

[csharp] 
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

[/csharp]

Edit.cshtml/Edit.cshtml.cs:
[html] 
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

[/html]

[csharp] 
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

[/csharp]

&nbsp;<br>


<strong><em>Arquivo Startup.cs</em></strong><br>
[csharp]
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

[/csharp]

<strong><em>Arquivo ExemploContext.cs</em></strong><br>

[csharp] 

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


[/csharp]

<br><strong><em>Estrutura de Diretórios do Projeto</em></strong><br>
&nbsp; 
<img src="http://blog.ralms.net/wp-content/uploads/2017/09/EstruturaGeral.png" alt="" width="682" class="alignnone size-full wp-image-147" />
&nbsp;
&nbsp;

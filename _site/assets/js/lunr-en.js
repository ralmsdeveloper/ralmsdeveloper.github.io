var idx = lunr(function () {
  this.field('title', {boost: 10})
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')
});



  
  
    idx.add({
      title: "Compressão de Dados",
      excerpt: "Quero falar hoje sobre um assunto bastante interessante “ESPAÇO”, isso mesmo. Nos dias de hoje com HDs/SSDS para armazenamentos não...",
      categories: ["CSharp"],
      tags: ["CSharp"],
      id: 0
    });
    
  
    idx.add({
      title: "Códigos de Rejeição da Sefaz",
      excerpt: "201 – Rejeição: Número máximo de numeração de NF-e a inutilizar ultrapassou o limite Essa rejeição ocorre quando a quantidade...",
      categories: ["Sefaz"],
      tags: ["Sefaz"],
      id: 1
    });
    
  
    idx.add({
      title: "Dados Binário em .Net Core",
      excerpt: "Boa noite, Olhando para tantas novidades no .Net Core hoje resolvi escrever esse pequeno post, onde mostro como criar e...",
      categories: ["CSharp"],
      tags: ["CSharp"],
      id: 2
    });
    
  
    idx.add({
      title: "EntityFrameworkCore For FirebirdSQL",
      excerpt: "EntityFrameworkCore For FirebirdSQL Lançamento EntityFrameworkCore for FirebirdSQL Com enorme prazer que venho informar que hoje o EntityframworkCore.FirebirdSQL está disponível, tomei...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 3
    });
    
  
    idx.add({
      title: "Query Compilada no EntityFrameworkCore 2.0",
      excerpt: "Recentemente publiquei um pequeno artigo no portal IMASTERS, mostrando o ganho de performance que ganhamos quando utilizamos corretamente a função...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 4
    });
    
  
    idx.add({
      title: "SQL Injection EntityFrameworkCore",
      excerpt: "Olá pessoal! Isso não é um ARTIGO, é uma dica. Hoje quero falar sobre um assunto bastante pertinente a segurança...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 5
    });
    
  
    idx.add({
      title: "EntityFrameworkCore.FirebirdSQL  2.0.8",
      excerpt: "Fala pessoal, acabei de lançar a versão 2.0.8 do EntityFrameworkCore.FirebirdSql. Muitas melhorias e implementações em: Scaffold Insert em Lote Delete...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 6
    });
    
  
    idx.add({
      title: "Injeção de Dependência Asp.Net Core 2 (Razor)",
      excerpt: "Fala Pessoal, Tudo Bem?! Nesse pequeno post irei mostrar como utilizar injeção de dependência em uma página. Para isso antes...",
      categories: ["Razor"],
      tags: ["Razor",".Net Core"],
      id: 7
    });
    
  
    idx.add({
      title: "EntityFrameworkCore.FirebirdSQL  2.0.9",
      excerpt: "EntityFrameworkCore For FirebirdSQL Fala pessoal, acabei de disponibilizar para vocês a versão 2.0.9 “quentinha” do EntityFrameworkCore.FirebirdSql, o Framework de acesso...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 8
    });
    
  
    idx.add({
      title: "Script Migração – EF Core",
      excerpt: "Fala pessoal esse final de semana resolvi fazer esse pequeno post, pois bem, aqui quero mostrar como gerar um script...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 9
    });
    
  
    idx.add({
      title: "Popular Dados (EF Core 2.1)",
      excerpt: "Fala pessoal tudo bem?! Estou fazendo mais esse pequeno post para mostrar mais um novo recurso que será disponibilizado na...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 10
    });
    
  
    idx.add({
      title: "Ordem das colunas no EF Core 2.1",
      excerpt: "Hoje tenho uma ótima noticia para você usuário do EFCore. Acabei de compilar os fontes do EFCore e já se...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 11
    });
    
  
    idx.add({
      title: "Usando CLR no SQL Server",
      excerpt: "NET Framework CLR + SQL Server “A partir do SQL Server 2005, o SQL Server apresenta a integração do componente...",
      categories: ["SQL Server"],
      tags: ["CSharp","SQL Server"],
      id: 12
    });
    
  
    idx.add({
      title: "Novidade C# 7.3, o que vem por ai?",
      excerpt: "Apesar da minha vontade ser compartilhar mais conteúdos relacionados às tecnologias EntityFramework Core e AspNet Core, sendo programador e amante...",
      categories: ["CSharp"],
      tags: ["CSharp"],
      id: 13
    });
    
  
    idx.add({
      title: "Carregando instâncias do SQL Server",
      excerpt: "Carregando Instâncias do SQL SERVER Olá tudo bem?! Nesse pequeno POST, quero mostrar como carregar instâncias do mecanismo de banco...",
      categories: ["CSharp","SQL Server"],
      tags: ["CSharp"],
      id: 14
    });
    
  
    idx.add({
      title: "O básico do LINQ",
      excerpt: "Nesse pequeno post iremos conhecer um pouco de LINQ Um pouco de história Introdução ao LINQ Conhecendo métodos do LINQ...",
      categories: ["LINQ"],
      tags: ["LINQ"],
      id: 15
    });
    
  


console.log( jQuery.type(idx) );

var store = [
  
    
    
    
      
      {
        "title": "Compressão de Dados",
        "url": "http://localhost:4000/csharp/compressaodados/",
        "excerpt": "Quero falar hoje sobre um assunto bastante interessante “ESPAÇO”, isso mesmo. Nos dias de hoje com HDs/SSDS para armazenamentos não...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Códigos de Rejeição da Sefaz",
        "url": "http://localhost:4000/sefaz/sefazcodigos/",
        "excerpt": "201 – Rejeição: Número máximo de numeração de NF-e a inutilizar ultrapassou o limite Essa rejeição ocorre quando a quantidade...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Dados Binário em .Net Core",
        "url": "http://localhost:4000/csharp/binario/",
        "excerpt": "Boa noite, Olhando para tantas novidades no .Net Core hoje resolvi escrever esse pequeno post, onde mostro como criar e...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "EntityFrameworkCore For FirebirdSQL",
        "url": "http://localhost:4000/provider/provider-firebirdsql-efcore/",
        "excerpt": "EntityFrameworkCore For FirebirdSQL Lançamento EntityFrameworkCore for FirebirdSQL Com enorme prazer que venho informar que hoje o EntityframworkCore.FirebirdSQL está disponível, tomei...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Query Compilada no EntityFrameworkCore 2.0",
        "url": "http://localhost:4000/csharp/querycompilada/",
        "excerpt": "Recentemente publiquei um pequeno artigo no portal IMASTERS, mostrando o ganho de performance que ganhamos quando utilizamos corretamente a função...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "SQL Injection EntityFrameworkCore",
        "url": "http://localhost:4000/csharp/sqlinjection/",
        "excerpt": "Olá pessoal! Isso não é um ARTIGO, é uma dica. Hoje quero falar sobre um assunto bastante pertinente a segurança...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "EntityFrameworkCore.FirebirdSQL  2.0.8",
        "url": "http://localhost:4000/provider/efcorefirebirdv208/",
        "excerpt": "Fala pessoal, acabei de lançar a versão 2.0.8 do EntityFrameworkCore.FirebirdSql. Muitas melhorias e implementações em: Scaffold Insert em Lote Delete...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Injeção de Dependência Asp.Net Core 2 (Razor)",
        "url": "http://localhost:4000/razor/injecaodependencia/",
        "excerpt": "Fala Pessoal, Tudo Bem?! Nesse pequeno post irei mostrar como utilizar injeção de dependência em uma página. Para isso antes...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "EntityFrameworkCore.FirebirdSQL  2.0.9",
        "url": "http://localhost:4000/provider/efcorefirebirdv209/",
        "excerpt": "EntityFrameworkCore For FirebirdSQL Fala pessoal, acabei de disponibilizar para vocês a versão 2.0.9 “quentinha” do EntityFrameworkCore.FirebirdSql, o Framework de acesso...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Script Migração – EF Core",
        "url": "http://localhost:4000/csharp/scriptmigracao/",
        "excerpt": "Fala pessoal esse final de semana resolvi fazer esse pequeno post, pois bem, aqui quero mostrar como gerar um script...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Popular Dados (EF Core 2.1)",
        "url": "http://localhost:4000/csharp/populardados/",
        "excerpt": "Fala pessoal tudo bem?! Estou fazendo mais esse pequeno post para mostrar mais um novo recurso que será disponibilizado na...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Ordem das colunas no EF Core 2.1",
        "url": "http://localhost:4000/provider/ordenarcoluna/",
        "excerpt": "Hoje tenho uma ótima noticia para você usuário do EFCore. Acabei de compilar os fontes do EFCore e já se...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Usando CLR no SQL Server",
        "url": "http://localhost:4000/sql%20server/sqlserverclr/",
        "excerpt": "NET Framework CLR + SQL Server “A partir do SQL Server 2005, o SQL Server apresenta a integração do componente...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Novidade C# 7.3, o que vem por ai?",
        "url": "http://localhost:4000/csharp/csharp-novidade/",
        "excerpt": "Apesar da minha vontade ser compartilhar mais conteúdos relacionados às tecnologias EntityFramework Core e AspNet Core, sendo programador e amante...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Carregando instâncias do SQL Server",
        "url": "http://localhost:4000/csharp/sql%20server/carregarinstancia/",
        "excerpt": "Carregando Instâncias do SQL SERVER Olá tudo bem?! Nesse pequeno POST, quero mostrar como carregar instâncias do mecanismo de banco...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "O básico do LINQ",
        "url": "http://localhost:4000/linq/basicolinq/",
        "excerpt": "Nesse pequeno post iremos conhecer um pouco de LINQ Um pouco de história Introdução ao LINQ Conhecendo métodos do LINQ...",
        "teaser":
          
            null
          
      }
    
  ]

$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    var query = $(this).val();
    var result = idx.search(query);
    resultdiv.empty();
    resultdiv.prepend('<p class="results__found">'+result.length+' Result(s) found</p>');
    for (var item in result) {
      var ref = result[item].ref;
      if(store[ref].teaser){
        var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<div class="archive__item-teaser">'+
                '<img src="'+store[ref].teaser+'" alt="">'+
              '</div>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      else{
    	  var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  });
});

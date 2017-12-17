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
      title: "Query Compileda no EntityFrameworkCore 2.0",
      excerpt: "Recentemente publiquei um arquivo no portal IMASTERS, mostrando o ganho de performance que ganhamos quando utilizamos corretamente a função que...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 1
    });
    
  
    idx.add({
      title: "EntityFrameworkCore For FirebirdSQL",
      excerpt: "#EntityFrameworkCore For FirebirdSQL# Com enorme prazer que venho informar que hoje existe o EntityframworkCore.FirebirdSQL disponível, tomei a iniciativa e criei...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 2
    });
    
  
    idx.add({
      title: "Dados Binário em .Net Core",
      excerpt: "Boa noite, Olhando para tantas novidades no .Net Core hoje resolvi escrever esse pequeno post, onde mostro como criar e...",
      categories: ["CSharp"],
      tags: ["CSharp"],
      id: 3
    });
    
  
    idx.add({
      title: "SQL Injection EntityFrameworkCore",
      excerpt: "Olá pessoal! Isso não é um ARTIGO, é uma dica. Hoje quero falar sobre um assunto bastante pertinente a segurança...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 4
    });
    
  
    idx.add({
      title: "Usando CLR no SQL Server",
      excerpt: "NET Framework CLR + SQL Server “A partir do SQL Server 2005, o SQL Server apresenta a integração do componente...",
      categories: ["SQL Server"],
      tags: ["CSharp","SQL Server"],
      id: 5
    });
    
  
    idx.add({
      title: "Novidade C# 7.3, o que vem por ai?",
      excerpt: "Apesar da minha vontade ser compartilhar mais conteúdos relacionados às tecnologias EntityFramework Core e AspNet Core, sendo programador e amante...",
      categories: ["CSharp"],
      tags: ["CSharp"],
      id: 6
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
        "title": "Query Compileda no EntityFrameworkCore 2.0",
        "url": "http://localhost:4000/csharp/binarionetcore/",
        "excerpt": "Recentemente publiquei um arquivo no portal IMASTERS, mostrando o ganho de performance que ganhamos quando utilizamos corretamente a função que...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "EntityFrameworkCore For FirebirdSQL",
        "url": "http://localhost:4000/provider/provider-firebirdsql-efcore/",
        "excerpt": "#EntityFrameworkCore For FirebirdSQL# Com enorme prazer que venho informar que hoje existe o EntityframworkCore.FirebirdSQL disponível, tomei a iniciativa e criei...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Dados Binário em .Net Core",
        "url": "http://localhost:4000/csharp/querycompilada/",
        "excerpt": "Boa noite, Olhando para tantas novidades no .Net Core hoje resolvi escrever esse pequeno post, onde mostro como criar e...",
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

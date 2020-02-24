var idx = lunr(function () {
  this.field('title', {boost: 10})
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')
});



  
  
    idx.add({
      title: "Comprimindo Dados",
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
      title: "Carregando instâncias do SQL Server",
      excerpt: "Carregando Instâncias do SQL SERVER Olá tudo bem?! Nesse pequeno POST, quero mostrar como carregar instâncias do mecanismo de banco...",
      categories: ["CSharp","SQL Server"],
      tags: ["CSharp"],
      id: 2
    });
    
  
    idx.add({
      title: "Injeção de Dependência Asp.Net Core 2 (Razor)",
      excerpt: "Fala Pessoal, Tudo Bem?! Nesse pequeno post irei mostrar como utilizar injeção de dependência em uma página. Para isso antes...",
      categories: ["Razor"],
      tags: ["Razor",".Net Core"],
      id: 3
    });
    
  
    idx.add({
      title: "Dados Binário em .Net Core",
      excerpt: "Boa noite, Olhando para tantas novidades no .Net Core hoje resolvi escrever esse pequeno post, onde mostro como criar e...",
      categories: ["CSharp"],
      tags: ["CSharp"],
      id: 4
    });
    
  
    idx.add({
      title: "EntityFrameworkCore For FirebirdSQL",
      excerpt: "EntityFrameworkCore For FirebirdSQL Lançamento EntityFrameworkCore for FirebirdSQL Com enorme prazer que venho informar que hoje o EntityframworkCore.FirebirdSQL está disponível, tomei...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 5
    });
    
  
    idx.add({
      title: "Query Compilada no EntityFrameworkCore 2.0",
      excerpt: "Recentemente publiquei um pequeno artigo no portal IMASTERS, mostrando o ganho de performance que ganhamos quando utilizamos corretamente a função...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 6
    });
    
  
    idx.add({
      title: "SQL Injection EntityFrameworkCore",
      excerpt: "Olá pessoal! Isso não é um ARTIGO, é uma dica. Hoje quero falar sobre um assunto bastante pertinente a segurança...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 7
    });
    
  
    idx.add({
      title: "EntityFrameworkCore.FirebirdSQL  2.0.8",
      excerpt: "Fala pessoal, acabei de lançar a versão 2.0.8 do EntityFrameworkCore.FirebirdSql. Muitas melhorias e implementações em: Scaffold Insert em Lote Delete...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 8
    });
    
  
    idx.add({
      title: "Razor + EntityFramework Core 2.0",
      excerpt: "Básico Razor + EntityFramworkCore 2.0 Olá pessoal tudo bem?! Resolvi escrever esse pequeno post sobre Razor para os iniciantes no...",
      categories: ["Razor"],
      tags: ["Razor, Asp.NET"],
      id: 9
    });
    
  
    idx.add({
      title: "EntityFrameworkCore.FirebirdSQL  2.0.9",
      excerpt: "EntityFrameworkCore For FirebirdSQL Fala pessoal, acabei de disponibilizar para vocês a versão 2.0.9 “quentinha” do EntityFrameworkCore.FirebirdSql, o Framework de acesso...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 10
    });
    
  
    idx.add({
      title: "Script Migração – EF Core",
      excerpt: "Fala pessoal esse final de semana resolvi fazer esse pequeno post, pois bem, aqui quero mostrar como gerar um script...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 11
    });
    
  
    idx.add({
      title: "Popular Dados (EF Core 2.1)",
      excerpt: "Fala pessoal tudo bem?! Estou fazendo mais esse pequeno post para mostrar mais um novo recurso que será disponibilizado na...",
      categories: ["CSharp"],
      tags: ["CSharp","EntityFrameworkCore"],
      id: 12
    });
    
  
    idx.add({
      title: "Ordem das colunas no EF Core 2.1",
      excerpt: "Hoje tenho uma ótima noticia para você usuário do EFCore. Acabei de compilar os fontes do EFCore e já se...",
      categories: ["Provider"],
      tags: ["CSharp","NetStandard","EntityFrameworkCore"],
      id: 13
    });
    
  
    idx.add({
      title: "Usando CLR no SQL Server",
      excerpt: "NET Framework CLR + SQL Server “A partir do SQL Server 2005, o SQL Server apresenta a integração do componente...",
      categories: ["SQL Server"],
      tags: ["CSharp","SQL Server"],
      id: 14
    });
    
  
    idx.add({
      title: "Novidade C# 7.3, o que vem por ai?",
      excerpt: "Apesar da minha vontade ser compartilhar mais conteúdos relacionados às tecnologias EntityFramework Core e AspNet Core, sendo programador e amante...",
      categories: ["CSharp"],
      tags: ["CSharp"],
      id: 15
    });
    
  
    idx.add({
      title: "O básico do LINQ",
      excerpt: "Nesse pequeno post iremos conhecer um pouco de LINQ Um pouco de história Introdução ao LINQ Conhecendo métodos do LINQ...",
      categories: ["LINQ"],
      tags: ["LINQ"],
      id: 16
    });
    
  
    idx.add({
      title: "Passo a passo Asp.NET Core (básico)",
      excerpt: "Passo a passo Asp.NET Core (básico) Olá tudo bem?! Escrevi um artigo no Microsoft Wiki, mostrando passo a passo de...",
      categories: ["Asp.Net Core","CSharp"],
      tags: ["CSharp","Asp.Net Core"],
      id: 17
    });
    
  
    idx.add({
      title: "Traduzindo funções no EntityFramework Core",
      excerpt: "Traduzindo funções para o servidor com EntityFramework Core Olá tudo bem?! Escrevi um artigo no Microsoft Wiki, mostrando como traduzir...",
      categories: ["EFCore","CSharp"],
      tags: ["CSharp","EFCore"],
      id: 18
    });
    
  
    idx.add({
      title: "Maratona de Bots",
      excerpt: "A Microsoft estará realizando a Maratona de Bots a partir do 15/01/2018 A Maratona Bots 100% online e gratuito. O...",
      categories: ["News"],
      tags: ["News"],
      id: 19
    });
    
  
    idx.add({
      title: "Webinar EF 2.1 - Novidades",
      excerpt: "Fala pessoal, tudo bem?! Dia 25/01(Quinta-Feira) às 21:00h(horário de Brasília), estarei fazendo um Webinar no canal da MVP Glaucia Lemos...",
      categories: ["Webinar"],
      tags: ["News"],
      id: 20
    });
    
  
    idx.add({
      title: "Configurando Repositório Norturno",
      excerpt: "Fala pessoal, tudo bem?! Irei mostrar aqui como configurar seu Visual Studio para baixar os pacotes do Asp.Net Core e...",
      categories: ["Configuração"],
      tags: ["Configuração"],
      id: 21
    });
    
  
    idx.add({
      title: "LazyLoad EF Core 2.1(Preview)",
      excerpt: "Fala pessoal, tudo bem?! Nesse artigo estarei mostrando uma das grandes novidades do Entity Framework Core 2.1, o LazyLoad, (vale...",
      categories: ["EFCore"],
      tags: ["EFCore"],
      id: 22
    });
    
  
    idx.add({
      title: "EF Core 2.1 Roadmap",
      excerpt: "Fala pessoal, tudo bem?! 💚 Conforme mencionado no anúncio do roteiro .NET Core 2.1 , hoje, neste momento, conhecemos a...",
      categories: ["Roadmap"],
      tags: ["Roadmap"],
      id: 23
    });
    
  
    idx.add({
      title: "Fluent API ou Annotation, Quem tem mais moral?",
      excerpt: "Fala pessoal, tudo bem?! 💚 Dica EF Core Esses dias estava conversando com alguém e me fez uma pergunta sobre...",
      categories: ["Dica"],
      tags: [],
      id: 24
    });
    
  
    idx.add({
      title: "Oracle Data Provider for .NET Core",
      excerpt: "Fala pessoal, tudo bem?! 💚 Minhas primeiras impressões Recentemente a Oracle divulgou a primeira versão do Oracle Data Provider for...",
      categories: ["Dica"],
      tags: [],
      id: 25
    });
    
  
    idx.add({
      title: "Gravando informações criptografadas",
      excerpt: "Fala pessoal, tudo bem?! 🔑 Proteção de dados Esses dias estava lendo algo sobre uma lei de proteção de dados...",
      categories: ["Dica"],
      tags: [],
      id: 26
    });
    
  
    idx.add({
      title: "Entity Framework Core 2.1 Preview1 for FirebirdSQL",
      excerpt: "Fala pessoal, tudo bem?! Entity Framework Core 2.1 Preview1 for FirebirdSQL Acaba de sair do forno a versão do EntityFrameworkCore.FirebirdSQL...",
      categories: ["Dica"],
      tags: [],
      id: 27
    });
    
  
    idx.add({
      title: "Entity Framework Core 2.1 Preview1",
      excerpt: "Fala pessoal, tudo bem?! 💚 Entity Framework Core 2.1 Preview1 Essa sem dúvidas é uma ótima notícia, pois é, os...",
      categories: ["Dica"],
      tags: [],
      id: 28
    });
    
  
    idx.add({
      title: "Gravando informações criptografadas #2",
      excerpt: "Fala pessoal, tudo bem?! 🔑 No artigo anterior (http://ralms.net/dica/criptografiaefcore/ eu mostrei como criptografar dados no EF Core usando HasConversion. Criptografia...",
      categories: ["Dica"],
      tags: [],
      id: 29
    });
    
  
    idx.add({
      title: "ODP.NET Core  Beta 2",
      excerpt: "\n\nFala pessoal, tudo bem?! 👍 \n\n\n\n\n",
      categories: ["Dica"],
      tags: [],
      id: 30
    });
    
  
    idx.add({
      title: "Azure Bootcamp 2018 - Sergipe",
      excerpt: "Fala pessoal, tudo bem?! 👍 21 de abril de 2018 , todas as comunidades se reunirão novamente, somos uma de...",
      categories: ["Evento"],
      tags: [],
      id: 31
    });
    
  
    idx.add({
      title: "Global Azure Bootcamp 2018 - Sergipe",
      excerpt: "Fala pessoal, tudo bem?! 👍 Foi uma manhã maravilhosa, um evento show, mesmo como muitas dificuldades como a chuva forte...",
      categories: ["Evento"],
      tags: [],
      id: 32
    });
    
  
    idx.add({
      title: "DEV TALK #1",
      excerpt: "Fala pessoal, tudo bem?! 👍 Venho apresentar a vocês nosso canal DEVTALKS, é um canal diferente de tudo que você...",
      categories: ["DevTalk"],
      tags: [],
      id: 33
    });
    
  
    idx.add({
      title: "Entity Framework Core 2.1 for FirebirdSQL",
      excerpt: "Fala pessoal, tudo bem?! Entity Framework Core 2.1 for FirebirdSQL É com um imenso prazer e alegria que venho informar...",
      categories: ["Dica"],
      tags: [],
      id: 34
    });
    
  
    idx.add({
      title: "Visual Studio Summit 2018",
      excerpt: "Fala pessoal, tudo bem?! 👍 Visual Studio Summit 2018, foi espetacular!!! Foram dois dias maravilhosos, um evento show, reunindo diversos...",
      categories: ["Evento"],
      tags: [],
      id: 35
    });
    
  
    idx.add({
      title: "With NOLOCK & DateDIFF",
      excerpt: "Fala pessoal, tudo bem?! 💚 Extensão para EntityFramework Core Exatamente dia 02/06/2018 02:00 AM, em um quarto de hotel de...",
      categories: ["Dica"],
      tags: [],
      id: 36
    });
    
  
    idx.add({
      title: "EF Core 2.1.1 for FirebirdSQL",
      excerpt: "Fala pessoal, tudo bem?! Entity Framework Core 2.1.1 for FirebirdSQL Já está disponível a versão do EntityFrameworkCore.FirebirdSQL 2.1.1, essa versão...",
      categories: ["Dica"],
      tags: [],
      id: 37
    });
    
  
    idx.add({
      title: "Interop360 - São Paulo",
      excerpt: "Fala pessoal, tudo bem?! 👍 Interop - São Paulo, foi espetacular!!! Dessa vez nada de EntityFramework Core rs, falamos sobre...",
      categories: ["Evento"],
      tags: [],
      id: 38
    });
    
  
    idx.add({
      title: "Logs e Consultas LINQ to SQL",
      excerpt: "Fala pessoal, tudo bem?! 💚 Introdução Bom para começarmos nosso pequeno artigo, vamos falar um pouco sobre o \"EU TER\",...",
      categories: ["Dica"],
      tags: [],
      id: 39
    });
    
  
    idx.add({
      title: "Um pouco de Reflection #1",
      excerpt: "Fala pessoal, tudo bem?! 💚 Bom pessoal esse será o primeiro artigo de uma série que pretendo escrever sobre Reflection/Lambda/Expression/Expression...",
      categories: ["Dica"],
      tags: [],
      id: 40
    });
    
  
    idx.add({
      title: "HACKATHON UFS 2018",
      excerpt: "Fala pessoal, tudo bem?! 👍 Como aplicar tecnologia no setor da saúda a nosso favor? Palestra HACKATHON UFS 2018 http://www.ufs.br/agenda/629-maratona-hackathon-ocorre-no-campus-de-lagarto-2018-9-14...",
      categories: ["Evento"],
      tags: [],
      id: 41
    });
    
  
    idx.add({
      title: "Microsoft Ignite 2018",
      excerpt: "Fala pessoal, tudo bem?! 👍 Microsoft Ignite 2018, foi espetacular!!! Foi uma semana maravilhosa, um evento show, reunindo diversos especialistas...",
      categories: ["Evento"],
      tags: [],
      id: 42
    });
    
  
    idx.add({
      title: "Tecnologias Open Source Microsoft",
      excerpt: "Fala pessoal, tudo bem?! 👍 VII Jornada de Tecnologia da FANSE No 19/10/2018 fiz uma apresentação na FANESE, falei um...",
      categories: ["Evento"],
      tags: [],
      id: 43
    });
    
  
    idx.add({
      title: "EntityFramework Core - SnakeCase",
      excerpt: "Fala pessoal, tudo bem?! 💚 Veja como fazer convenções de nomenclatura SnakeCase para o EntityFramework Core! FYI: Nosso objetivo aqui...",
      categories: ["Dica"],
      tags: [],
      id: 44
    });
    
  
    idx.add({
      title: "VSCode + PostgreSQL",
      excerpt: "Fala pessoal, tudo bem?! 💚 Hoje iremos falar do Visual Studio Code + Postgresql o fantástico editor de código, considerado...",
      categories: ["Dica"],
      tags: [],
      id: 45
    });
    
  
    idx.add({
      title: "Developers Sergipe 2018",
      excerpt: "Fala pessoal, tudo bem?! 👍 Developers Sergipe Summit 2018 No dia 15/12/2018 realizamos o primeiro Developers Sergipe Summit, em nosso...",
      categories: ["Evento"],
      tags: [],
      id: 46
    });
    
  
    idx.add({
      title: "Retrospectiva 2018",
      excerpt: "Um ano Simplesmente FOD* 😜 🤘 👊 Muitas águas rolaram em 2018 Em janeiro foi onde tudo começou, realmente eu...",
      categories: ["Retrospectiva"],
      tags: [],
      id: 47
    });
    
  
    idx.add({
      title: "Dica ApplyConfiguration EFCore >=2.2",
      excerpt: "Fala pessoALL, tudo bem?! 👊 Bom essa dica pode lhe ajudar a eliminar uma boa parte de código de sua...",
      categories: ["Dica"],
      tags: [],
      id: 48
    });
    
  
    idx.add({
      title: "Deep-Dive On EntityFrameworkCore",
      excerpt: "Fala pessoALL, tudo bem?! 👊 MVPCONF Latam 2019 Nos dias 12/13 de abril de 2019, ocorreu a segunda edição do...",
      categories: ["Eventos"],
      tags: [],
      id: 49
    });
    
  
    idx.add({
      title: "10 dicas de performance no EF Core",
      excerpt: "Fala pessoALL, tudo bem?! 😜 VSSUMMIT 2019 Nos dias 21/22 de junho de 2019, participei pela segunda vez do VSSUMMIT....",
      categories: ["Eventos"],
      tags: [],
      id: 50
    });
    
  
    idx.add({
      title: "IEnumerable, List e Array",
      excerpt: "Fala pessoal, tudo bem?! Curiosidade leva nos sempre a pensar fora da caixa!!! Fico por aqui e um forte abraço!...",
      categories: ["Dica"],
      tags: [],
      id: 51
    });
    
  
    idx.add({
      title: "Developers Sergipe Summit 2019",
      excerpt: "Fala pessoal, tudo bem?! 👍 Developers Sergipe Summit 2019 No dia 15/11/2018 realizamos a segunda edição do Developers Sergipe Summit,...",
      categories: ["Evento"],
      tags: [],
      id: 52
    });
    
  
    idx.add({
      title: "System.Text.JSON - ASPNET Core 3.1",
      excerpt: "Fala pessoal, tudo bem?! 💚 Porque estamos aqui? Eu acredito que você já sabe, e se não sabe, ficará agora,...",
      categories: ["Dica"],
      tags: [],
      id: 53
    });
    
  
    idx.add({
      title: "Breaking changes - EF Core 3.1",
      excerpt: "Fala pessoal, tudo bem?! 💚 Veja como fazer convenções de nomenclatura SnakeCase de forma fácil para o Entity Framework Core...",
      categories: ["Dica"],
      tags: [],
      id: 54
    });
    
  
    idx.add({
      title: "Interceptando comandos - EF Core 3.1",
      excerpt: "Fala pessoal, tudo bem?! Sonho realizado Você nem imagina o quanto de pessoas esperando por isso, sim, estou falando de...",
      categories: ["Dica"],
      tags: [],
      id: 55
    });
    
  
    idx.add({
      title: "Será que o Regex é rápido?",
      excerpt: "Fala pessoal, tudo bem?! Curiosidade leva nos sempre a pensar fora da caixa!!! No artigo SNAKE CASE eu usei um...",
      categories: ["Dica"],
      tags: [],
      id: 56
    });
    
  
    idx.add({
      title: "Adeus 2019, bem vindo 2020!",
      excerpt: "Fala meu amigo(a), tudo bem?! Agradecimentos Nossa, que ano foi esse 2019, muitas conquistas e realizações, e antes de começar...",
      categories: ["Retrospectiva"],
      tags: [],
      id: 57
    });
    
  


console.log( jQuery.type(idx) );

var store = [
  
    
    
    
      
      {
        "title": "Comprimindo Dados",
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
        "title": "Carregando instâncias do SQL Server",
        "url": "http://localhost:4000/csharp/sql%20server/carregarinstancia/",
        "excerpt": "Carregando Instâncias do SQL SERVER Olá tudo bem?! Nesse pequeno POST, quero mostrar como carregar instâncias do mecanismo de banco...",
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
        "title": "Razor + EntityFramework Core 2.0",
        "url": "http://localhost:4000/razor/efcorefirebird/",
        "excerpt": "Básico Razor + EntityFramworkCore 2.0 Olá pessoal tudo bem?! Resolvi escrever esse pequeno post sobre Razor para os iniciantes no...",
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
        "title": "O básico do LINQ",
        "url": "http://localhost:4000/linq/basicolinq/",
        "excerpt": "Nesse pequeno post iremos conhecer um pouco de LINQ Um pouco de história Introdução ao LINQ Conhecendo métodos do LINQ...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Passo a passo Asp.NET Core (básico)",
        "url": "http://localhost:4000/asp.net%20core/csharp/passoapassoaspnetcore/",
        "excerpt": "Passo a passo Asp.NET Core (básico) Olá tudo bem?! Escrevi um artigo no Microsoft Wiki, mostrando passo a passo de...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Traduzindo funções no EntityFramework Core",
        "url": "http://localhost:4000/efcore/csharp/traduzirfuncoesefcore/",
        "excerpt": "Traduzindo funções para o servidor com EntityFramework Core Olá tudo bem?! Escrevi um artigo no Microsoft Wiki, mostrando como traduzir...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Maratona de Bots",
        "url": "http://localhost:4000/news/maratonanew/",
        "excerpt": "A Microsoft estará realizando a Maratona de Bots a partir do 15/01/2018 A Maratona Bots 100% online e gratuito. O...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Webinar EF 2.1 - Novidades",
        "url": "http://localhost:4000/webinar/webinar/",
        "excerpt": "Fala pessoal, tudo bem?! Dia 25/01(Quinta-Feira) às 21:00h(horário de Brasília), estarei fazendo um Webinar no canal da MVP Glaucia Lemos...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Configurando Repositório Norturno",
        "url": "http://localhost:4000/configura%C3%A7%C3%A3o/configurarnuget/",
        "excerpt": "Fala pessoal, tudo bem?! Irei mostrar aqui como configurar seu Visual Studio para baixar os pacotes do Asp.Net Core e...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "LazyLoad EF Core 2.1(Preview)",
        "url": "http://localhost:4000/efcore/lazyload/",
        "excerpt": "Fala pessoal, tudo bem?! Nesse artigo estarei mostrando uma das grandes novidades do Entity Framework Core 2.1, o LazyLoad, (vale...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "EF Core 2.1 Roadmap",
        "url": "http://localhost:4000/roadmap/roadmap/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Conforme mencionado no anúncio do roteiro .NET Core 2.1 , hoje, neste momento, conhecemos a...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Fluent API ou Annotation, Quem tem mais moral?",
        "url": "http://localhost:4000/dica/dicaefcore01/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Dica EF Core Esses dias estava conversando com alguém e me fez uma pergunta sobre...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Oracle Data Provider for .NET Core",
        "url": "http://localhost:4000/dica/oraclebeta/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Minhas primeiras impressões Recentemente a Oracle divulgou a primeira versão do Oracle Data Provider for...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Gravando informações criptografadas",
        "url": "http://localhost:4000/dica/criptografiaefcore/",
        "excerpt": "Fala pessoal, tudo bem?! 🔑 Proteção de dados Esses dias estava lendo algo sobre uma lei de proteção de dados...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Entity Framework Core 2.1 Preview1 for FirebirdSQL",
        "url": "http://localhost:4000/dica/firebirdpreview1/",
        "excerpt": "Fala pessoal, tudo bem?! Entity Framework Core 2.1 Preview1 for FirebirdSQL Acaba de sair do forno a versão do EntityFrameworkCore.FirebirdSQL...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Entity Framework Core 2.1 Preview1",
        "url": "http://localhost:4000/dica/preview1/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Entity Framework Core 2.1 Preview1 Essa sem dúvidas é uma ótima notícia, pois é, os...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Gravando informações criptografadas #2",
        "url": "http://localhost:4000/dica/criptografiaefcoreparte2/",
        "excerpt": "Fala pessoal, tudo bem?! 🔑 No artigo anterior (http://ralms.net/dica/criptografiaefcore/ eu mostrei como criptografar dados no EF Core usando HasConversion. Criptografia...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "ODP.NET Core  Beta 2",
        "url": "http://localhost:4000/dica/odpnet2/",
        "excerpt": "\n\nFala pessoal, tudo bem?! 👍 \n\n\n\n\n",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Azure Bootcamp 2018 - Sergipe",
        "url": "http://localhost:4000/evento/azurebootcamp/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 21 de abril de 2018 , todas as comunidades se reunirão novamente, somos uma de...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Global Azure Bootcamp 2018 - Sergipe",
        "url": "http://localhost:4000/evento/gabsergipe2018/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 Foi uma manhã maravilhosa, um evento show, mesmo como muitas dificuldades como a chuva forte...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "DEV TALK #1",
        "url": "http://localhost:4000/devtalk/devtalkclaudenir/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 Venho apresentar a vocês nosso canal DEVTALKS, é um canal diferente de tudo que você...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Entity Framework Core 2.1 for FirebirdSQL",
        "url": "http://localhost:4000/dica/firebird21/",
        "excerpt": "Fala pessoal, tudo bem?! Entity Framework Core 2.1 for FirebirdSQL É com um imenso prazer e alegria que venho informar...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Visual Studio Summit 2018",
        "url": "http://localhost:4000/evento/vssummit2018/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 Visual Studio Summit 2018, foi espetacular!!! Foram dois dias maravilhosos, um evento show, reunindo diversos...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "With NOLOCK & DateDIFF",
        "url": "http://localhost:4000/dica/nolockdatediff/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Extensão para EntityFramework Core Exatamente dia 02/06/2018 02:00 AM, em um quarto de hotel de...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "EF Core 2.1.1 for FirebirdSQL",
        "url": "http://localhost:4000/dica/firebird211/",
        "excerpt": "Fala pessoal, tudo bem?! Entity Framework Core 2.1.1 for FirebirdSQL Já está disponível a versão do EntityFrameworkCore.FirebirdSQL 2.1.1, essa versão...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Interop360 - São Paulo",
        "url": "http://localhost:4000/evento/interop360/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 Interop - São Paulo, foi espetacular!!! Dessa vez nada de EntityFramework Core rs, falamos sobre...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Logs e Consultas LINQ to SQL",
        "url": "http://localhost:4000/dica/logExtension/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Introdução Bom para começarmos nosso pequeno artigo, vamos falar um pouco sobre o \"EU TER\",...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Um pouco de Reflection #1",
        "url": "http://localhost:4000/dica/reflection01/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Bom pessoal esse será o primeiro artigo de uma série que pretendo escrever sobre Reflection/Lambda/Expression/Expression...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "HACKATHON UFS 2018",
        "url": "http://localhost:4000/evento/hackatonufs2018/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 Como aplicar tecnologia no setor da saúda a nosso favor? Palestra HACKATHON UFS 2018 http://www.ufs.br/agenda/629-maratona-hackathon-ocorre-no-campus-de-lagarto-2018-9-14...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Microsoft Ignite 2018",
        "url": "http://localhost:4000/evento/igniteorlando/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 Microsoft Ignite 2018, foi espetacular!!! Foi uma semana maravilhosa, um evento show, reunindo diversos especialistas...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Tecnologias Open Source Microsoft",
        "url": "http://localhost:4000/evento/fanese2018/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 VII Jornada de Tecnologia da FANSE No 19/10/2018 fiz uma apresentação na FANESE, falei um...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "EntityFramework Core - SnakeCase",
        "url": "http://localhost:4000/dica/snakecase/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Veja como fazer convenções de nomenclatura SnakeCase para o EntityFramework Core! FYI: Nosso objetivo aqui...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "VSCode + PostgreSQL",
        "url": "http://localhost:4000/dica/vscodepostgres/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Hoje iremos falar do Visual Studio Code + Postgresql o fantástico editor de código, considerado...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Developers Sergipe 2018",
        "url": "http://localhost:4000/evento/developerssergipe2018/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 Developers Sergipe Summit 2018 No dia 15/12/2018 realizamos o primeiro Developers Sergipe Summit, em nosso...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Retrospectiva 2018",
        "url": "http://localhost:4000/retrospectiva/retro2018/",
        "excerpt": "Um ano Simplesmente FOD* 😜 🤘 👊 Muitas águas rolaram em 2018 Em janeiro foi onde tudo começou, realmente eu...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Dica ApplyConfiguration EFCore >=2.2",
        "url": "http://localhost:4000/dica/dicaapplyconfiguration/",
        "excerpt": "Fala pessoALL, tudo bem?! 👊 Bom essa dica pode lhe ajudar a eliminar uma boa parte de código de sua...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Deep-Dive On EntityFrameworkCore",
        "url": "http://localhost:4000/eventos/mvpconf2019/",
        "excerpt": "Fala pessoALL, tudo bem?! 👊 MVPCONF Latam 2019 Nos dias 12/13 de abril de 2019, ocorreu a segunda edição do...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "10 dicas de performance no EF Core",
        "url": "http://localhost:4000/eventos/vssummit2019/",
        "excerpt": "Fala pessoALL, tudo bem?! 😜 VSSUMMIT 2019 Nos dias 21/22 de junho de 2019, participei pela segunda vez do VSSUMMIT....",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "IEnumerable, List e Array",
        "url": "http://localhost:4000/dica/compreendendo-ienumerable-list-array/",
        "excerpt": "Fala pessoal, tudo bem?! Curiosidade leva nos sempre a pensar fora da caixa!!! Fico por aqui e um forte abraço!...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Developers Sergipe Summit 2019",
        "url": "http://localhost:4000/evento/developerssergipe2019/",
        "excerpt": "Fala pessoal, tudo bem?! 👍 Developers Sergipe Summit 2019 No dia 15/11/2018 realizamos a segunda edição do Developers Sergipe Summit,...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "System.Text.JSON - ASPNET Core 3.1",
        "url": "http://localhost:4000/dica/snakecase_aspnetcore31/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Porque estamos aqui? Eu acredito que você já sabe, e se não sabe, ficará agora,...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Breaking changes - EF Core 3.1",
        "url": "http://localhost:4000/dica/snakecase_efcore31/",
        "excerpt": "Fala pessoal, tudo bem?! 💚 Veja como fazer convenções de nomenclatura SnakeCase de forma fácil para o Entity Framework Core...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Interceptando comandos - EF Core 3.1",
        "url": "http://localhost:4000/dica/efcore31_operations_interception/",
        "excerpt": "Fala pessoal, tudo bem?! Sonho realizado Você nem imagina o quanto de pessoas esperando por isso, sim, estou falando de...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Será que o Regex é rápido?",
        "url": "http://localhost:4000/dica/performanceregexvsspan/",
        "excerpt": "Fala pessoal, tudo bem?! Curiosidade leva nos sempre a pensar fora da caixa!!! No artigo SNAKE CASE eu usei um...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Adeus 2019, bem vindo 2020!",
        "url": "http://localhost:4000/retrospectiva/feliz2020/",
        "excerpt": "Fala meu amigo(a), tudo bem?! Agradecimentos Nossa, que ano foi esse 2019, muitas conquistas e realizações, e antes de começar...",
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
    resultdiv.prepend('<p class="results__found">'+result.length+' Resultado(s) Entcontado(s)</p>');
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

---
title: "LGPD + EF CORE + ValueConverter"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - EF7
header:
  teaser: /assets/images/gdpr/LGPD_EFCORE.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/gdpr/LGPD_EFCORE.png)

<center><strong>Olá tudo bem?!</strong></center>
<hr /> 
## Mais 1 artigo??? Desculpa estou de férias!!!
<div class="notice--warning">
Bom, primeiramente o objetivo não é falar sobre LGPD, como conceitos, onde se aplica, como funciona,... nada disso,
apenas mostrar que podemos proteger nossos dados de forma segura e simples usando <b>Entity Framework Core</b>.
<br><br>
Mas pera aí, você não vai falar nada de LGPD?... tá bom, LGPD é um acrônimo para (<i>Lei Geral de Proteção de Dados Pessoais</i>) que
basicamente o Brasil adotou depois que alguns paises da Europa começaram exigir que o GDPR fosse implementado, para que os dados dos cidadões e sua privacidade pudesse estar segura.<br>
Basicamente de forma muito resumida é isso... antes de criticas observe que falei "BASICAMENTE".<br>
Você pode acessar os links abaixo para obter mais informações:<br>
<a target="_BLANK" href="https://pt.wikipedia.org/wiki/Regulamento_Geral_sobre_a_Prote%C3%A7%C3%A3o_de_Dados" alt="">GDPR</a><br>
<a target="_BLANK" href="https://pt.wikipedia.org/wiki/Lei_Geral_de_Prote%C3%A7%C3%A3o_de_Dados_Pessoais" alt="">LGPD</a>
</div> 

## Cenário
<div style="text-align: justify;">
Imagine que você está usando o <b>EF Core</b> e precisa armazenar informações de algumas propriedas específicas criptografadas em
sua base de dados, para garantir a integridade da informação e que os dados sejam exibidos apenas 
pelo sistema, ou pelo dono da informação, que para nosso exemplo será nossa própria aplicação.
<br /><br />
<pre>
<b>Fulando:</b> Rafael com todo respeito isso é fácil!
<b>Rafael:</b> Tudo bem, só acredito que posso 
        tornar ainda mais fácil.
</pre>
<br>
Bom vamos começar a montar nosso sistema de cadastro de clientes, onde teremos uma classe <b>Cliente</b> com a seguinte estrutura.
</div>
```csharp
public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Telefone { get; set; }
    public string Endereco { get; set; }
    public string CPF { get; set; }
}
```
<div style="text-align: justify;">
Agora vamos criar nossa classe de contexto para acessar o banco de dados, basicamente essa é a estrutura da classe:
</div>
```csharp
 public class DatabaseContext : DbContext
{
    public DbSet<Cliente> Clientes { get; set; }

    protected override void OnConfiguring(
        DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .UseSqlServer(@"Server=(localdb)\msSqlLocalDB;Integrated Security=True;Database=EFCoreValueConvertion;MultipleActiveResultSets=true;");
}
```
<div style="text-align: justify;">
Vamos inserir um cliente em nossa base de dados e fazer uma consulta.
</div>
```csharp
public class Program
{
    static void Main(string[] args)
    {
        using var db = new DatabaseContext();
        db.Database.EnsureCreated();

        db.Clientes.Add(new Cliente
        {
            Nome = "Rafael Almeida",
            Endereco = "Aqui mesmo",
            Telefone = "7998829XXXX",
            CPF = "123456"
        });

        db.SaveChanges();

        var cliente = db
            .Clientes
            .AsNoTracking()
            .FirstOrDefault(p => p.CPF == "123456");
    }
}
```

## Comandos gerados
Os comandos produzidos pelo <b>EF Core</b> foram esses:<br>
<b>Comando Inserir</b>
```sql
exec sp_executesql N'SET NOCOUNT ON;
INSERT INTO [Clientes] ([CPF], [Endereco], [Nome], [Telefone])
VALUES (@p0, @p1, @p2, @p3);
SELECT [Id]
FROM [Clientes]
WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();

',N'@p0 nvarchar(4000),@p1 nvarchar(4000),@p2 nvarchar(4000),@p3 nvarchar(4000)',
@p0=N'123456',@p1=N'Aqui mesmo',@p2=N'Rafael Almeida',@p3=N'7998829XXXX'
```
<b>Comando Consultar</b>
```sql
SELECT TOP(1) [c].[Id], [c].[CPF], [c].[Endereco], [c].[Nome], [c].[Telefone]
FROM [Clientes] AS [c]
WHERE [c].[CPF] = N'123456'
```

## Protegendo dados explícitamente 
Até aqui tudo normal, nada de novo, então vamos voltar ao assunto de proteger os dados?!<br>
Mas eu gostaria que <b>Telefone e CPF</b>, seja armazenado de forma criptografada, você poderia apenas criar uma função para criptografar os dados no momento que for persistir, e quando consultar descriptografar os dados.<br>
Perfeito, então vejo você fazendo algo assim:
```csharp
public class Program
{
    static void Main(string[] args)
    {
        using var db = new DatabaseContext();
        db.Database.EnsureCreated();
        db.Clientes.Add(new Cliente
        {
            Nome = "Rafael Almeida",
            Endereco = "Aqui mesmo",
            Telefone = LockView("7998829XXXX"), //Criptografando
            CPF = LockView("123456") // Criptografando
        });

        db.SaveChanges();

        var cliente = db
            .Clientes
            .AsNoTracking()
            .FirstOrDefault(p => p.CPF == LockView("123456"));

        var cpf = UnLockView(cliente.CPF);
    }

    static string LockView(string texto)
    {
        using var hashProvider = new MD5CryptoServiceProvider();
        var encriptar = new TripleDESCryptoServiceProvider
        {
            Mode = CipherMode.ECB,
            Key = hashProvider.ComputeHash(_chave),
            Padding = PaddingMode.PKCS7
        };

        using var transforme = encriptar.CreateEncryptor();
        var dados = Encoding.UTF8.GetBytes(texto);
        return Convert.ToBase64String(transforme.TransformFinalBlock(dados, 0, dados.Length));
    }
}
```

## Delegando responsabilidade
Funciona perfeitamente, não é a melhor maneira de fazer, então podemos melhorar isso e delegar a responsabilidade para o <b>EF Core</b>, vamos criar um atributo e extrair funcionalidades que o <b>EF Core</b> nos
proporciona, nesse caso primeiramente vamos criar nosso atributo <b>SensitiveData</b>.
```csharp
[AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
public sealed class SensitiveDataAttribute : Attribute
{
}
```
Agora vamos adicionar o atributo em todas propriedades que queremos que o <b>EF Core</b> fique responsável pelo trabalho pesado, de armazenar e ler os dados sensíveis.
```csharp
public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; }
    [SensitiveData]
    public string Telefone { get; set; }
    public string Endereco { get; set; }
    [SensitiveData]
    public string CPF { get; set; }
}
```
<div style="text-align: justify;">
Agora vamos criar uma classe customizada para ficar responsável pela conversão dos valores que serão persistidos e lidos de nossa base de dados,
a partir do <b>EF Core 2.1</b> temos uma nova funcionalidade que basicamente nos fornece uma forma na qual podemos manipular o dado antes de ser persistido e quando for lido também, 
essa funcionalidade se chama <b>ValueConverter</b>, em breve irei fazer um artigo falando mais sobre ela, por enquanto vamos focar aqui, e nossa classe customizada ficou da 
seguinte forma com 2 metódos, para critografar e descriptografar os dados, o que fiz foi criar um classe que herda da classe <b>ValueConverter</b> alguns comportamentos, onde em nosso construtor eu passo 
a expressão que eu quero utilizar para persitir e ler dados.
</div>
```csharp
public class DataProtectionConverter : ValueConverter<string, string>
{
    private static byte[] _chave = Encoding.UTF8.GetBytes("#lgpd+ef");

    public DataProtectionConverter()
        : base(_convertTo, _convertFrom, default)
    {
    }

    static Expression<Func<string, string>> _convertTo = x => LockView(x);
    static Expression<Func<string, string>> _convertFrom = x => UnLockView(x);

    static string LockView(string texto)
    {
        using var hashProvider = new MD5CryptoServiceProvider();
        var encriptar = new TripleDESCryptoServiceProvider
        {
            Mode = CipherMode.ECB,
            Key = hashProvider.ComputeHash(_chave),
            Padding = PaddingMode.PKCS7
        };

        using var transforme = encriptar.CreateEncryptor();
        var dados = Encoding.UTF8.GetBytes(texto);
        return Convert.ToBase64String(transforme.TransformFinalBlock(dados, 0, dados.Length));
    }

    static string UnLockView(string texto)
    {
        using var hashProvider = new MD5CryptoServiceProvider();
        var descriptografar = new TripleDESCryptoServiceProvider
        {
            Mode = CipherMode.ECB,
            Key = hashProvider.ComputeHash(_chave),
            Padding = PaddingMode.PKCS7
        };

        using var transforme = descriptografar.CreateDecryptor();
        var dados = Convert.FromBase64String(texto.Replace(" ", "+"));
        return Encoding.UTF8.GetString(transforme.TransformFinalBlock(dados, 0, dados.Length));
    }
}
```
<div style="text-align: justify;">
Classe criada, agora vamos ajustar nosso <b>DatabaseContext</b> da seguinte forma:
</div>
```csharp
public class DatabaseContext : DbContext
{
    public DbSet<Cliente> Clientes { get; set; }

    protected override void OnConfiguring(
        DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .UseSqlServer(
                @"Server=(localdb)\msSqlLocalDB;Integrated Security=True; Database=EFCoreValueConvertion; MultipleActiveResultSets=true;"
            );

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Selecionar todas propriedades que tem a anotação SensitiveData
        // e aplicar o conversor de valores para o que criamos.
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entity.GetProperties())
            {
                var attributes = property
                    .PropertyInfo
                    .GetCustomAttributes(typeof(SensitiveDataAttribute), false);

                if (attributes.Length > 0)
                {
                    property.SetValueConverter(new DataProtectionConverter());
                }
            }
        }
    }
}
```

## Código final
Agora como você pode ver não iremos precisar mais ficar criptografando explicitamente as informações, nosso exemplo completo ficou assim:
```csharp
public class Program
{
    static void Main(string[] args)
    {

        using var db = new DatabaseContext();
        db.Database.EnsureCreated();
        db.Clientes.Add(new Cliente
        {
            Nome = "Rafael Almeida",
            Endereco = "Aqui mesmo",
            Telefone = "7998829XXXX",
            CPF = "123456"
        });

        db.SaveChanges();

        var cliente = db.Clientes.AsNoTracking().FirstOrDefault(p => p.CPF == "123456");
    }
}

// SensitiveDataAttribute
[AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
public sealed class SensitiveDataAttribute : Attribute
{
}

// Cliente
public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; }
    [SensitiveData]                     // SensitiveData
    public string Telefone { get; set; }
    public string Endereco { get; set; }
    [SensitiveData]                     // SensitiveData
    public string CPF { get; set; }
}


// DatabaseContext
public class DatabaseContext : DbContext
{
    public DbSet<Cliente> Clientes { get; set; }

    protected override void OnConfiguring(
        DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .UseSqlServer(
                @"Server=(localdb)\msSqlLocalDB;Integrated Security=True; Database=EFCoreValueConvertion; MultipleActiveResultSets=true;"
            );

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entity.GetProperties())
            {
                var attributes = property
                    .PropertyInfo
                    .GetCustomAttributes(typeof(SensitiveDataAttribute), false);

                if (attributes.Length > 0)
                {
                    property.SetValueConverter(new DataProtectionConverter());
                }
            }
        }
    }
}

// DataProtectionConverter
public class DataProtectionConverter : ValueConverter<string, string>
{
    private static byte[] _chave = Encoding.UTF8.GetBytes("#lgpd+ef");

    public DataProtectionConverter()
        : base(_convertTo, _convertFrom, default)
    {
    }

    private static Expression<Func<string, string>> _convertTo = x => LockView(x);
    private static Expression<Func<string, string>> _convertFrom = x => UnLockView(x);

    static string LockView(string texto)
    {
        using var hashProvider = new MD5CryptoServiceProvider();
        var encriptar = new TripleDESCryptoServiceProvider
        {
            Mode = CipherMode.ECB,
            Key = hashProvider.ComputeHash(_chave),
            Padding = PaddingMode.PKCS7
        };

        using var transforme = encriptar.CreateEncryptor();
        var dados = Encoding.UTF8.GetBytes(texto);
        return Convert.ToBase64String(transforme.TransformFinalBlock(dados, 0, dados.Length));
    }

    static string UnLockView(string texto)
    {
        using var hashProvider = new MD5CryptoServiceProvider();
        var descriptografar = new TripleDESCryptoServiceProvider
        {
            Mode = CipherMode.ECB,
            Key = hashProvider.ComputeHash(_chave),
            Padding = PaddingMode.PKCS7
        };

        using var transforme = descriptografar.CreateDecryptor();
        var dados = Convert.FromBase64String(texto.Replace(" ", "+"));
        return Encoding.UTF8.GetString(transforme.TransformFinalBlock(dados, 0, dados.Length));
    }
}
```

## Output SQL
Os comandos produzidos ficaram assim:<br>
<b>Comando Inserir</b>
```sql
exec sp_executesql N'SET NOCOUNT ON;
INSERT INTO [Clientes] ([CPF], [Endereco], [Nome], [Telefone])
VALUES (@p0, @p1, @p2, @p3);
SELECT [Id]
FROM [Clientes]
WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();

',N'@p0 nvarchar(4000),@p1 nvarchar(4000),@p2 nvarchar(4000),@p3 nvarchar(4000)',
@p0=N'kOI/e7VQZhs=', -- Criptografado
@p1=N'Aqui mesmo',@p2=N'Rafael Almeida',
@p3=N'T2wQKyR8w28fKOgBXp0ytg=='    -- Criptografado
```
<b>Comando Consultar</b>
```sql
SELECT TOP(1) [c].[Id], [c].[CPF], [c].[Endereco], [c].[Nome], [c].[Telefone]
FROM [Clientes] AS [c]
WHERE [c].[CPF] = N'kOI/e7VQZhs='
```
![01]({{site.url}}{{site.baseurl}}/assets/images/gdpr/consulta.png)


## Observações
<div class="notice--warning">
Alguns banco de dados já fornecem criptografia de ponta-a-ponta, um banco de dados é apenas uma das ferramentas que podemos usar para que possamos estar em conformidade com LGPD/GDPR, uma dica é fique de olho 
na profissão de DPO (<i>Data Protection Officer</i>), será uma profissão que terá muitas vagas para os próximos anos, muitas empresas vão precisar desse profissional.
</div> 


## Twitter
<div class="notice--info">
 Fico por aqui! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
</div> 

<br>

---
title: "Gravando informações criptografadas #2"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
toc: true
toc_label: "Começando"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcoretopocriptografia2.jpg)

<center><strong>Fala pessoal, tudo bem?! 🔑 </strong></center>
<hr>

No artigo anterior (<a href="http://ralms.net/dica/criptografiaefcore/" alt="">http://ralms.net/dica/criptografiaefcore/</a> eu mostrei como criptografar dados no EF Core usando <strong>HasConversion.</strong>

<br>
## Criptografia usando EF Core
<div style="text-align: justify;">
Nesse artigo mostro como criptografar informações que usam uma anotação customizada.<br>
<br><br>Classe de criptografia é a mesma do artigo anterior.<br><br>
Usaremos o <strong>TripleDESCryptoServiceProvider</strong> para criptografar e descriptografar nossas informações, para mais informações sobre <strong>TripleDESCryptoServiceProvider</strong>, acesse essa <a href="https://msdn.microsoft.com/pt-br/library/system.security.cryptography.tripledescryptoserviceprovider(v=vs.110).aspx" alt="">URL</a>.
</div>
<br>
## Classe criptografia
```csharp
public class Criptografia
{
    private static byte[] _chave = Encoding.UTF8.GetBytes("#ef");

    public static string Encrypt(string texto)
    {
        using (var hashProvider = new MD5CryptoServiceProvider())
        {
            var encriptar = new TripleDESCryptoServiceProvider
            {
                Mode = CipherMode.ECB,
                Key = hashProvider.ComputeHash(_chave),
                Padding = PaddingMode.PKCS7
            };

            using (var transforme = encriptar.CreateEncryptor())
            {
                var dados = Encoding.UTF8.GetBytes(texto);
                return Convert.ToBase64String(transforme.TransformFinalBlock(dados, 0, dados.Length));
            }
        }
    }

    public static string Decrypt(string texto)
    {
        using (var hashProvider = new MD5CryptoServiceProvider())
        {
            var descriptografar = new TripleDESCryptoServiceProvider
            {
                Mode = CipherMode.ECB,
                Key = hashProvider.ComputeHash(_chave),
                Padding = PaddingMode.PKCS7
            };

            using (var transforme = descriptografar.CreateDecryptor())
            {
                var dados = Convert.FromBase64String(texto.Replace(" ", "+"));
                return Encoding.UTF8.GetString(transforme.TransformFinalBlock(dados, 0, dados.Length));
            }
        }
    }
}
```

## Nosso DBContext
```csharp
public class ExemploContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Data Source=.\Sistemas;Initial Catalog=TesteCriptografia;Integrated Security=True");
        optionsBuilder.UseLoggerFactory(new LoggerFactory().AddConsole());
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Teste>();

        foreach (var entidade in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var propriedade in entidade.GetProperties())
            {
                var atributos = propriedade
                    .PropertyInfo
                    .GetCustomAttributes(typeof(EncripatarAttribute), false);

                if (atributos.Any())
                {
                    propriedade.SetPropertyAccessMode(PropertyAccessMode.Field);
                }
            }
        }
    }
}
```

## Nossa Classe (Entidade)
```csharp
public class Teste
{
    private string informacoes;

    public int Id { get; set; }
    [Encripatar]
    public string Informacoes
    {
        get => Criptografia.Decrypt(informacoes);
        set => informacoes = Criptografia.Encrypt(value);
    }
    public DateTime Cadastro { get; set; }
}
```

## Nosso Programs.cs
```csharp
class Program
{
    static void Main(string[] args)
    {
        using (var db = new ExemploContext())
        {
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();

            var dados = new[]
            {
                new Teste
                {
                    Informacoes = "Informação 01"
                },
                new Teste
                {
                    Informacoes = "Informação 02"
                },
                new Teste
                {
                    Informacoes = "Informação 03"
                }
            };

            db.Set<Teste>().AddRange(dados);
            db.SaveChanges();

            var registros = db
                .Set<Teste>()
                .AsNoTracking()
                .ToList();

            // Leitura feita pelo EF Core
            Console.WriteLine("Leitura EF Core:");

            foreach (var reg in registros)
            {
                Console.WriteLine($"{reg.Id}-{reg.Informacoes}");
            }

            // Leitura feita via ADO.NET
            Console.WriteLine("\nLeitura ADO.NET:");
            using (var cmd = db.Database.GetDbConnection().CreateCommand())
            {
                db.Database.OpenConnection();
                cmd.CommandText = "SELECT [Id],[Informacoes] FROM [Teste]";
                using (var ler = cmd.ExecuteReader())
                {
                    while (ler.Read())
                    {
                        Console.WriteLine($"{ler.GetInt32(0)}-{ler.GetString(1)}");
                    }
                }
            }
        }

        Console.ReadKey();
    }
}
```
<br>
##  
<div class="notice--success">
 <strong>Considerações:</strong><br>
 Observe que filtrei todas minhas propriedades customizadas com meu atributo chamado "Encriptar", e informei ao EF Core o tipo de acesso a essa propriedade usando:
 <strong>SetPropertyAccessMode(PropertyAccessMode.Field)</strong>
</div>
<br>
Url projeto: <a href="https://github.com/ralmsdeveloper/ExemplosArtigos" alt="">https://github.com/ralmsdeveloper/ExemplosArtigos</a>
<br><br>
Pessoal, fico por aqui <strong>#+1dica!</strong>



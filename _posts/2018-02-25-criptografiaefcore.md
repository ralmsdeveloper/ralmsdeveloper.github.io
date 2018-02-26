---
title: "Gravando informações criptografadas"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
toc: true
toc_label: "Começando"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcoretopocriptografia.jpg)

<center><strong>Fala pessoal, tudo bem?! 🔑 </strong></center>
<hr>

## Proteção de dados

<div style="text-align: justify;">
Esses dias estava lendo algo sobre uma lei de proteção de dados que foi estabelecida pelo parlamento Europeu, O link sobre a lei está <a href="http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679" alt="">AQUI</a>.<br><br>
Foi aberto uma Issue sobre isso no projeto do <strong>EF Core</strong>, para que forneça suporte ao <strong>SQL sempre criptografado</strong>, se você tiver interesse em acompanhar o progresso, acesse a URL abaixo, onde está sendo rastreado.
<a href="https://github.com/aspnet/EntityFrameworkCore/issues/9193" alt="">https://github.com/aspnet/EntityFrameworkCore/issues/9193</a><br>

</div>
<br>
## Criptografia usando EF Core
<div style="text-align: justify;">
Até que isso seja resolvido da forma mais adequada, estarei mostrando como armazenar e ler seus dados criptografados usando EF Core.
<br><br>usar uma criptografia básica como exemplo.<br><br>
Usaremos o <strong>TripleDESCryptoServiceProvider</strong> para criptografar e descriptografar nossas informações, para mais informações sobre <strong>TripleDESCryptoServiceProvider</strong>, acesse essa <a href="https://msdn.microsoft.com/pt-br/library/system.security.cryptography.tripledescryptoserviceprovider(v=vs.110).aspx" alt="">URL</a>.
</div>
<br>
## Classe criptografia
```csharp
public class Criptografia
{
    // Nossa frase secreta
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
        modelBuilder.Entity<Teste>(p=>
        {
            p.Property(x => x.Informacoes)
                .HasConversion(v => Criptografia.Encrypt(v), v => Criptografia.Decrypt(v));
        });
    }
}
```
<div class="notice--warning">
 <strong>Observação:</strong><br>
 A partir da versão 2.1* teremos o método <strong>HasConversion</strong> que podemos utilizar pra escrever conversões personalizadas, ou seja, podemos dizer como o EF irá gravar as informações no banco de dados e como ele irá ler as informações também.
</div>
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
## Veja como foi gravado no banco
Após persistir as informações observe que os valores da coluna <strong>Informacoes</strong> foram criptografadas automaticamente.
<br><br>
![01]({{site.url}}{{site.baseurl}}/assets/images/informacaogravadasnobanco.PNG)

## Leitura dos dados
<div style="text-align: justify;">
Veja que as informações carregadas pelo EF Core, automaticamente são descriptografadas, pelo motivo de termos mapeado nossa propriedade usando o <strong>HasConversion</strong>, já quando fazemos a leitura usando o <strong>ADO</strong> ele simplesmente nos devolve as informações criptografadas de forma fiel ao banco.
</div>
<br>
![01]({{site.url}}{{site.baseurl}}/assets/images/leituraadonet.PNG)

<div class="notice--success">
 <strong>Próximo artigo:</strong><br>
 Estarei criando um exemplo e mostrando como utilizar com propriedades customizadas por atributos.
</div>
<br>
Url projeto: <a href="https://github.com/ralmsdeveloper/ExemplosArtigos" alt="">https://github.com/ralmsdeveloper/ExemplosArtigos</a>
<br>
Pessoal, fico por aqui <strong>#dica!</strong>



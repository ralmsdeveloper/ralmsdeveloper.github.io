---
title: "Criando validações mais performaticas"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - dotnet
  - Performance
header:
  teaser: /assets/images/2022/otimizacao_sem_regex.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/2022/otimizacao_sem_regex.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Esse é meu lugar especial onde adoro compartilhar novidades e pensamentos sobre .NET, Performance e Acesso a Dados com a comunidade.
</div> 

## Introdução
<div style="text-align: justify;">
Já falei muito sobre performance em várias oportunidades que tive, palestrando ou discussões técnicas com amigos e profissionais do mercado, e tem uma frase que utilizo bastante que é “Não é sobre reinventar a roda, é simplesmente sobre não usar Regex pra tudo!”. Parece clichê, mas isso é uma pura verdade.
<br><br>
O Regex é sem sombra de dúvidas um recurso extremamente importante na vida de nós desenvolvedores, porque podemos fazer muitas validações de forma simples com ele, más em muitos cenários não existe a necessidade de sua utilização, pode parecer otimizações prematuras, mas sempre que puder melhorar a performance de suas aplicações com códigos que não tragam complexidade pra você ou seu time, escreva-o!!!
<br><br>
Vamos pegar aqui um cenários hipotético, mas pode ser aplicado em outros cenários, se você precisar fazer algumas validações como por exemplo verificar se em uma string contém números, você não precisa usar REGEX, você pode simplesmente digitar umas 4 linhas de código e deixar suas validações milhares de vezes mais rápida, vamos para um exemplo, para isso criei uma classe com alguns métodos usando regex compilado e interpretado, também criei um método chamado "MetodoCustomizado" para validar sua performance.
</div>

```csharp
[SimpleJob(RuntimeMoniker.Net70, baseline: true)]
[MemoryDiagnoser]
[HideColumns("Error", "StdDev", "Median", "RatioSD", "Ratio")]
public class VerificarSeExisteNumerosEmUmaString
{
    public static string _nome = "Rafael 012345679 Santos";
    public static Regex _regexCompilado = new ("[0-9]", RegexOptions.Compiled);

    [Benchmark]
    public void RegexInterpretado()
    {
        var regex = new Regex("[0-9]");
        _ = regex.IsMatch(_nome);
    }

    [Benchmark]
    public void RegexCompilado()
    {
        _ = _regexCompilado.IsMatch(_nome);
    }

    [Benchmark]
    public bool MetodoCustomizado()
    {
        var span = _nome.AsSpan();

        for (int i = 0; i < span.Length; i++)
        {
            if (span[i] >= '0' && span[i] <= '9')
                return true;
        }

        return false;
    } 
}
``` 
<div style="text-align: justify;">
Ao executar o Benchmark fica claro que nosso método customizado é extremamente muito mais rápido, com 3.395 ns.
</div>

```csharp
// * Summary *
BenchmarkDotNet=v0.13.2, OS=Windows 11 (10.0.22000.1219/21H2)
Intel Core i9-10900K CPU 3.70GHz, 1 CPU, 20 logical and 10 physical cores
.NET SDK=7.0.100
  [Host]   : .NET 6.0.9 (6.0.922.41905), X64 RyuJIT AVX2
  .NET 7.0 : .NET 7.0.0 (7.0.22.51805), X64 RyuJIT AVX2

Job=.NET 7.0  Runtime=.NET 7.0  

|            Method |       Mean |      Error |     StdDev |     Median | Ratio |   Gen0 | Allocated | Alloc Ratio |
|------------------ |-----------:|-----------:|-----------:|-----------:|------:|-------:|----------:|------------:|
| RegexInterpretado | 812.431 ns | 14.2141 ns | 26.6975 ns | 801.174 ns |  1.00 | 0.2308 |    2432 B |        1.00 |
|    RegexCompilado |  30.091 ns |  0.0435 ns |  0.0407 ns |  30.071 ns |  1.00 |      - |         - |          NA |
| MetodoCustomizado |   3.395 ns |  0.0167 ns |  0.0148 ns |   3.392 ns |  1.00 |      - |         - |          NA |

```  
<div style="text-align: justify;">
Reflexão, como falei no inicio do post, sempre que você for fazer otimizações como essa, verifique se não está adicionando complexidade que você não precisa, 
mas eu sou do time que sempre que pode escrever mais bits para melhorar a performance, estarei escrevendo!
</div>
## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

---
title: "Escrevendo aplicações mais performáticas"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - dotnet
  - performance
header:
  teaser: /assets/images/performance-01/header.png
  caption: "www.ralms.net"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/header.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Neste artigo abordaremos um dos recursos do .NET que nos fornece a capacidade de distribuir o processamento de dados em nossas aplicações por meio de um canal, iremos usar o padrão arquitetural <b>producer-consumer</b>, o qual abordaremos logo mais.
</div> 

## Introdução
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;
Estaremos abordando neste artigo um dos assuntos que é extremamente importante para uma aplicação muito mais performática e muita das vezes somos omissos seja por falta de conhecimento ou por existir uma demanda de entregas rápidas em nosso dia-a-dia e sempre deixamos melhorias de performance como dívida técnica, pois bem aqui é onde mora o perigo, na maioria das vezes não costumamos pagar esse tipo de dívida seja por esquecimento ou por existir a necessidade de entregar novas features, mas de alguma forma o universo costuma cobrar da gente e geralmente é da pior forma possível, um exemplo simples e que acontece frequentemente é o conhecido crash de container por falta de recurso seja memória ou disco.
Estamos vivendo a era da computação em nuvem, onde frequentemente ouvimos falar de sistemas distribuídos, resiliência, escalabilidade horizontal e outras coisas legais, pois bem uma dessas coisas legais é o Kubernetes, geralmente utilizamos ele para fornecer a capacidade de escalar o processamento de dados e fornecer várias instâncias de nossas aplicações, com isso limitamos os recursos de cada pod/container para usar a menor unidade de recurso possível, sendo assim customizamos o limite de memória que será utilizado, aqui é onde começamos a pensar fora da caixa, ou seja, será que estamos nos preocupando com essa limitação de recurso?!
Memory leak é um dos problemas mais comuns que ocorrem em uma aplicação dentro de um container por falta do bom gerenciamento de memória, sendo assim vamos ver como podemos escrever aplicações mais performáticas fazendo um bom gerenciamento de memória.
Faremos um compilado de dicas e boas práticas para obter o melhor desempenho com .NET em nossas aplicações diminuindo alocações na memória e coletas do GC (Garbage Collector).

<br />
Vamos colocar a mão na massa!
<br />
<br />
</div>
## Destrutores são um pesadelo para sua aplicação
<div style="text-align: justify;">
 &nbsp;&nbsp;&nbsp;&nbsp;Em .NET todo objeto que herda o tipo class pode ter um construtor e um destrutor. Geralmente usamos no destrutor instruções para limpar objetos na memória não gerenciada  ou seja, que não estão na Heap, com isso evitamos vazamento de memória, mas existe outra forma de fazer isso, um exemplo é utilizar um Pattern Dispose, a coleta feita pelo GC na geração 0 é a mais rápida, mas quando usamos finalizadores e o GC inicializa o ciclo de coleta e encontra um objeto com um destrutor, esse objeto sobrevive à primeira coleta e é promovido para próxima geração e colocado em uma de fila de finalização, portanto quando é chamado o Finalize internamente pela thread dedicada e responsável por fazer essas execuções, o objeto se torna legível para ser recuperado e liberado da memória, para provar isso faremos um benchmark para ver o quão custoso é um destrutor em sua classe mesmo que esteja vazio, que para muitos pode ser inofensivo.
<br />
As seguintes classes serão utilizadas como exemplos:
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/classe-sem-finalizador.png)
<div style="text-align: justify;">
Iremos utilizar a biblioteca BenchmarkDotNet para rastrear e analisar o desempenho, temos dois métodos responsáveis por criar em algumas fases (1.000, 10.000 e 100.000) instâncias das classes acima apresentadas.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/performance-destrutor.png)
<div style="text-align: justify;">
Para saber como utilizar a biblioteca BenchmarkDotNet basta acessar  BenchmarkDotNet apos executar o teste de performance vamos analisar o resultado produzido na seguinte imagem:
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/benchmark-finalizador.png)
<div style="text-align: justify;">
Fica óbvio que podemos degradar consideravelmente a performance de nossa aplicação, mesmo usando um destrutor vazio temos um custo alto de aproximadamente <b>1700%</b> ao utilizar classes com destrutor comparado a uma classe que não possui destrutor, observando melhor temos vários objetos que foram promovidos para geração 1, apenas só por existir um destrutor vazio na classe, sendo assim se existir a necessidade de liberar recursos na memória não gerenciada utilize o Pattern Dispose você vai ter um melhor ganho de performance além de diminuir significativamente a quantidade de coletas feitas pelo GC.
</div>

## Concatenar string ou utilizar StringBuilder ?
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;É muito comum existir a necessidade de concatenar strings durante  o ciclo de desenvolvimento de um software, muitas das vezes é por existir a necessidade de construir algum tipo de informação com objetivo de passar para um algoritmo que possa processar esse dado, uma string é um dado imutável, significa que quando queremos concatenar um caractere ou uma nova cadeia de caracteres a uma string o que está acontece na verdade é uma nova cópia na memória com os dados novos concatenados.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/heap-1.png)
<div style="text-align: justify;">
Quando usamos StringBuilder o que acontece é um comportamento um pouco diferente, basicamente ele reserva um espaço na memória e os novos caracteres são inseridos nesse buffer sem existir a necessidade de fazer uma nova cópia na memória dos dados que estão sendo inseridos.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/heap-2.png)

## Quebrando teorias errôneas e falácias
<div style="text-align: justify;">
Não é porque podemos disparar inúmeras threads que iremos automaticamente ter paralelismo, isso não é uma verdade, multithreading  só existe com <b>paralelismo</b>, e paralelismo real só existe com mais de um core de CPU, então não se iluda, disparar muitas threads você tem <b>concorrência</b>, agendamentos de execução de procedimentos, fornecendo uma sensação de <b>simultaneidade</b>.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/channel/imagem03.png)
<div style="text-align: justify;">
Em uma próxima oportunidade irei escrever um artigo falando sobre processamento síncrono, assíncrono, concorrência, multithreading e paralelismo, focaremos aqui no recurso channel do dotnet, mas não poderia seguir sem passar os conceitos básicos como apresentado logo acima.
</div>
## O que é Channel?
<div style="text-align: justify;">
Resumidamente o channel(<i>ou canal em português</i>) é uma implementação feita pela Microsoft no <b>dotnet core</b> e que está acessível por meio do namespace (<i>System.Threading.Channels</i>), fornece a possibilidade de distribuir o processamento de dados em nossas aplicações, fazendo um excelente uso de <b>concorrência e paralelismo</b>, a ideia básica é que por meio de um canal, possamos produzir algo para um consumidor recuperar e processar, com isso podemos escalar algumas tarefas para melhorar a performance, logo temos um padrão: <b><i>“producer-consumer”</i></b>. 
</div>
![Channel]({{site.url}}{{site.baseurl}}/assets/images/channel/imagem-channel.png)
<div style="text-align: justify;">
Podemos usar esse padrão para resolver alguns problemas inclusive de performance em nossas aplicações, produzir e consumir está presente em muitas das coisas na vida real, como por exemplo uma professora em uma sala de aula escrevendo em um quadro, e seus alunos consumindo suas informações, um garçom fazendo nosso pedido em um restaurante e enviando para a cozinha onde diversos profissionais realizarão tarefas com base no pedido enviado, na computação não é nada diferente, temos diversos problemas que podemos resolver com padrões e implementações feitas em frameworks para acelerar a produtividade. 
<br /><br />
O <b>Channel</b> surgiu exatamente para isso. 🔥🔥🔥
<br /> <br /> 
<b>Channel&#60;T&#62;</b> é uma classe abstrata genérica.
</div>
![Classe abstrata]({{site.url}}{{site.baseurl}}/assets/images/channel/classe-abstrata-01.png)
![Classe abstrata]({{site.url}}{{site.baseurl}}/assets/images/channel/classe-abstrata-02.png)
<div style="text-align: justify;">
E para instanciar precisamos de alguns métodos que estão disponíveis na classe estática <b>Channel</b>, por meio desses métodos conseguimos criar canais parametrizados capazes de atender cenários específicos, mas iremos usar apenas um deles, dado que na sequência deste artigo estaremos fazendo um deep-dive explicando de forma detalhada, a classe estática é a seguinte:
</div>
![Métodos]({{site.url}}{{site.baseurl}}/assets/images/channel/metodos.png)
<div style="text-align: justify;">
Vamos ver dois métodos de forma resumida!<br /><br />
<b>CreateBounded&#60;T&#62;(int capacity):</b>
Cria um canal delimitando a capacidade de objetos que podem ser alocados, é uma boa forma de gerenciar o que será alocado na memória.<br />
<b>CreateUnbounded&#60;T&#62;():</b>
Cria um canal sem limitar a capacidade de objetos que podem ser alocados, ao usar método deve-se tomar muito cuidado, sabemos que recursos da máquina não são infinitos, com isso você pode sobrecarregar a memória, mas falaremos mais sobre isso na continuação deste artigo.
<br />
</div>
## Cenário
<div style="text-align: justify;">
Vamos pegar um exemplo hipotético para começar a exercitar e alinhar nossos pensamentos de como realmente podemos usar o recurso <b>Channels</b> para nos ajudar a otimizar alguns processos, atender demandas específicas que são críticas e precisam ser processadas em uma janela pequena de tempo, o cenário é o seguinte: 
</div>
- Você tem um arquivo CSV com 1000 (mil produtos)
- Precisa extrair as linhas desse arquivo
- Montar um objeto e serializar
- Enviar para um broker (SQS, Google Pub/Sub, Kafka, RabbitMQ)

## Amostras de códigos
Primeiramente vamos construir nossa classe <b>Produto</b>, usaremos ela para representar um registro do arquivo CSV.
```csharp
public class Produto
{
    public string SKU { get; set; }
    public string Descricao { get; set; }
    public decimal Preco { get; set; }
    public int Estoque { get; set; }
}
```
## Broker Fake
Classe para simular o comportamento de envio de mensagens para um serviço de mensageria com tempo de resposta de 10 milissegundos.
```csharp
public class BrokerFake
{
    public static async ValueTask SendAsync<T>(T data)
    {
        var message = JsonSerializer.Serialize(data);

        // Simular latência de 10 milissegundos
        await Task.Delay(TimeSpan.FromMilliseconds(10));
    }
} 
```    
## Implementação de uso do Channel
<div style="text-align: justify;">
Classe com métodos para produzir e consumir dados do canal, o método <b>Enqueue</b> produz uma mensagem no canal, <b>Consumer</b> obtém a mensagem do canal, nosso método <b>StartConsumers</b> inicializa 6 consumidores, é uma estratégia para escalar e extrair o melhor do canal, é uma classe apenas para fins didático e benchmark, nosso consumer possui algumas adaptações para atender o case apresentado.
 </div>
```csharp
public class ChannelTest<T>
{
    private readonly Channel<T> _channel;
    private bool _runningConsummer;
    private bool _stopRequested;

    public ChannelTest()
    {
        _channel = Channel.CreateBounded<T>(1000);
    }

    public async ValueTask Enqueue(T data) 
        => await _channel.Writer.WriteAsync(data).ConfigureAwait(false);

    public async Task Consumer()
    {
        while (true)
        {
            if(_stopRequested && _channel.Reader.Count == 0)
            {
                break;
            }

            if(_channel.Reader.Count == 0)
            {
                await Task.Delay(10);

                continue;
            }

            if (_channel.Reader.TryRead(out var item))
            {
                await BrokerFake.SendAsync(item);
            }
        }
    }

    public void StartConsumers()
    {
        Task.Run(() =>
        {
            var tasks = new Task[6];

            for (int i = 0; i < tasks.Length; i++)
            {
                tasks[i] = Consumer();
            }

            _runningConsummer = true;

            Task.WaitAll(tasks);

            _runningConsummer = false;
        });
    }

    public void Complete()
    {
        _stopRequested = true;

        while (_runningConsummer) 
        { 
            Task.Delay(10).Wait(); 
        };
    }
}
```    

## Teste de performance
Classe com métodos para executar testes de performance, o método <b>GetProdutos</b> é para abstrair o uso de um arquivo real, usaremos o <b><a alt="" href="https://benchmarkdotnet.org/">BenchmarkDotNet</a></b> para executar nossos testes de performance.
```csharp
[MemoryDiagnoser]
public class Performance
{
    private static IEnumerable<Produto> GetProdutos()
    {
        var produtos = Enumerable.Range(1, 1000)
            .Select(p => new Produto
            {
                SKU = Guid.NewGuid().ToString("N"),
                Descricao = $"Produto {p}",
                Preco = (p * 1.1m),
                Estoque = p
            });

        return produtos;
    }

    [Benchmark]
    public async ValueTask SemChannel()
    {
        foreach (var produto in GetProdutos())
        {
            await BrokerFake.SendAsync(produto);
        }
    }

    [Benchmark]
    public async ValueTask ComChannel()
    {
        var channel = new ChannelTest<Produto>();
        channel.StartConsumers();

        foreach (var produto in GetProdutos())
        {
            await channel.Enqueue(produto);
        }

        channel.Complete();
    }
}
``` 

## Benchmark
<div style="text-align: justify;">
Como podemos observar existe um ganho muito significativo de performance ao utilizar o padrão <b>producer-consumer</b>, com isso aumentamos a capacidade de processamentos em nossa aplicação, mas usar um padrão não é o X da questão, e sim a utilização do <b>Channels</b>, ele implementa o padrão e fornece uma API robusta pra gente.
<br />
</div>
```
BenchmarkDotNet=v0.13.0, OS=Windows 10.0.22000
Intel Core i7-7500U CPU 2.70GHz (Kaby Lake), 1 CPU, 4 logical and 2 physical cores
.NET SDK=6.0.100-preview.6.21355.2
  [Host]     : .NET 5.0.8 (5.0.821.31504), X64 RyuJIT
  DefaultJob : .NET 5.0.8 (5.0.821.31504), X64 RyuJIT


|     Method |          Mean |      Error |     StdDev |        Median |
|----------- |--------------:|-----------:|-----------:|--------------:|
| SemChannel | 15,945.549 ms | 31.3865 ms | 27.8233 ms | 15,941.479 ms |
| ComChannel |      1.974 ms |  0.2007 ms |  0.5726 ms |      2.209 ms |
```
## Considerações
<div class="notice--warning" style="background-color:	#aeffe0">
A motivação em escrever este artigo é que em nosso dia-a-dia passamos por situações que às vezes precisamos escrever muito código, mas existem inúmeras implementações nativas que podemos utilizar e que resolvem muito bem determinadas demandas.
<br /><br />
No próximo artigo faremos um deep-dive nas funcionalidades do <b>Channels</b>, abordaremos qual melhor estratégia de uso do Channel, dado que utilizamos recurso de memória e a utilização incorreta pode também degradar a performance de nossas aplicações, mas utilizando de forma correta será um grande aliado nosso, até o próximo artigo.
</div> 
 
## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

---
title: "Introdução ao Channel - Parte 1"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - dotnet
  - performance
header:
  teaser: /assets/images/channel/channel-top.png
  caption: "www.ralms.net"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/channel/channel-top.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Neste artigo abordaremos um dos recursos do .NET que nos fornece a capacidade de distribuir o processamento de dados em nossas aplicações por meio de um canal, iremos usar o padrão arquitetural <b>producer-consumer</b>, o qual abordaremos logo mais.
</div> 

## Introdução
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;Constantemente estamos a procura de melhor performance e escalabilidade para nossas aplicações,  isso tudo é maravilhoso para o momento que vivemos da era da computação em nuvem, vários provedores de serviços se especializaram nisso, um exemplo são as grandes empresas de tecnologia, como: <i>Microsoft, Amazon, Google, IBM, Red Hat</i>, entre outras, e graças a nuvem é possível ter recursos computacionais fantásticos, produtos que são capazes de resolver basicamente qualquer problema, procurando entregar mais valor para o consumidor em um tempo menor e com extrema segurança, mas não se engane, procurar estratégias melhores para seu software é um dever seu como um bom profissional, isso faz parte de todo ciclo de desenvolvimento de um bom sistema.
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;O recurso que abordaremos faz bom uso de concorrência e assincronismo, sendo assim existe a necessidade de esclarecer alguns pontos antes de seguir com o artigo, existe uma grande confusão por parte de muitas pessoas sobre o que é concorrência, simultaneidade e paralelismo, o problema é que concorrência é muito confundido com paralelismo, com a concorrência até conseguimos lidar com inúmeras coisas ao mesmo tempo em um único núcleo de CPU, mas isso de forma alguma quer dizer que está sendo executado de forma paralela.
</div>
## Concorrência
<div style="text-align: justify;">
 &nbsp;&nbsp;&nbsp;&nbsp;Faz com que o programa seja capaz de lidar com várias coisas ao mesmo tempo, na vida real imaginemos a seguinte situação, você está indo ao banco fazer um depósito, então dois amigos chegam até você e perguntam se você pode fazer um depósito por eles, você fala que sim e ao chegar ao banco encontra três terminais livres, é obvio que poderíamos usar outro exemplo hipotético de concorrência e paralelismo, mas vamos pensar fora da caixa e seguir com o exemplo dos terminais.

</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/channel/imagem01.png)
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;Então você tenta iniciar o procedimento de depósito nos três terminais ao mesmo tempo, e corre de um lado para o outro freneticamente, fica claro que você está concorrendo tempo com você mesmo, separando uma certa quantidade de tempo para ir de um terminal para o outro e tentar continuar de onde parou sua última iteração com o terminal, é assim que funciona a concorrência, estamos lidando com algumas coisas ao mesmo tempo, mas não executando paralelamente ao mesmo tempo.
<br /><br />
Olhando para CPU é exatamente isso que ocorre quando temos apenas uma unidade de processamento (1 Core), convivemos com a ilusão da simultaneidade, mas o que o processador faz é  apenas compartilhar um pequeno espaço de tempo entre os procedimentos para executar de forma concorrente, passando a sensação que tudo foi executado ao mesmo tempo.
</div>
## Paralelismo
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;Pegando o exemplo apresentado anteriormente e alterando o cenário para o qual  seus amigos juntamente com você foram ao banco e encontraram três terminais livres, cada um se dirige a um terminal específico e inicia o processamento de forma isolada e ao mesmo tempo que você.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/channel/imagem02.png)
<div style="text-align: justify;">
Nesse exemplo fica explicitamente nítido um padrão de execução usando paralelismo, cada um consegue atuar isoladamente sem saber exatamente o que o outro está fazendo, o paralelismo é possível apenas quando temos mais de um núcleo de CPU, os sistemas operacionais sempre se comportaram de forma excelente, mesmo com limitações existente, fazia o bom uso da concorrência, mas com a evolução dos processadores isso muda o jogo, agora podemos ser capazes de executar tarefas verdadeiramente paralelas, e cada núcleo de CPU se beneficiando ainda mais com o poder da concorrência e simultaneidade.
</div>

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

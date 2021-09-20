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
<div  style="text-align: justify;" class="notice--warning" style="background-color:#f8ffc4">
Estaremos abordando neste artigo um dos assuntos que é extremamente importante para uma aplicação muito mais performática e muita das vezes somos omissos seja por falta de conhecimento ou por existir uma demanda de entregas rápidas em nosso <b>dia-a-dia</b> e sempre deixamos melhorias de performance como dívida técnica, pois bem aqui é onde mora o perigo, na maioria das vezes não costumamos pagar esse tipo de dívida seja por esquecimento ou por existir a necessidade de entregar novas features, mas de alguma forma o universo costuma cobrar da gente e geralmente é da pior forma possível, um exemplo simples e que acontece frequentemente é o conhecido crash de container por falta de recurso seja <b>memória ou disco</b>.
</div> 

## Introdução
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;
Estamos vivendo a era da computação em nuvem, onde frequentemente ouvimos falar de sistemas distribuídos, resiliência, escalabilidade horizontal e outras coisas legais, pois bem uma dessas coisas legais é o <b>Kubernetes</b>, geralmente utilizamos ele para fornecer a capacidade de escalar o processamento de dados e fornecer várias instâncias de nossas aplicações, com isso limitamos os recursos de cada pod/container para usar a menor unidade de recurso possível, sendo assim customizamos o limite de memória que será utilizado, aqui é onde começamos a pensar fora da caixa, ou seja, será que estamos nos preocupando com essa limitação de recurso?!
<b>Memory leak</b> é um dos problemas mais comuns que ocorrem em uma aplicação dentro de um container por falta do bom gerenciamento de memória, sendo assim vamos ver como podemos escrever aplicações mais performáticas fazendo um bom gerenciamento de memória.
Faremos um compilado de dicas e boas práticas para obter o melhor desempenho com <b>.NET</b> em nossas aplicações diminuindo alocações na memória e coletas do GC (<b>Garbage Collector</b>).

<br />
Vamos colocar a mão na massa!
<br />
<br />
</div>
## Destrutores são um pesadelo para sua aplicação
<div style="text-align: justify;">
 &nbsp;&nbsp;&nbsp;&nbsp;Em .NET todo objeto que herda o tipo class pode ter um construtor e um destrutor. Geralmente usamos no destrutor instruções para limpar objetos na memória não gerenciada  ou seja, que não estão na Heap, com isso evitamos vazamento de memória, mas existe outra forma de fazer isso, um exemplo é utilizar um <b>Pattern Dispose</b>, a coleta feita pelo <b>GC na geração 0</b> é a mais rápida, mas quando usamos finalizadores e o GC inicializa o ciclo de coleta e encontra um objeto com um destrutor, esse objeto sobrevive à primeira coleta e é promovido para próxima geração sendo colocado em uma de fila de finalização, portanto quando é chamado o <b>Finalize</b> internamente pela thread dedicada e responsável por fazer essas execuções o objeto se torna legível para ser recuperado e liberado da memória, para provar isso faremos um <b>benchmark</b> para ver o quão custoso é um destrutor em sua classe mesmo que esteja vazio, que para muitos pode ser inofensivo.
<br /><br />
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

<div style="text-align: justify;">
Vamos pegar um exemplo hipotético aqui onde precisamos montar uma string no formato JSON, é apenas para nossa didática, dado que temos classes robustas dedicadas para serializar e desserializar objetos, para isso temos dois métodos, um que concatena caracteres fazendo a junção de duas strings e outro que utiliza StringBuilder, veja a imagem seguinte:
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/manipular-string.png)

<div style="text-align: justify;">
Depois de executar nosso teste de performance podemos analisar o benchmark e confirmar que o primeiro método que faz junção de string é muito mais lento e aloca mais espaço.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/benchmark-string.png)
<div style="text-align: justify;">
Conforme a quantidade de caracteres vão crescendo temos um custo maior para copiar esses dados na memória para um novo endereço além de alocar muito mais espaço na memória, e se multiplicar isso em um aplicação que trabalha com muita threads podemos chegar a uma conclusão que iremos degradar a performance de nossa aplicação, sendo assim utilize sempre que possível StringBuilder para concatenar strings, o GC e sua memória agradece.
</div>


## Regex e suas armadilhas
<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;Regex sem sombra de dúvidas é um dos recursos mais fantásticos que podemos ter em uma linguagem de programação, ele nos proporciona uma excelente produtividade.<br />
O <b>.NET</b> nos oferece dois sabores de Regex, o <b>interpretado</b> e o <b>compilado</b>, vamos testar a performance de ambos, para isso iremos usar o seguinte cenário no qual precisamos saber se uma string contém números e para isso iremos usar o Regex, na imagem a seguir temos dois métodos um que utiliza uma instância do objeto Regex interpretado e outro que utiliza a instância do Regex Compilado os dois utilizam o mesmo pattern que é validar se existe números em uma string.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/classe-regex.png)
Depois de executar os testes de performance obtemos o seguinte resultado:
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/benchmark-regex-1.png)

<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;
Fica explicitamente claro que temos um ganho de aproximadamente <b>260%</b> ao utilizar o Regex compilado, quando estamos processando um alto volume de dados isso faz toda diferença, mas certamente podemos melhorar isso e pensar um pouco fora da caixa, o uso do Regex gera um pequeno custo adicional no quesito performance em nossa aplicação, existem cenários que podemos escrever nosso próprio algoritmo para fazer pequenas otimizações e esse é um deles, não necessariamente precisamos de Regex para saber se existe ou não número em uma string, vamos então vamos utilizar seguinte método para comparar a performance.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/metodo-customizado.png)
Executando os testes de performance novamente obtivemos o seguinte resultado:
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/benchmark-regex-2.png)

<div style="text-align: justify;">
&nbsp;&nbsp;&nbsp;&nbsp;
Fica claro que tivemos um absurdamente de performance comparado com o <b>Regex</b>, se analisar corretamente temos um ganho de aproximadamente <b>590%</b> sobre o Regex compilado e <b>1.560%</b> sobre o Regex interpretado isso só prova que sempre que possível devemos escrever nossos próprios algoritmos, vamos ver uma das grandes desvantagens de utilizar o Regex de forma errônea, o cenário é o seguinte, você não quer escrever algoritmos e quer se beneficiar da performance do <b>Regex compilado</b> dado que ele é mais performático que o interpretado certo? Errado, se não souber usar ele de forma correta pode ser seu maior problema de performance, em vez de utilizar as instâncias do Regex estaticamente como apresentado anteriormente vamos instanciar a cada execução e comparar sua performance, vamos utilizar os seguintes métodos:
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/regex-instanciado.png)
Novamente depois de executar todos os testes obtivemos o seguinte resultado:
![01]({{site.url}}{{site.baseurl}}/assets/images/performance-01/benchmark-regex-3.png)

<div style="text-align: justify;">
Não é porque o <b>Regex</b> é compilado que será sempre mais rápido, como podemos observar ele ficou drasticamente muito mais lento e fez com que objetos fossem promovidos praticamente em todas as gerações pelo <b>GC</b> além de alocar muitos objetos na memória, podemos resolver isso? Sim, Essa lentidão apresentada é porque existe um custo no momento de criar uma instância do objeto <b>Regex</b>, isso porque o código do Regex é compilado em tempo de execução para ser otimizado, uma boa prática para melhorar a performance é reutilizar a instância do objeto, se sua aplicação não tem a necessidade constante de alterar a expressão que o regex irá utilizar então instanciar os objetos irá fazer com o tempo utilizado na compilação seja evitado.
<br />
Uma outra dica importante ao utilizar o Regex é aplicar Timeout dado que nossas expressões se beneficiam de retrocesso com objetivo de fazer otimização, para mais informações sobre retrocesso basta acessar: <a href="https://docs.microsoft.com/pt-br/dotnet/standard/base-types/backtracking-in-regular-expressions" alt="">Microsoft retrocesso</a>, o timeout garante que a expressão seja validada dentro de uma janela de tempo específica, se não for processada no intervalo especificado será lançada uma exception: <b>RegexMatchTimeoutException</b>.
</div>

## Considerações
<div class="notice--warning" style="background-color:	#aeffe0">
<b>Lições aprendidas com Regex:</b><br />
  <li>Podemos escrever sempre um algoritmo melhor</li>
  <li>Regex Compilado não é bala de prata</li>
  <li>Não crie instância do Regex para cada validação se a expressão não muda</li>
  <li>Se vai utilizar Regex escolha sempre que possível Regex compilado</li>
<br /><br />
Na continuação deste artigo estaremos conhecendo alguns operadores e novas features do .NET que contribuem para alocação mínima de memória.
</div> 
 
## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

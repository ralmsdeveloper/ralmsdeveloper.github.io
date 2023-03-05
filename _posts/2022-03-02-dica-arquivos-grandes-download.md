---
title: "Download arquivos grandes em .NET"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - dotnet
  - Dicas
header:
  teaser: /assets/images/2022/large-files.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/2022/large-files.png)
<hr /> 
<div class="notice--warning" style="background-color:#f8ffc4">
Essa dica será muito importante quando você precisar fazer download de arquivos grandes e não possuir um migrador oficial para tal execução.
</div> 

## Introdução
<div style="text-align: justify;">
Pois bem, sabemos que existem inúmeras formas de fazer download de arquivos na internet, mas .NET o <b>HTTP Client</b> é o mais utilizado sem sombra de dúvidas e atende muito bem muitos cenários.
<br><br>
O problema que enfrentamos basicamente é sobre muitas abordagens que vemos por aí, que funciona apenas para arquivos pequenos, que é por exemplo escrever os bytes usando o MemoryStream e depois escrever em um arquivo como demonstrado abaixo:
<br>

```csharp
...
const string url = "https://ralms.io/poeira_em_alto_mar.mp4";
using (var response = await client.GetAsync(url))
using (var streamContent = await response.Content.ReadAsStreamAsync())
{
    string tempFile = Path.GetTempFileName();
    using (var streamWrite = File.Open(tempFile, FileMode.Create))
    {
        await streamContent.CopyToAsync(streamWrite);
    } 
} 
```

## Entendendo o problema
<div style="text-align: justify;">
Com o código apresentado acima, temos 2 (dois) pequenos problemas... o primeiro é que ao fazer a solicitação do arquivo, você irá ter que aguardar 
que o servidor escreva todo binário para o solicitante, pra depois você receber um status de OK, se o arquivos for muito grande seu sistema poderá ficar
muito ocioso, então você pode melhor um pouco essa requisição passando mais parâmetros para o GET (<b>HttpCompletionOption.ResponseHeadersRead</b>), falando que assim que os headers forem escritos já é o suficiente para receber um Status de OK e a partir daí você tomar a decisão que precisa ser tomada, como por exemplo o tamanho do arquivo que pode vir no header.
Vamos fazer essa pequena modificação:
</div>

```csharp
...
const string url = "https://ralms.io/poeira_em_alto_mar.mp4";
using (var response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
using (var streamContent = await response.Content.ReadAsStreamAsync())
{
    string tempFile = Path.GetTempFileName();
    using (var streamWrite = File.Open(tempFile, FileMode.Create))
    {
        await streamContent.CopyToAsync(streamWrite);
    } 
} 
```

## Resolvendo o problema
Mas ainda continuamos com um problema da leitura do content completamente, porque falo isso? Bom, o motivo é que se você tem pouca memória você pode chegar ao ponto de exaurir seus recursos computacionais, então a dica é fragmentar a leitura do dado e escrever em pedaços menores em seu arquivo, isso se torna muito mais eficiente e você pode inclusive utilizar até paralelismo, veja como poderemos fazer de forma simples e resolver esse problema: 

```csharp
 ...
const string url = "https://ralms.io/poeira_em_alto_mar.mp4";
using (var response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
using (var streamContent = await response.Content.ReadAsStreamAsync())
{
    string tempFile = Path.GetTempFileName();
    using (var streamWrite = File.Open(tempFile, FileMode.Create))
    {
        await streamContent.CopyToAsync(streamWrite, 1024 * 1024 * 2); //2M
    } 
} 
```

## Contatos
<div class="notice--info">
 Fico por aqui, mas pode me contatar por meio de minhas redes sociais 😄 <br />
 twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 linkedin: <a alt="" href="https://www.linkedin.com/in/ralmsdeveloper/">@ralmsdeveloper</a><br />
</div> 

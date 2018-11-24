---
title: "EF Core - SnakeCase"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
---

![01]({{site.url}}{{site.baseurl}}/assets/images/efcorecsharp.png)

<center><strong>Fala pessoal, tudo bem?! 💚</strong></center>
<hr> 
Como criar nossa estrutura usando SnakeCase com <strong>EF Core?!</strong><br />
<br>
![01]({{site.url}}{{site.baseurl}}/assets/images/camelsnakecase.jpg)
<div class="notice--warning">
<strong>FYI:</strong><br>
Nosso <strong>objetivo</strong> aqui é mostrar uma solução para o <strong>EntityFramework Core + PostgreSQL.</strong><br />
Basicamente existem 4 tipos de nomenclaturas que usamos para escrever nossos códigos: <strong>PascalCase, CamelCase, SnakeCase e SpinalCase</strong>, já que iremos abordar um assunto que se trata de um dos casos citados, nada mais justo do que resumir cada um deles.
</div>
![01]({{site.url}}{{site.baseurl}}/assets/images/tipocase.png) 

# ResumidãO!

## PascalCase 
<div style="text-align: justify;">
Usando Pascal Case em nosso código significa que a primeira letra de cada palavra para o identificador deverá ser maiúscula.<br />
<strong style="color: green">Exemplo:</strong> 
</div>
```csharp
BlogRafael = "www.ralms.net";
``` 
## CamelCase 
<div style="text-align: justify;">
É o mesmo que o caso do Pascal Case, porém a primeira letra da primeira palavra é minúscula.<br />
<strong  style="color: green">Exemplo:</strong> 
</div>
```csharp
blogRafael = "www.ralms.net";
```  
## SnakeCase 
<div style="text-align: justify;">
Bom esse termo é bem legal e foi estabelecido por <strong>Jack Dahlgren</strong>, em 2002 quando trabalhava na Intel
esse não tem uma definição especifica quando se trata em deixar as letras do identificador <strong>maiúsculo</strong> ou <strong>minúsculo</strong>, basicamente a regra pra ele é colocar um "_" entre as palavras do identificador.<br />
<strong style="color: green">Exemplo:</strong>
</div> 
```csharp
blog_rafael = "www.ralms.net";
Blog_Rafael = "www.ralms.net";
```

## SpinalCase 
<div style="text-align: justify;">
Mesma regra do <strong>SnakeCase</strong>, única diferença é em vez de usar "_", passaremos a utilizar "-" como separador de palavras.<br />
<strong style="color: green">Exemplo:</strong>
</div> 
```csharp
blog-rafael = "www.ralms.net";
Blog-Rafael = "www.ralms.net";
```

<div class="notice--warning"> 
<strong>Observação:</strong><br>
Como nem tudo é tão perfeito, vale ressaltar que ela é bem limitada apenas a execução de query, nada de backup, nada de algo mais hard, ela é exatamente pra resolver os problemas mais trivias!
</div> 

<strong>Ponto positivo</strong>:<br />
A maior vantagem de utilizar extensões para fazer consultas em banco de dados como SQL Server ou PostgreSQL é sem dúvida a produtividade, pois não necessita de sair da IDE para executar sua query, e nem abrir um novo processo que pode chegar a consumir mais 300MB de memória. 

<div class="notice--success">
<strong>Fiz um passo a passo, siga-o e desfrute dessa maravilha!</strong>
</div>


 
 
 {% include gallery caption="Imagens do Artigo" %}

 Pessoal fico por aqui e um forte abraço! 😄 <br>

 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #postgresql #linqsolucoes<br><br>

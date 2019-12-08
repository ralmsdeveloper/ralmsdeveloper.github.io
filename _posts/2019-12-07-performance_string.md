---
title: "Será que o Regex é rápido?"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
---

![01]({{site.url}}{{site.baseurl}}/assets/images/PerformanceRegex.png)

<center><strong>Fala pessoal, tudo bem?!</strong></center>
<hr> 
Curiosidade leva nos sempre a pensar fora da caixa!!!<br />
No artigo <a href="http://ralms.net/dica/snakecase/" target="_BLANK" alt="">SNAKE CASE</a> eu usei um <b>REGEX</b> para aplicar 
a nomenclatura snake-case em uma <b>string</b>, mas hoje domingão fiquei pensando e de quanto performatico era esse método.
<br> 
# Certo, e?
Pois bem, fiquei inquieto e comecei a escrever alguns bits na tentativa de descobrir o que seria melhor em um 
ambiente onde eu precisaria processar milhares ou milhões de dados, então cheguei a construir alguns <b>métodos</b>.

# Método usando Regex
Esse foi o método usado no artigo citado acima.
```csharp
public string ToSnakeCaseUsingRegex()
{
    return Regex
        .Replace(
            _frase, 
            @"([a-z0-9])([A-Z])", 
            "$1_$2", 
            RegexOptions.Compiled)
        .ToLower();
}
```
# Método usando LINQ
Esse foi o método usado no artigo citado acima.
```csharp
public string ToSnakeCaseUsingLinq()
{
    return string
        .Concat(_frase
            .Select((c, i) =>
                i > 0 && char.IsUpper(c) 
                    ? "_" + c 
                    : c.ToString()))
                .ToLower();
}
```
# Método usando StringBuilder e Span<T>
Esse foi o método usado no artigo citado acima.
```csharp
public string ToSnakeCaseUsingStringBuildAndSpan()
{
    ReadOnlySpan<char> frase = _frase;

    var stringBuilder = new StringBuilder();

    for (var i = 0; i < frase.Length; i++)
    {
        if (char.IsUpper(frase[i]) && frase[0] != frase[i])
        {
            stringBuilder.Append('_');
            stringBuilder.Append(frase[i]);
        }
        else
        {
            stringBuilder.Append(frase[i]);
        }
    }

    return stringBuilder
        .ToString()
        .ToLower();
}
```
# Método usando StringBuilder e Span<T>
Esse foi o método usado no artigo citado acima.
```csharp
public string ToSnakeCaseUsingSpanOnBuffer()
{
    var undescores = 0;
            
    for (var i = 0; i < _frase.Length; i++)
    {
        if (char.IsUpper(_frase[i]))
        {
            undescores++;
        }
    }

    var buffer = (Span<char>)new char[undescores + _frase.Length];
    var possitionOfBuffer = 0;
    var letterPosition = 0;

    for (;possitionOfBuffer < buffer.Length;)
    {
        if (letterPosition > 0 && char.IsUpper(_frase[letterPosition]))
        {
            buffer[possitionOfBuffer] = '_';
            buffer[possitionOfBuffer + 1] = _frase[letterPosition];
            possitionOfBuffer += 2;
            letterPosition++;
            continue;
        }

        buffer[possitionOfBuffer] = _frase[letterPosition];
        possitionOfBuffer++;
        letterPosition++;
    }

    return buffer
        .ToString()
        .ToLower();
}
```
  

<br>
 

<div class="notice--success">
<strong>
 Pessoal fico por aqui e um forte abraço! 😄 
 </strong>
</div> 


 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #performance #efcore31 #netcore31 #span<br><br>

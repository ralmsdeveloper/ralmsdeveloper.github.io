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
<br>
<br>
Vamos começar os testes!!!
# Método usando Regex
Esse foi o método usado no artigo citado acima.<br>
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
Não poderia passar por aqui sem falar da importancia no LINQ dentro do .NET, sem sombra de dúvidas é uma das melhores implementações dentro da plataforma.
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
# Método usando somente Span<T>
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

    var length = (undescores + _frase.Length) - 1;
    Span<char> buffer = new char[length];
    var possitionOfBuffer = 0;
    var letterPosition = 0;

    while (possitionOfBuffer < buffer.Length)
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
# Resultado dos testes 
Os testes foram realizando com 10, 100.000 e 1.000.000 de interações.
```
------------------------------------------------------------------------
UsingStringBuilderAndSpan       10              Tempo: 00:00:00.0025257
                                100_000         Tempo: 00:00:00.1162287
                                1_000_000       Tempo: 00:00:02.0734867
------------------------------------------------------------------------
UsingSpanOnBuffer               10              Tempo: 00:00:00.0004815
                                100_000         Tempo: 00:00:00.1087459
                                1_000_000       Tempo: 00:00:01.0008935
------------------------------------------------------------------------
UsingRegex                      10              Tempo: 00:00:00.0606576
                                100_000         Tempo: 00:00:00.5761851
                                1_000_000       Tempo: 00:00:06.2264039
------------------------------------------------------------------------
UsingLinq                       10              Tempo: 00:00:00.0089215
                                100_000         Tempo: 00:00:00.2520451
                                1_000_000       Tempo: 00:00:02.7254307
------------------------------------------------------------------------
```
<br>

# Benchmark
```
BenchmarkDotNet=v0.12.0, OS=Windows 10.0.18362
Intel Core i7-7500U CPU 2.70GHz (Kaby Lake), 1 CPU, 4 logical and 2 physical cores
.NET Core SDK=3.1.100
  [Host]     : .NET Core 3.1.0 (CoreCLR 4.700.19.56402, CoreFX 4.700.19.56404), X64 RyuJIT  [AttachedDebugger]
  DefaultJob : .NET Core 3.1.0 (CoreCLR 4.700.19.56402, CoreFX 4.700.19.56404), X64 RyuJIT


|                             Method |       Mean |     Error |    StdDev |     Median | Rank |  Gen 0 | Gen 1 | Gen 2 | Allocated |
|----------------------------------- |-----------:|----------:|----------:|-----------:|-----:|-------:|------:|------:|----------:|
|       ToSnakeCaseUsingSpanOnBuffer |   387.2 ns |   6.99 ns |   6.54 ns |   387.0 ns |    1 | 0.1831 |     - |     - |     384 B |
| ToSnakeCaseUsingStringBuildAndSpan |   473.0 ns |   9.42 ns |  16.00 ns |   469.5 ns |    2 | 0.3328 |     - |     - |     696 B |
|               ToSnakeCaseUsingLinq | 1,763.3 ns |  69.64 ns | 198.68 ns | 1,680.1 ns |    3 | 0.7839 |     - |     - |    1640 B |
|              ToSnakeCaseUsingRegex | 5,438.9 ns | 193.14 ns | 531.95 ns | 5,292.9 ns |    4 | 1.1520 |     - |     - |    2416 B |
```

<div class="notice--success">
<strong>
 Pessoal fico por aqui e um forte abraço! 😄 
 </strong>
</div> 


 #mvpbuzz #mvpbr #mvp #developerssergipe #share #vscode #performance #efcore31 #netcore31 #span<br><br>

---
title: "Workaround para System.Text.Json"
comments: true
excerpt_separator: "Ler mais"
toc: true
toc_label: "Tópicos"
categories:
  - Workaround
  - Json
  - AspNetCore
header:
  teaser: /assets/images/SystemTextJson.png
  caption: "www.ralms.io"
---

![01]({{site.url}}{{site.baseurl}}/assets/images/SystemTextJson.png)

<center><strong>Fala pessoal, tudo bem?!</strong></center>
<hr /> 
<div class="notice--warning">
Nesse artigo iremos descobrir como resolver um pequeno GAP que temos ao usar o <b>System.Text.Json</b> como nosso serializador.
<br><br>
<b>FYI:</b> Isso não é um Deep-Dive em System.Text.Json.
</div> 

## Introdução
Acredito que você já saiba que System.Text.Json é uma nova opção para serializar objetos, escrita pela <b>Microsoft</b> e pelo próprio criador do <b>Newtonsoft.Json</b>, seu objetivo principal é performance e alocar menos dados na memória.<br>
Quer saber sobre? acessa esse <a target="_BLANK" href="https://docs.microsoft.com/pt-br/dotnet/standard/serialization/system-text-json-overview" alt="">link</a>, vamos focar em um problema que talvez você já tenha enfrentado.

## GAP
Como nem tudo é mil maravilhas, ontem(20/03/2020) juntamente com meus amigos de trabalho estavamos tentando deserializar um JSON para uma classe que tinha construtores parametrizados e as propriedades eram <b>readonly</b> (Immutable), como eu fui ingênuo 🤖, então fui analisar melhor o que estava acontecendo, e o que descobri(<i>ou não me lembrava</i>) não foi nada agradável, 
simplesmente não temos suporte, e o backlog de pendências é enorme! Veja <a target="_BLANK" href="https://docs.microsoft.com/pt-br/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to#table-of-differences-between-newtonsoftjson-and-systemtextjson" alt="">aqui</a>

## Cenário
Vamos montar um cenário para ver como podemos resolver esse GAP, mas já vou te dizendo que precisa escrever alguns BITS 👨‍💻.

## Classe
Vamos ter como base a seguinte <b>classe</b> concreta, apenas com 2 (duas) propriedades para facilitar nosso exemplo.
```csharp
public class Pessoa
{
    public string Nome { get; }
    public DateTime DataNascimento { get;} 

    public Pessoa(string nome, DateTime dataNascimento)
    {
        Nome = nome;
        DataNascimento = dataNascimento;
    }
}
```

## Serializar
Vamos tentar serializar um objeto.<br>

Showww, como você pode ver na imagem abaixo a serialização funcionou perfeitamente (como esperado 😎).
![01]({{site.url}}{{site.baseurl}}/assets/images/serializacaook.PNG)

## Agora vamos tentar deserializar
Observe na imagem abaixo que ao tentar fazer a deserialização é lançada uma exception, informando que não existe suporte para construtores parametrizados.

![01]({{site.url}}{{site.baseurl}}/assets/images/problemajsondeserialize.PNG)
 
## Tem solução?
Como diz o velho ditado <b>para todo problema existe uma solução</b> e ela veio olhando para esse exemplo <a target="_BLANK" href="https://docs.microsoft.com/pt-br/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to#deserialize-to-immutable-classes-and-structs" alt="">aqui</a>, que basicamente é fazer uma implementação de <b>JsonConverter</b> e adicionar ao pipeline de customização. Vamos para um exemplo prático.

## JsonConverter Customizado
Esse é o código que escrevi para resolver o problema aborado aqui, observe que estou herdando de <b>JsonConverter</b> alguns comportamentos e sobrescrevendo os mesmo.

```csharp 
namespace System.Text.Json.Serialization
{
    public abstract class JsonConverter<T> : JsonConverter
    {
        protected internal JsonConverter();
        public override bool CanConvert(Type typeToConvert);
        public abstract T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options);
        public abstract void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options);
    }
}
```

Se você querer ver mais informações sobre a API clique <a target="_BLANK" href="https://docs.microsoft.com/pt-br/dotnet/api/system.text.json.serialization.jsonconverter-1?view=netcore-3.1" alt="">aqui</a>, mas por hora vamos ver nosso código como ficou.

```csharp
public class MyJsonConverter : JsonConverter<object>
{
    public override bool CanConvert(Type typeToConvert)
        => typeToConvert
            .GetConstructors(BindingFlags.Public | BindingFlags.Instance)
            .Length == 1; 

    public override object Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var propertiesInfo = new Dictionary<PropertyInfo, object>();
        var properties = typeToConvert.GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);

        var mapping = properties.ToDictionary(p => p.Name, p => p);

        reader.Read();

        for (; ; )
        {
            if (reader.TokenType != JsonTokenType.PropertyName && reader.TokenType != JsonTokenType.String)
            {
                break;
            }

            var propertyName = reader.GetString();

            if (!mapping.TryGetValue(propertyName, out var property))
            {
                reader.Read();
            }
            else
            {
                var value = JsonSerializer.Deserialize(ref reader, property.PropertyType, options);
                reader.Read();
                propertiesInfo[property] = value;
            }
        }

        var constructorInfo = typeToConvert.GetConstructors(BindingFlags.Public | BindingFlags.Instance)[0];
        var parameters = constructorInfo.GetParameters();
        var parameterValues = new object[parameters.Length];

        for (var index = 0; index < parameters.Length; index++)
        {
            var parameterInfo = parameters[index];
            var value = propertiesInfo.First(prop => prop.Key.Name.Equals(parameterInfo.Name, StringComparison.InvariantCultureIgnoreCase)).Value;
            parameterValues[index] = value;
        }

        var @object = constructorInfo.Invoke(parameterValues);

        return @object;
    }

    public override void Write(Utf8JsonWriter writer, object value, JsonSerializerOptions options)
        => throw new NotImplementedException();
}
```

```csharp
static void Main(string[] args)
{
    var pessoa = new Pessoa("Rafael", DateTime.Now);
    var json = JsonSerializer.Serialize(pessoa);

    var options = new JsonSerializerOptions();
    options.Converters.Add(new MyJsonConverter());

    var objectPessoa = JsonSerializer.Deserialize<Pessoa>(json, options);

    Console.WriteLine(json);
}
```
<hr />
![01]({{site.url}}{{site.baseurl}}/assets/images/deserializacaook.PNG)
<hr />

## Código completo
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SystemTextJsonWorkAround
{
    class Program
    {
        static void Main(string[] args)
        {
            var pessoa = new Pessoa("Rafael", DateTime.Now);
            // Serializar
            var json = JsonSerializer.Serialize(pessoa);

            // Deserializar
            var options = new JsonSerializerOptions();
            options.Converters.Add(new MyJsonConverter());
            var objectPessoa = JsonSerializer.Deserialize<Pessoa>(json, options);

            Console.WriteLine(json);
        }
    }

    public class Pessoa
    {
        public string Nome { get; }
        public DateTime DataNascimento { get; }

        public Pessoa(string nome, DateTime dataNascimento)
        {
            Nome = nome;
            DataNascimento = dataNascimento;
        }
    }

    public class MyJsonConverter : JsonConverter<object>
    {
        public override bool CanConvert(Type typeToConvert)
            => typeToConvert
                .GetConstructors(BindingFlags.Public | BindingFlags.Instance)
                .Length == 1;

        public override object Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var propertiesInfo = new Dictionary<PropertyInfo, object>();

            var properties = typeToConvert
                .GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);

            var mapping = properties.ToDictionary(p => p.Name, p => p);

            reader.Read();

            for (; ; )
            {
                if (reader.TokenType != JsonTokenType.PropertyName && reader.TokenType != JsonTokenType.String)
                {
                    break;
                }

                var propertyName = reader.GetString();

                if (!mapping.TryGetValue(propertyName, out var property))
                {
                    reader.Read();
                }
                else
                {
                    var value = JsonSerializer.Deserialize(ref reader, property.PropertyType, options);
                    reader.Read();
                    propertiesInfo[property] = value;
                }
            }

            var constructorInfo = typeToConvert.GetConstructors(BindingFlags.Public | BindingFlags.Instance)[0];
            var parameters = constructorInfo.GetParameters();
            var parameterValues = new object[parameters.Length];

            for (var index = 0; index < parameters.Length; index++)
            {
                var parameterInfo = parameters[index];
                var value = propertiesInfo.First(prop => prop.Key.Name.Equals(parameterInfo.Name, StringComparison.InvariantCultureIgnoreCase)).Value;
                parameterValues[index] = value;
            }

            var @object = constructorInfo.Invoke(parameterValues);

            return @object;
        }

        public override void Write(Utf8JsonWriter writer, object value, JsonSerializerOptions options)
            => throw new NotImplementedException();
    }
}
```

## Approach
Esse seria a melhor abordagem? Para suprir esse GAP talvez sim, mas o código obviamente precisaria de melhorias para cobrir todos cenários possíveis e colocar em produção, aqui eu procurei apenas mostrar como é possível adicionar serializadores customizados.

## News
A novidade é que iremos ter esse suporte na versão <b>.NET 5</b> que inclusive já temos a <b>Preview</b> veja <a target="_BLANK" alt="" href="https://devblogs.microsoft.com/dotnet/announcing-net-5-0-preview-1/">aqui</a>.

## Twitter
<div class="notice--info">
 Fico por aqui e um forte abraço! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 Dúvidas, quer bater um papo? Entre em contato comigo: ralms@ralms.net
</div> 

<br>

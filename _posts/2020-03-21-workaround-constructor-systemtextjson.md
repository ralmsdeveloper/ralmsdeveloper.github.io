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
---

![01]({{site.url}}{{site.baseurl}}/assets/images/SystemTextJson.png)

<center><strong>Fala pessoal, tudo bem?!</strong></center>
<hr /> 
<div class="notice--warning">
Nesse arquito iremos descobrir como resolver um pequeno GAP que temos ao usar o System.Text.Json como nosso serializador.
</div> 

## Introdução
Acredito que todos sabem que System.Text.Json é uma nova opção para serializar objetos, escrita pela Microsoft e pelo próprio criador do Newtonsoft.Json, seu objetivo principal é performance e alocar menos dados na memória, pois bem, maravilha isso!

## GAP
Como nem tudo é mil maravilhas, ontem(20/03/2020) juntamente com meus amigos de trabalho estavamos tentando deserializar um JSON para uma classe que tinha construtores parametrizados e as propriedades eram <b>readonly</b> (Immutable), então fui analisar melhor o que estava acontecendo, e o que descobri(ou não me lembrava) não foi nada agradável, 
simplesmente não temos suporte, e o backlog de pendências é enorme! Veja <a target="_BLANK" href="https://docs.microsoft.com/pt-br/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to#table-of-differences-between-newtonsoftjson-and-systemtextjson" alt="">aqui</a>

## Cenário
Vamos montar um cenário para ver como podemos resolver

## Classe
Vamos ter como base a seguinte <b>class</b>
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
Vamos tentar serializar 
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
Showww, serialização perfeita!
![01]({{site.url}}{{site.baseurl}}/assets/images/serializacaook.PNG)

## Deserializar
Ao tentar deserializar, é lançada uma exception informando que não existe suporte para construtores parametrizados.

![01]({{site.url}}{{site.baseurl}}/assets/images/problemajsondeserialize.PNG)
 
## Solução
Como diz o velho ditado <b>para todo problema existe uma solução</b> e ela veio olhando para esse exemplo <a target="_BLANK" href="https://docs.microsoft.com/pt-br/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to#deserialize-to-immutable-classes-and-structs" alt="">aqui</a>, que basicamente é fazer uma implementação de <b>JsonConverter</b> e adicionar ao pipeline de customização. Vamos para um exemplo prático.

## JsonConverter Customizado
```csharp
public class MyJsonConverter : JsonConverter<object>
{
    public override bool CanConvert(Type typeToConvert)
        => typeToConvert
            .GetConstructors(BindingFlags.Public | BindingFlags.Instance)
            .Length == 1; 

    public override object Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var valueOfProperty = new Dictionary<PropertyInfo, object>();

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
                valueOfProperty[property] = value;
            }
        }

        var constructorInfo = typeToConvert.GetConstructors(BindingFlags.Public | BindingFlags.Instance).First();
        var parameters = constructorInfo.GetParameters();
        var parameterValues = new object[parameters.Length];

        for (var index = 0; index < parameters.Length; index++)
        {
            var parameterInfo = parameters[index];
            var value = valueOfProperty.First(prop => prop.Key.Name.Equals(parameterInfo.Name, StringComparison.InvariantCultureIgnoreCase)).Value;
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

## Approach
Esse seria a melhor abordagem? Para suprir esse GAP sim, mas o código obviamente precisaria de melhorias para cobrir todos cenários possíveis, aqui eu procurei apenas mostrar que é possível adicionar serializadores customizados.

## News
A novidade é que iremos ter esse suporte na versão .NET Core 5!


## Twitter
<div class="notice--info">
 Fico por aqui e um forte abraço! 😄 <br />
 Me siga no twitter: <a alt="" href="https://twitter.com/RalmsDeveloper">@ralmsdeveloper</a><br />
 Dúvidas, quer bater um papo? Entre em contato comigo: ralms@ralms.net
</div> 

<br>

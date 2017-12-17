---
title: "Dados Binário em .Net Core"
comments: false
excerpt_separator: "Ler mais"
categories:
  - CSharp
tags:
  - CSharp
---

Boa noite,
Olhando para tantas novidades no .Net Core hoje resolvi escrever esse pequeno post, onde mostro como criar e ler dados binário estruturado em .NET Core C#.
Ué e nas versões anteriores não faz?!
Sim faz, a intenção aqui é mostrar que esse recurso também está em conformidade com o belíssimo trabalho que a Microsoft vem realizando.

O FUTURO É .NET CORE!

É simples e aplicável a versões anteriores do .Net Framework.

```csharp
using System;
using System.IO;

namespace CriaLerArquivoBinario
{
    class Program
    {
        static void Main(string[] args)
        {
            var arquivo = AppContext.BaseDirectory + "Exemplo.bin";
            if (File.Exists(arquivo))
			{
			    File.Delete((arquivo));
			}

            var cadastro = new Pessoa
            {
                Nome = "Rafael Almeida",
                Endereco = "Avenida de Teste",
                Idade = 28,
                Credito = 8000m
            };

            //Gravar no arquivo!
            using (var escrever = new BinaryWriter(File.Open(arquivo, FileMode.Create)))
            {
                escrever.Write(cadastro.Nome);
                escrever.Write(cadastro.Endereco);
                escrever.Write(cadastro.Idade);
                escrever.Write(cadastro.Credito);
                escrever.Close();
            }

            //Resetar objeto
            cadastro = new Pessoa();

            using (var ler = new BinaryReader(File.Open(arquivo, FileMode.Open)))
            {
                cadastro.Nome = ler.ReadString();
                cadastro.Endereco = ler.ReadString();
                cadastro.Idade = ler.ReadInt32();
                cadastro.Credito = ler.ReadDecimal();

                //Imprimir dados na tela
                Console.WriteLine($"Nome....: {cadastro.Nome}");
                Console.WriteLine($"Endereço: {cadastro.Endereco}");
                Console.WriteLine($"Idade...: {cadastro.Idade}");
                Console.WriteLine($"Crédito.: {cadastro.Credito}");

            }
            Console.ReadKey();
        }
    }

    class Pessoa
    {
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public int Idade { get; set; }
        public decimal Credito { get; set; }
    }
}

```

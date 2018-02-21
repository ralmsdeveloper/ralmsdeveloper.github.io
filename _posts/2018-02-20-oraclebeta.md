---
title: "Oracle .NET Core Beta"
comments: true
excerpt_separator: "Ler mais"
categories:
  - Dica
---

![01]({{site.url}}{{site.baseurl}}/assets/images/oracletopo.jpg)

<center><strong>Fala pessoal, tudo bem?! 💚</strong></center>
<hr>

## Minhas primeiras impressões

<div style="text-align: justify;">
Recentemente a Oracle divulgou a primeira versão Beta do Provider para .NET Core, os binários ainda não estão disponíveis no NUGET.<br>
Mas você pode baixar no link abaixo.<br>
<a href="http://www.oracle.com/technetwork/topics/dotnet/downloads/odpnetcorebeta-4077982.html" alt="">http://www.oracle.com/technetwork/topics/dotnet/downloads/odpnetcorebeta-4077982.html</a>
</div>
<br>
<div style="text-align: justify;">
Quero compartilhar com você meu primeiro contato com o <strong>Oracle Beta para .Net Core</strong>. Praticamente todos recursos estão disponíveis, pelo menos todos que pude testar, mas encontrei um pequeno <strong>BUG</strong> quando adicionamos parâmetros únicos(um-a-um).<br>
</div>
## Como consegui reproduzir?!<br>
Criei um pequeno projeto para fazer os testes básicos.<br>

## Criando ambiente de teste
<div style="text-align: justify;">
Para aqueles que estão familiarizados com ORACLE, abra o prompt de comando e execute o comando abaixo, dentro da pasta BIN, onde seu ORACLE foi instalado.
</div>
```sql
sqlplus.exe / as sysdba
```
Execute os comandos abaixo, pode trocar <strong>ralms</strong> por um nome desejável.<br>

<strong>Criando o banco e usuário</strong><br>
```sql
CREATE PLUGGABLE DATABASE ralms
   ADMIN USER ralms_admin IDENTIFIED BY ralms_admin
   ROLES = (DBA)
   FILE_NAME_CONVERT = ('\pdbseed\', '\pdb_ralms_01\');

```
<strong>Deixar o banco acessível</strong><br>
```sql
ALTER PLUGGABLE DATABASE ralms OPEN;
```

<strong>Deslogar do sysdba</strong><br>
```sql
quit
```

<strong>Conectar com o usuário criado</strong><br>
```sql
sqlplus ralms_admin/ralms_admin@127.0.0.1:1521/ralms
```
<strong>Aplicar permissões ao usuário</strong><br>
```sql
GRANT UNLIMITED TABLESPACE TO ralms_admin;
```
## Requisitos
Acesse <a href="https://github.com/ralmsdeveloper/EntityFrameworkCore/tree/Dev1989/samples/OracleProvider" alt="">AQUI</a> e veja alguns procedimentos que o time do Entity Framework Core solicita para testes do projeto.
<br>
## Arquivo utilizado!
```csharp
using Oracle.ManagedDataAccess.Client;
using System;
using System.Data;
using Xunit;

namespace OracleTestesNetCore
{
    public class Testes
    {
        private static OracleConnection _oracleConnection = null;
        private static readonly OracleParameter[] _parametros = new[]
        {
            new OracleParameter
            {
                OracleDbType = OracleDbType.Varchar2,
                ParameterName="DESCRICAO",
                Value = "DESCRICAO TESTE"
            },
            new OracleParameter
            {
                OracleDbType = OracleDbType.Decimal,
                ParameterName="VALOR",
                Value = 25.99m
            },
            new OracleParameter
            {
                OracleDbType = OracleDbType.Date,
                ParameterName="DATA",
                Value = DateTime.Now
            }
        };

        public Testes()
        {
            // Efetuar conexão!
            _oracleConnection = new OracleConnection
            {
                ConnectionString = new OracleConnectionStringBuilder
                {
                    UserID = "ralms_admin",
                    Password = "ralms_admin",
                    DataSource = "127.0.0.1:1521/ralms"
                }.ConnectionString
            };

            _oracleConnection.Open();

            // Inicializar Banco
            InicializarBanco();
        }

        [Fact]
        public void Inserir_Parametro_Um_Por_Um()
        {
            ExecutarComando("DELETE FROM \"TESTE\"");

            for (int i = 0; i < 3; i++)
            {
                ExecutarComando(
                    $"INSERT INTO \"TESTE\" (DESCRICAO,VALOR,DATA) VALUES (:DESCRICAO,:VALOR,:DATA)",
                    _parametros);
            }

            var dados = GetDados("SELECT * FROM \"TESTE\"");

            Assert.True(dados.Rows.Count == 3);
        }

        [Fact]
        public void Inserir_Parametro_Range()
        {
            ExecutarComando("DELETE FROM \"TESTE\"");

            for (int i = 0; i < 3; i++)
            {
                ExecutarComando(
                    $"INSERT INTO \"TESTE\" (DESCRICAO,VALOR,DATA) VALUES (:DESCRICAO,:VALOR,:DATA)",
                    _parametros,
                    true);
            }

            var dados = GetDados("SELECT * FROM \"TESTE\"");

            Assert.True(dados.Rows.Count == 3);
        }

        [Fact]
        public void GetTabelas()
        {
            var dados = GetDados("SELECT * FROM ALL_TABLES");

            Assert.True(dados.Rows.Count > 0);
        }

        private static void InicializarBanco()
        {
            ExecutarComando(
@"BEGIN
  EXECUTE IMMEDIATE 'CREATE TABLE ""TESTE""(
    ""ID"" NUMBER(38, 0) GENERATED BY DEFAULT AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  NOT NULL ENABLE,
    ""DESCRICAO"" NVARCHAR2(100),
    ""DATA"" DATE,
    ""VALOR"" NUMBER(18, 2)
)';
EXCEPTION
WHEN OTHERS THEN
  RAISE;
END;");

        }

        private static void ExecutarComando(
            string comando,
            OracleParameter[] parametros = null,
            bool usarRange = false)
        {
            using (var cmd = _oracleConnection.CreateCommand())
            {
                cmd.CommandText = comando;

                if (parametros != null)
                {
                    if (usarRange)
                    {
                        cmd.Parameters.AddRange(parametros);
                    }
                    else
                    {
                        for (int i = 0; i < parametros.Length; i++)
                        {
                            cmd.Parameters.Add(parametros[i]);
                        }
                    }
                }
                cmd.ExecuteNonQuery();
            }
        }

        private static DataTable GetDados(string comando)
        {
            var dados = new DataTable();
            using (var cmd = _oracleConnection.CreateCommand())
            {
                cmd.CommandText = comando;
                dados.Load(cmd.ExecuteReader(CommandBehavior.CloseConnection));
                return dados;
            }
        }
    }
}
```

<br>
## BUG
O teste <strong>Inserir_Parametro_Um_Por_Um</strong> falha!<br>
<div style="text-align: justify;">
Em uma análise pessoal, acredito que existe um método interno que não está se comportando da forma correta, ou seja, quando utilizado o <strong>Parameters.Add</strong> pela primeira vez funciona normalmente, mais a partir da segunda gera uma exceção, mesmo criando uma nova instancia da conexão. 
Ele está armazenando e não está limpando a coleção ao destruir o objeto, causando a seguinte exceção:<br>
</div>
<strong>"OracleParameter object is already contained in a collection"</strong>
<br><br>
## Solução
A solução é usar o <strong>Parameters.AddRange</strong> para suprir temporariamente esse pequeno BUG. já que está funcionando perfeitamente!
<br><br>
<strong>Considerações:</strong><br>Parabéns ORACLE, já foi uma grande iniciativa, esperamos o provider no NUGET!
<br><br>
Pessoal, fico por aqui <strong>forte abraço!</strong>

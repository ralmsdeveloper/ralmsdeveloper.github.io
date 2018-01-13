---
title: "Usando CLR no SQL Server"
comments: true
excerpt_separator: "Ler mais"
categories:
  - SQL Server
tags:
  - CSharp
  - SQL Server
---
NET Framework CLR + SQL Server

*"A partir do SQL Server 2005, o SQL Server apresenta a integração do componente CLR do .NET Framework para o Microsoft Windows.
Isso significa que você pode agora gravar procedimentos armazenados, gatilhos, tipos definidos pelo usuário, funções definidas pelo usuário,
agregações definidas pelo usuário e funções de streaming com valor de tabela, usando qualquer linguagem do .NET Framework,
incluindo o Microsoft Visual Basic .NET e o Microsoft Visual C#"*. (Microsoft)

Como citado acima podemos criar procedimentos em .NET que serão interpretados pela CLR no SQL Server, dessa forma teremos um gatilho, função ou uma procedure compilada em uma linguagem como o C#.
Não necessariamente ficamos limitados ao C#, mais podemos usar qualquer outra que seja suportada pelo .NET Framework, exemplo (VB.Net).

Em alguns casos o procedimento criado para (CLR) pode chegar a ser mais rápido que as próprias instruções T-SQL.
E por que usar?! Eu utilizo pra tratar informações grandes do lado **client** antes mesmo de devolver o retorno pra o usuário.
Por exemplo eu faço um select no banco, manipulo essas informações e só então devolvo o resultado formatado com as informações que foram manipuladas, um caso prático clientes que geram SPED FISCAL, Ele poderá reunir essas informações via select, fazer os ajustes e devolver para um DataReader(no nosso Caso .NET 🙂) as informações já processadas para serem gravadas em um Arquivo.

Vamos criar nosso projeto e veremos em prática isso.

Antes de tudo vamos criar nosso banco de teste.

Execute o script abaixo que criei pra nosso exemplo:
Só pra controle estaremos usando o **SQL SERVER**

```sql
CREATE DATABASE BancoTeste; 
go   
USE BancoTeste;
go   
  
SP_CONFIGURE 'clr enabled',1 RECONFIGURE WITH OVERRIDE; 
GO
RECONFIGURE; 
GO
ALTER DATABASE BancoTeste SET TRUSTWORTHY ON  
GO 
CREATE TABLE NossaTabela
(
  id int primary key identity not null,
  descricao varchar(50)
);
go
insert into NossaTabela(descricao) values('Teste Descricao 01');
insert into NossaTabela(descricao) values('Teste Descricao 02');
insert into NossaTabela(descricao) values('Teste Descricao 03');
insert into NossaTabela(descricao) values('Teste Descricao 04');
insert into NossaTabela(descricao) values('Teste Descricao 05');
insert into NossaTabela(descricao) values('Teste Descricao 06');
insert into NossaTabela(descricao) values('Teste Descricao 07');
GO
```

Usando o Microsoft Visual Studio, podemos criar um projeto de banco de dados do **SQL Server**.

![01]({{ site.url }}{{ site.baseurl }}/assets/images/clr/01.png)
![02]({{ site.url }}{{ site.baseurl }}/assets/images/clr/02.png)

Ao adicionar um item **SQL CLR C# Stored Procedure** ao projeto, podemos criar um procedimento armazenado CLR.

![03]({{ site.url }}{{ site.baseurl }}/assets/images/clr/03.png)
![04]({{ site.url }}{{ site.baseurl }}/assets/images/clr/04.png)

Aqui está a class pra quem não quiser digitar 🙂

```csharp
using System.Data.SqlClient;
using Microsoft.SqlServer.Server;
public partial class StoredProcedures
{
  [SqlProcedure]
  public static void ListarTabelaCLR()
  {
    using (var con = new SqlConnection("context connection=true"))
    {
      con.Open();
      using (var cmd = new SqlCommand("select * from NossaTabela", con))
      {
        var reader = cmd.ExecuteReader();
        SqlContext.Pipe.Send(reader);
      }
    }
  }
}
```

Compile o Projeto **(CTRL + SHIFT + B)**
Feito isso rode o script abaixo no banco que criamos logo acima.

```sql
IF(EXISTS(select * from sys.objects where name = 'ListarTabelaCLR'))  
    exec('DROP PROCEDURE ListarTabelaCLR');  
GO  
IF (EXISTS(select * from sys.assemblies where name = 'MinhaClr'))  
BEGIN   
    exec('DROP ASSEMBLY MinhaClr');  
END  
go
CREATE ASSEMBLY MinhaClr FROM 'R:\RafaelNuvem\GitHub\ProjetosComunidade\ClrCSharp\MinhaClr.dll' with PERMISSION_SET =UNSAFE;
go
CREATE PROCEDURE [dbo].[ListarTabelaCLR]  AS EXTERNAL NAME [MinhaClr].[StoredProcedures].[ListarTabelaCLR]  
go
```

Observações:
Lembre de substituir **R:\RafaelNuvem\GitHub\ProjetosComunidade\ClrCSharp\MinhaClr.dll** pelo diretório onde compilou seu projeto!
o comando **SP_CONFIGURE 'clr habilitado' , 1** habilita no SQL Server a Integração do CLR.

O comando **ALTER DATABASE BancoTeste SET TRUSTWORTHY ON** irá autorizar a integração com assemblies de terceiros.

Vamos agora testar nossa CLR.

![05]({{ site.url }}{{ site.baseurl }}/assets/images/clr/05.png)

Espero que goste 🙂 até a próxima…
---
title: "Carregando instâncias do SQL Server"
comments: false
excerpt_separator: "Ler mais"
categories:
  - CSharp
  - SQL Server
tags:
  - CSharp
---

## Carregando Instâncias do SQL SERVER

Olá tudo bem?!

Nesse pequeno POST, quero mostrar como carregar instâncias do mecanismo de banco de dados SQL SERVER.

Para aqueles que precisam muitas vezes descobrir uma instância para configurar seu sistema aqui está um exemplo simples e muito prático, além
de carregarmos as instâncias, também iremos carregar todas bases de dados para essa instância.

**Observação:** Os bancos de dados serão carregados apenas se a instância for LOCAL, para nosso exemplo, por que para instância em outros computadores, pode ser necessário
uma conta de acesso e permissões, mais isso é fácil de ser alterado em uma string de conexão.

**Vamos para o código, deixarei o link do projeto para download**  acesse [Aqui](https://www.dropbox.com/s/wpjszyx0itnu1sp/RecuperandoInstanciasSQLServer.rar?dl=0)


![01]({{ site.url }}{{ site.baseurl }}/assets/images/carregarinstancias.png)


Todo nosso código se resume a isso:
```csharp
using System;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace RecuperandoInstanciasSQLServer
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            // Quando selecionar uma instância listar os bancos
            cbInstancias.SelectedIndexChanged += delegate { GetBancos(); };
        }

        private void btnCarregar_Click(object sender, EventArgs e)
        {
            // Carregar instâncias disponíveis na rede
            var instancias = SqlDataSourceEnumerator.Instance.GetDataSources();

            //Limpar o combo de instâncias
            cbInstancias.Items.Clear();

            // Percorrer e adicionar as instâncias no combo
            foreach (DataRow info in instancias.Rows)
            {
                // Nome do computador
                var seridor = info["ServerName"].ToString();
                // Nome da Instância
                var instancia = info["InstanceName"].ToString();

                cbInstancias.Items.Add($"{seridor}\\{instancia}");
            }

            if (cbInstancias.Items.Count > 0)
            {
                cbInstancias.SelectedIndex = 0;
            }
        }

        private void GetBancos()
        {
            try
            {
                cbBancos.Items.Clear();

                // Aqui é um extra, onde iremos exibir os bancos disponíveis para
                // a instância selecionada
                var stringConexao = $"Server={cbInstancias.SelectedItem};Database=master;Trusted_Connection=True;";
                using (var conn = new SqlConnection(stringConexao))
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        // Consultar os bancos disponíveis
                        cmd.CommandText = "SELECT name FROM sys.databases";
                        var bancos = cmd.ExecuteReader();

                        while (bancos.Read())
                        {
                            cbBancos.Items.Add(bancos.GetString(0));
                        }
                    }
                }
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
            }
        }
    }
}
```

Fico por aqui, compartilhem, comentem...
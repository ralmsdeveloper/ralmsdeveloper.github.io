---
title: "Compressão de Dados"
comments: false
excerpt_separator: "Ler mais"
categories:
  - CSharp
tags:
  - CSharp
---

Quero falar hoje sobre um assunto bastante interessante “ESPAÇO”, isso mesmo.

Nos dias de hoje com HDs/SSDS para armazenamentos não podemos reclamar de “ESPAÇO”.

Bom não é bem assim, para quem desenvolve sistemas e utiliza por exemplo um SQL Server Express que é limitado o tamanho de banco a 10GB, as vezes se preocupa se o banco está crescendo.

Podemos ganhar mais espaço fazendo ajustes nas informações antes mesmo de enviar para o banco, uma compactação.

Isso é valido para quem precisar armazenar bytes de uma imagem por exemplo, ou até mesmo um arquivo.

O Exemplo abaixo compactar uma informação que é passada como string e devolve em Byte ou vice-versa.

```csharp
public static class Compressao
{
    private static void CopiaOsBytes(Stream origem, Stream destino)
    {
        var bytes = new byte[4096];
        int total;
        while ((total = origem.Read(bytes, 0, bytes.Length)) != 0)
        {
            destino.Write(bytes, 0, total);
        }
    }

    public static byte[] CompactarBytes(string str)
    {
        var bytes = Encoding.UTF8.GetBytes(str);

        using (var msi = new MemoryStream(bytes))
        {
            using (var mso = new MemoryStream())
            {
                using (var gs = new System.IO.Compression.GZipStream(mso, System.IO.Compression.CompressionMode.Compress))
                {
                    CopiaOsBytes(msi, gs);
                }

                return mso.ToArray();
            }
        }
    }

    public static string DescompactarBytes(byte[] bytes)
    {
        using (var msi = new MemoryStream(bytes))
        {
            using (var mso = new MemoryStream())
            {
                using (var gs = new System.IO.Compression.GZipStream(msi, System.IO.Compression.CompressionMode.Decompress))
                {
                    CopiaOsBytes(gs, mso);
                }
                return Encoding.UTF8.GetString(mso.ToArray());
            }
        }
    }

}

```

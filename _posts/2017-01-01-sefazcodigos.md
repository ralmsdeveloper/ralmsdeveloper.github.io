---
title: "Códigos de Rejeição da Sefaz"
comments: false
excerpt_separator: "Ler mais"
categories:
  - Sefaz
tags:
  - Sefaz
---

![01]({{ site.url }}{{ site.baseurl }}/assets/images/nota_fiscal.png)

201 – **Rejeição:** Número máximo de numeração de NF-e a inutilizar ultrapassou o limite

Essa rejeição ocorre quando a quantidade máxima de numeração a inutilizar ultrapassou o limite estabelecido pela SEFAZ. Maiores informações sobre esta rejeição, confira nosso artigo: “Número máximo de numeração de NF-e a inutilizar ultrapassou o limite”

202 – **Rejeição:** Falha no reconhecimento da autoria ou integridade do arquivo digital

Quando o XML da NF-e não estiver de acordo com a template (modelo de documento) adotada pela SEFAZ da UF do emitente, será retornado a rejeição 202. Maiores informações sobre esta rejeição, confira nosso artigo: “**Rejeição:** Falha no reconhecimento da autoria ou integridade do arquivo digital”

203 – **Rejeição:** Emissor não habilitado para emissão de NF-e

Essa mensagem significa que o CNPJ do Emitente não está autorizado para emitir NF-e no ambiente desejado.  Maiores informações sobre esta rejeição confira nosso artigo “Emissor não habilitado para emissão de NF-e”

204 – **Rejeição:** Duplicidade de NF-e

Essa rejeição acontece quando a empresa tenta enviar uma NF-e que já foi emitida e homologada pela SEFAZ. Maiores informações sobre esta rejeição confira nosso artigo “Duplicidade de NF-e”

205 – **Rejeição:** NF-e está denegada na base de dados da SEFAZ

Esta rejeição ocorre quando o emitente tenta emitir uma NF-e com uma numeração que encontra-se denegada na SEFAZ. Maiores informações referente a rejeição 205, confira nosso artigo: “**Rejeição:** NF-e esta denegada na base de dados da SEFAZ”

206 – **Rejeição:** NF-e já está inutilizada na Base de dados da SEFAZ

Essa rejeição “206 – NF-e já está inutilizada na base de dados da SEFAZ” ocorre quando o emitente tenta emitir uma NF-e com um número que já foi inutilizado na SEFAZ. Maiores informações podem ser obtidas no seguinte artigo: “NF-e já esta inutilizada na base de dados da SEFAZ”

207 – **Rejeição:** CNPJ do emitente inválido

Ao tentar emitir uma NF-e informando um CNPJ inválido para o Emitente, é retornado ao emissor a rejeição 207. Maiores informações sobre esta rejeição, confira nosso artigo: “**Rejeição:** CNPJ do emitente inválido.”

208 – **Rejeição:** CNPJ do destinatário inválido

Esta rejeição significa que o CNPJ do Destinatário não foi informado corretamente. Maiores informações sobre esta rejeição, confira nosso artigo **Rejeição:** CNPJ do destinatário inválido.

209 – **Rejeição:** IE do emitente inválida

Essa rejeição é apresentada ao emissor quando não foi informada corretamente a sua Inscrição Estadual – IE. Maiores informações sobre esta rejeição, podem ser obtidas em nosso artigo **Rejeição:** IE do emitente inválida.

210 – **Rejeição:** IE do destinatário inválida

Essa rejeição é apresentada ao Emissor quando não foi informada corretamente a Inscrição Estadual do Destinatário. A rejeição pode ocorrer por diversos motivos: conteúdo diferente de ISENTO, erro no dígito de controle da IE informada, ou o tamanho da IE não está de acordo.

Esse campo pode ser enviado vazio ou informando de 2 à 14 caracteres, onde a SEFAZ verifica se o número que foi informado está vinculado ao CNPJ/CPF do destinatário.

Exemplo:
Na emissão de uma nota onde o destinatário possui a IE 0123456789, pode ocorrer que o sistema emissor remova o zero à esquerda, e, neste caso, a SEFAZ irá rejeitar o lote NF-e. Pode acontecer também que o emissor inverta algum número, por exemplo, envie 0123546789 em vez de 0123456789. Nesse caso o lote transmitido também será rejeitado.

Como proceder para resolver essa situação?
Revise o conteúdo informado na tag <IE_dest> correspondente ao grupo do Destinatário no arquivo xml enviado. Em seguida envie a NF-e novamente.

Algumas dicas para preenchimento deste campo:
• Se o fornecedor é contribuinte de ICMS e possuir Inscrição Estadual, ela deverá ser informada.
• Se o fornecedor é contribuinte de ICMS, porém não está obrigado à inscrição de ICMS, deverá constar a descrição ISENTO no campo de Inscrição Estadual.
Para pessoa Jurídica:
• Se o fornecedor é contribuinte de ICMS e possuir Inscrição Estadual, ela deverá ser informada.
• Se o fornecedor é contribuinte de ICMS, porém não está obrigado à inscrição de ICMS, deverá constar a descrição ISENTO no campo de Inscrição Estadual.
Para pessoa Física:
• Deverá constar a descrição ISENTO no campo de Inscrição Estadual.

A SEFAZ valida as informações referente a Inscrição Estadual, sendo necessário informar uma IE válida ou a descrição ISENTO, ou seja, a tag ‘IE’ não poderá ser enviada em branco.

211 – **Rejeição:** IE do substituto inválida

Essa rejeição é apresentada ao Emissor quando não foi informada corretamente a Inscrição Estadual do Substituto. Segundo a Nota Técnica 2013/005 o campo IEST (Inscrição Estadual do Substituto Tributário) é obrigatório quando houver retenção do ICMS ST para a UF de destino. Com essa exigência, ao tentar transmitir uma NF-e com a Inscrição Estadual do Substituto Tributário vazia ou com uma numeração inválida, é retornada essa rejeição.

Exemplo:
Na emissão de uma nota onde o emitente tenha a IEST 0123456789, pode acontecer do sistema emissor remover o zero à esquerda e, neste caso, a SEFAZ irá rejeitar o lote NF-e. Pode acontecer também do emissor inverter algum número, por exemplo, enviar 0123546789 no lugar de 0123456789. Nesse caso, o lote transmitido também será rejeitado.

Como proceder para resolver essa situação?
Este erro é comum quando não se realiza a validação da IEST no cadastro de clientes, consequentemente aceitando um valor inválido. Deve-se validar a IEST de acordo com os critérios abaixo e a obrigatoriedade no preenchimento do campo. Caso esteja errada, corrija a informação da IE do Substituto Tributário e envie novamente a NF-e.
Se informada a IE do Substituto Tributário:
– IEST inválida para a UF: erro no tamanho da IE, na composição, ou no dígito verificador.
UF a ser utilizada na validação:
– UF do Local de Entrega para operação de Faturamento Direto de veículos novos.
– UF do destinatário nos demais casos.

212 – **Rejeição:** Data de emissão NF-e posterior a data de recebimento

Essa rejeição será apresentada quando a Data de Emissão da NF-e for maior que a data de recebimento da nota na SEFAZ. Maiores informações sobre esta rejeição, confira nosso artigo: “Data-Hora de emissão posterior ao horário de recebimento”

213 – **Rejeição:** CNPJ – Base do Emitente difere do CNPJ – Base do Certificado Digital

Essa rejeição acontece quando a SEFAZ identifica que a raiz do CNPJ do emitente está diferente da raiz do CNPJ do certificado digital utilizado na assinatura pela empresa emissora.

Existem duas situações que podem ocasionar essa **Rejeição:**
1 – Quando o CNPJ-Base do emitente for informado errado;
2 – Quando a NF-e for assinada com um Certificado Digital incorreto.

Exemplo:
Na emissão da NF-e essa rejeição ocorre quando o emitente informa um CNPJ incorreto, onde o mesmo é identificado como diferente do CNPJ do Certificado utilizado na assinatura do documento.

Por exemplo, um emitente possui um certificado onde seu CNPJ é 12345678912345, ele precisa emitir uma nota fiscal e na geração da nota ele informa o CNPJ como 98765432109876, neste caso os dois CNPJ informados são diferentes, o que irá ocasionar na respectiva rejeição.

Como proceder para resolver essa situação?
Sabe-se que para a emissão de documentos fiscais eletrônicos, como NF-e, é obrigatória a utilização de um certificado digital para identificação do emitente via Web Service, assinatura digital e transmissão das Notas Fiscais Eletrônicas, onde o Certificado Digital deve conter o CNPJ da pessoa jurídica titular.

Ao se deparar com essa rejeição deve-se verificar se o CNPJ-Base do emitente foi informado corretamente, através do campo <CNPJ_emit>, dentro do grupo <emit>. Se estiver correto, é necessário confirmar se o Certificado Digital utilizado para assinar a NF-e é realmente o certificado emitido para o CNPJ-Base do emitente. Para isso será necessário acessar a aplicação InvoiCy, e no Painel de Controle, acessar a opção Certificados no grupo Empresa, e alterar o certificado caso o mesmo esteja incorreto.

Para mais informações sobre o cadastro e instalação do certificado digital, leia os artigos ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

214 – **Rejeição:** Tamanho da mensagem excedeu o limite estabelecido

Conforme estipulado no manual do contribuinte o limite máximo permitido para o tamanho de um lote é de 500kb. Quando ocorre o envio de lotes de notas com mais de uma NF-e, ou até mesmo notas com inúmeros itens, acaba gerando um grande volume de informações podendo fazer com que o arquivo XML criado supere facilmente o tamanho de 500kb estabelecido, resultando então na **Rejeição:** “214 –  Tamanho da mensagem excedeu o limite estabelecido”.

Como proceder para resolver essa situação?
Nessa situação deve-se reduzir o tamanho da mensagem para transmitir novamente a NF-e para a SEFAZ. Caso a NF-e possua muitos produtos, uma forma de reduzir o tamanho da mensagem é dividir a NF-e, emitindo duas NF-e com numerações diferentes para esse mesmo cliente.

215 – **Rejeição:** Falha no schema XML

Essa rejeição indica um problema no arquivo XML da NF-e, onde a causa pode ser caracteres especiais presentes no arquivo. Maiores informações sobre esta rejeição, confira nosso artigo: “Falha no Schema XML”

216 – **Rejeição:** Chave de Acesso difere da cadastrada

Essa rejeição indica que estamos tentando executar uma determinada operação, como o cancelamento de uma NF-e por exemplo, que possui os mesmos dígitos de outra NF-e que já está autorizada, porém, com um dígito verificador diferente.

Exemplo:
Ao enviarmos uma NF-e que seja autorizada podemos executar algumas operações para esse documento, como o cancelamento por exemplo. Dessa forma, ao realizar o cancelamento temos que informar a chave de acesso exata da NF-e que desejamos cancelar. Caso essa chave de acesso tenha o seu dígito verificador modificado, por exemplo, ao tentar cancelar será retornada a rejeição 216 –  Chave de acesso difere da cadastrada.

Como proceder para resolver essa situação?
Sempre que enviar uma NF-e, ao executar operações sobre ela deve-se informar exatamente a chave de acesso da NF-e autorizada, para que a operação seja executada com sucesso.

217 – **Rejeição:** NF-e não consta na base de dados da SEFAZ

A respectiva rejeição pode acontecer devido as seguintes situações: quando se consulta uma NF-e inexistente no ambiente da SEFAZ; quando a consulta da NF-e é realizada no ambiente incorreto; ou ainda quando a NF-e não está sincronizada junto a SEFAZ de origem, essa última situação pode acontecer em momentos de emissão em contingência.

Exemplo:
No momento da emissão de uma NF-e, a SEFAZ Estadual pode estar apresentando problemas na disponibilidade do seu Web Service de recebimento, então ao tentar consultar essa NF-e na SEFAZ, através do Web Service de consultas, o documento não é encontrado pois a SEFAZ ainda não recebeu o mesmo.

Outra situação que também pode acontecer é efetuar a emissão de uma NF-e no Ambiente de Homologação, e após executar a consulta dessa NF-e no Ambiente de Produção, ou vice-versa. Nesse caso a NF-e não será encontrada, retornando a rejeição 217 –  NF-e não consta na base de dados da SEFAZ.

Como proceder para resolver essa situação?
Ao se deparar com essa rejeição, deve-se verificar se a NF-e foi autorizada e a SEFAZ recebeu o respectivo documento. Se o documento já foi autorizado e a rejeição continua sendo apresentada no momento da consulta, deve-se confirmar se o Ambiente (Produção ou Homologação) onde a NF-e foi emitida é o mesmo que está sendo utilizado para a consulta.

218 – **Rejeição:** NF-e já está cancelada na base de dados da SEFAZ

Essa rejeição representa duplicidade, onde ao enviar uma NF-e para a SEFAZ e a mesma ficar autorizada, essa numeração não poderá ser utilizada novamente pelo emitente. O mesmo se aplica quando a nota é cancelada, sua numeração não poderá ser utilizada novamente, indiferente se for um novo envio ou novo cancelamento.

Não é permitido que o mesmo emitente envie uma NF-e de modelo igual, utilizando a mesma série e numeração, mesmo que essa Nota já esteja cancelada. Caso isso acontecer, a SEFAZ irá retornar a rejeição “218 –  NF-e já está cancelada na base de dados da SEFAZ”.

Exemplo:
O Emitente cancela uma NF-e e, ao cancelar imagina que pode enviar a nota novamente com a mesma numeração. Ao enviar essa nota, a mesma será rejeitada por já existir na base de dados da SEFAZ com status Cancelada.

Por exemplo, foi emitida a NF-e de número 1, série 10 e CNPJ 99.999.999/9999-99 e em seguida cancelada. O emitente, por já ter cancelado essa NF-e, usou os mesmos dados (número, série e CNPJ) para emitir outra Nota. Nessa situação, a nova NF-e emitida será rejeitada, por já existir uma NF-e igual cancelada na base de dados da SEFAZ.

Como proceder para resolver essa situação?
Deve-se emitir a NF-e com uma numeração que ainda não foi utilizada, pois não é possível emitir uma NF-e utilizando a mesma numeração, série e CNPJ de uma NF-e que já está cancelada, pelo menos uma dessas informações deve ser alterada.

219 – **Rejeição:** Circulação da NF-e verificada

Conforme está estipulado no manual do contribuinte, uma NF-e só pode ser cancelada caso ainda não tenha ocorrido a circulação da mercadoria. A partir do momento que a mercadoria já estiver em circulação e a respectiva NF-e for consultada em uma barreira fiscal, não será mais possível realizar o seu cancelamento.

Exemplo:
Uma mercadoria está sendo transportada do Estado de São Paulo para o Estado do Rio Grande do Sul, e durante o trajeto a sua respectiva NF-e foi consultada em uma barreira fiscal. A partir desse momento o fisco passa a reconhecer que essa mercadoria está em circulação, ou seja, o fato gerador do recolhimento do ICMS está sendo executado, e mesmo que ainda haja tempo suficiente para efetuar o cancelamento dessa NF-e, não será mais possível. Uma tentativa de cancelamento nesse momento irá resultar na rejeição “219 – Circulação da NF-e verificada”, e a NF-e não será cancelada.

Como proceder para resolver essa situação?
De acordo com informação da SEFAZ uma NF-e somente poderá ser cancelada caso seu uso tenha sido previamente autorizado pelo Fisco (protocolo “Autorização de Uso”) e contanto que não tenha ocorrido ainda a saída da mercadoria do estabelecimento.

Ao deparar-se com essa rejeição, deve-se contatar a SEFAZ e solicitar o cancelamento dos Eventos de Registro de Passagem vinculados a respectiva NF-e. Ou também pode-se emitir uma NF-e de Estorno / Devolução para solucionar o problema.

220 – **Rejeição:** Prazo de Cancelamento Superior ao Previsto na Legislação 

Esta rejeição ocorre quando é solicitado o cancelamento de uma NF-e que foi emitida há mais de 24 horas (prazo máximo permitido pela SEFAZ).

É preciso observar que cada estado pode adotar regras próprias, definindo prazos para o cancelamento, como é o caso de Mato Grosso, onde o prazo para o cancelamento de uma NF-e é de 2 horas.

Exemplo:
O emissor envia uma NF-e no dia 03/09 e a mesma é autorizada. Após no dia 05/09 tenta efetuar o cancelamento dessa nota. Isso ocasionará a rejeição 220, pois a nota já está autorizada a mais de 24 horas.

Como resolver?
Nesse caso recomendamos sempre verificar as regras adotadas pelo seu estado emissor, como forma de evitar possíveis rejeições.

221 – **Rejeição:** Confirmado o recebimento da NF-e pelo destinatário

Esta rejeição indica que o destinatário da nota fiscal realizou a manifestação confirmando a operação, isto é, o recebimento da mercadoria.

Conforme regra da SEFAZ, uma NF-e que possuir o Evento de Manifestação como ‘Confirmada a Operação’, não poderá ser cancelada, visto que o destinatário já recebeu as mercadorias. No caso de devolução da mercadoria referente a esta NF-e, deverá ser emitida outra NF-e de Estorno.

O que essa rejeição significa na prática?
Nos casos em que o destinatário da NF-e realizar a manifestação do destinatário com o tipo de evento 210200 – Confirmação da Operação pelo Destinatário, a SEFAZ não permite mais o cancelamento da NF-e pelo emitente, pelo fato de que o destinatário confirmou de que a nota existe e a mercadoria foi confirmada.

Como proceder para resolver essa situação?
Para resolver essa situação deve-se analisar a situação da NF-e, se o documento deve mesmo ser cancelado ou se foi um erro na manifestação do destinatário pelo destinatário que recebeu a NF-e.

Se caso foi um erro na manifestação do destinatário, o destinatário da NF-e poderá enviar outra manifestação com o tipo de evento 210220 – Operação não realizada ou 210240 – Desconhecimento da Operação para à SEFAZ e com isso, o emitente consegue realizar o posterior cancelamento da NF-e. Este processo só é permitido em função de que a SEFAZ somente verifica o último evento enviado na NF-e correspondente, neste caso, se o último for evento do tipo 210220 ou 210240 será possível cancelar a NF-e.

222 – **Rejeição:** Protocolo de Autorização de Uso difere do cadastrado

A rejeição “222 – Protocolo de Autorização de Uso difere do cadastrado” indica que, ao tentar cancelar uma nota está sendo utilizado um protocolo de autorização que não corresponde ao protocolo registrado na SEFAZ.

O que essa rejeição significa na prática?
Esta rejeição ocorre nos casos em que é realizada a tentativa de um cancelamento de NF-e e no envio dos dados para à SEFAZ o número de protocolo, nProt, foi preenchido com um valor diferente do número do protocolo da NF-e autorizada.

Como proceder para resolver essa situação?
Para evitar esta rejeição, o XML de envio do Evento de Cancelamento deve ser enviado com os dados correspondentes a NF-e informados de forma correta no campo nProt.

223 – **Rejeição:** CNPJ do transmissor do lote difere do CNPJ do transmissor da consulta

A rejeição “223 – CNPJ do transmissor do lote difere do CNPJ do transmissor da consulta” indica que o certificado usado na autenticação (SSL) da consulta é diferente do certificado usado na autenticação do envio.
Quando uma NF-e é enviada para a SEFAZ, temos o uso do certificado para autenticação de comunicação e também para a assinatura do arquivo digital. Essa rejeição surge quando o certificado usado para autenticar a comunicação não é o mesmo usado para assinar a NF-e.

Para mais informações sobre o cadastro e instalação do certificado digital, leia os artigos ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

224 – **Rejeição:** A faixa inicial é maior que a faixa final

Ao tentar realizar a inutilização de uma numeração ou faixa de numeração, onde for informado o número inicial maior que o número final que se deseja inutilizar, será retornada a rejeição “224 – A faixa inicial é maior que a faixa final”.

Exemplo:
Emissor envia o layout de inutilização de NF-e, onde o número inicial é maior que o número final, como no exemplo a seguir. Isso irá ocasionar na rejeição 224:
<Inutilizacao>
<ModeloDocumento>NF-E</ModeloDocumento>
<Versao>2.00</Versao>
<CNPJEmissor>06354976000149</CNPJEmissor>
<tpAmb>2</tpAmb>
<NumeroInicial>14</NumeroInicial>
<NumeroFinal>13</NumeroFinal>
<Serie>1</Serie>
<Justificativa>Inutilizacao por motivos de pulo de numeracao</Justificativa>
</Inutilizacao>

Como resolver?
Para que essa rejeição não ocorra é preciso informar corretamente a numeração a ser inutilizada. Para mais informações sobre o processo de inutilização via Web Service leia o artigo ‘Inutilizando uma NF-e’. É possível também inutilizar NF-e via tela, leia o artigo para mais informações ‘Tela para inutilização de documentos’.

225 – **Rejeição:** Falha no Schema XML do lote de NF-e

A rejeição “225 – Falha no Schema XML do lote de NF-e” é retornada pela SEFAZ quando houver erro no preenchimento da NF-e, porém, esta rejeição é genérica, sendo preciso considerar outros problemas como:
– Espaços entre as tags do XML;
– Quebras de linhas;
– Caracteres especiais;
– Nome de tags incorretos;
– Versão do XML diferente do esperado pelo Web Service.

Como proceder para resolver esta situação?
Para clientes que utilizam integração com o InvoiCy, o sistema monta o XML de acordo com a regras da SEFAZ, sendo assim, caso ocorrer esta rejeição, verifique todas as informações da NF-e, removendo acentuação, quebras de linhas e caracteres especiais, bem como revisar se todos os campos obrigatórios estão sendo preenchidos no envio da NF-e.

226 – **Rejeição:** Código da UF do Emitente diverge da UF autorizadora

A rejeição “226 – Código da UF do Emitente diverge da UF autorizadora” ocorre quando o campo que identifica o código da UF no XML não condiz com a UF da SEFAZ de autorização. Esta validação é realizada pelo Web Service de Autorização da SEFAZ e serve para garantir que cada UF processe somente as notas emitidas por contribuintes locais.

Na prática o que significa esta rejeição?
Esta rejeição ocorre nos casos em que o campo cUF foi inserido, por exemplo, com 43 (RS) e o sistema de emissão está enviando para 35 (SP), um estado diferente da qual o emitente está cadastrado.

Como proceder para resolver esta situação?
A solução deste problema depende de duas verificações, se o campo cUF está sendo preenchido corretamente pelo ERP, ou se o sistema emissor, Plataforma InvoiCy, está enviando o XML da NF-e para o estado da empresa emissora. Para consultar os códigos de todas as UF do Brasil, acesse:  http://www.ibge.gov.br/home/geociencias/areaterritorial/principal.shtm.

227 – **Rejeição:** Erro na Chave de Acesso – Campo Id – falta a literal NF-e

A rejeição “227 – Erro na Chave de Acesso – Campo Id – falta a literal NF-e” indica que a formação da chave de acesso da NF-e não está de acordo com o exigido pela SEFAZ. A exigência é que a chave de acesso seja gerada no formato Id=“NF-E43130208387868000160553450000154541000000018″, caso não for informada a literal ‘NF-E’, a rejeição será retornada.

É preciso observar que a literal é ‘case sensitive’, assim somente NF-E é válida (Nf-e, NF-e, nf-E, etc, são inválidas).

As demais informações que compõem a chave de acesso são:
• cUF – Código da UF do emitente do Documento Fiscal (02)
• AAMM – Ano e Mês de emissão da NF-e (04)
• CNPJ – CNPJ do emitente (14)
• mod – Modelo do Documento Fiscal (02)
• serie – Série do Documento Fiscal (03)
• nNF – Número do Documento Fiscal (09)
• tpEmis – Tipo de Emissão do Documento Fiscal (01) – campo novo da versão 2.00
• cNF – Código Numérico que compõe a Chave de Acesso (08) – tamanho reduzido para 8 dígitos na versão 2.00
• cDV – Dígito Verificador da Chave de Acesso (01)

228 – **Rejeição:** Data de Emissão muito atrasada

Observação: essa mensagem é apresentada quando é enviada uma NF-e com data de emissão retroativa a mais de 30 dias.

A SEFAZ permite o envio de uma nota fiscal até 30 dias após sua emissão, quando ocorrer a rejeição “Data de Emissão muito atrasada” a nota fiscal deverá ser inutilizada e gerar uma nova nota fiscal com data mais recente.

Na prática, o que isso significa?
Ao se emitir uma nota com data retroativa igual ou superior a 30 dias, o retorno será a rejeição “228 – Data de emissão muito atrasada”.

Como resolver?
Para correção do problema deverá ser informada a data dentro do limite estabelecido pela SEFAZ. É preciso ficar atento, pois cada UF poderá validar de forma particular esta informação.

229 – **Rejeição:** IE do emitente não informada

Se ao emitir uma NF-e for informada a Inscrição Estadual, tag <IE> no grupo <emit>, com zeros ou não for informada, a SEFAZ irá retornar esta rejeição.

Como resolver?
Para resolver a situação de rejeição basta informar a Inscrição Estadual do emitente corretamente, e enviar o documento novamente.

230 – **Rejeição:** IE do emitente não cadastrada

Esta rejeição é retornada quando a Inscrição estadual não estiver cadastrada na SEFAZ.

Exemplo:
Foi emitida uma NF-e e a IE do emitente foi preenchida com o valor “418831985”, ainda não cadastrada para emitir NF-e em Produção. Nessa situação, a NF-e será rejeitada pelo motivo 230.

Como resolver?
Para resolver este problema, deve-se verificar o processo de cadastro e liberação da empresa para emissão de NF-e, confirmar junto a SEFAZ para qual ambiente (Homologação ou produção) o mesmo foi realizado. Em cada Estado o processo para cadastramento e ativação de uma Inscrição Estadual para emissão de NF-e pode ser diferente. Entre em contato com a SEFAZ do seu Estado para averiguação dessa situação e melhores orientações sobre o processo de cadastramento / ativação.

231 – **Rejeição:** IE do emitente não vinculada ao CNPJ

A causa desta rejeição é o fato de as informações do CNPJ ou da Inscrição Estadual do Emitente estarem divergentes do cadastro junto a SEFAZ.

Como resolver?
Para corrigir este erro verifique se as informações do CNPJ e da inscrição Estadual estão corretas e se são as mesmas que constam no cadastro da empresa na SEFAZ. Para isso poderá ser realizada uma consulta no Sintegra –www.sintegra.gov.br.

232 – **Rejeição:** IE do destinatário não informada

Quando o emitente não informar a Inscrição Estadual do Destinatário da NF-e, e a SEFAZ verificar que este não é Isento, ocorrerá a rejeição “232 – IE do destinatário não informada”.

Como resolver?
Para corrigir esta rejeição deve-se verificar se o destinatário é contribuinte não isento, ou mesmo se a NF-e está sendo emitida para o exterior, onde o destinatário não terá IE. Confirmado que o destinatário da NF-e não é isento, é preciso informar sua Inscrição Estadual e o Indicador da IE do Destinatário como “1 – Contribuinte ICMS”.

233 – **Rejeição:** IE do destinatário não cadastrada

Este retorno ocorre quando está sendo enviado dados de Inscrição estadual na NF-e, porém, o destinatário não é contribuinte do ICMS, portanto não possui IE, ou o cadastro do mesmo na SEFAZ está desatualizado.

Como resolver?
A solução desta rejeição é verificar os dados deste destinatário e qual seu real enquadramento junto à SEFAZ do seu estado e regularizar seu cadastro, ou então, alterar a informação do campo indIEDest para 9 – Não contribuinte.

234 – **Rejeição:** IE do destinatário não vinculada ao CNPJ

Esta rejeição ocorre quando a Inscrição Estadual do Destinatário informada na NF-e está divergente da inscrição que corresponde ao CNPJ no Sintegra. Esta situação pode ocorrer nas seguintes situações:
– Informado CNPJ do destinatário incorreto;
– Informada a Inscrição Estadual incorreta;
– Destinatário da NF-e possui Inscrição Estadual com situação ‘Baixada’.

Como resolver?
Para ajustar uma nota com esta rejeição é preciso conferir se o CNPJ do destinatário que foi informado está correto, caso sim, realizar uma consulta no Sintegra (http://www.sintegra.gov.br), para verificar a Inscrição Estadual que consta para este CNPJ e qual sua situação.

235 – **Rejeição:** Inscrição SUFRAMA inválida

Ocorre esta rejeição quando o código do SUFRAMA não estiver informado nos casos em que o destinatário estiver cadastrado junto a Superintendência da Zona Franca de Manaus. Ou então nos casos em que estiver sendo informado zeros ao invés do número registrado no SUFRAMA.

Como resolver?
Para resolver deverá verificar qual informação está sendo enviada no campo SUFRAMA e se estiver diferente do que consta no cadastro deverá alterar e reenviar a nota.

236 – **Rejeição:** Chave de Acesso com dígito verificador inválido

Esta rejeição é causada pela má formação da chave de acesso, onde o cálculo do dígito verificador foi realizado de forma incorreta.

Como resolver?
Para evitar esta rejeição o cálculo do dígito verificador da chave de acesso deve ser realizado de forma correta.

237 – **Rejeição:** CPF do destinatário inválido

Essa rejeição ocorre quando a SEFAZ realiza uma validação sobre a informação no campo de CPF do destinatário, que deverá possuir apenas números, e a validação do dígito de controle informado. Caso o cálculo do dígito de controle retornar incorreto a SEFAZ irá rejeitar a nota pelo motivo 237.

Como resolver?
Para solucionar esta rejeição o emissor deverá consultar se o CPF informado para o destinatário existe, tag <CPF_dest>, através do portal da Receita Federal (https://www.receita.fazenda.gov.br/Aplicacoes/SSL/ATCTA/CPF/ConsultaPublica.asp). Caso for necessário deverá alterar o CPF e enviar o documento novamente.

238 – **Rejeição:** Cabeçalho – Versão do arquivo XML superior a Versão vigente

Essa rejeição ocorre nos casos em que a tag ‘xml version’, do arquivo XML enviado, está preenchida diferente da versão atual do arquivo. Hoje essa informação deverá estar como ‘xml version’ = 3.10, caso estiver sendo enviada com informação superior a versão definida do projeto da NF-e irá resultar na rejeição 238.

Como resolver?
Para contornar esta rejeição será necessário enviar um XML com o ‘xml version’ com o conteúdo 3.10. Estas informações são geradas pelo sistema emissor da NF-e no momento da integração com a SEFAZ, ou quando ocorre a mudança do layout da NF-e.

239 – **Rejeição:** Cabeçalho – Versão do arquivo XML não suportada

Esta rejeição ocorre nos casos em que está sendo enviada uma informação diferente de ‘3.10’ no campo ‘xml version’ na estrutura do XML.

Como resolver?
Para resolver o problema o emissor deverá verificar a informação que está sendo enviada, caso estiver diferente de 3.10 deverá ajustar e reenviar o XML para a SEFAZ. Destacando que esta informação é controlada pelo emissor de notas.

240 – **Rejeição:** Cancelamento/Inutilização – Irregularidade Fiscal do Emitente

Esta rejeição ocorre nos casos em que o emitente da NF-e possui irregularidade fiscal junto a Secretaria da Fazenda do estado. Nos casos em que retornar esta rejeição no momento de realizar o cancelamento da NF-e ou a inutilização de uma numeração, deverá analisar junto a SEFAZ do estado qual é a irregularidade fiscal do emitente.

Como resolver?
Caso for necessário entre em contato com a SEFAZ do seu estado para identificar qual a irregularidade. Após a irregularidade ter sido resolvida será possível prosseguir com o cancelamento e/ou inutilização dos documentos conforme necessidade.

241 – **Rejeição:** Um número da faixa já foi utilizado

Esta rejeição ocorre sempre que for solicitada a inutilização de uma numeração que já tenha sido efetivada, cancelada, denegada ou que há um registro de contingência EPEC. Maiores informações referente a esta rejeição, acesse nosso artigo: “Um número da faixa já foi utilizado”

242 – **Rejeição:** Cabeçalho – Falha no Schema XML

Esta rejeição geralmente ocorre quando o XML da NF-e possui caracteres especiais ou a estrutura não está de acordo com os schemas padrão da SEFAZ.

Como resolver?
Para que não haja este problema é necessário verificar as informações contidas no arquivo XML, evitando o envio de caracteres especiais, ou campos com mais informações do que o permitido. Ao ocorrer essa rejeição o emissor deverá analisar toda a estrutura do arquivo XML e ajustar os problemas de caracteres especiais encontrados, bem como, o excesso de informações e pipes nos campos.

243 – **Rejeição:** XML Malformado

A rejeição de XML malformado ocorre em função de uma falha na geração da estrutura do arquivo XML, quando não segue os padrões definidos pela SEFAZ através do manual de integração.
Este problema geralmente ocorre em casos onde é aberta uma tag, mas a mesma não é fechada, ou em casos onde a mesma é fechada de maneira incorreta.

Exemplo:
Podemos citar como exemplo a abertura da tag e seu fechamento incorreto conforme segue: <endereco>Rua de Teste<endereco>. Ao enviar um XML gerado assim iria retornar a rejeição 243. O correto seria a abertura e fechamento da tag como orienta o manual de integração: <endereco>Rua de Teste</endereco>.

Para mais informações sobre como gerar o arquivo de integração XML da NF-e consulte nosso layout de integraçãoclicando aqui.

244 – **Rejeição:** CNPJ do Certificado Digital difere do CNPJ da Matriz e do CNPJ do Emitente

Como é de conhecimento dos emissores, é obrigatório possuir um certificado digital A1 ou A3 para a emissão dos documentos eletrônicos. Porém, essa rejeição pode retornar ao emitir notas onde o certificado digital informado na emissão não possui o mesmo CNPJ matriz do emissor.

Como resolver?
Para contornar este problema é necessário verificar se o CNPJ contido no certificado digital é o mesmo CNPJ que consta no XML da NF-e. Caso não constar deverá alterar o certificado no sistema, informando um que tenha o mesmo CNPJ raiz do emissor e em seguida reenviar o documento.

Para mais informações sobre como atualizar o certificado da empresa emissora leia o artigo ‘Vinculando o certificado digital’.

245 – **Rejeição:** CNPJ Emitente não cadastrado

Para iniciar a emissão de Notas Fiscais Eletrônicas é necessário estar cadastrado na SEFAZ do estado. Maiores informações sobre esta rejeição, confira o artigo: “CNPJ emitente não cadastrado”

246 – **Rejeição:** CNPJ Destinatário não cadastrado

Do mesmo modo que pode ocorrer problemas na emissão de notas pelo fato do emitente não ter finalizado o cadastro na SEFAZ de origem, pode ocorrer casos em que o destinatário da NF-e não está com seu cadastro regularizado junto a SEFAZ, e a mesma não permite a transmissão da NF-e.

Como resolver?
Para resolver este problema é necessária a regularização do cadastro do destinatário junto a SEFAZ de origem e posterior reenvio da nota. Também pode ocorrer casos em que o cadastro é muito recente e o processo de regularização ainda não foi concluído, causando a rejeição 246.

247 – **Rejeição:** Sigla da UF do Emitente diverge da UF autorizadora

Esta rejeição ocorre quando ao enviar uma NF-e a sigla da UF está diferente do que no cadastro do emissor junto a SEFAZ.

Exemplo:
Um exemplo simples deste problema é o emissor informar a tag <UF> do grupo <emit> como PR, porém o cadastro do emissor for do estado de SP. Nesse caso irá retornar à rejeição 247.

Como resolver?
Para resolver essa rejeição basta corrigir a informação do campo <UF> e enviar a nota novamente.

248 – **Rejeição:** UF do Recibo diverge da UF autorizadora

Este retorno ocorre no momento em que é realizada uma consulta do recibo do documento na SEFAZ e ao validar as informações a SEFAZ identifica que os dados da consulta estão preenchidos com o estado diferente do Web Service enviado.

Como resolver?
Para resolver essa rejeição é necessário verificar se o código da UF informado no XML de consulta é do mesmo estado do Web Service configurado.

249 – **Rejeição:** UF da Chave de Acesso diverge da UF autorizadora

Ao realizar uma consulta de NF-e deverá se atentar a qual servidor da SEFAZ está enviando a nota, para evitar a rejeição 249. Deverá verificar se o código da UF do emissor está de acordo com o Web Service que está sendo enviado o XML. Caso enviar o XML com o código de UF de RS e transmitir para o Web Service de RJ, por exemplo, irá ocorrer a rejeição “249 – UF da Chave de Acesso diverge da UF autorizadora”. Esta informação é configurada pelo sistema emissor dos documentos à SEFAZ, geralmente é um campo parametrizável podendo ser ajustado conforme a necessidade.

250 – **Rejeição:** UF diverge da UF autorizadora

Esta rejeição ocorre nos casos em que a UF que foi informada para uma consulta aos serviços da SEFAZ está diferente da UF configurada no Web Service que recebeu a mensagem.

O incidente surge quando é identificado que o arquivo recebido é diferente do código da UF enviado no Web Service.

Um exemplo seria a realização de um envio de NF-e para o estado de RS com os dados do XML de uma empresa de SP, esta rejeição ocorre no momento da integração entre o sistema emissor e à SEFAZ do estado.

251 – **Rejeição:** UF/Município destinatário não pertence a SUFRAMA

Quando ocorre a rejeição “251 – UF/Município destinatário não pertence a SUFRAMA” significa que está sendo realizada a tentativa de emissão de uma nota para a região Suframa, porém a UF do destinatário não faz parte dessa região.

Como resolver esta situação?
Para que seja possível emitir uma nota com informações de Suframa, obrigatoriamente a UF do destinatário deve estar autorizada na Suframa, devendo ser uma destas: AC – Acre, AM – Amazonas, RO – Rondônia, RR – Roraima ou AP – Amapá (em Amapá somente os municípios 1600303 – Macapá e 1600600 – Santana).
Caso não faça parte de um estado com inscrição SUFRAMA, diferente de AC, AM, RO, RR ou AP, não deverá enviar os dados de SUFRAMA.

252 – **Rejeição:** Ambiente informado diverge do Ambiente de recebimento

Quando ocorre esta rejeição informando que o ambiente informado diverge do ambiente de recebimento significa que o documento está sendo enviado para o ambiente incorreto, onde a nota está com dados de produção, porém está sendo enviada para o ambiente de homologação, ou vice-versa.

Como resolver?
Para resolver o problema é necessário verificar qual é o ambiente configurado nos Web Services da SEFAZ e se o mesmo corresponde com a informação no XML que está sendo enviado. A tag a ser analisada é a <tpAmb>, onde se estiver com o valor 1 (Produção), e o ambiente de envio for homologação resultará na rejeição 252.

253 – **Rejeição:** Digito Verificador da chave de acesso composta inválida

Esta rejeição é causada pela má formação da chave de acesso, onde o cálculo do dígito verificador foi realizado de forma incorreta.

Como resolver?
Para evitar esta rejeição o cálculo do dígito verificador da chave de acesso deve ser realizado de forma correta.

254 – **Rejeição:** NF-e complementar não possui NF referenciada

Esta validação passou a vigorar deste o manual 3.0 da NF-e, e ocorre nos casos em que é emitida uma NF-e Complementar sem referência de uma NF-e.

Um exemplo:
É realizada a emissão de uma nota de complemento sem referenciar uma chave de acesso de nota normal emitida, nestes casos irá resultar na rejeição 254.

Como proceder para resolver esta situação:
Para que esta rejeição seja resolvida é necessário analisar qual é a finalidade da NF-e, se for NF-e Complementar (finNFe = 2) deverá informar os dados de uma NF referenciada no grupo de referencia de documento (NFRef), caso for uma NF-e de venda normal deverá modificar a finalidade da NF-e para normal (finNFe = 1).

255 – **Rejeição:** NF-e complementar possui mais de uma NF referenciada

Esta rejeição 255 vai retornar nos casos em que está sendo enviada mais de uma chave de acesso referenciada nos casos em que a finalidade de emissão, <finNFe> for igual a 2. De acordo com o manual da SEFAZ não é possível a emissão de uma nota de complemento com mais de uma chave de acesso eletrônica referenciada.

Como resolver essa situação:
Para resolver o problema deverá emitir uma NF-e de Complemento informando apenas uma chave de acesso, caso referenciar mais de uma chave de acesso a SEFAZ não aceitará por regra definida, em função de que só é possível complementar uma nota por vez em função dos respectivos valores.

256 – **Rejeição:** Uma NF-e da faixa já está inutilizada na Base de dados da SEFAZ

Esta rejeição ocorre sempre que for solicitada a inutilização de uma numeração que já tenha sido inutilizada anteriormente.

Como resolver?
Para resolver o problema deverá verificar se a numeração solicitada já foi utilizada, se sim, não poderá realizar a inutilização do documento novamente.

257 – **Rejeição:** Solicitante não habilitado para emissão da NF-e

Para iniciar a emissão de Notas Fiscais Eletrônicas é necessário estar cadastrado na SEFAZ do estado. E também ter emitido notas em ambiente de homologação antes de iniciar a emissão em modo de produção, podendo alterar de acordo com o estado.

Porém em alguns casos os emissores antes de se cadastrarem na SEFAZ do estado optam pela emissão direto em produção, sem emitir em homologação antes, nestes casos ocorre a rejeição 257.

Como resolver?
Para resolver este problema deverá contatar a SEFAZ de seu estado e solicitar a verificação do cadastro para emissão de NF-e. O que pode ocorrer também é a realização do cadastro e em seguida a emissão de notas, e os ambientes ainda não estarem sincronizados, sendo necessário aguardar até que a SEFAZ efetue a liberação.

OBS.: Caso o CNPJ já possuir essa liberação, favor verificar se a inscrição Estadual enviada no xml está correta conforme cadastro na Sefaz.

258 – **Rejeição:** CNPJ da consulta inválido

Ao realizar uma consulta na SEFAZ com um CNPJ e o mesmo estiver preenchido com zeros ou o dígito de controle for inválido, irá retornar a rejeição 258.

Como resolver?
Para resolver deverá verificar o CNPJ informado e enviar conforme formatação do campo apresentada no manual. Para mais informações sobre a consulta de documentos verifique o nosso layout de integração clicando aqui.

259 – **Rejeição:** CNPJ da consulta não cadastrado como contribuinte na UF

Este retorno ocorre quando for consultar um CNPJ em um estado ao qual o contribuinte não possui cadastro. Um exemplo seria realizar a consulta de um CNPJ do RS no Web Service de consulta do estado de SP, neste caso irá retornar à rejeição 259.

Para mais informações sobre a consulta de documentos verifique o nosso layout de integração clicando aqui.

260 – **Rejeição:** IE da consulta inválida

A rejeição “260 – IE da consulta inválida” ocorre em casos onde é enviado como parâmetro de consulta a informação da Inscrição Estadual incorreta. Podendo esta, estar com mais caracteres numéricos do que as 14 posições esperadas, ou menos que 2 posições, o seu dígito verificador estar inválido ou até mesmo não pertencer ao CNPJ do emissor da consulta.

Para analisar se está correta a informação da IE poderá consultar o portal da Sintegra (http://www.sintegra.gov.br) a fim de obter a informação correta, e efetuar uma nova consulta.

261 – **Rejeição:** IE da consulta não cadastrada como contribuinte na UF

Esta rejeição ocorre nos casos em que é realizada uma consulta de dados através da Inscrição Estadual em uma UF diferente da qual está cadastrada.

O que significa esta rejeição na prática?
No processo de uma consulta de dados do destinatário através do web service de ‘consulta cadastro’ do estado é enviado como parâmetro a IE do destinatário. Neste caso, a IE da consulta não está cadastrada no estado, e em função disso é enviada a rejeição 261. Também é possível obter esta rejeição se enviar traços, espaços, barras e outros caracteres especiais na consulta.

Como proceder para resolver esta situação?
Um dos motivos por retornar esta rejeição é quando a consulta é realizada com traços, barras, espaços e outros caracteres especiais juntamente com o número da IE. É necessário revisar os dados informados, e realizar a consulta apenas com números. Se estes dados estiverem corretos e mesmo assim, retornar a rejeição é porque a IE não está cadastrada na SEFAZ do estado de consulta.

262 – **Rejeição:** UF não fornece consulta por CPF

Ao realizar uma consulta de dados para um estado informando o CPF pode ocorrer de o estado não possuir consulta por CPF, retornando assim a rejeição “262 – UF não fornece consulta por CPF”.
Nesse caso deve-se analisar junto a SEFAZ quais são os dados que permitem a consulta das informações.

O que essa rejeição significa na prática?
A realização de uma consulta de CPF para o estado de PR, um exemplo hipotético, e este estado não disponibilize este tipo de consulta, irá retornar à rejeição 262.

Como proceder para resolver essa situação?
Se a SEFAZ não disponibiliza este tipo de consulta será permitido apenas a consulta por CNPJ ou IE conforme sua liberação. Esta rejeição é retornada por UF, então pode ter casos em que a consulta funciona e em outros não.

263 – **Rejeição:** CPF da consulta inválido

Esta rejeição ocorre nos casos em que é consumido o Web Service de NF-EConsultaCadastro e na consulta são informados zeros ou o dígito verificador inválido.

Como resolver?
É necessário verificar se os dados enviados estão corretos ou se o sistema não está cortando o zero inicial caso exista, ocorrendo assim a rejeição “263 – CPF da consulta inválido”.

264 – **Rejeição:** CPF da consulta não cadastrado como contribuinte na UF

Esta rejeição ocorre nos casos em que é enviada uma consulta de CPF e UF, porém o CPF não pertence a UF informada na consulta de cadastro.

Exemplo:
Pode ser o envio de uma consulta cadastro informando o parâmetro de CPF e também de UF, sendo que o CPF não está cadastrado na UF de consulta, retornando assim a rejeição 264.

Como proceder:
Nestes casos é necessário verificar o estado que está utilizado na consulta das informações, se o estado e o CPF estiverem corretos é necessário analisar se o mesmo está inscrito normalmente ou com problema de irregularidade fiscal.

265 – **Rejeição:** Sigla da UF da consulta difere da UF do Web Service

Ao enviar uma requisição para o Web Service de consulta cadastro contendo o CPF e a UF do estado de SP, código 35, por exemplo, porém enviar para o Web Service do estado do Paraná, código 41, irá retornar à rejeição “265 – Sigla da UF da consulta difere da UF do Web Service”, em função de que a consulta foi realizada no estado divergente ao estado informado no campo UF.

266 – **Rejeição:** Série utilizada não permitida no Web Service

Ao realizar o envio de notas fiscais para os diversos Web Services existentes na SEFAZ deverá verificar qual é a série que está enviado, pois há serviços que utilizam uma série específica para cada tipo de emissão.

Para não retornar à rejeição 266 deverá seguir a série de acordo com os tipos de emissão. Para NF-e de emissão normal deverá utilizar a série do intervalo de 0 até 889. Já para a emissão de SCAN deverá enviar a faixa de série de 900 até 999. E para a emissão de NF-e Avulsa pelo Fisco a faixa precisa estar entre 890 a 899 e o campo procEmi deve estar preenchido com o valor 1.

Se enviar a série diferente do intervalo de faixa definido pela SEFAZ irá retornar à rejeição “266 – Série utilizada não permitida no Web Service”.

267 – **Rejeição:** NF Complementar referencia uma NF-e inexistente

Esta validação passou a vigorar deste o manual 3.0 da NF-e, e ocorre nos casos em que é emitida uma NF-e Complementar com referência de uma NF-e que não existe no ambiente enviado, produção ou homologação.

Exemplo:
É realizada a emissão de uma nota de complemento em produção referenciando uma chave de acesso de nota emitida em homologação, ou vice-versa. Ou também é informada uma chave de acesso de NF-e qualquer sem existência na SEFAZ, isso irá causar a rejeição 267.

Como proceder para resolver esta situação:
Para que seja possível autorizar a NF-e é necessário referenciar uma nota do mesmo ambiente de emissão (homologação-produção) e que o CNPJ da chave de acesso esteja vinculado com o emitente ou destinatário da NF-e que está sendo emitida.

268 – **Rejeição:** NF Complementar referencia outra NF-e Complementar

Esta validação está em vigor desde o manual 3.0 da NF-e, onde será apresentada a rejeição 268 quando for emitida uma NF-e Complementar e referenciar uma chave de acesso de outra NF-e Complementar, ou seja, o <finNFe> igual a 2.

Quando for emitir uma NF-e de complemento deverá referenciar uma NF-e normal e autorizada, se referenciar outra NF-e complementar irá retornar à rejeição 268.

Exemplo:
Pode ocorrer casos em que foi emitida a NF-e 100 com valor incorreto. Poderá ser emitida uma NF-e de Complemento com o restante do valor, sendo a NF-e 101, referenciando a NF-e 100. Porém, pode ocorrer desta referência ser inserida com o valor errado, neste caso, deverá emitir uma nova numeração de nota de complemento, 102, e referenciar a nota 100 (normal) e não a nota 101 (complementar). Se fosse referenciar a nota 102 com a chave de acesso da nota 101 iria retornar à rejeição 268.

Como proceder para resolver essa situação:
Será possível apenas a emissão de uma NF-e Complementar com notas de referência que não possuam dados de NF-e de Complemento, identificado pelo campo finNFe=2 na NF-e.

269 – **Rejeição:** CNPJ Emitente da NF Complementar difere do CNPJ da NF Referenciada

Esta validação é válida a partir do manual 3.0 da NF-e, onde só é possível emitir uma NF-e de Complemento referenciando uma chave de acesso que tenha o mesmo CNPJ do emissor da NF-e, caso contrário será retornada à rejeição 269.

O que essa rejeição significa:
Para entendermos melhor: Se for emitir uma NF-e de Complemento com a emitente matriz e nesta nota referenciar uma chave de acesso de NF-e com o emissor filial, será retornada a rejeição. Isso ocorre em função de que a SEFAZ não permite a referência de chaves de acesso que não são da empresa emissora.

A SEFAZ tem conhecimento desta informação em função de que chave de acesso é composta pela seguinte estrutura: cUF | AAMM | CNPJ | mod | Serie | nNF | tpEmis | cNF | cDV, com os respectivos tamanhos: 02 | 04 | 14 | 02 | 03 | 09 | 01 | 08 | 01. Analisando a estrutura é possível identificar o campo CNPJ, neste contém o CNPJ do emissor da NF-e, e é com base na informação deste campo que a SEFAZ realiza a validação do CNPJ.

Como proceder para resolver essa situação:
Para que a situação seja contornada é necessário referenciar uma chave de acesso onde o CNPJ do emitente seja igual ao CNPJ do emitente da nova NF-e, caso contrário, a SEFAZ não processará a nota.

270 – **Rejeição:** Código Município do Fato Gerador: dígito inválido

Ao enviar uma NF-e a SEFAZ realiza a validação sobre o dígito verificador do munícipio gerador da NF-e. Então deverá analisar o código do munícipio no portal do IBGE a fim de evitar esta rejeição, pois estes códigos identificam o local da efetivação da movimentação.

Exemplo:
Ao informar o código do município incorreto no campo cMunFg a SEFAZ irá rejeitar, um exemplo seria, se o código do município é 4321808, porém informar 4321880 no campo cMunFg estará incorreto, e com isso a SEFAZ retorna com a rejeição 270.

Como proceder para resolver essa situação:
Nesse caso será necessário verificar qual é o código do município correto de acordo com o portal do IBGE (http://www.ibge.gov.br/home/geociencias/areaterritorial/area.shtm) e ajustar a informação.

271 – **Rejeição:** Código Município do Fato Gerador: difere da UF do emitente

Esta rejeição ocorre nos casos em que o município informado na NF-e não corresponde a UF informada. A SEFAZ realiza a validação entre o município do fato gerador e a UF informada, evitando emitir uma nota para um município do estado do RS, quando a UF informada na NF-e for do estado de SP, por exemplo.

Exemplo: 
Ao informar o código do município 4321808 no campo cMunFg de um município do RS e no campo cUF for informado um estado diferente de RS a SEFAZ retorna a rejeição 271.

Como proceder para resolver essa situação:
Para resolver esta situação deverá sempre preencher o código do município, cMunFg, com relação ao mesmo estado informando, cUF, no município.

272 – **Rejeição:** Código Município do Emitente: dígito inválido

No envio de uma NF-e a SEFAZ realiza a validação sobre o dígito verificador do munícipio do emitente da NF-e. Então deverá analisar o código do munícipio na tabela de municípios do IBGE a fim de evitar esta rejeição, pois este código do município identifica o local do emissor da NF-e.

Exemplo: 
Ao informar o código do município incorreto no campo cMun do emitente a SEFAZ irá rejeitar, um exemplo seria, se o código do município é 4321808, porém informar 4321880 no campo cMun estará incorreto, e com isso a SEFAZ retorna com a rejeição 272.

Como proceder para resolver essa situação:
Nesse caso será necessário verificar qual é o código do município correto de acordo com o portal do IBGE (http://www.ibge.gov.br/home/geociencias/areaterritorial/area.shtm) e ajustar a informação.
273 – **Rejeição:** Código Município do Emitente: difere da UF do emitente

Esta rejeição ocorre nos casos em que o município informado para o emitente não corresponde a UF do emitente informada. A SEFAZ realiza a validação entre o município do emitente e a UF informada, evitando que o emissor emita uma nota informando um município do estado do RS, quando a UF informada for do estado de SP, por exemplo.

Exemplo: 
Ao informar o código do município 4321808 no campo cMun do emitente de um município do RS e no campo UF for informado um estado diferente de RS a SEFAZ retorna a rejeição 273.

Como proceder para resolver essa situação:
Para resolver esta situação deverá sempre preencher o código do município do emitente, cMun, com relação ao mesmo estado informando, UF, no município.

274 – **Rejeição:** Código Município do Destinatário: dígito inválido 

No envio de uma NF-e a SEFAZ realiza a validação sobre o dígito verificador do munícipio do destinatário da NF-e. Então deverá analisar o código do munícipio na tabela de municípios do IBGE a fim de evitar esta rejeição, pois este código do destinatário identifica o local do destinatário da NF-e.

Exemplo: 
Ao informar o código do município incorreto no campo cMun_dest do destinatário a SEFAZ irá rejeitar, um exemplo seria, se o código do município é 4321808, porém informar 4321880 no campo cMun_dest estará incorreto, e com isso a SEFAZ retorna com a rejeição 274.

Como proceder para resolver essa situação:
Nesse caso será necessário verificar qual é o código do município correto de acordo com o portal do IBGE (http://www.ibge.gov.br/home/geociencias/areaterritorial/area.shtm) e ajustar a informação.

275 – **Rejeição:** Código Município do Destinatário: difere da UF do Destinatário 

Esta rejeição ocorre nos casos em que o município informado no destinatário não corresponde a UF do destinatário informada. A SEFAZ realiza a validação entre o município do destinatário e a UF informada, evitando que o emissor emita uma nota informando um município do estado do RS, quando a UF informada no destinatário for do estado de SP, por exemplo.

Exemplo: 
Ao informar o código do município 4321808 no campo cMun_dest do destinatário de um município do RS e no campo UF for informado um estado diferente de RS a SEFAZ retorna a rejeição 275.

Como proceder para resolver essa situação:
Para resolver esta situação deverá sempre preencher o código do município do destinatário, cMun_dest, com relação ao mesmo estado informando, UF, no município.

276 – **Rejeição:** Código Município do Local de Retirada: dígito inválido

No envio de uma NF-e a SEFAZ realiza a validação sobre o dígito verificador do munícipio do local de retirada da NF-e. Então deverá analisar o código do munícipio na tabela de municípios do IBGE a fim de evitar esta rejeição, pois este código do local de retirada identifica o local da retirada da mercadoria da NF-e.

Exemplo: 
Ao informar o código do município incorreto no campo cMun_ret do local de retirada a SEFAZ irá rejeitar, um exemplo seria, se o código do município é 4321808, porém informar 4321880 no campo cMun_ret estará incorreto, e com isso a SEFAZ retorna com a rejeição 276.

Como proceder para resolver essa situação:
Nesse caso será necessário verificar qual é o código do município correto de acordo com o portal do IBGE (http://www.ibge.gov.br/home/geociencias/areaterritorial/area.shtm) e ajustar a informação.

277 – **Rejeição:** Código Município do Local de Retirada: difere da UF do Local de Retirada

Esta rejeição ocorre nos casos em que o município informado no local de retirada não corresponde a UF do local de retirada informado. A SEFAZ realiza a validação entre o município do local de retirada e a UF informada, evitando que o emissor emita uma nota informando um município do estado do RS, quando a UF informada do local de retirada for do estado de SP, por exemplo.

Exemplo: 
Ao informar o código do município 4321808 no campo cMun_ret do local de retirada de um município do RS e no campo UF for informado um estado diferente de RS a SEFAZ retorna a rejeição 277.

Como proceder para resolver essa situação:
Para resolver esta situação deverá sempre preencher o código do município do local de retirada, cMun_ret, com relação ao mesmo estado informando, UF, no município.

278 – **Rejeição:** Código Município do Local de Entrega: dígito inválido 

No envio de uma NF-e a SEFAZ realiza a validação sobre o dígito verificador do munícipio do local de entrega da NF-e. Então deverá analisar o código do munícipio na tabela de municípios do IBGE a fim de evitar esta rejeição, pois este código do local de entrega identifica o local da entrega da mercadoria da NF-e.

Exemplo: 
Ao informar o código do município incorreto no campo cMun_entr do local de entrega a SEFAZ irá rejeitar, um exemplo seria, se o código do município é 4321808, porém informar 4321880 no campo cMun_entr estará incorreto, e com isso a SEFAZ retorna com a rejeição 278.

Como proceder para resolver essa situação:
Nesse caso será necessário verificar qual é o código do município correto de acordo com o portal do IBGE (http://www.ibge.gov.br/home/geociencias/areaterritorial/area.shtm) e ajustar a informação.

279 – **Rejeição:** Código Município do Local de Entrega: difere da UF do Local de Entrega 

Esta rejeição ocorre nos casos em que o município informado no local de entrega não corresponde a UF do local de entrega informado. A SEFAZ realiza a validação entre o município do local de entrega e a UF informada, evitando que o emissor emita uma nota informando um município do estado do RS, quando a UF informada do local de entrega for do estado de SP, por exemplo.

Exemplo: 
Ao informar o código do município 4321808 no campo cMun_entr do local de entrega de um município do RS e no campo UF for informado um estado diferente de RS a SEFAZ retorna a rejeição 279.

Como proceder para resolver essa situação:
Para resolver esta situação deverá sempre preencher o código do município do local de entrega, cMun_entr, com relação ao mesmo estado informando, UF, no município.

280 – **Rejeição:** Certificado Transmissor inválido 

Este problema está associado a problemas técnicos com o certificado digital do emitente da NF-e. Esta mensagem de que o certificado transmissor é inválido ocorre no momento em que o mesmo é inválido para uso e deve ser reinstalado ou substituído.

Um certificado digital pode se tornar inválido a partir do momento em que teve problemas técnicos na instalação do mesmo, para isso é importante evitar manter instalado certificados não utilizados no repositório do Windows. Devendo deixar apenas os que são utilizados para a transmissão de notas.

Como proceder para resolver essa situação:
Em alguns casos é necessário a substituição do certificado digital em função de que o mesmo foi invalidado pela raiz da autoridade certificadora. E em outros casos apenas com a instalação das cadeias de certificação das autoridades certificadoras, AC, já resolve o problema. Neste caso, é indicado o contato direto com a empresa responsável pelo certificado digital, pois certificado digital trata-se da assinatura de arquivos digitais para pessoa física ou jurídica, podendo ter problemas com a passagem de informações a empresas não certificadas a auxiliar neste processo.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa leia o artigo ‘Vinculando o certificado digital’.

281 – **Rejeição:** Certificado Transmissor Data Validade

Esta rejeição ocorre nos casos em que o certificado digital está vencido e não pode mais ser utilizado para a transmissão dos documentos eletrônicos. Deverá instalar o novo certificado digital na máquina emissora, e se caso não adquiriu um novo, deverá entrar em contato com a certificadora para a aquisição de um novo certificado.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

282 – **Rejeição:** Certificado Transmissor sem CNPJ

Quando o certificado digital é inserido no XML para a assinatura da NF-e e este não possuir o CNPJ do emissor da NF-e, a SEFAZ irá retornar à rejeição 282.

Isso ocorre quando o CNPJ do certificado digital não possui vínculo com o CNPJ do emissor e transmissor do documento eletrônico. Para resolver este problema é necessário verificar o incidente em conjunto com a certificadora registrada.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

283 – **Rejeição:** Certificado Transmissor – erro Cadeia de Certificação

Pode ocorrer casos em que o certificado digital não foi instalado corretamente ou sem as propriedades das cadeias necessárias, com isso a SEFAZ retorna à rejeição “283 – Certificado Transmissor – erro Cadeia de Certificação”.

Para resolver o problema deverá analisar o motivo pelo qual as “cadeias de confiança”, ou cadeia certificadora, não constam no arquivo do certificado digital. Se necessário terá que reinstalar o certificado ou entrar em contato com a certificadora responsável pelo certificado em questão.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

284 – **Rejeição:** Certificado Transmissor revogado

Todas as autoridades certificadoras, como a CertiSign ou Serasa, possuem uma lista de certificados revogados, ou seja, uma listagem de certificados digitais com problemas ou que foram cancelados por determinação da empresa. Os certificados que constam nesta lista não conseguem realizar nenhuma transmissão digital de documentos, em função de que ao enviar documentos são feitas conferências nesta listagem a fim de evitar problemas na autenticação de documentos fiscais.

Como proceder nessa situação:
Nestes casos, o melhor a realizar é o contato com a empresa certificadora responsável pela aquisição do certificado digital, para analisar o que deverá ser feito, evitando assim maiores problemas de cancelamento da assinatura digital.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

285 – **Rejeição:** Certificado Transmissor difere ICP-Brasil

O certificado digital que está sendo utilizado para a transmissão dos documentos eletrônicos pode estar com uma codificação diferente do que é indicado pela ICP-Brasil e em função disso ocorre a rejeição 285.
Para ser solucionado este incidente é necessário entrar em contato com a certificadora responsável a fim de solucionar esta diferença de criptografia.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

286 – **Rejeição:** Certificado Transmissor erro no acesso a LCR

Esta rejeição ocorre no momento em que a transmissão do documento assinado com o certificado digital do emissor gera uma falha na sua validação, em função de oscilação dos servidores da SEFAZ.

Ao transmitir o documento eletrônico são realizadas três validações: falta do endereço da LCR (Lista de Certificados Revogados), LCR indisponível ou inválida. Se estas condições falharem ocorrerá a rejeição 286 em função de indisponibilidade de acesso a lista dos certificados revogados.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

287 – **Rejeição:** Código Município do FG – ISSQN: dígito inválido

Esta rejeição ocorre quando o código do município do fato gerador informado no ISSQN está inválido. Este código de município pode ser obtido com a tabela de municípios fornecida pelo IBGE e é gerada da seguinte forma: composto por 7 dígitos, onde os 2 primeiros é o código da UF, os 4 seguintes são o número de ordem e o último deles é o dígito verificador.

Exemplo: 
Ao informar o código do município incorreto no campo cMunFg_issqn do ISSQN, a SEFAZ irá rejeitar, um exemplo seria, se o código do município é 4321808, porém informar 4321880 no campo cMunFg_issqn estará incorreto, e com isso a SEFAZ retorna com a rejeição 287

Como proceder para resolver essa situação:
Nesse caso será necessário verificar qual é o código do município correto de acordo com o portal do IBGE (http://www.ibge.gov.br/home/geociencias/areaterritorial/area.shtm)  e ajustar a informação.

288 – **Rejeição:** Código Município do FG – Transporte: dígito inválido

Esta rejeição ocorre quando o código do município do fato gerador informado no transporte está inválido. Este código de município pode ser obtido com a tabela de municípios fornecida pelo IBGE e é gerado da seguinte forma: composto por 7 dígitos, onde os 2 primeiros é o código da UF, os 4 seguintes são o número de ordem e o último deles é o dígito verificador.

Exemplo:
Ao informar o código do município incorreto no campo cMunFg_transp do transporte, a SEFAZ irá rejeitar, um exemplo seria, se o código do município é 4321808, porém informar 4321880 no campo cMunFg_transp estará incorreto, e com isso a SEFAZ retorna com a rejeição 288

Como proceder para resolver essa situação:
Nesse caso será necessário verificar qual é o código do município correto de acordo com o portal do IBGE (http://www.ibge.gov.br/home/geociencias/areaterritorial/area.shtm) e ajustar a informação.

289 – **Rejeição:** Código da UF informada diverge da UF solicitada

Esta rejeição “289 – Código da UF informada diverge da UF solicitada” ocorre nos casos em que a UF que foi informada para uma consulta aos serviços da SEFAZ está diferente da UF configurada no Web Service que recebeu a mensagem. O incidente surge quando é identificado que o arquivo recebido é diferente do código da UF enviado no Web Service.

Como proceder para resolver essa situação:
Nestes casos deverá analisar para qual web service e UF que está sendo enviada a requisição à SEFAZ, a mesma deverá condizer com o estado que se deseja enviar os dados do emitente.

290 – **Rejeição:** Certificado Assinatura inválido

Esta rejeição ocorre nos casos em que o certificado digital está inválido, devendo este ser substituído ou reinstalado. Para isso é necessário verificar no repositório do Windows qual é o status do certificado digital, pois pode ocorrer conflitos com outros certificados. Para evitar este problema é aconselhável manter somente os certificados realmente utilizados para a assinatura dos documentos fiscais na máquina.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos  ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

291 – **Rejeição:** Certificado Assinatura Data Validade

Esta rejeição ocorre nos casos em que o certificado digital de assinatura digital está vencido e não pode mais ser utilizado para a transmissão dos documentos eletrônicos. Deverá instalar o novo certificado digital na máquina emissora, e se caso não adquiriu um novo, deverá entrar em contato com a certificadora para a aquisição de um novo certificado.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos  ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

292 – **Rejeição:** Certificado Assinatura sem CNPJ

Quando o certificado digital é inserido no XML para a assinatura da NF-e e este não possuir o CNPJ do emissor da NF-e a SEFAZ irá retornar à rejeição 292.
Isso ocorre quando o CNPJ do certificado digital não possui vínculo com o CNPJ do emissor e transmissor do documento eletrônico. Para resolver este problema é necessário verificar o incidente em conjunto com a certificadora registrada.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos  ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

293 – **Rejeição:** Certificado Assinatura – erro Cadeia de Certificação

Pode ocorrer casos em que o certificado digital não foi instalado corretamente ou sem as propriedades das cadeias necessárias, com isso a SEFAZ retorna à rejeição 283 – Certificado Transmissor – erro Cadeia de Certificação.

Para resolver o problema deverá analisar o motivo pelo qual as “cadeias de confiança”, ou cadeia certificadora, não constam no arquivo do certificado digital. Se necessário terá que reinstalar o certificado ou entrar em contato com a certificadora responsável pelo certificado em questão.

A mensagem de erro: “293 – Certificado Assinatura – erro Cadeia de Certificação” é um erro do Web Service SEFAZ que ocorre quando o mesmo não consegue verificar a Cadeia de Certificação do certificado digital utilizado na assinatura da NF-e.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos  ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

294 – **Rejeição:** Certificado Assinatura revogado

Todas as autoridades certificadoras, como a CertiSign ou Serasa por exemplo, possuem uma lista de certificados revogados, ou seja, uma listagem de certificados digitais com problemas ou que foram cancelados por determinação da empresa. Os certificados que constam nesta lista não conseguem realizar nenhuma transmissão digital de documentos, em função de que ao enviar documentos são feitas conferências nesta listagem a fim de evitar problemas na autenticação de documentos fiscais.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos  ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

295 – **Rejeição:** Certificado Assinatura difere ICP-Brasil

O certificado digital que está sendo utilizado para a transmissão dos documentos eletrônicos pode estar com uma codificação diferente do que é indicado pela ICP-Brasil e em função disso ocorre a rejeição 295.
Para ser solucionado este incidente é necessário entrar em contato com a certificadora responsável a fim de solucionar esta diferença de criptografia.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos  ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

296 – **Rejeição:** Certificado Assinatura erro no acesso a LCR

Esta rejeição ocorre no momento em que a transmissão do documento assinado com o certificado digital do emissor gera uma falha na sua validação, em função de oscilação dos servidores da SEFAZ.

Ao transmitir o documento eletrônico são realizadas três validações: falta do endereço da LCR (Lista de Certificados Revogados), LCR indisponível ou inválida. Se estas condições falharem ocorre a rejeição 296 em função de indisponibilidade de acesso a lista dos certificados revogados.

Para mais informações sobre como cadastrar um certificado digital para a sua empresa e realizar a instalação do mesmo leia os artigos  ‘Vinculando o certificado digital’ e ‘Instalação do certificado digital’.

297 – **Rejeição:** Assinatura difere do calculado

Esta rejeição ocorre nos casos em que o XML é manipulado e/ou alterado após a assinatura do documento, ou então quando possuem alguns caracteres especiais no XML, podendo ser quebra de linha ou espaço entre as tags, invalidando assim o XML.

A SEFAZ recomenda em seu manual que se utilizem uma sequência de scape para evitar estes parser, conforme apresentada a listagem abaixo:
caractere     sequência de escape
<     &lt;
>     &gt;
&     &amp;
”     &quot;
‘     &#39;

298 – **Rejeição:** Assinatura difere do padrão do Sistema

Esta rejeição ocorre nos casos que o certificado que gerou a criptografia dos dados do XML foi gerado por uma entidade que não possui credenciamento na ICP-Brasil.

Para que esta rejeição seja resolvida é necessário assinar a nota fiscal eletrônica com um certificado digital onde a autoridade certificadora esteja devidamente credenciada junto ao ICP-Brasil.

Como proceder nessa situação:
Para que o problema seja analisado de forma adequada é necessário que entre em contato com a autoridade certificadora ou a empresa que forneceu o certificado digital para o emissor, evitando assim de ter o certificado digital incluso na lista de certificados revogados e for necessário adquirir um novo.

299 – **Rejeição:** XML da área de cabeçalho com codificação diferente de UTF-8

Quando retornar à rejeição 299 significa que a codificação do arquivo XML não está seguindo os padrões definidos para o projeto NF-e.

Para que não haja este problema é necessário realizar a geração do XML nos padrões de codificação UTF-8 e conter no cabeçalho a seguinte estrutura: <?xml version=”1.0″    encoding=”utf-8″?>, com isso, a autorização pelo Web Service da Receita Federal irá atender à solicitação.

Como proceder nessa situação:
Será necessário revisar as parametrizações do sistema e garantir de que está sendo enviado o documento à SEFAZ com o padrão de codificação UTF-8 de acordo com o manual da Secretaria da Fazenda.
Para mais informações sobre o envio de NF-e no InvoiCy leia o artigo ‘Integrando com o módulo NF-e’.

301 – Uso Denegado: Irregularidade fiscal do emitente 

Ao emitir uma NF-e ou NFC, a SEFAZ retornará a rejeição “301 – Uso Denegado: Irregularidade fiscal do emitente” se o emitente estiver com algum tipo de irregularidade cadastral.
São situações relacionadas a inscrição estadual que ocasionam a denegação de uso da NF-e, como:
– I.E. Suspensa;
– I.E. Cancelada;
– I.E. Baixada;
– I.E. Em Processo de Baixa.

Como resolver?
Nesse caso o emitente da NF-e deve verificar se a sua Inscrição Estadual se enquadra em alguma das situações citadas acima. É possível realizar a consulta de sua situação cadastral através do site do SINTEGRA ou no Cadastro Centralizado de Contribuinte.

Nas consultas é utilizado os termos “Habilitado” ou “Não Habilitado”. O termo “Habilitado” indica que não há qualquer restrição em relação à Inscrição Estadual consultada, enquanto o termo “Não Habilitado” indica que a Inscrição Estadual se enquadra em alguma das quatro situações citadas acima no cadastro da Secretaria de Fazenda.

O representante legal do emitente deverá entrar em contato com a SEFAZ para regularizar a sua situação, para que o mesmo consiga voltar a emitir NF-e.

302 – **Rejeição:** Irregularidade fiscal do destinatário 

Ao emitir uma NF-e, a SEFAZ retornará à rejeição “302 – Uso Denegado: Irregularidade fiscal do destinatário” se o destinatário estiver com algum tipo de irregularidade no seu cadastro.

São situações relacionadas a inscrição estadual que ocasionam a denegação de uso da NF-e, como:
– I.E. Suspensa;
– I.E. Cancelada;
– I.E. Baixada;
– I.E. Em Processo de Baixa.

Como resolver?
Nesse caso o emitente do documento pode verificar se a Inscrição Estadual do destinatário se enquadra em uma das situações citadas acima (é recomendado que a situação seja informada ao destinatário para que ele verifique sua situação com a SEFAZ).

É possível realizar a consulta de sua situação cadastral através do site do SINTEGRA ou no Cadastro Centralizado de Contribuinte. Nas consultas são utilizados os termos “Habilitado” ou “Não Habilitado”. O termo “Habilitado” indica que não há qualquer restrição em relação à Inscrição Estadual consultada, enquanto o termo “Não Habilitado” indica que a Inscrição Estadual se enquadra em uma das quatro situações citadas acima no cadastro da Secretaria de Fazenda.

O emitente de uma NF-e denegada pelo código de retorno 302 não pode fazer nada para corrigir a situação. O código de retorno diz respeito a uma irregularidade na Inscrição Estadual do destinatário. Somente o representante legal do destinatário deverá, junto a SEFAZ normalizar a sua Inscrição Estadual.

303 – Uso Denegado: Destinatário não habilitado a operar na UF 

Esta rejeição retorna nos casos em que a Inscrição Estadual do destinatário não corresponde a UF que foi informada na nota. Para prosseguir com a emissão de outras NF-e para este destinatário é necessário que seja feita a verificação correta do cadastro junto à Receita Federal deste destinatário. A nota ficará com o status de denegada, não podendo mais realizar alterações e/ou reenviar, devendo emitir uma nova numeração após verificação dos dados corretos do destinatário.

304 – **Rejeição:** Pedido de Cancelamento para NF-e com evento da Suframa 

Este tipo de rejeição ocorre nos casos em que foi emitida uma nota fiscal e a mesma já tenha passado por postos de fiscalização e foram registrados os eventos de “Vistoria Suframa – 990900” ou “Internalização Suframa – 990910”. Não será possível cancelar a nota quando haverem um destes dois eventos relacionados ao Suframa.

Como proceder para resolver essa situação:
Nestes casos onde possua um evento informando a vistoria ou internalização não é permitido o cancelamento de NF-e. Caso seja necessário realizar o cancelamento deverá analisar com o responsável da Secretaria da Fazenda do Estado.

321 – **Rejeição:** NF-e de devolução de mercadoria não possui documento fiscal referenciado 

Créditos: [Migrate](http://www.migrate.com.br/)
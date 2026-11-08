# Como a IA foi usada neste projeto

Registro atualizado em 08/11/2026.

## Participação de Arthur

Arthur definiu o propósito do produto, sua trajetória, os projetos a apresentar, a direção visual e a prioridade de uma primeira entrega pequena. Confirmou os dados profissionais usados no conteúdo e determinou que nenhuma competência, experiência ou métrica comercial fosse inventada.

Arthur também definiu o limite de custo: configurar uma credencial não autoriza consumo da API de IA. O tutor deve permanecer desativado até haver condições de uso autorizadas e validação real.

## Participação do Codex

O Codex foi utilizado para organizar a arquitetura, redigir conteúdo a partir de fatos confirmados, implementar interface e regras, preparar testes e produzir documentação. O desenvolvimento partiu do starter fornecido pelo Sites, preservando as integrações da plataforma.

As contribuições assistidas incluem:

- Estrutura de páginas e componentes da primeira entrega.
- Conteúdo público separado de registros privados de preparação.
- Implementação e testes do exercício determinístico.
- Rotas de servidor, persistência e tratamento de estados de erro.
- Documentação das decisões, limitações e passos de execução.

O histórico de commits deve registrar essas entregas reais. Não foram simuladas datas anteriores, horas de trabalho ou autoria manual de Arthur para código produzido com assistência.

## Como os resultados devem ser validados

Em 08/11/2026, 24 testes unitários, a verificação de tipos e o build passaram. A migration `drizzle/0000_practice_attempts.sql` foi aplicada ao banco local. O teste de integração do Worker com duas identidades ainda aguarda seu resultado.

As verificações HTTP locais obtiveram 200 em 11 páginas e 26 assets, além de 404 em duas rotas dos cenários testados. Foram examinados 150 arquivos de fonte e 120 do build, sem ocorrência dos padrões de chave de API procurados. O arquivo de ambiente local está ignorado pelo Git.

A configuração do Work bloqueou a ferramenta de navegador com a mensagem `Local browser use is disabled in Work settings`. A revisão visual, o comportamento mobile e o fluxo completo de cliques ainda precisam ser conferidos em navegador.

A revisão de Arthur inclui executar a aplicação, estudar as regras, conferir os fatos publicados e conseguir explicar decisões e limitações. Essa revisão humana permanece uma atividade a realizar e registrar.

## IA no desenvolvimento e IA no produto

São usos diferentes. Esta versão foi construída com assistência de IA, mas **não oferece um tutor operacional**. Não foi feita chamada de inferência da aplicação à OpenAI. O exercício usa regras de programação comuns e não depende de um modelo para decidir a nota.

O TáVindoPrinter apresentado no portfólio é uma integração operacional de impressão. Não há alegação de que sua fila ou confirmação de tarefas sejam um agente de IA.

## Dados preservados

Não fazem parte do conteúdo publicado: arquivos privados de carreira, informações de familiares, dados de clientes, credenciais e código dos produtos privados. Os exercícios usam um catálogo fictício. O novo site não acessa os ambientes de produção dos projetos do portfólio.

Segredos não devem aparecer em prompts publicados, histórico de Git, logs, screenshots ou bundles do navegador. O registro de decisões descreve configurações por nome, sem copiar valores.

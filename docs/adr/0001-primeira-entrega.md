# ADR 0001 — Base da primeira entrega

- Data: 4 de novembro de 2026
- Estado revisado em 8 de novembro de 2026: decisão implementada; integração entre contas e publicação privada em andamento
- Escopo: apresentação, casos, primeira trilha, exercício e progresso privado

## Contexto

Arthur quer demonstrar sua trajetória e desenvolver fundamentos para construir soluções com IA. O projeto precisa começar pequeno, permitir prática real e separar conteúdo público de informações pessoais. Não há autorização para consumo da API de IA.

## Decisão

Usar um monólito modular com React, TypeScript e o starter Vinext do Sites. Páginas e endpoints compartilham o projeto; regras de avaliação e conteúdo permanecem em módulos separados da interface.

O backend roda em Worker. D1/SQLite armazena registros estruturados, com esquema Drizzle e migrations versionadas. A autenticação hospedada é fornecida pelo Sites; cada operação privada ainda precisa autorizar o titular no servidor. O ID autenticado é a chave de propriedade dos registros, não o e-mail nem um ID enviado pelo cliente.

O visitante pode praticar sem conta. Persistência e leitura de histórico exigem identidade. O progresso inicia em zero e a gravação de uma tentativa deve ser idempotente: repetir uma requisição não cria conclusões extras.

A correção é determinística, com quatro critérios de 25 pontos. Valores monetários são inteiros em centavos. A aplicação não executa código arbitrário fornecido pelo usuário e não depende de um LLM para corrigir respostas ou marcar conclusão.

O tutor permanece desativado. Nenhuma chave, ainda que configurada localmente, libera consumo por si só. Uma integração posterior precisará de autorização, limites, validação de entrada, tratamento de erros e execução real verificada.

## Por que estas escolhas

- Um projeto único reduz a quantidade de serviços necessários para entender e manter a primeira entrega.
- React, TypeScript e SQL sustentam competências transferíveis para outras aplicações.
- Conteúdo versionado oferece revisão e histórico sem introduzir um CMS neste recorte.
- Regras determinísticas tornam o feedback reproduzível e permitem testar erros de cálculo e validação.
- D1 e autenticação da plataforma permitem persistência privada sem criar uma segunda implementação de login.

## Consequências e limites

Vinext está em beta. O starter usa APIs do padrão App Router, mas não se promete compatibilidade completa com Next.js. Build, rotas, autenticação e acesso ao banco precisam ser verificados no ambiente usado. Falhas estruturais devem levar à reavaliação do runtime, não à adição indefinida de exceções.

A integração com Sites cria dependência de plataforma para identidade, configuração e publicação. Regras e conteúdo podem ser reaproveitados em outra hospedagem; autenticação e persistência exigiriam adaptação.

Os cabeçalhos de identidade só são confiáveis dentro da fronteira autenticada da plataforma. Um Worker exposto diretamente fora desse fluxo precisaria de outra verificação. O mock de desenvolvimento é restrito a loopback e não integra o build de produção.

Uma nota de exercício é uma evidência de prática naquele contrato e versão. Não representa certificado, domínio geral de uma linguagem ou comprovação de competências profissionais.

## Verificação necessária

1. Cálculo e critérios reproduzíveis, inclusive entradas inválidas.
2. API de correção utilizável pelo visitante e com validação de entrada.
3. Persistência idempotente e isolamento entre identidades distintas.
4. Rejeição de leitura/gravação privada sem identidade.
5. Navegação desktop/mobile e foco de teclado utilizáveis.
6. Build sem segredos e sem dependência de chamadas de IA.

Em 08/11/2026, 24 testes unitários, tipagem e build passaram. A migration inicial foi aplicada ao banco local. As verificações HTTP obtiveram 200 em 11 páginas e 26 assets, além de 404 em duas rotas dos cenários testados. O teste de integração com duas identidades ainda aguarda confirmação. A ferramenta de navegador foi bloqueada pela configuração do Work, mantendo pendente a verificação visual e por cliques. O README registra esses estados.

# Arthur | AI Builder Journey

Um portfólio e um espaço de prática para conectar engenharia, negócios e desenvolvimento de software. O projeto apresenta a trajetória de Arthur Guedes, seus produtos e uma primeira trilha de aprendizado aplicada a pedidos de delivery.

**Primeira entrega implementada, com 24 testes unitários, tipagem e build aprovados em 08/11/2026.** A integração entre contas foi validada e a prévia privada foi publicada no Sites. O tutor de IA está desativado e o uso da API permanece sem autorização de consumo. Projeto pessoal e independente, sem vínculo oficial com o iFood.

[Código-fonte no GitHub](https://github.com/arthurarga-tech/arthur-ai-builder-journey) · [Prévia no Sites — acesso privado](https://arthur-ai-builder-journey.awarehaven21.chatgpt.site)

## O que esta entrega reúne

- Apresentação profissional, formação e links de GitHub e LinkedIn.
- Quatro estudos de caso: TáVindo Delivery + Printer, GOS — LR Automação, Radier Builder e Urban Routes.
- Trilha de lógica com quatro lições: entradas, condições, repetição/funções e casos de teste.
- Exercício com correção no servidor, quatro critérios de 25 pontos e feedback por critério.
- Prática anônima e progresso privado para quem entra com sua conta.
- Base preparada para ampliar a academia e implementar IA em uma etapa posterior.

O material dos produtos privados é apresentado por descrição. Código de clientes, dados operacionais e métricas comerciais não verificadas ficam fora do repositório. O Urban Routes é identificado como prática educacional; o Radier Builder, como protótipo experimental com limites de uso.

## Experimente o fluxo

1. Leia a apresentação e abra um estudo de caso.
2. Entre na Academia e percorra as quatro lições de lógica.
3. Resolva o exercício da loja fictícia e confira o feedback.
4. Revise a regra que causou o erro e tente novamente.
5. Entre com sua conta para registrar a tentativa e consultar seu próprio progresso.

O exemplo usa dois hambúrgueres a R$ 18,90, uma batata a R$ 7,90 e entrega de R$ 5,00: **5070 centavos, ou R$ 50,70**. A simulação não cria pedidos reais. Uma conclusão do exercício registra essa prática; não equivale a certificação ou domínio profissional.

## Tecnologias e arquitetura

| Parte | Escolha |
| --- | --- |
| Interface | React 19, TypeScript 5.9 e componentes reutilizáveis |
| Aplicação | Vinext 1.0.0-beta.5, padrão App Router e Vite 8 |
| Backend | Rotas de servidor em Cloudflare Workers pelo Sites |
| Persistência | D1/SQLite, esquema Drizzle e migrations versionadas |
| Identidade | Autenticação do Sites e autorização por usuário no servidor |
| Avaliação | Regras determinísticas; o modelo de IA não atribui notas |
| Verificação | Testes automatizados, tipagem e build; CI sem deploy automático |

Interface, conteúdo, API e regras vivem no mesmo projeto. O conteúdo público está separado das tentativas privadas. O servidor obtém a identidade autenticada e limita consultas e gravações ao titular; um identificador enviado pelo navegador não concede acesso a outro histórico.

**Limite do runtime:** Vinext está em beta. O projeto usa o starter mantido pelo Sites e preserva suas integrações de build, autenticação e armazenamento. A presença de APIs compatíveis com Next.js não implica compatibilidade integral nem migração automática para outra hospedagem. A decisão está registrada no [ADR inicial](docs/adr/0001-primeira-entrega.md).

## Executar localmente

Use **Node.js 24 recomendado** e npm. O starter exige Node 22.13 ou superior; para executar os testes TypeScript diretamente com Node, use no mínimo 22.18.

```sh
git clone https://github.com/arthurarga-tech/arthur-ai-builder-journey.git
cd arthur-ai-builder-journey
npm ci
npm run build
```

O build gera `dist/server/wrangler.json`, necessário para preparar o banco local. Em um banco novo, aplique a migration inicial antes de iniciar a prática com histórico:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_practice_attempts.sql
npm run dev
```

Use a URL local informada pelo terminal. Não reaplique migrations já executadas e não edite migrations publicadas. Após uma alteração de esquema, use `npm run db:generate`, revise o SQL gerado e faça um novo build se os bindings mudarem. O banco local é separado do banco hospedado; o Sites aplica as migrations de produção durante a publicação.

No perfil portátil, o starter simula login **somente em requisições de desenvolvimento em loopback**. O botão de entrar usa esse fluxo local. O mock não faz parte do build de produção; no site hospedado, a identidade é fornecida pela plataforma. Mantenha o servidor de desenvolvimento em `127.0.0.1`.

Para testar o Worker já compilado, execute `npm start`. Esse modo compartilha o banco local, mas não simula login nem publica o site.

### Configuração de IA

Nenhuma chave é necessária para estudar, resolver o exercício ou executar os testes desta entrega. A integração de IA permanece desativada. A existência de `OPENAI_API_KEY` em um arquivo local não autoriza chamadas nem transforma o tutor em uma função operacional.

Quando houver autorização de uso, a próxima etapa deverá configurar limites, implementar o adaptador exclusivamente no servidor e validar uma chamada real. Segredos locais ficam em arquivos de ambiente ignorados pelo Git; segredos hospedados devem ser configurados pelo mecanismo da plataforma. Nunca colocar valores no código, no README, no manifesto ou em variáveis expostas ao navegador.

## Verificar

```sh
npm test
npm run typecheck
npm run build
```

Os testes devem cobrir cálculo em centavos, entradas inválidas, critérios de avaliação, reenvios e autorização das operações privadas. O workflow em `.github/workflows/checks.yml` executa instalação, testes, tipagem e build em pushes e pull requests. Ele não publica o site nem chama a API de IA.

### Registro de verificação — 08/11/2026

| Verificação | Resultado comprovado | Pendência |
| --- | --- | --- |
| Testes unitários | 24 testes passaram | Concluído nesta rodada |
| TypeScript | `npm run typecheck` passou | Concluído nesta rodada |
| Build | `npm run build` passou | Concluído nesta rodada |
| Banco local | `drizzle/0000_practice_attempts.sql` aplicada | Integração aprovada com duas contas sintéticas, reenvios simultâneos e exclusão isolada |
| HTTP local | 11 páginas e 26 assets responderam HTTP 200; duas rotas responderam HTTP 404 nos cenários testados | Navegação visual e interações pelo navegador pendentes |
| Verificação de padrões de credenciais | Fonte e build examinados, sem ocorrência dos padrões de chave procurados; `.env.local` ignorado pelo Git | Varredura limitada aos padrões e arquivos examinados |
| Mobile, teclado e fluxo de cliques | A ferramenta de navegador retornou `Local browser use is disabled in Work settings` | Revisão visual e interação de ponta a ponta ainda sem confirmação |
| Publicação | Deploy privado no Sites confirmado em 08/11/2026 | Acesso público ao site ainda não habilitado |
| Tutor | Desativado; nenhuma chamada de inferência executada | Integração real depende de uso autorizado e avaliação |

A configuração do Work impediu o acesso ao navegador durante a revisão. As respostas HTTP comprovaram o atendimento das páginas e assets testados. A conferência do layout a 360 px, do foco de teclado e do percurso de cliques precisa de uma sessão de navegador disponível.

## Estrutura

```text
app/                  páginas, autenticação e endpoints
components/           interface reutilizável
content/              perfil, projetos e lições públicos
domain/               regras do exercício e avaliação
db/                   acesso ao banco e esquema
drizzle/              migrations e metadados gerados
tests/                verificações automatizadas
docs/                 decisões, explicações e roteiro
.github/workflows/    verificações de integração contínua
.openai/hosting.json   configuração da hospedagem
```

Tentativas e histórico começam privados, sem conclusões previamente preenchidas. Reenviar uma mesma tentativa não deve multiplicar seus registros. A página pública do portfólio não fornece acesso ao histórico pessoal de Arthur nem de outros participantes.

## Publicação e continuidade

O código desta primeira entrega está disponível neste **repositório público**. A [prévia hospedada no Sites](https://arthur-ai-builder-journey.awarehaven21.chatgpt.site) foi publicada em 08/11/2026 e tem acesso restrito à conta do proprietário. Para experimentar a aplicação, siga as instruções de execução local acima. Tornar o código público não altera a permissão de acesso da prévia hospedada.

O workflow [Verificações](https://github.com/arthurarga-tech/arthur-ai-builder-journey/actions/workflows/checks.yml) executa os testes, a tipagem e o build em cada push ou pull request. O deploy permanece separado da integração contínua.

Esta entrega é a base funcional do projeto. O MVP completo depende de um tutor real verificado e de condições de uso autorizadas. Veja o [roteiro de evolução](docs/ROADMAP.md), [como explicar a aplicação](docs/learning/como-explicar.md) e o [registro transparente de uso de IA](docs/AI-USAGE.md).

**Arthur Guedes** · [GitHub](https://github.com/arthurarga-tech) · [LinkedIn](https://www.linkedin.com/in/arthur-guedes96/)

Projeto pessoal e independente, sem vínculo oficial com o iFood.

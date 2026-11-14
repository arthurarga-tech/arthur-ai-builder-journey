# Arthur Alves | Portfólio

Um resumo profissional para conhecer minha trajetória e os projetos que construí. O site reúne currículo, experiências e estudos de caso em uma leitura direta, inclusive para quem não tem acesso aos repositórios privados.

[Visitar o portfólio](https://arthur-ai-builder-journey.awarehaven21.chatgpt.site) · [Currículo em PDF](public/curriculo/Arthur_Alves_Curriculo.pdf) · [LinkedIn](https://www.linkedin.com/in/arthur-guedes96/) · [GitHub](https://github.com/arthurarga-tech)

## Sobre mim

Sou Arthur Augusto Reis Guedes Alves, engenheiro civil, técnico em Mecatrônica e estudante de Análise e Desenvolvimento de Sistemas. Minha trajetória reúne projetos de engenharia, gestão de um negócio de alimentação, desenvolvimento de aplicações com assistência de IA e formação prática em QA.

Busco oportunidades em tecnologia e desenvolvimento de sistemas, contribuindo para necessidades de negócio e aprofundando minha base técnica.

## Projetos apresentados

| Projeto | O que apresenta |
| --- | --- |
| TáVindo Delivery + TáVindoPrinter | Marketplace, gestão de pedidos e integração com impressão térmica por fila e confirmação de tarefas |
| GOS — LR Automação | Ordens de serviço, apontamento de horas e fechamento operacional e financeiro |
| NutriOS | Plataforma web para nutricionistas, com pacientes, avaliações, planos alimentares e acompanhamento pelo paciente |
| Gestão financeira para casais | Plataforma de organização de finanças compartilhadas |
| Gestão de clínicas odontológicas | Pacientes, consultas, agendamentos, odontograma e gestão financeira |
| Radier Builder | Protótipo de pré-dimensionamento simplificado, com hipóteses e limites; não constitui projeto estrutural completo |
| Urban Routes | Projeto educacional de testes com Python, Selenium, Pytest e Page Object |

Os casos descrevem o problema, a solução, minha participação e o escopo desenvolvido. A referência de conteúdo é o currículo fornecido por Arthur e os fatos já confirmados dos projetos. Prints reais poderão complementar a apresentação. Código privado e dados de clientes não são publicados; tecnologias, métricas ou resultados não são presumidos.

## Experiência do visitante

O portfólio é público e não exige conta. A apresentação leva aos projetos, à formação, ao currículo e aos contatos profissionais. A revisão de 13/11/2026 retira academia, laboratório de IA, exercícios e painel de progresso do site. Os endereços antigos dessas funcionalidades deixam de ser servidos.

## Executar localmente

Use Node.js 24 e npm.

```sh
git clone https://github.com/arthurarga-tech/arthur-ai-builder-journey.git
cd arthur-ai-builder-journey
npm ci
npm run build
npm run dev
```

Abra a URL local informada pelo terminal. Mantenha o servidor em `127.0.0.1`. As páginas atuais não consultam o banco, não precisam de migration manual nem de chave de IA. Para executar o Worker compilado localmente, use `npm start`.

## Arquitetura

- React 19 e TypeScript para páginas e componentes.
- Vinext 1.0.0-beta.5 e Vite 8, preservando o starter e o processo de publicação do Sites.
- Conteúdo versionado em `content/`, sem CMS ou acesso aos sistemas dos projetos apresentados.
- Cloudflare Worker como ambiente de hospedagem do Sites.

Vinext está em beta; esta implementação não presume compatibilidade integral com Next.js ou migração automática para outra hospedagem. Os nomes atuais do repositório e do endereço publicado foram preservados para manter os links existentes.

```text
app/                  apresentação e páginas dos projetos
components/           navegação e componentes visuais
content/              perfil e estudos de caso
public/curriculo/     currículo disponibilizado aos recrutadores
docs/                 decisões e registro de uso de IA
.github/workflows/    testes, tipagem e build
.openai/hosting.json   identidade e configuração da hospedagem
```

Os módulos `domain/`, `services/`, `db/`, `drizzle/` e seus testes pertencem à versão anterior e não estão ligados a rotas públicas nesta revisão. Foram preservados para manter o histórico técnico e evitar apagar dados existentes. A decisão e seus limites estão no [ADR 0002](docs/adr/0002-portfolio-recrutadores.md). O comando `test:integration` é histórico e depende das antigas APIs; não valida o portfólio atual.

## Verificação

```sh
npm test
npm run typecheck
npm run build
```

O [GitHub Actions](https://github.com/arthurarga-tech/arthur-ai-builder-journey/actions/workflows/checks.yml) executa esses checks em cada push e pull request. A publicação do site é separada.

Os 24 testes unitários existentes verificam regras e validações da versão anterior; sua aprovação não comprova a nova interface. Para esta revisão, é necessário também conferir páginas e links públicos, o PDF, a remoção das rotas antigas e a navegação em desktop e mobile.

**Verificação da revisão de 13/11/2026:** pendente de consolidação após a integração das alterações, o build e a publicação. Resultados da versão anterior não são apresentados como testes desta revisão.

## Desenvolvimento com assistência de IA

Arthur definiu o objetivo, forneceu os fatos profissionais e orientou a apresentação. O Codex auxiliou na implementação, na redação e na verificação. O site não oferece funções de IA e não faz chamadas de inferência. A descrição dos projetos não atribui automaticamente domínio de todas as tecnologias a Arthur.

Veja [como a IA foi utilizada](docs/AI-USAGE.md) e os [próximos refinamentos](docs/ROADMAP.md).

Projeto pessoal e independente de Arthur Alves, sem vínculo oficial com as empresas citadas como oportunidades profissionais.
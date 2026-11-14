# ADR 0002 — Portfólio para recrutadores

- Data: 13 de novembro de 2026
- Estado: decisão aceita; implementação e validação consolidadas na entrega da revisão
- Substitui o escopo de experiência pública do [ADR 0001](0001-primeira-entrega.md)

## Contexto

Arthur solicitou um site que apresente seu currículo e seus projetos de forma enxuta, como um README visual para recrutadores. Vários repositórios são privados; o site precisa explicar o que foi construído sem depender do acesso ao código. Academia, laboratório de IA, exercícios e acompanhamento de estudos deixaram de fazer parte do produto desejado.

## Decisão

Manter a aplicação React/TypeScript no runtime e na hospedagem existentes do Sites. Reorganizar a navegação e o conteúdo em apresentação profissional, experiência, formação, currículo e projetos. As páginas são públicas e não dependem de login ou de chamadas ao banco para mostrar o portfólio.

Remover as páginas `/academia`, `/academia/logica`, `/academia/logica/exercicio`, `/laboratorio` e `/evolucao`, além dos endpoints `/api/exercise` e `/api/progress`. Também retirar seus componentes e o catálogo de lições. Os endereços antigos passam a responder como rotas não encontradas; não redirecionam o visitante para uma experiência educacional.

Preservar `domain/`, `services/`, `db/`, `drizzle/`, os testes existentes e o binding D1 nesta revisão. Esses módulos deixam de estar ligados a rotas públicas. A remoção da interface não deve provocar exclusão do banco nem de registros pessoais. O histórico Git preserva a implementação anterior e torna a mudança de escopo rastreável.

## Conteúdo e evidências

O currículo fornecido em 13/11/2026 e os fatos já confirmados orientam a revisão. O portfólio descreve sete casos, agrupando TáVindo Delivery e TáVindoPrinter. Prints poderão ser incluídos posteriormente; não são produzidas telas fictícias apresentadas como produto real.

Não publicar código dos produtos privados ou dados de clientes. Não atribuir stack, nível de domínio ou resultados não confirmados. O Radier Builder mantém seu caráter experimental e suas limitações; Urban Routes permanece identificado como projeto educacional.

## Consequências

- O recrutador encontra diretamente trajetória, contribuição e projetos, com acesso ao currículo e aos contatos.
- A interface deixa de exigir cadastro, armazenamento de progresso ou integração de IA.
- O site não consome API de IA. Não há implantação de novo fornecedor ou novo custo necessário para a revisão.
- A infraestrutura anterior é mantida para limitar o risco de publicação e preservar dados. Uma limpeza técnica posterior pode retirar dependências sem uso, após inventário e sem apagar dados implicitamente.
- Os testes preservados cobrem lógica histórica, não os fluxos visuais atuais. O script `test:integration` não se aplica ao portfólio enquanto os endpoints antigos estiverem removidos.

## Critérios de verificação desta revisão

1. Apresentação e casos alinhados ao currículo, com links e PDF válidos.
2. Ausência de navegação para academia, laboratório, exercícios, progresso ou login.
3. Páginas e APIs retiradas sem resposta funcional, incluindo acesso direto às URLs.
4. Navegação desktop e mobile legível e utilizável; foco e controles acessíveis.
5. Tipagem, build e checks aplicáveis aprovados na fonte que será publicada.
6. Site público atualizado no endereço existente, sem alteração de dados privados.

O resultado desses critérios será registrado ao finalizar a integração e a publicação. As verificações da versão anterior não são transferidas automaticamente para esta revisão.
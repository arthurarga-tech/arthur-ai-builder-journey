# Como explicar a primeira entrega

Este roteiro ajuda Arthur a estudar o próprio projeto. As respostas abaixo descrevem a proposta técnica; devem ser conferidas no código e na aplicação. Não são um registro de que Arthur já revisou ou domina todas as partes.

## Uma apresentação de um minuto

“Este projeto reúne meu portfólio e minha jornada de aprendizado. A primeira versão apresenta quatro casos e uma trilha de lógica aplicada a pedidos. O visitante pode estudar e resolver um exercício; o servidor corrige as respostas com regras explícitas. Quem entra com sua conta pode guardar seu progresso de forma privada. A interface e o backend foram construídos com assistência de IA. O tutor ainda está desativado, porque não autorizei consumo da API e a integração real será uma etapa posterior.”

## Siga um pedido do navegador ao resultado

1. A pessoa lê o conteúdo da lição e informa suas respostas.
2. A interface envia os dados à rota de correção.
3. O servidor valida a entrada e aplica os critérios da versão do exercício.
4. O resultado contém a pontuação e o feedback por critério.
5. Uma operação de persistência exige identidade e associa o registro ao usuário autenticado.
6. A consulta de progresso só devolve os registros do próprio titular.

Abra a rota, o módulo de regras e o acesso ao banco enquanto explica. Identifique o nome real de cada função e onde cada responsabilidade começa e termina.

## Perguntas para preparar uma demonstração

| Pergunta | O que mostrar |
| --- | --- |
| Por que preços estão em centavos? | O cálculo inteiro `2 × 1890 + 790 + 500 = 5070`, com formatação em reais apenas na apresentação. |
| Quem define a nota? | O avaliador determinístico e seus quatro critérios; a IA não participa da correção. |
| O que acontece com uma entrada inválida? | A validação e uma resposta de erro compreensível, sem aceitar silenciosamente outro valor. |
| O que evita acesso a outro histórico? | Identidade obtida no servidor e filtro de propriedade nas operações de banco. |
| O que acontece se a mesma tentativa for enviada novamente? | A chave/regra de idempotência e a ausência de duplicação do registro. |
| Por que há um backend? | Correção, validação, identidade e persistência precisam de uma autoridade fora do navegador. |
| Qual a diferença entre praticar e salvar progresso? | O visitante pode experimentar; o histórico persistido pertence à conta autenticada. |
| Por que o tutor não responde? | A função está desativada e ainda depende de uma integração real, limites e uso autorizado. |
| Quais partes dependem do Sites? | Autenticação hospedada, bindings de armazenamento, build e publicação. |
| Qual foi o papel da IA no desenvolvimento? | O registro em `docs/AI-USAGE.md`, exemplos de código gerado e verificações efetivamente executadas. |

## Exercícios de leitura do código

- Mude um valor esperado apenas em uma cópia de teste e veja qual verificação falha.
- Explique por que somar a entrega dentro da repetição altera o total.
- Encontre uma validação feita no servidor e descreva o erro que ela previne.
- Localize onde o usuário autenticado é obtido e acompanhe seu uso até a consulta do banco.
- Compare a interface anônima com a de uma conta autenticada no ambiente de desenvolvimento.
- Leia um teste de reenvio e explique por que a idempotência é relevante.

Use apenas dados fictícios. Registre dificuldade, hipótese, mudança e resultado observado. Não modifique produção para praticar.

## Registro pessoal a preencher após estudar

```text
Data:
Parte revisada:
O que consegui explicar sem ajuda:
Onde precisei de apoio:
Teste ou demonstração executado:
Resultado observado:
Próxima melhoria:
```

Esse registro começa vazio. Acrescente evidências reais à medida que estudar; uma implementação gerada não comprova, por si só, compreensão do autor do portfólio.


## Problema encontrado na validação da primeira entrega

O Worker local apresentou HTTP 503 quando uma requisição com corpo recebia 401 ou 403 antes da leitura desse corpo. A próxima chamada falhava no proxy de desenvolvimento. O teste separou esse caso das chamadas sem corpo e das chamadas feitas isoladamente.

As rotas passaram a ler o JSON com limite de 4 KB antes das verificações de origem e identidade. Toda gravação continua dependendo dessas verificações. Entradas malformadas recebem 400, 413 ou 415 do parser. Entradas válidas sem autorização recebem 401 ou 403.

O cliente de integração em Node também precisou enviar Content-Length em bytes no DELETE. A verificação final passou sem retentativas e cobriu correção anônima, respostas de acesso negado seguidas de nova tentativa, três envios simultâneos, isolamento entre duas identidades e exclusão individual.

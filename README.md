# Rino sin Frontera — Checklist de requisitos

Formulário de levantamento de requisitos para o site do curso médico Rino sin Frontera: 18 seções de checklist bilíngue, com prévia, envio por e-mail e disparo no WhatsApp.

**Demo:** https://rinosinfrontera.vercel.app

## O que é

Não é o site do curso — é a ferramenta que antecede o site.

Levantar requisitos com um cliente que não é da área costuma virar troca de áudios e listas soltas. Aqui a conversa vira um formulário: 18 seções cobrindo tudo que um site de curso precisa decidir, cada uma com opções para marcar e um campo aberto para o que não couber nas opções. O cliente responde no ritmo dele, revisa antes de mandar e o briefing chega estruturado.

## As 18 seções

| # | Seção | # | Seção |
| --- | --- | --- | --- |
| 1 | Domínio | 10 | Certificado |
| 2 | Propósito do site | 11 | Materiais do curso |
| 3 | Página inicial | 12 | Área do participante |
| 4 | Sobre o curso | 13 | Idiomas |
| 5 | Palestrantes | 14 | Integrações |
| 6 | Programação | 15 | Estilo visual |
| 7 | Inscrição | 16 | Funcionalidades extras |
| 8 | Pagamento | 17 | Prazo e urgência |
| 9 | Pós-inscrição | 18 | Observações gerais |

Cada seção combina múltipla escolha com texto livre, então o cliente responde rápido no que já está decidido e escreve só onde precisa.

## O que resolve na prática

- **Barra de progresso** — o formulário é longo; mostrar "7 de 18" evita abandono no meio.
- **Prévia antes de enviar** — o cliente lê a mensagem montada antes de mandar, sem surpresa.
- **Copiar respostas** — botão para levar o briefing para onde quiser, sem depender do envio.
- **Envio duplo** — dispara o e-mail formatado e abre o WhatsApp na mesma ação. O e-mail é o registro; o WhatsApp é o aviso que a pessoa realmente vê.
- **Bilíngue** — espanhol e português do Brasil, trocados a qualquer momento sem perder o que já foi preenchido. O curso atende os dois públicos.
- **Formulário vazio é recusado** — validação no servidor impede envio sem nenhuma resposta.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js (App Router + Route Handler) |
| UI | React, Tailwind CSS |
| Estado | Hook próprio (`useFormState`) |
| Idiomas | Dicionários tipados em TypeScript (`src/i18n/`), sem biblioteca |
| E-mail | Mailtrap, com corpo em HTML e texto puro |
| Deploy | Vercel |

Sem banco de dados: a resposta vai direto para o e-mail e para o WhatsApp. Para um formulário que cada cliente preenche uma vez, persistir seria peso sem retorno.

## Rodando localmente

```bash
pnpm install
pnpm dev
```

`.env.local`:

```
MAILTRAP_TOKEN=
EMAIL_TO=
EMAIL_FROM=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

## Adaptando para outro cliente

As seções não estão no código — estão nos dicionários. Para reaproveitar o formulário em outro projeto, edite `src/i18n/es.ts` e `src/i18n/pt.ts`: cada item do array `sections` vira um cartão na tela, com suas opções e seu campo de texto. Nenhum componente precisa ser tocado.

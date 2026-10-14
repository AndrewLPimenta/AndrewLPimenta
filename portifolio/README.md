# Portfólio — Andrew Pimenta

Site pessoal em Next.js 16 (App Router), TypeScript e Tailwind CSS 4, com tema claro e escuro.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run lint
npm run typecheck
```

Requer Node.js 20.9 ou mais recente.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Nome, e-mail, links do GitHub, LinkedIn e CV | `src/data/site.ts` |
| Projetos (textos, status, stack, quem usa, impacto) | `src/data/projects.ts` |
| Abordagem: processo, caso de uso, história, features, IA, princípios | `src/data/abordagem.ts` |
| Sobre: pessoas, soft skills, hard skills, trajetória | `src/data/sobre.ts` |
| Stack com ícones (página inicial) | `src/data/stack.ts` e `public/stack/*.svg` |
| Laboratório: regras da API simulada | `src/lib/lab/servidor.ts` |
| Laboratório: código C# exibido | `src/lib/lab/snippets.ts` |
| Cores, tipografia e botões (tema claro e escuro) | `src/app/globals.css` |

Textos entre colchetes, como `[PREENCHER]` e `[CONFIRMAR]`, aparecem em itálico no site para lembrar o que falta preencher.

### Regras dos projetos

- `quemUsa: null` mostra "Primeiros usuários em breve". Não invente número de usuários.
- `impacto: null` mostra "Ainda não medido". Preencha só com o que foi medido.
- `visivel: false` guarda o projeto no arquivo sem publicá-lo.
- A ordem do array define a ordem da lista de projetos.

### Capturas de tela, foto e CV

- **CV:** coloque o PDF em `public/cv-andrew-pimenta.pdf` ou troque o caminho em `src/data/site.ts`.
- **Capturas:** `BrowserFrame` e `PhoneFrame` (`src/components/frames.tsx`) aceitam um `children`. Passe um `<Image>` do `next/image` no lugar do espaço reservado.
- **Foto:** `public/andrew.jpg`, usada no hero da página inicial e na página Sobre.

## Páginas

- `/` — início, com o Dashboard Tático em destaque
- `/projetos` — lista com filtro; o estudo de caso abre numa folha que fecha arrastando para baixo
- `/projetos/[slug]` — página própria de cada estudo de caso, gerada estaticamente
- `/laboratorio` — sistema de cobranças funcionando, com visão de cliente e visão técnica (API e código C#)
- `/abordagem` — processo, do problema ao backlog, IA no processo e princípios com prova
- `/sobre` — saber lidar com pessoas, soft skills, hard skills e trajetória
- `/contato` — e-mail com botão de copiar, CV e redes

Também gera `sitemap.xml`, `robots.txt` e uma página 404.

## Componentes do shadcn/ui e do 21st.dev

O projeto segue a estrutura do shadcn (`components.json`, `src/components/ui`, `src/lib/utils.ts`). Para trazer um componente novo:

1. Cole o arquivo em `src/components/ui/`.
2. Instale as dependências que ele pedir. Se pedir `framer-motion`, troque o import por `motion/react`: é a mesma biblioteca com o nome novo, e já está instalada.
3. Componentes do shadcn podem ser adicionados com `npx shadcn@latest add <nome>`.

As cores do shadcn (`background`, `foreground`, `primary`, `secondary`, `muted-foreground`, `border`, `ring`…) já apontam para a paleta do site em `globals.css`, então o componente entra com as cores certas nos dois temas.

Componentes em uso:

- `hero-portrait.tsx` — hero da página inicial: nome grande, foto em forma orgânica, selo girando e palavra vazada. Textos em `src/app/page.tsx`.
- `hero-block-shadcnui.tsx` (21st.dev) — hero anterior, guardado para referência.

## Efeitos (`src/components/fx`)

| Componente | O que faz |
| --- | --- |
| `Wallpaper` | Manchas de luz desfocadas que se movem devagar, no estilo dos papéis de parede da Apple |
| `SpotlightCard` | Card de vidro com luz que segue o ponteiro e borda que acende |
| `ScrollWords` | Texto cujas palavras acendem conforme a página rola |
| `DeviceReveal` | A tela entra inclinada e se endireita com a rolagem |
| `CountUp` | Número que conta até o valor quando aparece |
| `Reveal` | Entrada suave ao aparecer na tela |

Todos respeitam "reduzir movimento" do sistema.

## Capturas de tela

As molduras mostram interfaces desenhadas (`src/components/mocks.tsx`) até entrarem as capturas reais. Para trocar, edite `src/components/project-visual.tsx` e coloque um `<Image>` dentro de `BrowserFrame` ou `PhoneFrame`.

## Tema claro e escuro

Segue o tema do sistema na primeira visita. O botão na barra de navegação alterna e guarda a escolha no navegador. Um script curto no `<head>` (`src/lib/theme-script.ts`) aplica o tema antes da pintura, para não piscar.

## Publicar

Na Vercel: importe o repositório e defina `NEXT_PUBLIC_SITE_URL` com o domínio final (usado no sitemap e nas metatags).

## Laboratório

A página `/laboratorio` mostra um CRUD de cobranças funcionando. A API é simulada no navegador (`src/lib/lab/servidor.ts`), com as mesmas rotas, regras e respostas do código C# exibido (`src/lib/lab/snippets.ts`). Os dados ficam no `localStorage` do visitante.

- **Como cliente:** roteiro de 4 testes e histórico das ações em português.
- **Visão técnica:** painel de rede (método, status, corpo) e o código C# com o trecho da última ação aceso.

Se mudar uma regra, mude nos dois lugares: `servidor.ts` e `snippets.ts`.

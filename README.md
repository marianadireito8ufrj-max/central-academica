# Central Acadêmica — Mariana Monteiro

Portal pessoal do 8º período de Direito (FND/UFRJ, 2026.2), reunindo cadernos digitais, Drive, controle de presenças e agenda.

## Estrutura

Projeto estático, sem dependências e sem banco de dados:

- `index.html` — estrutura da Central
- `styles.css` — layout desktop/mobile e tema escuro
- `script.js` — data local, menu, tema e último caderno acessado
- `manifest.webmanifest` + `sw.js` — base de PWA
- `vercel.json` — cabeçalhos de segurança e configuração de publicação

## Desenvolvimento local

```bash
python -m http.server 3000
```

Depois acesse `http://localhost:3000`.

## Publicação

Projetado para publicação direta na Vercel como site estático.

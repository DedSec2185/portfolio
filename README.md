# Abhayraj Singh — Portfolio

## Deploy to Vercel in 2 minutes

```bash
npm install
npm run dev        # local preview at localhost:5173
```

### Vercel (free, permanent URL)
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Framework preset: Vite — click Deploy
4. Your URL: abhayraj-portfolio.vercel.app (or custom domain)

### Or deploy via CLI
```bash
npm i -g vercel
vercel         # follow prompts, live in ~30 seconds
```

## Customise
- All content is in `src/Portfolio.jsx` at the top — PROJS, EXP, SKILLS, ROLES arrays
- Colors: the `C` object at the top of the file
- To add GitHub link: add it to the contact section array

# TODO (CORS fix for NIM login)

- [ ] Read and verify current backend CORS configuration + OPTIONS handling
- [ ] Edit `backend/src/index.ts` to remove the manual header middleware and let `corsConfig` be the single source of truth
- [ ] Edit `backend/src/corsConfig.ts` to allow the deployed frontend origin(s) used by Vercel
- [ ] Verify TypeScript/build locally
- [ ] (After deployment) confirm preflight OPTIONS response includes `Access-Control-Allow-Origin` so login works


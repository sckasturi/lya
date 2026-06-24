import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { networkInterfaces } from 'node:os'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

const projectRoot = dirname(fileURLToPath(import.meta.url))
const freebiePdfSrc = resolve(projectRoot, 'src/assets/pdfs/freebie.pdf')
const freebiePdfDest = resolve(projectRoot, 'dist/assets/pdfs/freebie.pdf')

function copyFreebiePdf() {
	if (!existsSync(freebiePdfSrc)) {
		console.warn('[copy-freebie-pdf] Missing src/assets/pdfs/freebie.pdf')
		return
	}
	mkdirSync(dirname(freebiePdfDest), { recursive: true })
	cpSync(freebiePdfSrc, freebiePdfDest)
}

function getDevHosts() {
	const hosts = new Set(['localhost', '127.0.0.1'])
	for (const ifaces of Object.values(networkInterfaces())) {
		for (const iface of ifaces ?? []) {
			if (iface.family === 'IPv4' && !iface.internal) {
				hosts.add(iface.address)
			}
		}
	}
	return [...hosts]
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		mkcert({ hosts: getDevHosts() }),
		{
			name: 'copy-freebie-pdf',
			closeBundle: copyFreebiePdf,
		},
	],
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: false,
	},
})

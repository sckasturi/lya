import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { networkInterfaces } from 'node:os'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import purgeCss from '@fullhuman/postcss-purgecss'

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
export default defineConfig(({ command }) => ({
	plugins: [
		react(),
		mkcert({ hosts: getDevHosts() }),
		{
			name: 'copy-freebie-pdf',
			closeBundle: copyFreebiePdf,
		},
	],
	css: {
		postcss: {
			plugins:
				command === 'build'
					? [
							// Strip unused CSS (full Bootstrap + the Aximo template ship
							// ~430 KB of render-blocking CSS; only a fraction is used).
							purgeCss({
								content: [
									'./index.html',
									'./src/**/*.{js,jsx}',
									'./public/**/*.html',
								],
								defaultExtractor: (content) =>
									content.match(/[A-Za-z0-9-_:/%.]+/g) || [],
								safelist: {
									standard: [
										'html',
										'body',
										'light',
										'active',
										'show',
										'open',
										'collapsed',
										'collapsing',
										'shape-none',
									],
									// Classes added at runtime by third-party embeds or JS.
									greedy: [
										/^lya-/,
										/^calendly/,
										/^grecaptcha/,
										/^recaptcha/,
										/^freebie-popup/,
										/^sub-menu/,
										/data-cta-color-variant/,
									],
								},
							}),
						]
					: [],
		},
	},
	build: {
		target: 'es2020',
		cssMinify: true,
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes('node_modules')) return
					if (id.includes('framer-motion')) return 'motion'
					if (id.includes('react-calendly')) return 'calendly'
					if (
						id.includes('react-dom') ||
						id.includes('react-router') ||
						id.includes('/react/')
					) {
						return 'react-vendor'
					}
				},
			},
		},
	},
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: false,
	},
}))

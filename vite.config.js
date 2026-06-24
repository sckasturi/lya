import { networkInterfaces } from 'node:os'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

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
	plugins: [react(), mkcert({ hosts: getDevHosts() })],
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: false,
	},
})

import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { Top } from './pages/main';

const app = new Hono()
app.use('*', serveStatic({
	root: './public'
}));

app.get('/', (c) => {
	return c.html(<Top />)
})

export default {
	port: 3000,
	fetch: app.fetch,
}
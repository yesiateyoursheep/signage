import asyncio
import json, random
from aiohttp import web

verbose = True
port = 8888

routes = web.RouteTableDef()

@routes.get("/")
@routes.get("/index.html")
async def index(request):
	if verbose: print('GET /')
	with open('index.html',encoding='utf8') as f:
		file=f.read()
	return web.Response(text=file,status=200,headers={'Access-Control-Allow-Origin':'https://merely.yiays.com','content-type':'text/html'})
@routes.get("/main.css")
async def css(request):
	if verbose: print('GET /main.css')
	with open('main.css',encoding='utf8') as f:
		file=f.read()
	return web.Response(text=file,status=200,headers={'content-type':'text/css'})
@routes.get("/main.js")
async def js(request):
	if verbose: print('GET /main.js')
	with open('main.js',encoding='utf8') as f:
		file=f.read()
	return web.Response(text=file,status=200,headers={'content-type':'application/javascript'})

@routes.get("/favicon.ico")
async def favicon(request):
	if verbose: print('GET /favicon.ico')
	return web.Response(text='',status=404,headers={'content-type':'image/x-icon'})

app=web.Application()
app.add_routes(routes)
web.run_app(app,port=port)
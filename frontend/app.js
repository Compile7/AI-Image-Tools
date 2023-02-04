'use strict'

const path = require('path')
const  Fastify = require('fastify')
const AutoLoad = require('@fastify/autoload')


const fastify = Fastify({
    logger: false,
    ignoreTrailingSlash: true,
    caseSensitive: false
  })

  fastify.register(require("@fastify/view"), {
    engine: {
      ejs: require("ejs")
    },
    layout:'./views/layout/main.ejs'
  });

  fastify.register(require('@fastify/static'), { 
    root: path.join(__dirname, 'asset'),
    prefix: '/asset/',
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'), 
  })

  fastify.listen({ port: 3000, host:'0.0.0.0' }, (err, address) => {
    if (err) throw err
    console.log(`Server is now listening on ${address}`)
  })
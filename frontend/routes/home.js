module.exports.autoPrefix = '/'
module.exports = async function (fastify, opts, next) {
    fastify.get('/', IndexHandler)
    next()
}

async function IndexHandler(request, reply) {
    return reply.view("./views/content/home.ejs", {})
}
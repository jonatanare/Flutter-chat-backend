const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


// Mensajes de sockets
io.on('connection', client => {

    console.log('Cliente conectado');
    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    //console.log(valido, uid);
    // Verificar autentificacion
    if ( !valido ) { return client.disconnect();}
    console.log('cliente autenicado');

    //Cliente autenticado
    usuarioConectado( uid );

    // Ingresar al usuario a una sala en particular
    // Sala Global, client.id, uid
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async ( payload ) => {
        console.log( payload );

        await grabarMensaje( payload );
        io.to(payload.para).emit('mensaje-personal', payload );
    });


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado( uid );
    });

    /*client.on('mensaje', ( payload ) => {
        console.log('Mensaje!!', payload);

        io.emit('mensaje', { admin: 'Nuevo Mensje'});
    })*/
});
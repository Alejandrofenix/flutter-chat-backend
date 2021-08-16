const {io} = require('../index');
//Mensajes de Sockets
io.on('connection', client => {

    console.log('Client Connected');

    client.on('disconnect', () => {
        console.log('Client Disconnected');
    });
    /*
    //Listening values that was emited.
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        
        //The server emit a message to all clients connected to the server
        io.emit('mensaje', { admin: 'New Message' })
    })
    
*/
});

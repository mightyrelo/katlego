const mongoose = require('mongoose');
require('./Ms');
require('./Users');

//connection string
let dbURI = 'mongodb://localhost/ppApp';

if(process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb+srv://accsight:K%40stx8909@cluster0.hvixj0e.mongodb.net/ppApp';
}

mongoose.connect(dbURI, {useNewUrlParser: true});

//mongoose fires connection events
mongoose.connection.on('connected', () => {
    console.log('mongoose connected to ', dbURI);
});

mongoose.connection.on('error', (error) => {
    console.log('error in connection ', error );
});

mongoose.connection.on('disconnected', () => {
    //
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', ()=> {
        process.exit(0);
    })
});
process.once('SIGUSR2', () => {
    gracefceulShutdown('nodemon restart', ()=> {
        process.kill(process.pid, 'SIGUSR2');
    })
});
process.on('SIGTERM', () => {
    gracefulShutdown('heroku termination', ()=> {
        process.exit(0);
    })
});

const gracefulShutdown = (source, callback) => {
    mongoose.connection.close(() => {
        console.log('mongoose disconnected through ', source);
        callback();
    });

}


//const os = require('os');
const cluster = require('cluster');
const {app, port} = require('./app');

if (cluster.isMaster) {
//    let cpus = os.cpus().length;
    let cpus = 3;
  
    for (let i = 0; i < cpus; i++) cluster.fork();
  
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {
    app.listen(port, () => {
        console.log(`Started at ${process.pid}, listening on port ${port}`);
    });
}
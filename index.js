import { Server } from "socket.io";
import { getDocument, updateDocument } from './controller/document-controller.js'
import  express  from "express";
import path from "path";
import Connection from "./database/db.js";

const __dirname = path.resolve();



const app = express();


app.use(express.static(path.join("__dirname", "./client/build")));


app.get('*', function (_, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
        res.status(500).send(err);
    })
})

const PORT = process.env.PORT || 9000;

Connection();

const io = new Server(PORT,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);


        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })

        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        })

    })



  
});
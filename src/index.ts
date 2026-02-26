import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()
app.use(express.json())

const uri = "mongodb+srv://admin:senha123@cluster0.tmco7zw.mongodb.net/?appName=Cluster0"
const client = new MongoClient(uri)

async function connectDB() {
    try {
        await client.connect()
        console.log("Conectado ao MongoDB Atlas com sucesso")
    } catch (e) {
        console.error("Erro na conexão:", e)
    }
}

app.post('/investimentos', async (req, res) => {
    try {
        const db = client.db('meu_projeto')
        const collection = db.collection('portfolio')
        
        const novoInvestimento = {
            ticker: req.body.ticker,
            quantidade: req.body.quantidade,
            preco: req.body.preco,
            data: new Date()
        }
        
        const resultado = await collection.insertOne(novoInvestimento)
        res.status(201).send(resultado)
    } catch (erro) {
        res.status(500).send({ mensagem: "Erro ao salvar", erro })
    }
})

app.get('/investimentos', async (req, res) => {
    try {
        const db = client.db('meu_projeto')
        const collection = db.collection('portfolio')
        
        const investimentos = await collection.find({}).toArray()
        res.status(200).send(investimentos)
    } catch (erro) {
        res.status(500).send({ mensagem: "Erro ao buscar", erro })
    }
})

connectDB()

app.get('/', (req, res) => {
    res.send('Servidor rodando com driver nativo do MongoDB')
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
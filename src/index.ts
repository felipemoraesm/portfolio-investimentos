import 'dotenv/config'
import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
app.use(express.json())

const uri = process.env.MONGO_URI
if (!uri) {
    console.error("Defina a variável MONGO_URI no arquivo .env (veja .env.example)")
    process.exit(1)
}
const client = new MongoClient(uri)
const PORT = Number(process.env.PORT) || 3000

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

app.delete('/investimentos/:id', async (req, res) => {
    try {
        const db = client.db('meu_projeto')
        const collection = db.collection('portfolio')
        
        const id = req.params.id
        const resultado = await collection.deleteOne({ _id: new ObjectId(id) })
        
        if (resultado.deletedCount === 0) {
            return res.status(404).send({ mensagem: "Investimento não encontrado" })
        }
        
        res.status(200).send({ mensagem: "Investimento removido com sucesso" })
    } catch (erro) {
        res.status(500).send({ mensagem: "Erro ao deletar", erro })
    }
})

connectDB()

app.get('/', (req, res) => {
    res.send('Servidor rodando com driver nativo do MongoDB')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let users = [
    { id: 1, name: "Shakira", age: 44 },
    { id: 2, name: "Alex", age: 45 },
]

app.listen(8080, () => console.log('Server Up!'))

app.get('/api/users', (req, res) => res.status(200).json(users))

app.post('/api/users', (req, res) => {
    users.push(req.body)
    res.status(201).json({ status: "success", message: "User created!"})
})

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const idxUser = users.findIndex(u => u.id == id)
    if (idxUser<0) {
        return res.status(400).json({ status: "error", message: "User not found"})
    }
    users[idxUser] = req.body
    res.status(200).json({ status: "success", message: "User updated!" })
})

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    const currentLength = users.length
    users = users.filter(u => u.id != id)
    if (users.length == currentLength) {
        return res.status(400).json({ status: "error", message: "User not found"})
    }
    res.status(200).json({ status: "success", message: "User deleted!" })
})

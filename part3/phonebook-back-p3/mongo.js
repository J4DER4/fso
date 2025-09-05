const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as arg!')
    process.exit(1)
}

const password = process.argv[2]
const database = 'phonebookdb'
const url = "mongodb+srv://poopstack:" + password + "@cluster0.ndc3ai3.mongodb.net/" + database + "?retryWrites=true&w=majority&appName=Cluster0"
// const url = 'mongodb://admin:' + password + '@localhost:27017/' + database + '?authSource=admin'

mongoose.set('strictQuery', false)
mongoose.connect(url)

mongoose.connection.on('connected', () => {
    console.log("connected to:", database)

    const contactSchema = new mongoose.Schema({
        name: String,
        number: String,
    })
    const Contact = mongoose.model('Contact', contactSchema)

    //if only pass => print data
    if (process.argv.length === 3) {
        Contact
            .find({})
            .then(result => {
                console.log('Phonebook:')
                if (result.length === 0) {
                    console.log("No entries found")
                }

                result.forEach(person => {
                    const o = person.name + " " + person.number
                    console.log(o)
                })
                mongoose.connection.close()
                process.exit(0)
            }).catch(err => {
                console.log("err", err)
                mongoose.connection.close()
                process.exit(1)
            })
    } else {

        //if name and number are given
        const name = process.argv[3]
        const number = process.argv[4]
        const contact = new Contact({
            name: name,
            number: number,
        })

        contact.save().then(() => {
            console.log('Added', contact.name, "number", contact.number, "to", database)
            mongoose.connection.close()
        })
    }
})

mongoose.connection.on('error', (err) => {
    console.error('Connection error:', err)
    process.exit(1)
})


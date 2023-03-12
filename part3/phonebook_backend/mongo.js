//Exercise 3.12. Command-line database

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
if (process.argv.length>=3) {
  const password = process.argv[2];
  const name = process.argv[3]
  const number = process.argv[4]

  const url = `mongodb+srv://akthanki5:${password}@cluster2.frplkn6.mongodb.net/phonebookApp?retryWrites=true&w=majority`
  mongoose.set('strictQuery',false)
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema);
  const person = new Person({  name: name,  number: number});

  console.log(process.argv.length)
  if (process.argv.length === 3) {
    Person.find().then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    }).catch(e=> console.log(e))
    return;
  }

  person.save().then(result=>{
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  }).catch(e=> console.log(e));

}





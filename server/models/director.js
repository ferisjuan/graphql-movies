import mongoose from 'mongoose'

const directorSchema = new mongoose.Schema({
    name: String,
    age: String,
})

export default mongoose.model('Director', directorSchema)

const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote){
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added.'))
  } else {
    console.log(chalk.red.inverse('Duplicate note exists.'))
  }
  
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title)

  if(notes.length > notesToKeep.length){
    console.log(chalk.green.inverse(`Note removed with title ${title}`))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse("No note found."))
  }

}

const listNotes = () => {
  const notes = loadNotes();
  console.log(`There are ${notes.length} total notes.`)
  for (let i = 0; i < notes.length; i++)
  {
    console.log(chalk.inverse.blue(`${i + 1} ${notes[i].title}`))
  }
}

const readNotes = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title)

  if (noteToRead){
    console.log(chalk.inverse(`Note Title: ${noteToRead.title}`))
    console.log(noteToRead.body)
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
}

const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
const dataJSON = JSON.stringify(notes)
fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
}
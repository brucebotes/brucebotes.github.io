// node bible.js

// Take the references from TSK in the mongodb collection  and build
// the source reference to this text. Now we can lookup which
// verses have cross references to it
//
// Unprocessed sources are saved in badverses
//

const fs = require('fs');
const mongoose = require('mongoose');

export const uncompress = (bible) =>
  bible.split('|||').map(book =>
    book.split('||').map(unflattenChapter)
  )

const unflattenChapter = chapter =>
  chapter
    .replace(/\d+\|/g, match => `||${match}`)
    .substr(2)
    .split('||')
    .map(verse => {
      const [n, txt] = verse.split('|')
      return { n, txt }
    })


main().catch(error => console.error(error.stack));

async function main() {
  //await mongoose.connect('mongodb://localhost:27017/test');
  await mongoose.connect('mongodb://localhost:3001/meteor');

  const BibleTextSchema = new mongoose.Schema({
    bible: { type: String, index: true, unique: true  },
    txt: { type: String }
  })

  const BibleText = mongoose.model('BibleText', BibleTextSchema)


  let count = 0
  const start = Date.now()
  const dir = fs.readdirSync('./txt', { withFileTypes: 'txt'} )

  console.log(dir)
  dir.forEach( (file) => {
    console.log(`reading file ${file.name}`)
    const data = fs.readFileSync(`./txt/${file.name}`, 'utf8')
    const name = file.name.split('.')[0]
    BibleText.create({bible: name, txt: data}).then(()=> console.log(`file- '${file.name}' up loaded `))
    ++count
  })
  //console.log(count);
  console.log(`Done. Processed ${count} records in ${(Date.now()-start)/1000} seconds.\n Please wait for async/await to complete?`)
}

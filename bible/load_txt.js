// npm run 

// take the TSK csv file and unpack it into a mongodb collection
// called verses
//
// the unpacked document ( verse ) will have two sets of reference Names
//   ref - those used in TSK
//   ref1 - and this used in Bible notes ( urlNames )
//   ref2 - the tsk(sword) book number,chapter number and verse number format
//
import csv from 'csvtojson'
import mongoose from 'mongoose'

const urlNames = [
  'gn', 'ex', 'lv', 'nu', 'dt', 'jsh', 'jg', 'ru', '1sm', '2sm', '1kn', '2kn',
  '1ch', '2ch', 'ez', 'nh', 'es', 'jb', 'ps', 'prv', 'ec', 'so', 'is', 'jer',
  'lm', 'ezk', 'dn', 'hs', 'jl', 'am', 'ob', 'jnh', 'mc', 'na', 'hk', 'zp',
  'hg', 'zc', 'ml', 'mt', 'mk', 'lk', 'jn', 'ac', 'rm', '1co', '2co', 'ga',
  'ep', 'ph', 'col', '1th', '2th', '1tm', '2tm', 'tt', 'phm', 'heb', 'jm', '1pt',
  '2pt', '1jn', '2jn', '3jn', 'jd', 'rv',
]
const tskBookNames = [
  'ge', 'ex', 'le', 'nu', 'de', 'jos', 'jud', 'ru', '1sa', '2sa', '1ki', '2ki', 
  '1ch', '2ch', 'ezr', 'ne', 'es', 'job', 'ps', 'pr', 'ec', 'so', 'isa', 'jer', 
  'la', 'eze', 'da', 'ho', 'joe', 'am', 'ob', 'jon', 'mic', 'na', 'hab', 'zep', 
  'hag', 'zec', 'mal', 'mt', 'mr', 'lu', 'joh', 'ac', 'ro', '1co', '2co', 'ga', 
  'eph', 'php', 'col', '1th', '2th', '1ti', '2ti', 'tit', 'phm', 'heb', 'jas', '1pe', 
  '2pe', '1jo', '2jo', '3jo', 'jude', 're',
]

mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  const verseSchema = new mongoose.Schema({
    ref: { type: String, index: true, unique: true  },
    ref1: { type: String, index: true, unique: true  },
    ref2: { type: String, index: true, unique: true  },
    tsk: [{
      sort: String,
      words: String,
      refs: String
    }],
    sources: [{type: String}]
  })

  const Verse = mongoose.model('Verse', verseSchema)

  csv({ 
    delimiter: '\t' 
  })
    .fromFile('tskxref.txt')
    .subscribe((row) => {
      console.log(row)
      const {sort, words, refs} = row
      const ref = `${tskBookNames[row.book-1]} ${row.chapter}:${row.verse}` 
      const ref1 = `${urlNames[row.book-1]} ${row.chapter}:${row.verse}` 
      const ref2 = `${row.book} ${row.chapter} ${row.verse}` 
      const tsk = {sort, words, refs}
      Verse.create({
        ref,
        ref1,
        ref2,
        tsk: [tsk]
      }).then( (rec) => { 
        console.log(rec)
        return(rec)
      }).catch((err) => {
        // record exists -> update
        Verse.findOneAndUpdate({ref2}, {$push: {tsk}}).then((rec) =>{
          console.log(rec)
          return(rec)
        })
      })
    })  
    .on('done', (err) => {
      if (err) {
        return console.log(err)
      }
      console.log('\u2192 All rows were processed')
      //db.close()
    })
})



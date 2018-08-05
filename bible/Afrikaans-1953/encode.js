const fs = require('fs');


const transform_bible_text = (text) => {
  let book = undefined;
  let chapter = undefined;
  let buf = '';

  text.split('\r\n').map( (row) => {
    let ii = row.split('||');
    if (!ii[0]) return; 
    if(!book) { book = ii[0];}
    if(!chapter) { chapter = ii[1];}
    if(book !== ii[0]) { 
      buf = buf + '|||'; 
      book = ii[0];
      chapter = ii[1];
    } else if(chapter !== ii[1]) { 
      buf = buf + '||'; 
      chapter = ii[1];
    }
    buf = buf + ii[2] + '|' + ii[3];  
  });
  return buf;
}

fs.readFile('./Afrikaans__Ou_Vertaling__aov__LTR.txt', 'utf8', (err, data) => {
  if(err) throw err
  console.log(transform_bible_text(data));
});

const express = require('express'); // import o kora jay but filename .js er bodole .mjs hobe ar package.json e chaange hobe kichhu
var cors = require('cors'); // server ar client er moddhe data lenden er jonno, middleware jeta duita website ke connect kore, data lenden er permission dey
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // middleware witch converts express to json so that the stringified data sent from the client side can be parsed into json object // or we can use body parser 

app.get('/', (req, res) => {
  res.send('Hello World! Restart on change')
});

const users = [
  { id: 1, name: 'Shabana', email: 'shabana@gmail.com', phone: '01711111111' },
  { id: 2, name: 'Shabnoor', email: 'shabnoor@gmail.com', phone: '01722222222' },
  { id: 3, name: 'Shuchorita', email: 'shuchorita@gmail.com', phone: '01733333333' },
  { id: 4, name: 'Shuchonda', email: 'shuchonda@gmail.com', phone: '01744444444' },
  { id: 5, name: 'Srabonti', email: 'srabonti@gmail.com', phone: '01755555555' },
  { id: 6, name: 'Sabila', email: 'sabila@gmail.com', phone: '01766666666' },
  { id: 7, name: 'Sohana', email: 'sohana@gmail.com', phone: '01777777777' },
]

app.get('/users', (req, res) => {
  // console.log('Query', req.query);
  // req er vetor by default query thake
  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    const matched = users.filter(user => user.name.toLowerCase().includes(search));
    res.send(matched);
  }
  else {
    res.send(users);
  }
})

app.get('/user/:id', (req, res) => {
  console.log(req.params); // req.params e ekta object jacche like { id: 'abc' }, ekhane ekta parameter id
  const id = parseInt(req.params.id);
  // const user = users[id]; // ekhane id niye index number diye khujtese so 1 number id er jonno index 1 mane 2 number ta pacche
  const user = users.find(u => u.id === id);
  res.send(user)
})

app.post('/user', (req, res) => {
  // console.log('Request', req);
  console.log('Request body', req.body); //object from input field // input field er data body te jay
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  // res.send('Post method successful');
  res.send(user);
})

app.get('/fruits', (req, res) => {
  res.send(['mango', 'apple', 'oranges']);
});

app.get('/fruits/mango/fazli', (req, res) => {
  res.send('sour sour fazli flavor');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
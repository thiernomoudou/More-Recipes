import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(8000, () => {
  let host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  const port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

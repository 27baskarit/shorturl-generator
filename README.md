Custom URL Shortner

* [Express](https://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [ShortId](https://github.com/dylang/shortid)

## Getting Started

```sh
# clone it
git clone https://baskarbse@bitbucket.org/baskarbse/yaac-tinyurl.git

# Install dependencies
npm install

# Start  server
node index.js
```


## Run as Docker

```sh
# clone it
git clone https://baskarbse@bitbucket.org/baskarbse/yaac-tinyurl.git

# Install dependencies
docker build -t tinyurl .

# Start  server
docker run --network="host" -it -d --expose 7000 -p 7000:7000 tinyurl
```

## License

MIT

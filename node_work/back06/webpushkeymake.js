const webpush = require('web-push')

const vapidKeys = webpush.generateVAPIDKeys()
console.log(vapidKeys)

/*
{
  publicKey: 'BJRGY_r6i1_vwSzES5wLKBw7qsN3E63JjaZ9Qju_OmDwH-iggCpygnNiZNjQPHIQJpdPez5TxTElBMzn4w8WkAE',
  privateKey: 'h2hZhmStK9vHNTpoDO_8hYGe8nHATOCSbSQ8HMOOe70'
}
*/
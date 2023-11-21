const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const routes=require('./routes/index')
const swaggeruiexpress=require('swagger-ui-express');
const swaggerjsdoc=require('swagger-jsdoc');
const swaggerDocs=require('./docs/swaggerDocs')
const app=express();

const port=process.env.PORT || 3000

app.use(express.json());

app.use('/api',routes);
app.use('/api-docs/',swaggeruiexpress.serve,swaggeruiexpress.setup(swaggerjsdoc(swaggerDocs)));


app.listen(port,(req,res)=>{
    console.log(`Server is listening in port ${port}.`)
})
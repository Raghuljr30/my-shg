import express, { application } from 'express';
import data from './data.js';
 import mongoose from 'mongoose';
 import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import productRouter from './routes/productRoutes.js';


dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected to db');
})
.catch((err)=>{
    console.log(err.message);
})

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/seed',seedRouter);
app.use('/api/products',productRouter);
 app.use('/api/users',userRouter);


app.use('/api/orders',orderRouter);


// app.get('/api/products',(req,res)=>{
//     res.send(data.products)
// })

// app.get('/api/products/slug/:slug',(req,res)=>{
    
//     const product=data.products.find((x)=>x.slug==req.params.slug);
//     if(product){
//         res.send(product);
//     }
//     else
//     {
//         res.status(404).send({message:'Product Not Found'})
//     }
// });


// app.get('/api/products/:id',(req,res)=>{
    
//     const product=data.products.find((x)=>x._id==req.params.id);
//     if(product){
//         res.send(product);
//     }
//     else
//     {
//         res.status(404).send({message:'Product Not Found'})
//     }
// });


//error handler
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.massage});
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`serve at http://localhost:${port}`)
})

const express = require('express')
const routes = express.Router()

//#region mostrar Elementos
routes.get('/cliente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM cliente', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
//#endregion

//#region Buscar Elemento por ID
routes.get('/cliente/:Id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM cliente WHERE Id = ?', [req.params.Id], (err, rows, fields)=>{
            if(err) return res.send(err)

            if (rows.length > 0){
                res.json(rows)
            } else{
                res.send('El cliente no existe')
            }
            
        })
    })
})
//#endregion

//#region contar elementos
routes.get('/contar', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT COUNT (*) FROM cliente', (err, rows)=>{
            if(err) return res.send(err)

            if (rows.length > 0){
                res.json(rows)
            } else{
                res.send('No hay elementos en Datebase')
            }
        })
    })
    
})
//#endregion

//#region Agregar Elemento
routes.post('/cliente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO cliente set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Cliente Agregado!')
        })
    })
})
//#endregion

//#region Eliminar Elemento
routes.delete('/cliente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM cliente WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Cliente Eliminado!')
        })
    })
})
//#endregion

//#region Actualizar Elemento
routes.put('/cliente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        
        conn.query('UPDATE cliente set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Cliente Actualizado!')
        })
    })
})
//#endregion

module.exports = routes
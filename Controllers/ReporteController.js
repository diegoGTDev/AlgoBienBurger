const ReporteService = require('../Services/ReporteService');

const _ReporteService = new ReporteService();

class ReporteController{
    constructor(){

    }
    
    async Post(req, res){
        console.log("POST EN REPORTE");
        const data = req.body;
       
        try{
            const caca = await _ReporteService.Post(data.mes, data.gastosMes)
            //response.push(_ReporteService.GetReporte(data.mes, data.gastosMes));
            res.status(201).json(caca);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
   
    async Get (req, res){
        console.log("GET EN REPORTE");
        console.info("Request de pedidos: ", req.body);
        const cuenta = req.body;
        try {
            const coso = await _ReporteService.Get();
            res.status(201).json(coso);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ReporteController();
const pool = require("./../Config/db");;

class ReportesService{
    constrcutor(){

    }

    async GetReportePagados(mes){
        console.log("El Mes es: ", mes);
        const query = `SELECT
                            SUM(total) AS total_mes
                        FROM
                            public.cuenta
                        WHERE
                            EXTRACT(MONTH FROM fecha) = $1 AND bol_pago = true;`;
        try{
            let {rows} = await pool.query(query, [mes]);
            console.info("Total Pagado: ", rows[0])
            return rows[0]
        }   
        catch(error){
            console.error("ERROR Pagado", error);
        }
    }

    async GetReporteNoPagados(mes){
        console.log("El Mes es: ", mes);
        const query = `SELECT
                            SUM(total) AS total_mes_no
                        FROM
                            public.cuenta
                        WHERE
                            EXTRACT(MONTH FROM fecha) = $1 AND bol_pago = false;`;
        try{
            let {rows} = await pool.query(query, [mes]);
            console.info("Total No Pagado: ", rows[0])
            return rows[0]
        }   
        catch(error){
            console.error("ERROR No Pagado", error);
        }
    }
    
    async GetReporteMes(mes){
        console.log("El Mes es: ", mes);
        const query = `SELECT
                            SUM(total) AS total_mes
                        FROM
                            public.cuenta
                        WHERE
                            EXTRACT(MONTH FROM fecha) = $1`;
        try{
            let {rows} = await pool.query(query, [mes]);
            console.info("Total No Pagado: ", rows[0])
            return rows[0]
        }   
        catch(error){
            console.error("ERROR No Pagado", error);
        }
    }

}




module.exports = ReportesService;
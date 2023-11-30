const pool = require("./../Config/db");

const EmailService = require("./EmailService");
const emailService = new EmailService();

class ReporteService{
    constrcutor(){

    }

    async GetReportePagados(mes){
        console.log("El Mes es: ", mes);
        const query = `SELECT
                            SUM(total) AS total_mes_si
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
            console.info("Total: ", rows[0])
            return rows[0]
        }   
        catch(error){
            console.error("ERROR", error);
        }
    }
    
    async generarReporte(total_p, total_np, total_v, total_r, gastosMes, total_f, mes){
        const query = 'INSERT INTO public.reporte (total_pagado, total_no_pagado, total_en_ventas, total_reporte, gastos_mes, total_final, mes) VALUES ($1, $2, $3, $4, $5, $6, $7);'

        try{
            const {rows} = await pool.query(query, [total_p, total_np, total_v, total_r, gastosMes, total_f, mes]);
            console.log("Reporte total pagados: ", total_p);
            console.log("Reporte No Pagados: ", total_np);
            console.log("Reporte total_r: ", total_r);
            console.log("Reporte total_v ", total_v);
            console.log("Reporte Gastos Mes: ", gastosMes);
            console.log("Reporte Total Mes: ", total_f);
            console.info("REPORTE GENERADO CON EXITO", rows);
            return rows[0]
        }   
        catch(error){
            console.error("ERROR", error);
        }

    }

    async Post(mes, gastosMes){
        var reportesPagados = await this.GetReportePagados(mes);
        var reportesNoPagados = await this.GetReporteNoPagados(mes);
        var total_ventas = await this.GetReporteMes(mes);
        var resultado = reportesPagados.total_mes_si - reportesNoPagados.total_mes_no;
        var resultado_terminal = resultado - gastosMes;
        console.log("EL MES ES TIPO:", typeof mes);
        console.log("Reporte Pagados: ", reportesPagados.total_mes_si);
        console.log("Reporte No Pagados: ", reportesNoPagados.total_mes_no);
        console.log("Reporte Valor Ventas: ", total_ventas.total_mes);
        console.log("Reporte Pagadas - No Pagadas: ", resultado);
        console.log("Reporte Gastos Mes: ", gastosMes);
        console.log("Reporte Total Mes: ", resultado_terminal);
        await this.generarReporte(reportesPagados.total_mes_si, reportesNoPagados.total_mes_no, total_ventas.total_mes, resultado, gastosMes, resultado_terminal, mes);
        const response = {
            pagadas: reportesPagados.total_mes_si,
            no_pagadas: reportesNoPagados.total_mes_no,
            total_ventas: total_ventas.total_mes,
            resultado: resultado,
            gastos_mes: gastosMes,
            resultado_terminal: resultado_terminal,
            mes: mes, 
        };
        await emailService.sendEmail(response);
        return response;
    }

    async Get(){
        const query = 'SELECT id_reporte, total_pagado, total_no_pagado, total_en_ventas, total_reporte, gastos_mes, total_final, mes, fecha FROM public.reporte ORDER BY id_reporte DESC;'
        try{
            let {rows} = await pool.query(query);
            console.info("Caca: ", rows)
            return rows;
        }   
        catch(error){
            console.error("ERROR Pedido", error);
        }
    }
}

module.exports = ReporteService;
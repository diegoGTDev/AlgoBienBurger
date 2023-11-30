const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
class EmailService{
    constructor(){
        console.log(process.env.CORREO)
        console.log(process.env.PASSWORD)
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.CORREO, // tu dirección de correo electrónico de Gmail
            pass: process.env.PASSWORD // tu contraseña de Gmail (o una contraseña de aplicación generada)
            }
        });
    }


    async sendEmail(data){
        var fecha = new Date();
        //Quiero obtener un string de la fecha en formato dd/mm/aaaa 
        var dd = fecha.getDate();
        var mm = fecha.getMonth()+1;
        var yyyy = fecha.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        }
        if(mm<10) 
        {
            mm='0'+mm;
        }
        fecha = dd+'/'+mm+'/'+yyyy;
        const mailOptions = {
            from: process.env.CORREO, // tu dirección de correo electrónico de Gmail
            to: process.env.CORREO,
            subject: `Reporte del dia: ${fecha}`,
            text: 'Cuerpo del correo electrónico',
            html: `
            <table>
                <thead>
                    <tr>
                        <th>Pagadas</th>
                        <th>No pagadas</th>
                        <th>Total Ventas</th>
                        <th>Total Reporte</th>
                        <th>Gastos del mes</th>
                        <th>Total final</th>
                        <th>Mes</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${data.pagadas}</td>
                        <td>${data.no_pagadas}</td>
                        <td>${data.total_ventas}</td>
                        <td>${data.resultado}</td>
                        <td>${data.gastos_mes}</td>
                        <td>${data.resultado_terminal}</td>
                        <td>${data.mes}</td>
                        <td>${fecha}</td>
                    </tr>
                </tbody>
            `
        };

       
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            } else {
            console.log('Correo electrónico enviado:', info.response);
            }
        });
    }

   
}

module.exports = EmailService;
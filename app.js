const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/champions', async (req, res) => {
  try {
    const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/14.1.1/data/pt_BR/champion.json`);
    const data = await response.json();
    const champions = Object.values(data.data).map(champion => ({
      name: champion.name,
      image: `http://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champion.image.full}`,
    }));
    res.json(champions);
  } catch (error) {
    console.error('Erro ao buscar informações dos personagens:', error);
    res.status(500).json({ error: 'Erro ao buscar informações dos personagens' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
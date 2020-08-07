import { db } from '../models/index.js';

const Measurement = db.measurement;

const rotaRaiz = async (req, res) => {
  try {
    res.send({
      message:
        'Bem-vindo à API  Temperatura e Umidade',
    });
  } catch (error) {
    res.status(400).send({ message: 'Erro ao pesquisar rota' })
  }
}


const create = async (req, res) => {
  const measurement = new Measurement({
    sensor_name: req.body.sensor_name,
    temperature: req.body.temperature,
    humidity: req.body.humidity
  })
  try {
    await measurement.save(measurement)
    res.status(200).send({ message: "Medição salva com sucesso!" });
    //   logger.info(`POST /transaction - ${JSON.stringify()}`);
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Measurement.find({})
    res.send(data)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }

};

const findLast = async (req, res) => {
  try {
    const data = await Measurement.find({}).limit(1).sort({ lastModified: -1 })
    res.send(data)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao pesquisar valor' });
  }

};

const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Measurement.findById({ _id: id })
    if (!data) {
      res.status(400).send(`Medição ${id} não encontrada!`)
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar a Medição id: ' + id });
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Measurement.deleteMany()
    if (!data) {
      res.status(400).send(`Medição não encontrada para remover!`)
    } else {
      res.send({ message: `Medidas removidas com sucesso!!` });
    };
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Medicões' });
  }
};

export default { rotaRaiz, create, findAll, findOne, findLast, removeAll }

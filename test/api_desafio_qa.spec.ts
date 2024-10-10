import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Api desafio qa', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com/docs';
  let mercadoId = '';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Criar um novo mercado', () => {
    it('Cria um mercado passando nome, cnpj e endereço', async () => {
      mercadoId = await p
        .spec()
        .post(`${baseUrl}/mercado`)
        .withJson({
          nome: 'Adriano Reus Savi',
          cnpj: '72087941000115',
          endereco: 'Bairro teste, número 19, Cidade Teste'
        })
        .expectStatus(StatusCodes.OK)
        .returns('mercadoId');
    });
  });

  describe('Verificar se mercado foi criado', () => {
    it('Verifica se o mercado foi criado, buscando pelo id', async () => {
      await p
        .spec()
        .get(`${baseUrl}/mercado/${mercadoId}`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Adicionar um doce ao mercado', () => {
    it('Cria um novo doce e adiciona na padaria do mercado', async () => {
      await p
        .spec()
        .post(`${baseUrl}/mercado/${mercadoId}/produtos/padaria/doces`)
        .withJson({
          nome: 'Beijinho',
          valor: 7
        })
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Verificar quantidade de doces no mercado', () => {
    it('Confere se a quantidade de doces equivale ao que foi adicionado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/mercado/${mercadoId}/produtos/padaria/doces`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Adicionar um salgado ao mercado', () => {
    it('Cria um novo salgado e adiciona na padaria do mercado', async () => {
      await p
        .spec()
        .post(`${baseUrl}/mercado/${mercadoId}/produtos/padaria/salgados`)
        .withJson({
          nome: 'Empada',
          valor: 3
        })
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Verificar quantidade de salgados no mercado', () => {
    it('Confere se a quantidade de salgados equivale ao que foi adicionado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/mercado/${mercadoId}/produtos/padaria/salgados`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Adicionar um legume ao mercado', () => {
    it('Cria um novo legume e adiciona no hortifruit do mercado', async () => {
      await p
        .spec()
        .post(`${baseUrl}/mercado/${mercadoId}/produtos/hortifruit/legumes`)
        .withJson({
          nome: 'Pepino',
          valor: 4
        })
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Verificar quantidade de legumes no mercado', () => {
    it('Confere se a quantidade de legumes equivale ao que foi adicionado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/mercado/${mercadoId}/produtos/hortifruit/legumes`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Adicionar uma fruta ao mercado', () => {
    it('Cria uma nova fruta e adiciona no hortifruit do mercado', async () => {
      await p
        .spec()
        .post(`${baseUrl}/mercado/${mercadoId}/produtos/hortifruit/frutas`)
        .withJson({
          nome: 'Abacaxi',
          valor: 9
        })
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Verificar quantidade de frutas no mercado', () => {
    it('Confere se a quantidade de frutas equivale ao que foi adicionado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/mercado/${mercadoId}/produtos/hortifruit/frutas`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Adicionar uma carne bovina ao mercado', () => {
    it('Cria uma nova carne bovina e adiciona no açougue do mercado', async () => {
      await p
        .spec()
        .post(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/bovinos`)
        .withJson({
          nome: 'Carne de porco',
          valor: 58
        })
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Verificar quantidade de carnes bovinas no mercado', () => {
    it('Confere se a quantidade de carnes bovinas equivale ao que foi adicionado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/bovinos`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Adicionar uma carne de ave ao mercado', () => {
    it('Cria uma nova carne de ave e adiciona no açougue do mercado', async () => {
      await p
        .spec()
        .post(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/aves`)
        .withJson({
          nome: 'Galinha',
          valor: 33
        })
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Verificar quantidade de carnes de ave no mercado', () => {
    it('Confere se a quantidade de carne de ave equivale ao que foi adicionado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/aves`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Remover o mercado criado', () => {
    it('Exclui o mercado criado pelo id', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/mercado/${mercadoId}`)
        .expectStatus(StatusCodes.OK);
    });
  });
});

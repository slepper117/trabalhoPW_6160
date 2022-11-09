/**
 * Class Error 500
 * @extends Error
 */
class Error500 extends Error {
  /**
   * Error 500 - Internal Server Error
   * @param {string} name - Código do Erro
   * @param {string} message - Mensagem do Erro
   */
  constructor(name, message) {
    super();

    this.name = name;
    this.message = message;
    this.data.statusCode = 500;
    this.data.infoCode = 'Internal Server Error';
  }
}

export default Error500;

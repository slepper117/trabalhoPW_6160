/**
 * Class Error 400
 * @extends Error
 */
class Error400 extends Error {
  /**
   * Error 400 - Bad Request
   * @param {string} name - Código do Erro
   * @param {string} message - Mensagem do Erro
   */
  constructor(name, message) {
    super();

    this.name = name;
    this.message = message;
    this.statusCode = 400;
    this.infoCode = 'Bad Request';
  }
}

export default Error400;

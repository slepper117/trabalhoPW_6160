/**
 * Class Error 404
 * @extends Error
 */
class Error404 extends Error {
  /**
   * Error 404 - Resource Not Found
   * @param {string} name - Código do Erro
   * @param {string} message - Mensagem do Erro
   */
  constructor(name, message) {
    super();

    this.name = name;
    this.message = message;
    this.statusCode = 404;
    this.infoCode = 'Resource Not Found';
  }
}

export default Error404;

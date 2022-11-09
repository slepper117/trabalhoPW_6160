/**
 * Class Error 401
 * @extends Error
 */
class Error401 extends Error {
  /**
   * Error 401 - Unauthorized
   * @param {string} name - Código do Erro
   * @param {string} message - Mensagem do Erro
   */
  constructor(name, message) {
    super();

    this.name = name;
    this.message = message;
    this.statusCode = 401;
    this.infoCode = 'Unauthorized';
  }
}

export default Error401;

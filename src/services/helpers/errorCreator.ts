class ErrorCreator extends Error {
	msg: string;
	stCode: number;
	isInternal: boolean;
	/**
	 *
	 * @param stCode number. Código de error http a enviar en respuesta.
	 * @param isInternal boolean. Bandera para saber si el error es interno o provocado por el usuario
	 */
	constructor(msg: string, stCode: number, isInternal = false) {
		super();
		this.stCode = stCode;
		this.isInternal = isInternal;
		this.msg = msg;
	}
}
export default ErrorCreator;
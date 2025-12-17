import { HttpErrorResponse } from '@angular/common/http';
import { ErroApi } from '../../../../domain/model/error-api';

export class ErrorResponse  {
	code!: string;
	message!: string;
	details?: {
		message: string;
	}[];

	static convertToModel(error: HttpErrorResponse, defaultMessage?: string): ErroApi {
		const errorResponse = error.error as ErrorResponse;
		let message = defaultMessage;
		let errorCode = error.status;
		const isServer = ErrorResponse.isServerError(error);
		const hasDetails = ErrorResponse.hasDetails(errorResponse);

		if (ErrorResponse.isOfflineError(error)) {
		} else if (isServer && !hasDetails) {
			message = errorResponse.message;
		} else if (errorResponse && errorResponse.details) {
			message = errorResponse.details[0].message;
			errorCode = errorResponse.code ? +errorResponse.code : errorCode;
		}

		const finalMessage = (defaultMessage ?? message) ?? 'Unknown error';
		return new ErroApi(finalMessage, errorCode);
	}

	static isServerError(err: HttpErrorResponse): boolean {
		const status = err.status.toString();
		return status.length === 3 && +status[0] === 5;
	}

	static isOfflineError(err: HttpErrorResponse): boolean {
		return err.status === 0 && !navigator.onLine;
	}

	static hasDetails(err: ErrorResponse): boolean {
		return Array.isArray(err?.details) &&
			err.details.every((detail: { message?: string }) => typeof detail.message === 'string' && detail.message.length > 0);
	}
}

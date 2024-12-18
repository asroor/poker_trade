export interface IProfile {
	balance: number;
	email: any;
	nickname: string;
	retryAfterSec: any;
	verified: boolean;
	referralLink: string[]
	avgAcceptTime: string; // Ср. время отклика
	sellRequestsCount: number; // Заявки на продажу
	buyRequestsCount: number; // Заявки на покупку
	oncomingRequests: number; // Встречные заявки
}

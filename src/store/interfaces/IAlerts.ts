export interface IAlert {
    alertId: number;
    alertFormatId: number;
    priority: number;
    userId: string;
    logged: Date;
    messageText: string;
    statusApp: number;
    statusEmail: number;
    statusSMS: number;
    statusUser: number;
}

export interface IAlertFormat {
    alertFormatId: number;
    name: string;
    description: string;
    userOrGroupId: string;
    notifyByValue: number;
    category: number;
    isActive: boolean;
    dateCreated: Date;
    lastAmended: Date;
}

export interface INewAlertFormat{
    name: string;
    description: string;
    userOrGroupId: string;
    notifyByValue: number;
    isActive: boolean;
}

export interface IDirectiveConfig {
    optionId: number;
    inputValue: number;
    alertFormatId: number;
    preventProcessing: boolean;
    stopFlow: number;
    startFlow: string;
    runScript: string;
    addToCounter: boolean;
    clearCounter: boolean;
    ehDirectiveId:number;
    ehControlId:number;
}

export interface IDirective {
    ehControlId: number;
    name: string;
    description: string;
    category:number;
    dateCreated: any;
    lastAmended: any;
    directives: IDirectiveConfig[];
}





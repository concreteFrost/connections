export interface ILogObject {
    timeStamp: string;          // formatted as 'YYYY-MM-DD HH:mm.SSS'
    logType: string;
    processId: string;
    flowId: string;
    blockId: string;
    statusCode: string;
    keyList: string;
    duration: string;           // formatted as 'mm:ss.SSS'
    additionalText: string;
}
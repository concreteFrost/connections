export interface LogSearchQuery {
    type: number | undefined;
    status: number | undefined;
    flowId: string | undefined;
    blockId: string | undefined;
    timeFrom: string | number | readonly string[] | undefined;
    timeTo: string | number | readonly string[] | undefined;
    searchText: string | undefined;
}

export interface LogObject {
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
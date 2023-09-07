export interface ISubstitutions{
    subKey:string;
    subConfigs: Array<ISubConfigs>
}

export interface ISubConfigs{
    configName : string;
    configValue : string
}
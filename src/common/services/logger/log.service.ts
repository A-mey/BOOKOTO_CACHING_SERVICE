import {get} from "express-http-context";

export class LogService {
    private className: string;
    private function: string = "";

    constructor(className: string) {
        this.className = className;
    }

    getLogString = (variableName: string, ...variableValue: unknown[]) : string => {
        const requestId = get("requestId");
        const url = get("requestId")
        let loggingIdentifier = `${this.className}:${this.function}::${variableName}`;
        variableValue.forEach(value => {
            loggingIdentifier += ` ${JSON.parse(JSON.stringify(value))}`
        });
        return `${url} ${requestId} ${loggingIdentifier}`;
    }

    info = (variableName: string, ...variableValue: unknown[]): void => {
        const logString = this.getLogString(variableName, ...variableValue);
        console.info(logString);
    }

    warn = (variableName: string, ...variableValue: unknown[]): void => {
        const logString = this.getLogString(variableName, ...variableValue);
        console.warn(logString);
    }

    error = (variableName: string, ...variableValue: unknown[]): void => {
        const logString = this.getLogString(variableName, ...variableValue);
        console.error(logString);
    }

    addFunctionName = (functionName: string): void => {
        this.function = functionName;
    }
}
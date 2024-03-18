export interface ICartDaoInterface {
    insertSession (sessionId: string, sessionData: object) : Promise<void>
    updateSession (sessionId: string, sessionData: object) : Promise<void>
    getSession (sessionId: string) : Promise<object>
    checkSession (sessionId: string) : Promise<boolean>
}
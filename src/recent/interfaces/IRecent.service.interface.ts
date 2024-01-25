import { user } from "../types/user.session.type"

export interface IRecentServiceInterface {
    createSession (sessionId: string, sessionData: object): Promise<void>
    checkSession (sessionId: string) : Promise<boolean>
    updateSession (sessionId: string, sessionData: user) : Promise<void>
    getSessionData (sessionId: string) : Promise<object>
}
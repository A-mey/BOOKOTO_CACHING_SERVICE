class SessionSchema {


    constructor() { }

    public readonly schema = {
        "updateSession" : {
            "type": "object",
            "additionalProperties": false,
            "required": ["SESSIONDATA", "SESSIONID"],
            "properties" : {
                "SESSIONID": {
                    "type": "string"
                },
                "SESSIONDATA": {
                    "type": "object",
                }
            },
        },

        "validateSession" : {
            "type": "object",
            "additionalProperties": false,
            "required": ["SESSIONID"],
            "properties" : {
                "SESSIONID": {
                    "type": "object",
                }
            },
        },        
    }
}

export default new SessionSchema();
class SessionSchema {


    constructor() { }

    public readonly schema = {
        "updateSession" : {
            "type": "object",
            "additionalProperties": false,
            "required": ["SESSIONDATA", "SESSIONID"],
            "properties" : {
                "SESSIONID": {
                    "type": "string",
                    // "minLength": 11,
                    // "maxLength": 11
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
                    "type": "string",
                    // "minLength": 11,
                    // "maxLength": 11
                }
            },
        },        
    }
}

export default new SessionSchema();
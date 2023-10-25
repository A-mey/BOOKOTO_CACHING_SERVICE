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
                    "minlength": 11,
                    "maxlength": 11
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
                    "minlength": 11,
                    "maxlength": 11
                }
            },
        },        
    }
}

export default new SessionSchema();
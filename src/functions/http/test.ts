import { generate } from "../../utilities/openAIClient"

export default function helloWorld(request) {
    const { pathParams, queryParams, site, body } = request

    const output = generate("Write a database schema for a hotel")

    return {
        body: output,
        headers: null,
        statusCode: 200
    }
}


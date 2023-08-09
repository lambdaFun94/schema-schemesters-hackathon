
export default function helloWorld(request) {
    const { body, method, pathParams, queryParams, site } = request

    return {
        body: { body, method, pathParams, queryParams, site },
        headers: null,
        statusCode: 200
    }
}
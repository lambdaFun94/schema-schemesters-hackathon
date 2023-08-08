export default function helloWorld(request) {
    const { pathParams, queryParams, site } = request

    return {
        body: { pathParams, queryParams, site },
        headers: null,
        statusCode: 200
    }
}
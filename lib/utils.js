exports.toCamelCase = function(str) {
    return str.toLowerCase()
        .replace( /[-_]+/g, ' ')
        .replace( /[^\w\s]/g, '')
        .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
        .replace( / /g, '' );
}

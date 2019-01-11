export function shortDescription(content, limit) {
    let output = content.trim().split(' ');

    if (output.length > limit) {
        return output.slice(0, limit).join(' ') + '...';
    }

    return output.slice(0, limit).join(' ') + '...';
}
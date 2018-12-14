function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
        headers: {
            'accept': 'application/ld+json'
        }
    }, options))
        .then(checkStatus)
        .then(response => {
            // decode JSON, but avoid problems with empty responses
            return response.text()
                .then(text => text ? JSON.parse(text) : '')
        });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error
}

export function getPosts() {
    return fetchJson('/api/posts')
        .then(data => data['hydra:member']);
}

export function deletePost(id) {
    return fetchJson(`/api/posts/${id}`, {
        method: 'DELETE'
    });
}

export function createPost(post) {
    return fetchJson('/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function createTag(tag) {
    return fetchJson('/api/tags', {
        method: 'POST',
        body: JSON.stringify(tag),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function getTags() {
    return fetchJson('/api/tags')
        .then(data => data['hydra:member'])
}
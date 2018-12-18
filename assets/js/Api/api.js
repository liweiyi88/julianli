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

export function getPost(id) {
    return fetchJson('/api/posts/'+id);
}

export function createPost(post) {
    return fetchJson('/api/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function updatePost(post) {
    let updatePost = Object.assign({}, post);

    updatePost.tags = post.tags.map(tag => {
        return tag['@id'];
    });

    updatePost.freelancer = post.freelancer['@id'];

    return fetchJson('/api/posts/'+updatePost.id, {
        method: 'PUT',
        body: JSON.stringify(updatePost),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deletePost(id) {
    return fetchJson(`/api/posts/${id}`, {
        method: 'DELETE'
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

export function getFreelancers() {
    return fetchJson('/api/freelancers')
        .then(data => data['hydra:member'])
}

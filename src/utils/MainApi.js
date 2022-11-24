const BASE_URL = 'https://api.promo.nexus.moscow';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
};

export const signup = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password })
  });
  return checkResponse(res);
};

export const signin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password })
  });
  const data = await checkResponse(res);
  return data;
};

export const checkToken = async token => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  });
  return checkResponse(res);
};

export const getUsers = async (token) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  });
  return checkResponse(res);
};

export const deleteUser = async (id, jwt) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ _id: id })
  });
  return checkResponse(res);
};

export const setEditUserInfo = async (jwt, name, email, id) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name: name, email: email, _id: id  })
  });
  return checkResponse(res);
}

export const setUserInfo = async (jwt, name, email) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name: name, email: email })
  });
  return checkResponse(res);
}

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this.getMovies = this.getMovies.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  async getMovies(jwt) {
    const res = await fetch(`${this._baseUrl}/movies`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`,
      },
    });
    return this._checkResponse(res);
  }

  async postMovie(data, jwt) {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country: data.country || 'unknown',
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN || 'unknown'
      }),
    });
    return this._checkResponse(res);
  }

  async deleteMovie(id, jwt) {
    const res = await fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`,
      },
    });
    return this._checkResponse(res);
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: headers,
});

export { mainApi };

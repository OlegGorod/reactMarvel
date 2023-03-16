class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=7551ad60cb20d4f78fc6af3ec11902d1';
    _baseOffset = 9;


    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    };


    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=18&offset=${offset}&${this._apiKey}`)
        const filteredCharImage = res.data.results.filter(item => !item.thumbnail.path.includes('image_not_available'));
        return filteredCharImage.map(this._transformCharacter)
    }
    

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
       return this._transformCharacter(res.data.results[0]);
    }

    getComicsList = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}comics?orderBy=issueNumber&limit=20&offset=${offset}&${this._apiKey}`);
        const filteredComicsImage = res.data.results
        .filter(comics => !comics.thumbnail.path.includes('image_not_available'))
        .slice(0,8)
        return filteredComicsImage.map(this._transformComics)
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description.length > 210 ? char.description.slice(0,210) : char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[0].url,
            comics: char.comics.items
        }
    }

    _transformComics = (comics) => {
        return {
            title: comics.title,
            id: comics.id,
            description: comics.description,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price
        }
    }

}


export default MarvelService;

class LocalStorage{
    constructor(){

    }

    add(key, object){
        localStorage.setItem(key, JSON.stringify(object));
        console.info("LocalStorage: Objeto guardado correctamente")
    }

    delete(key){
        localStorage.removeItem(key);
    }

    get(key){
        const response = localStorage.getItem(key);
        return response;
    }
}

export {LocalStorage}
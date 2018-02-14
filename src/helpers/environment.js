
const environment = {
    getApiUrl: () => {
        let apiHostname = '';
        let hostname: string = typeof window !== 'undefined' && typeof location !== 'undefined' ? window.location.hostname : 'hostname';
        switch (hostname) {
            case 'localhost':
                apiHostname = 'http://localhost:3000/api';
                break;
            default:
                apiHostname = 'https://gorodovoy.herokuapp.com/api/';
                break;
        }
        return apiHostname;
    }
};

export default environment;
export function configureFakeBackend() {
    let users = [{ id: 1, username: 'Admin', password: '1234', firstName: 'Robert', lastName: 'Hook',email:"oiacovino7@phpbb.com",gender:"Male",ip_address:"196.237.176.255" },
    { id: 2, username: 'Admin', password: '1234', firstName: 'Anthony', lastName: 'D Souza',email:"jcranmerc@paginegialle.it",gender:"Male",ip_address:"10.174.5.52" },
    {id:3,username: 'Admin', password: '1234',firstName:"Herold",lastName:"Hardwich",email:"hhardwich0@geocities.jp",gender:"Male",ip_address:"131.149.218.73"},
    {id:4,firstName:"Martelle",lastName:"Peddowe",email:"mpeddowe1@feedburner.com",gender:"Female",ip_address:"249.160.225.74"},
    {id:5,firstName:"Devan",lastName:"Foulstone",email:"dfoulstone2@opera.com",gender:"Female",ip_address:"28.60.122.122"},
    {id:6,firstName:"Rice",lastName:"Halsey",email:"rhalsey3@goo.gl",gender:"Male",ip_address:"49.93.93.32"},
    {id:7,firstName:"Corrina",lastName:"Fitzer",email:"cfitzer4@harvard.edu",gender:"Female",ip_address:"54.248.51.249"},
    {id:8,firstName:"Kermy",lastName:"Bett",email:"kbett5@wufoo.com",gender:"Male",ip_address:"43.3.243.27"},
    {id:9,firstName:"Doroteya",lastName:"Kingh",email:"dkingh6@ucla.edu",gender:"Female",ip_address:"147.151.8.68"},
    {id:10,firstName:"Obed",lastName:"Iacovino",email:"oiacovino7@phpbb.com",gender:"Male",ip_address:"196.237.176.255"},
    {id:11,firstName:"Kelcy",lastName:"Crowhurst",email:"kcrowhurst8@earthlink.net",gender:"Female",ip_address:"133.118.121.242"},
    {id:12,firstName:"Lorena",lastName:"Charlot",email:"lcharlot9@mozilla.org",gender:"Female",ip_address:"37.66.237.110"},
    {id:13,firstName:"Iormina",lastName:"Falcus",email:"ifalcusa@eventbrite.com",gender:"Female",ip_address:"37.178.65.32"},
    {id:14,firstName:"Nathalie",lastName:"Joderli",email:"njoderlib@i2i.jp",gender:"Female",ip_address:"222.244.240.186"},
    {id:15,firstName:"Juan",lastName:"Cranmer",email:"jcranmerc@paginegialle.it",gender:"Male",ip_address:"10.174.5.52"},
    {id:16,firstName:"Ricoriki",lastName:"O'Kynsillaghe",email:"rokynsillaghed@tiny.cc",gender:"Male",ip_address:"125.250.102.200"},
    {id:17,firstName:"Ky",lastName:"Batsford",email:"kbatsforde@simplemachines.org",gender:"Male",ip_address:"10.78.70.171"}];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token';

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username === params.username && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    });
                }

                // get users - secure
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}
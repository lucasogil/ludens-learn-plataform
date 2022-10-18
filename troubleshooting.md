# Troubleshooting - Tutorial de Implementacao Full Stack

- Aula 1

  minuto 16
  Problema com sequelize init
  Solucao
  instalar o sequelize globalmennte
  at 16:14 if you're getting 'sequelize command not found' error then first install sequelize-cli globally by
  npm install -g sequelize-cli
  then run
  sequelize init
  or you can use the npx like
  npx sequelize-cli init

- Aula 4
- minuto 6
- Switch nao funciona pois foi substituido pelo Componente Routes
- Stackoverflow: https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
- I'll finish this series! Thank you so much for your efforts!!!
  With v6, it's a little bit of different.
  previous:
  <Switch>
  <Route path="/" exact component={<Home />} />
  <Route path="/createpost" exact component={<Home />} />
  </Switch>
  v6:
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/createpost" element={<Home />} />
  </Routes>
  I'm also going to implement Typescript and TypeORM on my own ^^

- Aula 6
- minuto 6:18
- 6:18 if you're using latest v6 react-router-dom then instead of useHistory go with useNavigate  
  import { useNavigate } from "react-router-dom";
  let navigate = useNavigate();
  onClick={() => navigate(`/post/${value.id}`)}

- Aula 8
- minuto 20:06
- trativa de erro muda para react acima da versao 1.6
- I solved it my self if you want to catch errors in node version v16.14.0 it will not work this way the server will keep crashing on testing you have to catch error like this:
  router.post("/auth", async (req, res) => {
  const { username, password } = req.body;

      const user = await login.findOne({ where: { username: username } });

      if (!user) res.json({ error: "User Doesn't Exist" })
      else{

      bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combination" })
        else{
          res.json("Logged in");
        }


      });
      }

  })

  module.exports = router;

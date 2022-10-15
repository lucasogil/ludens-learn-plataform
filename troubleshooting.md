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

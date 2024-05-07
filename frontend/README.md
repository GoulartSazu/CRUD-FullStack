# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


CREATE TABLE `splash`.`feedbacks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fdb_message` VARCHAR(2000),
  `fdb_placa` VARCHAR(10),
  `fdb_stars` integer,
  `fdb_hash` VARCHAR(300) ,
  `date_insert` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
CREATE TABLE `splash`.`agendamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `age_servico` VARCHAR(45) NOT NULL,
  `age_veiculo` VARCHAR(45) NOT NULL,
  `age_local` VARCHAR(45) NOT NULL,
  `age_data` DATE NOT NULL,
  `age_horario` VARCHAR(45) NULL,
  `age_valor_total` numeric NOT NULL,
  `age_status`  VARCHAR(25) NOT NULL,
  `age_hash` VARCHAR(300),
  `date_insert` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
CREATE TABLE `splash`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usr_nome` VARCHAR(45) NOT NULL,
  `usr_email` VARCHAR(45) NOT NULL,
  `usr_fone` VARCHAR(45) NOT NULL,
  `usr_cidade` VARCHAR(45) NULL,
  `usr_bairro` VARCHAR(45) NULL,
  `usr_rua` VARCHAR(45) NULL,
  `usr_numero` VARCHAR(45) NULL,
  `usr_data_nascimento` DATE NOT NULL,
  `date_insert` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

ALTER TABLE `splash`.`agendamentos` 
ADD COLUMN `age_endereco` VARCHAR(300) NULL AFTER `age_status`;

ALTER TABLE `splash`.`agendamentos` 
ADD COLUMN `age_free_servico` INT NULL DEFAULT 0 AFTER `age_status`;


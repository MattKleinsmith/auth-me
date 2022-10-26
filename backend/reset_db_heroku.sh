#!/bin/bash
heroku run "npm run sequelize db:seed:undo:all && npm run sequelize db:migrate:undo:all && npm run sequelize db:migrate && npm run sequelize db:seed:all"

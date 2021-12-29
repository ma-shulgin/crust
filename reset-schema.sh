set -e
rm -rf src/generated/
yarn run codegen
yarn run build
yarn run processor:migrate

rm -rf db/migrations/*.js
npm run db:reset
npm run db:create-migration -n "statemine" 
npm run db:migrate
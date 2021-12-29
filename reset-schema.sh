set -e
rm -rf src/generated/
yarn run codegen
yarn run build
yarn run processor:migrate
./reset-db.sh 

WEB_PATH='/var/shop_admin_fe/'
WEB_USER='root'
WEB_USERGROUP='root'

echo "Start deployment"
cd $WEB_PATH
echo `pwd`
echo "pulling source code..."
git fetch --all
git reset --hard origin/main
git pull
echo "changing permissions..."
yarn
npm run build
echo "build end"
#chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
#echo "Finished."


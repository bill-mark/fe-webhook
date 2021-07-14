
# 前端在服务器的git地址
WEB_PATH='/var/shop_admin_fe/'

WEB_USER='root'
WEB_USERGROUP='root'

echo "Start"
cd $WEB_PATH
echo `pwd`
echo "pulling source code..."
git fetch --all
git reset --hard origin/main
git pull
echo "next build..."
yarn
npm run build
echo "build end"
#chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
#echo "Finished."

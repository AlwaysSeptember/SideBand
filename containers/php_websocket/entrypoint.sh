set -e
set -x

ENV_TO_USE=${ENV_DESCRIPTION:=default}

echo "ENV_TO_USE is ${ENV_TO_USE}";

# Generate config settings used per environment
php vendor/bin/configurate \
    -p server_config.php \
    autoconf.source.php \
    autoconf.php \
    $ENV_TO_USE


php index.php

# tail -f /var/app/containers/php_websocket/readme.MD
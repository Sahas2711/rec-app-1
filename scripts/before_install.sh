#!/bin/bash

echo "Stopping Apache if running..."
systemctl stop httpd || true

echo "Cleaning old files..."
rm -rf /var/www/html/*
#!/bin/bash

echo "Setting permissions..."
chown -R ec2-user:ec2-user /var/www/html
chmod -R 755 /var/www/html
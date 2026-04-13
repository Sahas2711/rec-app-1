#!/bin/bash

echo "Starting Apache..."

# Configure Apache
systemctl restart httpd
systemctl enable httpd
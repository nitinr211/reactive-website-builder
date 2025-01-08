# Use the official PHP image
FROM php:8.2-cli

# Set the working directory
WORKDIR /var/www/html

# Copy your PHP files to the container
COPY ./php-scripts/ .

# Expose the port you want the PHP server to run on
EXPOSE 7000

# Start the built-in PHP server
CMD ["php", "-S", "0.0.0.0:7000"]

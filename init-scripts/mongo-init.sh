# #!/bin/bash

# echo "Initializing multiple MongoDB databases..."

# # Kiểm tra nếu biến môi trường MONGO_MULTIPLE_DATABASES tồn tại
# if [ -n "$MONGO_MULTIPLE_DATABASES" ]; then
#     IFS=',' read -ra DBS <<< "$MONGO_MULTIPLE_DATABASES"
#     for db in "${DBS[@]}"; do
#         echo "Creating database: $db"
#         mongo --username "$MONGO_INITDB_ROOT_USERNAME" --password "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin <<EOF
#         use $db;
#         db.createCollection("init_collection");
#         print("Database created: $db");
# EOF
#     done
#     echo "All databases created successfully!"
# else
#     echo "No databases specified in MONGO_MULTIPLE_DATABASES"
# fi

#!/bin/bash
set -e

echo "Initializing MongoDB databases..."

# Wait for MongoDB to fully start
sleep 5

# Connect to MongoDB and create databases
if [ -n "$MONGO_MULTIPLE_DATABASES" ]; then
    echo "Creating multiple databases: $MONGO_MULTIPLE_DATABASES"
    
    for db in $(echo $MONGO_MULTIPLE_DATABASES | tr ',' ' '); do
        echo "Creating database: $db"
        
        # Use mongosh instead of mongo (for newer MongoDB versions)
        mongosh --quiet \
          --username "$MONGO_INITDB_ROOT_USERNAME" \
          --password "$MONGO_INITDB_ROOT_PASSWORD" \
          --authenticationDatabase admin <<EOF
            use $db;
            db.createCollection("init_collection");
            db.init_collection.insertOne({ "initialized": true, "timestamp": new Date() });
            
            // Verify database was created successfully
            if (db.stats().ok) {
                print("✅ Database $db created successfully!");
            } else {
                print("❌ Failed to create database $db");
                quit(1);
            }
EOF
        
        # Check for errors
        if [ $? -ne 0 ]; then
            echo "❌ Error occurred while creating database $db"
            exit 1
        fi
    done
    
    echo "✅ All databases created successfully!"
else
    echo "⚠️ No databases specified in MONGO_MULTIPLE_DATABASES"
fi
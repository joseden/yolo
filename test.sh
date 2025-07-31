#!/bin/bash
echo "=== Testing YOLO Deployment ==="
echo ""
echo "Containers:"
docker ps --format "table {{.Names}}\t{{.Ports}}" | grep -E "NAMES|yolo"

echo -e "\nTesting endpoints:"
curl -s -o /dev/null -w "Frontend (3000): %{http_code}\n" http://localhost:3000
curl -s -o /dev/null -w "Backend (5000): %{http_code}\n" http://localhost:5000

echo -e "\n✅ Access your app at: http://localhost:3000"
read -p "Do you want create a bundle for PROD release? (Y/N): " choice

if [[ $choice == "Y" || $choice == "y" ]]; then
    echo "Install Dependency"
    yarn install
    echo "building Prod build"
    yarn build
    zip -r build.zip build
    echo "copying Prod build to Prod"
    scp -i ~/Desktop/pem_files/stage-gnr-key.pem -r build.zip   ubuntu@ec2-54-208-76-220.compute-1.amazonaws.com:/home/ubuntu/.
    echo "removing existing build"
    rm -rf build
    rm -rf build.zip
    echo "done %"
fi

read -p "Do you want to connect to PROD server? (Y/N): " connect

if [[ $connect == "Y" || $connect == "y" ]]; then
    ssh -i ~/Desktop/pem_files/stage-gnr-key.pem   ubuntu@ec2-54-208-76-220.compute-1.amazonaws.com
else
    echo "Terminating."
    exit 1
fi